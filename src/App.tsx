import { lazy, Suspense, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { useChatStore } from './stores/chatStore';
import { AuthPage } from './components/AuthPage';
import { BottomNav } from './components/BottomNav';

const ChatsPage = lazy(() => import('./pages/ChatsPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

function Guard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
}

export default function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();
  const { initSocketHandlers, loadChats } = useChatStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) return;
    initSocketHandlers();
    loadChats();
  }, [isAuthenticated, initSocketHandlers, loadChats]);

  return (
    <Box sx={{ height: '100dvh', pb: 10 }}>
      <Suspense fallback={<Box sx={{ p: 4, display: 'grid', placeItems: 'center' }}><CircularProgress /></Box>}>
        <Routes>
          <Route path="/auth" element={isAuthenticated ? <Navigate to="/chats" replace /> : <AuthPage />} />
          <Route path="/chats" element={<Guard><ChatsPage /></Guard>} />
          <Route path="/chat/:chatId" element={<Guard><ChatPage /></Guard>} />
          <Route path="/contacts" element={<Guard><ContactsPage /></Guard>} />
          <Route path="/settings" element={<Guard><SettingsPage /></Guard>} />
          <Route path="*" element={<Navigate to="/chats" replace />} />
        </Routes>
      </Suspense>
      {isAuthenticated && <BottomNav />}
    </Box>
  );
}
