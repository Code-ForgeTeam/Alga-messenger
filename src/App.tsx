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
import { useAdminStore } from './stores/adminStore';
import { useChatStore } from './stores/chatStore';
import { useNotificationStore } from './stores/notificationStore';
import { useSettingsStore } from './stores/settingsStore';

const ChatsPage = lazy(() => import('./pages/ChatsPage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const ChatSettingsPage = lazy(() => import('./pages/ChatSettingsPage'));
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

type IntroTarget = {
  left: number;
  top: number;
  width: number;
  height: number;
  fontSize: number;
  lineHeight: number;
};

const DEFAULT_INTRO_TARGET: IntroTarget = {
  left: 96,
  top: 54,
  width: 68,
  height: 26,
  fontSize: 20,
  lineHeight: 24,
};

const INTRO_HOLD_MS = 3000;
const INTRO_FLY_MS = 1000;
const INTRO_FADE_MS = 380;
const INTRO_TOTAL_MS = INTRO_HOLD_MS + INTRO_FLY_MS + INTRO_FADE_MS;
const INTRO_HOLD_PCT = (INTRO_HOLD_MS / INTRO_TOTAL_MS) * 100;
const INTRO_FLY_END_PCT = ((INTRO_HOLD_MS + INTRO_FLY_MS) / INTRO_TOTAL_MS) * 100;

function LaunchIntro({
  active,
  target,
}: {
  active: boolean;
  target: IntroTarget;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  if (!active) return null;

  const startScale = 2.55;
  const finalOffsetX = -8;
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 390;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 844;
  const shiftX = viewportWidth / 2 - target.left - (target.width * startScale) / 2;
  const shiftY = viewportHeight / 2 - target.top - (target.height * startScale) / 2;
  const bveBaseX = viewportWidth / 2;
  const bveBaseY = viewportHeight / 2 + Math.max(26, target.height * 1.6);
  const sparkleX = target.left + target.width - 2;
  const sparkleY = target.top - 6;
  const sparkleDelay = INTRO_HOLD_MS + INTRO_FLY_MS - 120;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 4000,
        overflow: 'hidden',
        bgcolor: isDark ? '#061124' : '#F4FBF6',
        '@keyframes introFadeOut': {
          '0%, 91%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        '@keyframes algaExactDock': {
          [`0%, ${INTRO_HOLD_PCT}%`]: {
            transform: `translate(${shiftX}px, ${shiftY}px) scale(${startScale})`,
            opacity: 1,
          },
          [`${INTRO_FLY_END_PCT}%`]: {
            transform: `translate(${finalOffsetX}px, 0px) scale(1.04)`,
            opacity: 1,
          },
          '100%': {
            transform: `translate(${finalOffsetX}px, 0px) scale(1)`,
            opacity: 1,
          },
        },
        '@keyframes bveVanishCenter': {
          [`0%, ${INTRO_HOLD_PCT}%`]: {
            opacity: 0.98,
            transform: 'translate(-50%, -50%) scale(1)',
            filter: 'blur(0px)',
          },
          [`${Math.min(INTRO_HOLD_PCT + 4, 90)}%`]: {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.72)',
            filter: 'blur(4px)',
          },
          '100%': {
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.72)',
            filter: 'blur(4px)',
          },
        },
        '@keyframes sparkle': {
          '0%': { opacity: 0, transform: 'scale(0.2) rotate(0deg)' },
          '42%': { opacity: 1, transform: 'scale(1.12) rotate(24deg)' },
          '100%': { opacity: 0, transform: 'scale(0.1) rotate(52deg)' },
        },
        animation: `introFadeOut ${INTRO_TOTAL_MS}ms ease forwards`,
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
          top: target.top,
          left: target.left,
          transform: 'translate(0, 0)',
          animation: `algaExactDock ${INTRO_TOTAL_MS}ms cubic-bezier(0.2, 0.84, 0.24, 1) forwards`,
        }}
      >
        <Typography
          sx={{
            fontSize: `${target.fontSize}px`,
            lineHeight: `${target.lineHeight}px`,
            fontWeight: 800,
            letterSpacing: 0,
            color: theme.palette.text.primary,
            textShadow: isDark ? '0 5px 18px rgba(66,129,219,0.32)' : '0 5px 18px rgba(31,163,91,0.26)',
            transformOrigin: 'left top',
          }}
        >
          Alga
        </Typography>
      </Box>

      {(['B', 'V', 'E'] as const).map((letter, idx) => (
        <Typography
          key={letter}
          sx={{
            position: 'absolute',
            top: bveBaseY,
            left: bveBaseX,
            transform: 'translate(-50%, -50%)',
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 1.4,
            color: isDark ? 'rgba(214,231,255,0.94)' : 'rgba(23,103,63,0.88)',
            ml: idx === 0 ? -1.2 : idx === 1 ? 0 : 1.2,
            animation: `bveVanishCenter ${INTRO_TOTAL_MS}ms ease forwards`,
          }}
        >
          {letter}
        </Typography>
      ))}

      <Box
        sx={{
          position: 'absolute',
          width: 18,
          height: 18,
          left: sparkleX,
          top: sparkleY,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0) 72%)',
          opacity: 0,
          animation: `sparkle 420ms ease ${sparkleDelay}ms forwards`,
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
  const checkAdminAccess = useAdminStore((s) => s.checkAdminAccess);
  const setAdminAccess = useAdminStore((s) => s.setAdminAccess);
  const resetAdminAccess = useAdminStore((s) => s.reset);
  const initSocketHandlers = useChatStore((s) => s.initSocketHandlers);
  const loadChats = useChatStore((s) => s.loadChats);
  const loadBanners = useNotificationStore((s) => s.loadBanners);
  const { bgEffect, effectIntensity, glowMode, launchIntroEnabled } = useSettingsStore();
  const { pathname } = useLocation();
  const isChatRoute = pathname.startsWith('/chat/');

  const [apkUpdate, setApkUpdate] = useState<ApkUpdateInfo | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showLaunchIntro, setShowLaunchIntro] = useState(launchIntroEnabled);
  const [introTarget, setIntroTarget] = useState<IntroTarget>(DEFAULT_INTRO_TARGET);
  const launchIntroOnChats = showLaunchIntro && launchIntroEnabled && pathname === '/chats';

  useEffect(() => {
    auth.checkAuth();
  }, []);

  useEffect(() => {
    const userId = auth.user?.id;
    if (!auth.isAuthenticated || !userId) {
      resetAdminAccess();
      return;
    }
    if (auth.user?.isCreator) {
      setAdminAccess(true, userId);
      return;
    }

    checkAdminAccess(userId, true).catch(() => null);
  }, [
    auth.isAuthenticated,
    auth.user?.id,
    auth.user?.isCreator,
    checkAdminAccess,
    resetAdminAccess,
    setAdminAccess,
  ]);

  useEffect(() => {
    if (!launchIntroEnabled) {
      setShowLaunchIntro(false);
    }
  }, [launchIntroEnabled]);

  useEffect(() => {
    if (!launchIntroOnChats) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      const anchor = document.getElementById('alga-home-anchor');
      attempts += 1;
      if (!anchor) {
        if (attempts > 40) window.clearInterval(timer);
        return;
      }

      const rect = anchor.getBoundingClientRect();
      const style = window.getComputedStyle(anchor);
      const fontSize = Number.parseFloat(style.fontSize || '20') || 20;
      const lineHeightValue = Number.parseFloat(style.lineHeight || '');
      const lineHeight = Number.isFinite(lineHeightValue) ? lineHeightValue : fontSize * 1.2;
      setIntroTarget({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        fontSize,
        lineHeight,
      });
      window.clearInterval(timer);
    }, 45);
    return () => window.clearInterval(timer);
  }, [launchIntroOnChats]);

  useEffect(() => {
    if (!launchIntroOnChats) return;
    const timerId = window.setTimeout(() => {
      setShowLaunchIntro(false);
      window.dispatchEvent(new CustomEvent('alga:intro-finished'));
    }, INTRO_TOTAL_MS + 20);
    return () => window.clearTimeout(timerId);
  }, [launchIntroOnChats]);

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
      <LaunchIntro active={launchIntroOnChats} target={introTarget} />

      <Suspense
        fallback={<Box sx={{ p: 4, display: 'grid', placeItems: 'center', position: 'relative', zIndex: 1 }}><CircularProgress /></Box>}
      >
        <Routes>
          <Route path="/auth" element={auth.isAuthenticated ? <Navigate to="/chats" replace /> : <AuthPage />} />

          <Route path="/chats" element={<Guard><ChatsPage /></Guard>} />
          <Route path="/chat/:chatId" element={<Guard><ChatPage /></Guard>} />
          <Route path="/contacts" element={<Guard><ContactsPage /></Guard>} />
          <Route path="/settings" element={<Guard><SettingsPage /></Guard>} />
          <Route path="/chat-settings" element={<Guard><ChatSettingsPage /></Guard>} />
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
