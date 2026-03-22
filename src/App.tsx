import { lazy, Suspense, useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthPage } from './components/AuthPage';
import { AppSnackbar } from './components/AppSnackbar';
import { BottomNav } from './components/BottomNav';
import { NotificationBanners } from './components/NotificationBanners';
import { APP_VERSION_CODE } from './lib/config';
import {
  checkGithubApkUpdate,
  markUpdatePromptDismissed,
  shouldShowUpdatePrompt,
  type ApkUpdateInfo,
} from './lib/updateChecker';
import { useAuthStore } from './stores/authStore';
import { useChatStore } from './stores/chatStore';
import { useNotificationStore } from './stores/notificationStore';
import { useSettingsStore } from './stores/settingsStore';

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
const SpecialFeaturesPage = lazy(() => import('./pages/SpecialFeaturesPage'));
const ArchivePage = lazy(() => import('./pages/ArchivePage'));
const AddContactPage = lazy(() => import('./pages/AddContactPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const SupportPage = lazy(() => import('./pages/SupportPage'));
const SupportAgentPage = lazy(() => import('./pages/SupportAgentPage'));

function BackgroundEffects({
  effect,
  intensity = 100,
}: {
  effect: 'none' | 'snow' | 'leaves' | 'flowers' | 'rain';
  intensity?: number;
}) {
  if (effect === 'none') return null;

  const config =
    effect === 'snow'
      ? { symbol: '\u2744', count: 28, color: 'primary.main', sizeBase: 10 }
      : effect === 'leaves'
        ? { symbol: '\u273F', count: 20, color: 'primary.light', sizeBase: 13 }
        : effect === 'flowers'
          ? { symbol: '\u273E', count: 18, color: 'primary.light', sizeBase: 14 }
          : { symbol: '\u2022', count: 34, color: '#7EB6E8', sizeBase: 12 };

  const count = Math.max(8, Math.round((config.count * intensity) / 100));

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        '@keyframes fall': {
          '0%': { transform: 'translateY(-12vh) translateX(0)', opacity: 0 },
          '20%': { opacity: 0.65 },
          '100%': { transform: 'translateY(110vh) translateX(8px)', opacity: 0 },
        },
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={`${effect}-${i}`}
          sx={{
            position: 'absolute',
            top: '-12vh',
            left: `${(i * 11) % 100}%`,
            fontSize: `${config.sizeBase + (i % 4) * 4}px`,
            color: config.color,
            opacity: 0.55,
            animation: `fall ${6 + (i % 7)}s linear infinite`,
            animationDelay: `${(i % 10) * 0.5}s`,
            filter: effect === 'rain' ? 'blur(0.2px)' : 'none',
          }}
        >
          {config.symbol}
        </Box>
      ))}
    </Box>
  );
}

function Guard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
}

export default function App() {
  const auth = useAuthStore();
  const chatStore = useChatStore();
  const loadBanners = useNotificationStore((s) => s.loadBanners);
  const { bgEffect, effectIntensity, glowMode } = useSettingsStore();
  const { pathname } = useLocation();
  const isChatRoute = pathname.startsWith('/chat/');

  const [apkUpdate, setApkUpdate] = useState<ApkUpdateInfo | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  useEffect(() => {
    auth.checkAuth();
  }, []);

  useEffect(() => {
    let active = true;

    checkGithubApkUpdate().then((info) => {
      if (!active || !info) return;
      if (!shouldShowUpdatePrompt(info)) return;
      setApkUpdate(info);
      setShowUpdateDialog(true);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!auth.isAuthenticated) return;
    chatStore.initSocketHandlers();
    chatStore.loadChats();
    useSettingsStore.getState().loadPrivacyFromServer();
    loadBanners(APP_VERSION_CODE);
  }, [auth.isAuthenticated]);

  const dismissUpdateDialog = () => {
    if (apkUpdate) {
      markUpdatePromptDismissed(apkUpdate);
    }
    setShowUpdateDialog(false);
  };

  const downloadUpdate = () => {
    if (apkUpdate) {
      markUpdatePromptDismissed(apkUpdate);
      window.open(apkUpdate.downloadUrl || apkUpdate.htmlUrl, '_blank', 'noopener,noreferrer');
    }
    setShowUpdateDialog(false);
  };

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
      <BackgroundEffects effect={bgEffect} intensity={effectIntensity} />

      <Suspense
        fallback={<Box sx={{ p: 4, display: 'grid', placeItems: 'center', position: 'relative', zIndex: 1 }}><CircularProgress /></Box>}
      >
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
          <Route path="/special-features" element={<Guard><SpecialFeaturesPage /></Guard>} />
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

      <Dialog open={showUpdateDialog} onClose={dismissUpdateDialog} fullWidth maxWidth="xs">
        <DialogTitle>Доступно обновление</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary">
            В репозитории найден файл APK ({apkUpdate?.name || 'Alga.apk'}). Обновить приложение сейчас?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={dismissUpdateDialog}>Позже</Button>
          <Button onClick={downloadUpdate} variant="contained">Скачать</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}