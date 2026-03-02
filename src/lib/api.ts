import axios from 'axios';
import { API_BASE_URL } from './config';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.response = {
        data: {
          error: error.code === 'ECONNREFUSED' || String(error.message).includes('Network Error')
            ? 'Сервер недоступен. Убедитесь, что сервер запущен на порту 3001.'
            : 'Ошибка подключения к серверу. Проверьте интернет-соединение.',
        },
      };
    }

    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }

    return Promise.reject(error);
  },
);

export const authApi = {
  register: async (username: string, fullName: string, password: string) =>
    (await api.post('/auth/register', { username, fullName, password })).data,
  login: async (username: string, password: string) =>
    (await api.post('/auth/login', { username, password })).data,
  verify: async () => (await api.get('/auth/verify')).data,
  updateProfile: async (payload: Record<string, unknown>) => (await api.put('/users/me', payload)).data,
  changePassword: async (currentPassword: string, newPassword: string) =>
    (await api.put('/users/me/password', { currentPassword, newPassword })).data,
};

export const chatApi = {
  getChats: async () => (await api.get('/chats')).data,
  getById: async (chatId: string) => (await api.get(`/chats/${chatId}`)).data,
  create: async (name: string, type: string, participantIds: string[]) =>
    (await api.post('/chats', { name, type, participantIds })).data,
};

export const messageApi = {
  getByChatId: async (chatId: string, limit = 50, offset = 0) =>
    (await api.get(`/messages/chat/${chatId}`, { params: { limit, offset } })).data,
  send: async (chatId: string, text: string, attachments: unknown[] = []) =>
    (await api.post('/messages', { chatId, text, attachments })).data,
  markAsRead: async (chatId: string) => (await api.post('/messages/read', { chatId })).data,
};

export const userApi = {
  getById: async (id: string) => (await api.get(`/users/${id}`)).data,
  getByUsername: async (username: string) =>
    (await api.get(`/users/by-username/${encodeURIComponent(username)}`)).data,
  search: async (q: string) => (await api.get('/users/search', { params: { q } })).data,
};
