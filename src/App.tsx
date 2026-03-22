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
import { useTheme } from '@mui/material/styles';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthPage } from './components/AuthPage';
import { AppSnackbar } from './components/AppSnackbar';
import { BottomNav } from './components/BottomNav';
import { NotificationBanners } from './components/NotificationBanners';
import { APP_VERSION_CODE } from './lib/config';
import { pushApi } from './lib/api';
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
const AuthorSupportPage = lazy(() => import('./pages/AuthorSupportPage'));

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

function LaunchIntro({ active }: { active: boolean }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!active) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 4000,
        overflow: 'hidden',
        bgcolor: isDark ? '#061124' : '#F4FBF6',
        '@keyframes introFadeOut': {
          '0%, 84%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        '@keyframes logoMove': {
          '0%': { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(1)' },
          '100%': {
            top: 'calc(max(env(safe-area-inset-top), 12px) + 35px)',
            left: 'calc(max(env(safe-area-inset-left), 12px) + 122px)',
            transform: 'translate(-50%, -50%) scale(0.78)',
          },
        },
        '@keyframes bveTravel': {
          '0%': { top: 'calc(50% + 40px)', left: '50%', opacity: 0.92, transform: 'translate(-50%, -50%) scale(1)' },
          '72%': {
            top: 'calc(max(env(safe-area-inset-top), 12px) + 37px)',
            left: 'calc(max(env(safe-area-inset-left), 12px) + 184px)',
            opacity: 0.92,
            transform: 'translate(-50%, -50%) scale(0.86)',
          },
          '100%': {
            top: 'calc(max(env(safe-area-inset-top), 12px) + 37px)',
            left: 'calc(max(env(safe-area-inset-left), 12px) + 192px)',
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.78)',
          },
        },
        '@keyframes sparkle': {
          '0%': { opacity: 0, transform: 'scale(0.2) rotate(0deg)' },
          '42%': { opacity: 1, transform: 'scale(1.12) rotate(24deg)' },
          '100%': { opacity: 0, transform: 'scale(0.1) rotate(52deg)' },
        },
        animation: 'introFadeOut 1650ms ease forwards',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'radial-gradient(circle at 46% 44%, rgba(81,142,224,0.24), rgba(5,14,26,0.97))'
            : 'radial-gradient(circle at 46% 44%, rgba(31,163,91,0.22), rgba(242,251,246,0.96))',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'logoMove 1180ms cubic-bezier(0.2, 0.84, 0.24, 1) 80ms forwards',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 46, sm: 56 },
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: 0.4,
            color: isDark ? '#EAF2FF' : '#0E3C2D',
            textShadow: isDark ? '0 10px 32px rgba(74,139,223,0.42)' : '0 10px 28px rgba(31,163,91,0.35)',
          }}
        >
          Alga
        </Typography>
      </Box>

      <Typography
        sx={{
          position: 'absolute',
          top: 'calc(50% + 40px)',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: { xs: 16, sm: 18 },
          fontWeight: 700,
          letterSpacing: 1.8,
          color: isDark ? 'rgba(214,231,255,0.92)' : 'rgba(23,103,63,0.86)',
          animation: 'bveTravel 1240ms cubic-bezier(0.24, 0.88, 0.28, 1) 120ms forwards',
        }}
      >
        BVE
      </Typography>

      <Box
        sx={{
          position: 'absolute',
          width: 18,
          height: 18,
          left: 'calc(max(env(safe-area-inset-left), 12px) + 202px)',
          top: 'calc(max(env(safe-area-inset-top), 12px) + 21px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0) 72%)',
          opacity: 0,
          animation: 'sparkle 420ms ease 1220ms forwards',
        }}
      />
    </Box>
  );
}

function Guard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth" replace />;
}

export default function App() {
  const auth = useAuthStore();
  const initSocketHandlers = useChatStore((s) => s.initSocketHandlers);
  const loadChats = useChatStore((s) => s.loadChats);
  const loadBanners = useNotificationStore((s) => s.loadBanners);
  const { bgEffect, effectIntensity, glowMode } = useSettingsStore();
  const { pathname } = useLocation();
  const isChatRoute = pathname.startsWith('/chat/');

  const [apkUpdate, setApkUpdate] = useState<ApkUpdateInfo | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showLaunchIntro, setShowLaunchIntro] = useState(true);

  useEffect(() => {
    auth.checkAuth();
  }, []);

  useEffect(() => {
    const timerId = window.setTimeout(() => setShowLaunchIntro(false), 1700);
    return () => window.clearTimeout(timerId);
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
    initSocketHandlers();
    loadChats();
    useSettingsStore.getState().loadPrivacyFromServer();
    loadBanners(APP_VERSION_CODE);

    const pollId = window.setInterval(async () => {
      if (!auth.isAuthenticated) return;
      try {
        await loadChats({ silent: true });
        await loadBanners(APP_VERSION_CODE);
      } catch {
        // ignore polling failures
      }
    }, 120000);

    return () => window.clearInterval(pollId);
  }, [auth.isAuthenticated, initSocketHandlers, loadChats, loadBanners]);

  useEffect(() => {
    if (!auth.isAuthenticated) return;

    let disposed = false;
    let removeRegistration: (() => void) | null = null;
    let removeReceived: (() => void) | null = null;
    let removeAction: (() => void) | null = null;

    const initPush = async () => {
      try {
        const [{ Capacitor }, { PushNotifications }] = await Promise.all([
          import('@capacitor/core'),
          import('@capacitor/push-notifications'),
        ]);

        if (Capacitor.getPlatform() === 'web') return;

        const perm = await PushNotifications.checkPermissions();
        const granted = perm.receive === 'granted'
          ? perm
          : await PushNotifications.requestPermissions();
        if (granted.receive !== 'granted' || disposed) return;

        const registrationHandle = await PushNotifications.addListener('registration', async (token) => {
          const value = String(token?.value ?? '').trim();
          if (!value || disposed) return;
          try {
            await pushApi.registerToken(value, Capacitor.getPlatform());
          } catch {
            // ignore registration errors
          }
        });
        removeRegistration = () => registrationHandle.remove();

        const receivedHandle = await PushNotifications.addListener('pushNotificationReceived', () => {
          if (disposed) return;
          loadChats({ silent: true }).catch(() => null);
        });
        removeReceived = () => receivedHandle.remove();

        const actionHandle = await PushNotifications.addListener('pushNotificationActionPerformed', () => {
          if (disposed) return;
          loadChats({ silent: true }).catch(() => null);
        });
        removeAction = () => actionHandle.remove();

        await PushNotifications.register();
      } catch {
        // Push plugin can be unavailable in web/preview environments.
      }
    };

    void initPush();

    return () => {
      disposed = true;
      removeRegistration?.();
      removeReceived?.();
      removeAction?.();
    };
  }, [auth.isAuthenticated, loadChats]);

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
      <LaunchIntro active={showLaunchIntro} />

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
          <Route path="/author-support" element={<Guard><AuthorSupportPage /></Guard>} />

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
