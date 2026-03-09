import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNotificationStore } from '../stores/notificationStore';

export function NotificationBanners() {
  const { banners, dismissBanner } = useNotificationStore();

  if (!Array.isArray(banners) || !banners.length) return null;

  return (
    <Box sx={{
      position: 'fixed',
      left: 12,
      right: 12,
      bottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
      zIndex: 1300,
      display: 'flex',
      flexDirection: 'column',
      gap: 1,
    }}>
      {banners.map((b) => (
        <Box key={b.id} sx={{
          borderRadius: 2,
          p: 1.5,
          display: 'flex',
          gap: 1,
          bgcolor: b.bgColor || '#1E2A3A',
          color: b.textColor || '#fff',
        }}>
          <Box sx={{ flex: 1 }}>
            {!!b.title && <Typography sx={{ fontWeight: 600, fontSize: 13 }}>{b.title}</Typography>}
            {!!b.message && <Typography sx={{ opacity: 0.85, fontSize: 12 }}>{b.message}</Typography>}
          </Box>
          <IconButton size="small" onClick={() => dismissBanner(b.id)} sx={{ color: 'inherit' }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}
