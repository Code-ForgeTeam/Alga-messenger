import { create } from 'zustand';
import { authApi } from '../lib/api';
import { connectSocket, disconnectSocket } from '../lib/socket';
import type { User } from '../lib/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, fullName: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return set({ isAuthenticated: false, user: null, token: null });

    try {
      const { user } = await authApi.verify();
      connectSocket(token);
      set({ user, token, isAuthenticated: true, error: null });
    } catch {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  login: async (username, password) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await authApi.login(username, password);
      localStorage.setItem('token', token);
      connectSocket(token);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (e: any) {
      set({ isLoading: false, error: e.response?.data?.error ?? 'Ошибка при входе' });
      throw e;
    }
  },

  register: async (username, fullName, password) => {
    set({ isLoading: true, error: null });
    try {
      const { token, user } = await authApi.register(username, fullName, password);
      localStorage.setItem('token', token);
      connectSocket(token);
      set({ user, token, isAuthenticated: true, isLoading: false });
    } catch (e: any) {
      set({ isLoading: false, error: e.response?.data?.error ?? 'Ошибка при регистрации' });
      throw e;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    disconnectSocket();
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },
}));
