import { Box, Paper, Typography } from '@mui/material';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import { AppHeader } from '../components/AppHeader';

export default function DevicesPage() {
  return (
    <Box sx={{ p: 2, height: '100%', overflowY: 'auto' }}>
      <AppHeader title="Устройства" />

      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, mb: 1.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Здесь отображаются сеансы, как в Telegram: текущее устройство и другие активные входы.
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center', mb: 1.2 }}>
          <PhoneAndroidRoundedIcon color="primary" />
          <Box>
            <Typography fontWeight={700}>Это устройство (Android)</Typography>
            <Typography variant="body2" color="text.secondary">Сейчас онлайн · Безопасный вход</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center', opacity: 0.75 }}>
          <DesktopWindowsRoundedIcon color="disabled" />
          <Box>
            <Typography fontWeight={600}>Другие устройства</Typography>
            <Typography variant="body2" color="text.secondary">Пока нет активных сеансов</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
