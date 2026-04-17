import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNotificationStore } from '../stores/notificationStore';
import { MoonBadge } from './MoonBadge';

export function NotificationBanners() {
  const { banners, dismissBanner } = useNotificationStore();
  const [closingIds, setClosingIds] = useState<Record<string, boolean>>({});
  const timersRef = useRef<Record<string, number>>({});
  const list = Array.isArray(banners) ? banners : [];

  const closeBanner = (id: string) => {
    if (closingIds[id]) return;
    const timer = timersRef.current[id];
    if (timer) {
      window.clearTimeout(timer);
      delete timersRef.current[id];
    }

    setClosingIds((prev) => ({ ...prev, [id]: true }));
    window.setTimeout(() => {
      dismissBanner(id).catch(() => null);
      setClosingIds((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 260);
  };

  useEffect(() => {
    const activeIds = new Set(list.map((banner) => banner.id));
    Object.keys(timersRef.current).forEach((id) => {
      if (!activeIds.has(id)) {
        window.clearTimeout(timersRef.current[id]);
        delete timersRef.current[id];
      }
    });

    list.forEach((banner) => {
      if (closingIds[banner.id]) return;
      if (timersRef.current[banner.id]) return;

      const duration = Math.max(2000, Math.min(15000, Number(banner.durationMs ?? 5000)));
      timersRef.current[banner.id] = window.setTimeout(() => {
        closeBanner(banner.id);
      }, duration);
    });
  }, [list, closingIds]);

  useEffect(
    () => () => {
      Object.values(timersRef.current).forEach((timer) => window.clearTimeout(timer));
      timersRef.current = {};
    },
    [],
  );

  if (!list.length) return null;

  return (
    <Box sx={{
      position: 'fixed',
      left: 'max(env(safe-area-inset-left), 10px)',
      top: 'calc(max(env(safe-area-inset-top), 8px) + 6px)',
      width: 'min(360px, calc(100vw - 20px))',
      zIndex: 1300,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}>
      {list.map((b) => (
        <Box key={b.id} sx={{
          borderRadius: 2,
          p: 1.5,
          display: 'flex',
          gap: 1,
          bgcolor: b.bgColor || '#1E2A3A',
          color: b.textColor || '#fff',
          boxShadow: '0 12px 28px rgba(0,0,0,0.24)',
          animation: `${closingIds[b.id] ? 'bannerSlideOut' : 'bannerSlideIn'} ${closingIds[b.id] ? 260 : 280}ms ease forwards`,
          '@keyframes bannerSlideIn': {
            '0%': { opacity: 0, transform: 'translateX(-32px)' },
            '100%': { opacity: 1, transform: 'translateX(0)' },
          },
          '@keyframes bannerSlideOut': {
            '0%': { opacity: 1, transform: 'translateX(0)' },
            '100%': { opacity: 0, transform: 'translateX(-32px)' },
          },
        }}>
          <Box sx={{ pt: 0.15 }}>
            <MoonBadge size={18} />
          </Box>
          <Box sx={{ flex: 1 }}>
            {!!b.title && <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{b.title}</Typography>}
            {!!b.message && <Typography sx={{ opacity: 0.85, fontSize: 12 }}>{b.message}</Typography>}
          </Box>
          <IconButton size="small" onClick={() => closeBanner(b.id)} sx={{ color: 'inherit' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}
