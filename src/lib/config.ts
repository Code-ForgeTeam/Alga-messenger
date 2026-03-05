const env = import.meta.env;
const isDev = !!env.DEV;

const preferHttpsForRemoteHost = (url: string): string => {
  if (!url || isDev || !url.startsWith('http://')) return url;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase();
    const isLocalHost = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
    if (isLocalHost) return url;
    return url.replace(/^http:\/\//, 'https://');
  } catch {
    return url;
  }
};

const rawApiBaseUrl = env.VITE_API_BASE_URL || (isDev ? 'http://localhost:3001/api' : '');
const rawSocketUrl = env.VITE_SOCKET_URL || (isDev ? 'http://localhost:3001' : '');

export const API_BASE_URL = preferHttpsForRemoteHost(rawApiBaseUrl);
export const SOCKET_URL = preferHttpsForRemoteHost(rawSocketUrl);
export const APP_HOST = env.VITE_APP_HOST || SOCKET_URL;
export const APP_VERSION_NAME = env.VITE_APP_VERSION_NAME || '1.0.0';
export const APP_VERSION_CODE = Number(env.VITE_APP_VERSION_CODE || 1);

if (!API_BASE_URL) {
  console.warn('[config] VITE_API_BASE_URL is empty. For APK/production, set it in .env.production before build.');
}

export const DEBUG_API_INFO = env.VITE_DEBUG_API_INFO === '1';
