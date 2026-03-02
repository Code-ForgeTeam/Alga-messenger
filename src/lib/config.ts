const env = import.meta.env;

export const API_BASE_URL = env.VITE_API_BASE_URL || 'http://localhost:3001/api';
export const SOCKET_URL = env.VITE_SOCKET_URL || 'http://localhost:3001';
export const APP_HOST = env.VITE_APP_HOST || SOCKET_URL;
export const APP_VERSION_NAME = env.VITE_APP_VERSION_NAME || '1.0.0';
export const APP_VERSION_CODE = Number(env.VITE_APP_VERSION_CODE || 1);
