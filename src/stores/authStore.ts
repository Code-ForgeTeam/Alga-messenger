import { create } from 'zustand';
import { authApi } from '../lib/api';
import { connectSocket, disconnectSocket } from '../lib/socket';
import type { User } from '../lib/types';
import { useChatStore } from './chatStore';
import { useContactsStore } from './contactsStore';

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
      const { user } = await authApi.verify();
      connectSocket(token);
      set({ user, token, isAuthenticated: true, banned: false, banReason: '', error: null });
    } catch (e: any) {
      if (e.response?.status === 403 && e.response?.data?.error === 'banned') {
        localStorage.removeItem('token');
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          banned: true,
          banReason: e.response?.data?.reason || '',
        });
      } else {
        localStorage.removeItem('token');
        set({ user: null, token: null, isAuthenticated: false });
      }
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null, banned: false, banReason: '' });
    try {
      const { token, user: responseUser } = await authApi.login(username, password);
      localStorage.setItem('token', token);
      const user = responseUser ?? (await authApi.verify()).user;
      connectSocket(token);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (e: any) {
      localStorage.removeItem('token');
      if (e.response?.status === 403 && e.response?.data?.error === 'banned') {
        set({
          isLoading: false,
          banned: true,
          banReason: e.response?.data?.reason || '',
          error: null,
        });
      } else {
        set({ isLoading: false, error: e.response?.data?.error ?? 'Ошибка при входе' });
      }
      throw e;
    }
  },

  register: async (username, fullName, password) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user: responseUser } = await authApi.register(username, fullName, password);
      localStorage.setItem('token', token);
      const user = responseUser ?? (await authApi.verify()).user;
      connectSocket(token);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (e: any) {
      localStorage.removeItem('token');
      set({ isLoading: false, error: e.response?.data?.error ?? 'Ошибка при регистрации' });
      throw e;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    disconnectSocket();
    useChatStore.getState().reset();
    useContactsStore.getState().reset();
    set({ user: null, token: null, isAuthenticated: false, error: null, banned: false, banReason: '' });
  },

  updateUser: (patch) => set((state) => ({ user: state.user ? { ...state.user, ...patch } : null })),

  updateProfile: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authApi.updateProfile(payload);
      set({ user, isLoading: false });
    } catch (e: any) {
      set({ isLoading: false, error: e.response?.data?.error ?? 'Ошибка при обновлении профиля' });
      throw e;
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.changePassword(currentPassword, newPassword);
      set({ isLoading: false });
    } catch (e: any) {
      set({ isLoading: false, error: e.response?.data?.error ?? 'Ошибка при смене пароля' });
      throw e;
    }
  },
}));
