import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from './config';

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (!SOCKET_URL) {
    return null;
  }

  if (socket && (socket.connected || socket.active)) return socket;

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    timeout: 10_000,
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
  });

  (window as any).__socket = socket;

  socket.on('connect_error', (e) => console.error('Socket connection error:', e));
  socket.on('error', (e) => console.error('Socket error:', e));

  return socket;
};

export const getSocket = () => socket;

export const isSocketConnected = () => !!(socket && socket.connected);

export const reconnectSocket = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
  return connectSocket(token);
};

export const disconnectSocket = () => {
  if (!socket) return;
  socket.disconnect();
  socket = null;
  (window as any).__socket = null;
};
