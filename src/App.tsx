import { lazy, Suspense, useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { useChatStore } from './stores/chatStore';
import { useSettingsStore } from './stores/settingsStore';
import { useNotificationStore } from './stores/notificationStore';
import { AuthPage } from './components/AuthPage';
import { BottomNav } from './components/BottomNav';
import { NotificationBanners } from './components/NotificationBanners';
import { AppSnackbar } from './components/AppSnackbar';
import { APP_VERSION_CODE } from './lib/config';

const ChatsPage = lazy(() => import('./pages/ChatsPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const EditProfilePage = lazy(() => import('./pages/EditProfilePage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const GlobalSearchPage = lazy(() => import('./pages/GlobalSearchPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const PrivacySettingPage = lazy(() => import('./pages/PrivacySettingPage'));
const UserPickerPage = lazy(() => import('./pages/UserPickerPage'));
const DataStoragePage = lazy(() => import('./pages/DataStoragePage'));
const DevicesPage = lazy(() => import('./pages/DevicesPage'));
const ArchivePage = lazy(() => import('./pages/ArchivePage'));
const AddContactPage = lazy(() => import('./pages/AddContactPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const SupportAgentPage = lazy(() => import('./pages/SupportAgentPage'));

function Guard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
}

export default function App() {
  const auth = useAuthStore();
  const chatStore = useChatStore();
  const loadBanners = useNotificationStore((s) => s.loadBanners);
  const { bgEffect, glowMode } = useSettingsStore();
  const { pathname } = useLocation();
  const isChatRoute = pathname.startsWith('/chat/');

  useEffect(() => {
    auth.checkAuth();
  }, []);

  useEffect(() => {
    if (!auth.isAuthenticated) return;
    chatStore.initSocketHandlers();
    chatStore.loadChats();
    useSettingsStore.getState().loadPrivacyFromServer();
    loadBanners(APP_VERSION_CODE);
  }, [auth.isAuthenticated]);

  if (auth.banned) {
    return (
      <Box sx={{ height: '100dvh', display: 'grid', placeItems: 'center', p: 3, textAlign: 'center' }}>
        <Box>
          <Typography variant="h5" sx={{ mb: 1 }}>Аккаунт заблокирован</Typography>
          <Typography color="text.secondary">{auth.banReason || 'Свяжитесь с администратором.'}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      className={glowMode ? 'glow-mode' : ''}
      sx={{
        height: '100dvh',
        pb: isChatRoute ? 0 : 10,
        overflow: 'hidden',
        backgroundColor: 'background.default',
      }}
    >
      {bgEffect === 'snow' ? (
        <Box
          sx={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden',
            '@keyframes fall': {
              '0%': { transform: 'translateY(-10vh)', opacity: 0 },
              '20%': { opacity: 0.65 },
              '100%': { transform: 'translateY(110vh)', opacity: 0 },
            },
          }}
        >
          {Array.from({ length: 28 }).map((_, i) => (
            <Box
              key={i}
              sx={{
                position: 'absolute',
                top: '-10vh',
                left: `${(i * 13) % 100}%`,
                fontSize: `${10 + (i % 5) * 4}px`,
                color: 'primary.main',
                opacity: 0.45,
                animation: `fall ${6 + (i % 7)}s linear infinite`,
                animationDelay: `${(i % 10) * 0.6}s`,
              }}
            >
              ❄
            </Box>
          ))}
        </Box>
      ) : null}

      <Suspense fallback={<Box sx={{ p: 4, display: 'grid', placeItems: 'center', position: 'relative', zIndex: 1 }}><CircularProgress /></Box>}>
        <Routes>
          <Route path="/auth" element={auth.isAuthenticated ? <Navigate to="/chats" replace /> : <AuthPage />} />

          <Route path="/chats" element={<Guard><ChatsPage /></Guard>} />
          <Route path="/chat/:chatId" element={<Guard><ChatPage /></Guard>} />
          <Route path="/contacts" element={<Guard><ContactsPage /></Guard>} />
          <Route path="/settings" element={<Guard><SettingsPage /></Guard>} />
          <Route path="/edit-profile" element={<Guard><EditProfilePage /></Guard>} />
          <Route path="/user/:userId" element={<Guard><UserProfilePage /></Guard>} />
          <Route path="/search" element={<Guard><GlobalSearchPage /></Guard>} />
          <Route path="/privacy" element={<Guard><PrivacyPage /></Guard>} />
          <Route path="/privacy/:settingKey" element={<Guard><PrivacySettingPage /></Guard>} />
          <Route path="/privacy/:settingKey/:exceptionType" element={<Guard><UserPickerPage /></Guard>} />
          <Route path="/data-storage" element={<Guard><DataStoragePage /></Guard>} />
          <Route path="/devices" element={<Guard><DevicesPage /></Guard>} />
          <Route path="/archive" element={<Guard><ArchivePage /></Guard>} />
          <Route path="/add-contact" element={<Guard><AddContactPage /></Guard>} />
          <Route path="/favorites" element={<Guard><FavoritesPage /></Guard>} />
          <Route path="/admin" element={<Guard><AdminPage /></Guard>} />
          <Route path="/support" element={<Guard><SupportPage /></Guard>} />
          <Route path="/support-agent" element={<Guard><SupportAgentPage /></Guard>} />

          <Route path="*" element={<Navigate to="/chats" replace />} />
        </Routes>
      </Suspense>

      {auth.isAuthenticated && <BottomNav />}
      {auth.isAuthenticated && <NotificationBanners />}
      <AppSnackbar />
    </Box>
  );
}
