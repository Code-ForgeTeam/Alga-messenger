import { create } from 'zustand';
import { authApi, userApi } from '../lib/api';
import { connectSocket, disconnectSocket } from '../lib/socket';
import type { User } from '../lib/types';
import { useChatStore } from './chatStore';
import { useContactsStore } from './contactsStore';
import { useAdminStore } from './adminStore';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  banned: boolean;
  banReason: string;
  checkAuth: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, fullName: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
  updateProfile: (payload: Record<string, unknown>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const isRecord = (value: unknown): value is Record<string, any> =>
  !!value && typeof value === 'object' && !Array.isArray(value);

const extractUserPayload = (payload: unknown): unknown => {
  if (!isRecord(payload)) return payload;
  if (isRecord(payload.user)) return payload.user;
  if (isRecord(payload.data) && isRecord(payload.data.user)) return payload.data.user;
  return payload;
};

const extractToken = (payload: unknown): string => {
  if (!isRecord(payload)) return '';

  const direct = payload.token ?? payload.accessToken;
  if (typeof direct === 'string' && direct.trim()) return direct.trim();

  if (isRecord(payload.data)) {
    const nested = payload.data.token ?? payload.data.accessToken;
    if (typeof nested === 'string' && nested.trim()) return nested.trim();
  }

  return '';
};

const normalizeUser = (payload: any): User | null => {
  if (!payload || typeof payload !== 'object') return null;

  const id = String(payload.id ?? '').trim();
  if (!id) return null;

  const username = String(payload.username ?? payload.user_name ?? '').trim();
  const fullName = String(payload.fullName ?? payload.full_name ?? payload.name ?? '').trim();

  return {
    id,
    username,
    fullName,
    avatar: payload.avatar ?? undefined,
    bio: payload.bio ?? undefined,
    status: payload.status ?? undefined,
    lastSeen: payload.lastSeen ?? payload.last_seen ?? undefined,
    badge: payload.badge ?? undefined,
    birthday: payload.birthday ?? payload.birthDate ?? payload.birth_date ?? payload.dob ?? undefined,
    isCreator:
      typeof payload.isCreator === 'boolean'
        ? payload.isCreator
        : typeof payload.is_creator === 'boolean'
          ? payload.is_creator
          : undefined,
  };
};

const fetchMyProfileSafe = async (): Promise<User | null> => {
  try {
    const me = await userApi.getMe();
    return normalizeUser(extractUserPayload(me));
  } catch {
    return null;
  }
};

const ensureProfile = async (candidate: unknown): Promise<User | null> => {
  const normalized = normalizeUser(extractUserPayload(candidate));
  const needServerProfile =
    !normalized ||
    !normalized.username ||
    !normalized.fullName ||
    typeof normalized.isCreator !== 'boolean';

  if (!needServerProfile) return normalized;

  const fromMe = await fetchMyProfileSafe();
  if (fromMe && normalized) {
    return {
      ...normalized,
      ...fromMe,
      id: normalized.id || fromMe.id,
      username: fromMe.username || normalized.username,
      fullName: fromMe.fullName || normalized.fullName,
      isCreator:
        typeof fromMe.isCreator === 'boolean'
          ? fromMe.isCreator
          : normalized.isCreator,
    };
  }

  return fromMe || normalized;
};

const mapAuthError = (errorPayload: any, fallback: string): string => {
  const code = String(errorPayload?.error ?? '').toLowerCase();
  if (code === 'invalid_credentials') return 'Неправильный логин или пароль';
  if (code === 'banned') return 'Данный пользователь заблокирован';
  if (code === 'username already exists') return 'Пользователь с таким логином уже существует';
  const message = String(errorPayload?.message ?? '').trim();
  if (message) return message;
  return fallback;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  banned: false,
  banReason: '',

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return set({ isAuthenticated: false, user: null, token: null });

    try {
      const verifyResponse = await authApi.verify();
      const normalizedUser = await ensureProfile(verifyResponse);
      if (!normalizedUser) {
        throw new Error('Invalid user payload');
      }

      connectSocket(token);
      set({ user: normalizedUser, token, isAuthenticated: true, banned: false, banReason: '', error: null });
      useAdminStore.getState().setAdminAccess(Boolean(normalizedUser.isCreator), normalizedUser.id);
    } catch (e: any) {
      if (e.response?.status === 403 && e.response?.data?.error === 'banned') {
        localStorage.removeItem('token');
        useAdminStore.getState().reset();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          banned: true,
          banReason: e.response?.data?.reason || '',
        });
      } else {
        localStorage.removeItem('token');
        useAdminStore.getState().reset();
        set({ user: null, token: null, isAuthenticated: false });
      }
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null, banned: false, banReason: '' });
    try {
      const response = await authApi.login(username, password);
      const token = extractToken(response);
      if (!token) {
        throw new Error('Missing token in login response');
      }

      localStorage.setItem('token', token);

      const user = await ensureProfile(response);
      if (!user) {
        throw new Error('Invalid user payload');
      }

      connectSocket(token);
      set({ user, token, isAuthenticated: true, isLoading: false, error: null });
      useAdminStore.getState().setAdminAccess(Boolean(user.isCreator), user.id);
    } catch (e: any) {
      localStorage.removeItem('token');
      useAdminStore.getState().reset();
      if (e.response?.status === 403 && e.response?.data?.error === 'banned') {
        set({
          isLoading: false,
          banned: true,
          banReason: e.response?.data?.reason || '',
          error: 'Данный пользователь заблокирован',
        });
      } else {
        set({
          isLoading: false,
          error: mapAuthError(e.response?.data, 'Ошибка входа'),
        });
      }
      throw e;
    }
  },

  register: async (username, fullName, password) => {
    set({ isLoading: true, error: null, banned: false, banReason: '' });
    try {
      const response = await authApi.register(username, fullName, password);
      const token = extractToken(response);
      if (!token) {
        throw new Error('Missing token in register response');
      }

      localStorage.setItem('token', token);

      const user = await ensureProfile(response);
      if (!user) {
        throw new Error('Invalid user payload');
      }

      connectSocket(token);
      set({ user, token, isAuthenticated: true, isLoading: false, error: null });
      useAdminStore.getState().setAdminAccess(Boolean(user.isCreator), user.id);
    } catch (e: any) {
      localStorage.removeItem('token');
      useAdminStore.getState().reset();
      set({
        isLoading: false,
        error: mapAuthError(e.response?.data, 'Ошибка регистрации'),
      });
      throw e;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    disconnectSocket();
    useChatStore.getState().reset();
    useContactsStore.getState().reset();
    useAdminStore.getState().reset();
    set({ user: null, token: null, isAuthenticated: false, error: null, banned: false, banReason: '' });
  },

  updateUser: (patch) => set((state) => ({ user: state.user ? { ...state.user, ...patch } : null })),

  updateProfile: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.updateProfile(payload);
      const user = await ensureProfile(response);
      if (!user) {
        throw new Error('Invalid user payload');
      }

      set({ user, isLoading: false, error: null });
      useAdminStore.getState().setAdminAccess(Boolean(user.isCreator), user.id);
    } catch (e: any) {
      set({ isLoading: false, error: e.response?.data?.error ?? 'Profile update failed' });
      throw e;
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.changePassword(currentPassword, newPassword);
      set({ isLoading: false });
    } catch (e: any) {
      set({ isLoading: false, error: e.response?.data?.error ?? 'Password change failed' });
      throw e;
    }
  },
}));
