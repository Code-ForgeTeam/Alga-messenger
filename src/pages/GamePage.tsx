import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { gameApi } from '../lib/api';

type GameMode = 'checking' | 'online' | 'offlinePrompt' | 'offline';

const ONLINE_GAME_URL = String(import.meta.env.VITE_ONLINE_GAME_URL || '').trim();
const OFFLINE_GAME_URL = '/game-offline/index.html';
const ONLINE_LOAD_TIMEOUT_MS = 9000;

const deriveDefaultOnlineGameUrl = (): string => {
  const appHostRaw = String(import.meta.env.VITE_APP_HOST || '').trim();
  if (!appHostRaw) return '';
  const withoutIndex = appHostRaw.replace(/\/index\.php\/?$/i, '');
  if (!withoutIndex) return '';
  return `${withoutIndex}/game/index.html`;
};

export default function GamePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const onlineGameUrl = ONLINE_GAME_URL || deriveDefaultOnlineGameUrl();

  const [mode, setMode] = useState<GameMode>(() => (onlineGameUrl ? 'checking' : 'offlinePrompt'));
  const [resolvedOnlineUrl, setResolvedOnlineUrl] = useState<string>('');
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!onlineGameUrl) {
      setResolvedOnlineUrl('');
      setMode('offlinePrompt');
      return;
    }

    let active = true;
    setMode('checking');
    setResolvedOnlineUrl('');

    gameApi
      .getOnlineStatus()
      .then((payload) => {
        if (!active) return;
        const available = Boolean(payload?.available);
        if (!available) {
          setMode('offlinePrompt');
          return;
        }
        const fromServer = String(payload?.url || '').trim();
        setResolvedOnlineUrl(fromServer || onlineGameUrl);
      })
      .catch(() => {
        if (!active) return;
        setResolvedOnlineUrl(onlineGameUrl);
      });

    return () => {
      active = false;
    };
  }, [onlineGameUrl, reloadKey]);

  useEffect(() => {
    if (mode !== 'checking') return;
    const timer = window.setTimeout(() => {
      setMode((current) => (current === 'checking' ? 'offlinePrompt' : current));
    }, ONLINE_LOAD_TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [mode, reloadKey]);

  return (
    <Box
      sx={{
        p: 1.5,
        pb: 'max(env(safe-area-inset-bottom), 96px)',
        height: '100%',
        overflowY: 'auto',
        bgcolor: isDark ? '#0D1A2E' : '#FFFFFF',
      }}
    >
      <AppHeader title="Игра" />

      {mode === 'offlinePrompt' ? (
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 3,
            border: '1px solid',
            borderColor: isDark ? 'rgba(162,188,216,0.24)' : 'rgba(31,163,91,0.2)',
            bgcolor: isDark ? 'rgba(17,33,50,0.78)' : '#F7FBF8',
          }}
        >
          <Typography sx={{ fontSize: 18, fontWeight: 800, mb: 0.8 }}>
            Не доступно! Хотите играть офлайн?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 1.2 }}>
            Если сервер игры недоступен, можно открыть офлайн-режим.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button variant="contained" onClick={() => setMode('offline')}>
              Да, офлайн
            </Button>
            {onlineGameUrl && (
              <Button variant="outlined" onClick={() => setReloadKey((prev) => prev + 1)}>
                Повторить
              </Button>
            )}
            <Button variant="text" color="inherit" onClick={() => navigate('/chats')}>
              Нет
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Paper
          elevation={0}
          sx={{
            p: 1.1,
            borderRadius: 3,
            border: '1px solid',
            borderColor: isDark ? 'rgba(162,188,216,0.24)' : 'rgba(31,163,91,0.2)',
            bgcolor: isDark ? 'rgba(17,33,50,0.78)' : '#F7FBF8',
          }}
        >
          <Typography sx={{ px: 0.5, pb: 1, fontWeight: 700 }}>
            {mode === 'offline' ? 'Офлайн-режим' : 'Онлайн-режим'}
          </Typography>
          <Box
            sx={{
              position: 'relative',
              minHeight: '80dvh',
              borderRadius: 2.2,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: isDark ? 'rgba(122,172,220,0.26)' : 'rgba(31,163,91,0.24)',
              bgcolor: isDark ? '#081425' : '#F2F8F3',
            }}
          >
            {mode === 'checking' && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'grid',
                  placeItems: 'center',
                  zIndex: 2,
                  bgcolor: isDark ? 'rgba(8,20,37,0.72)' : 'rgba(242,248,243,0.82)',
                }}
              >
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                  <CircularProgress size={26} />
                  <Typography variant="body2" color="text.secondary">
                    Проверяем сервер игры...
                  </Typography>
                </Stack>
              </Box>
            )}

            {(mode === 'offline' || resolvedOnlineUrl) && (
              <Box
                key={`${mode}-${reloadKey}`}
                component="iframe"
                src={mode === 'offline' ? OFFLINE_GAME_URL : resolvedOnlineUrl}
                title={mode === 'offline' ? 'Soyle Offline Game' : 'Soyle Online Game'}
                onLoad={() => {
                  if (mode === 'checking') {
                    setMode('online');
                  }
                }}
                onError={() => {
                  if (mode !== 'offline') {
                    setMode('offlinePrompt');
                  }
                }}
                sx={{
                  width: '100%',
                  height: '80dvh',
                  border: 0,
                  display: 'block',
                }}
              />
            )}
          </Box>
        </Paper>
      )}
    </Box>
  );
}
