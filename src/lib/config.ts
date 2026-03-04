const env = import.meta.env;
const isDev = !!env.DEV;

export const API_BASE_URL = env.VITE_API_BASE_URL || (isDev ? 'http://localhost:3001/api' : '');
export const SOCKET_URL = env.VITE_SOCKET_URL || (isDev ? 'http://localhost:3001' : '');
export const APP_HOST = env.VITE_APP_HOST || SOCKET_URL;
export const APP_VERSION_NAME = env.VITE_APP_VERSION_NAME || '1.0.0';
export const APP_VERSION_CODE = Number(env.VITE_APP_VERSION_CODE || 1);

if (!API_BASE_URL) {
  console.warn('[config] VITE_API_BASE_URL is empty. For APK/production, set it in .env.production before build.');
}
