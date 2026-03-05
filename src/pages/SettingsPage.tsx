import {
  Avatar,
  Box,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import PaletteIcon from '@mui/icons-material/Palette';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import StorageIcon from '@mui/icons-material/Storage';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';
import { useAuthStore } from '../stores/authStore';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { theme, setTheme, glowMode, setGlowMode, bgEffect, setBgEffect } = useSettingsStore();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const items = [
    { label: 'Профиль', icon: <PersonIcon />, path: '/edit-profile' },
    { label: 'Конфиденциальность', icon: <SecurityIcon />, path: '/privacy' },
    { label: 'Оформление', icon: <PaletteIcon />, path: '/settings' },
    { label: 'Спец возможности', icon: <AccessibilityNewIcon />, path: '/devices' },
    { label: 'Данные и память', icon: <StorageIcon />, path: '/data-storage' },
    { label: 'Поддержка', icon: <SupportAgentIcon />, path: '/support' },
  ];

  return (
    <Box sx={{ p: 1.5, height: '100%', overflowY: 'auto' }}>
      <Typography variant="h6" sx={{ px: 1, mb: 1.5 }}>Настройки</Typography>

      <Paper elevation={0} sx={{ borderRadius: 3, p: 1.5, mb: 1.5, backgroundColor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ width: 46, height: 46, bgcolor: 'primary.main' }}>
            {(user?.fullName || user?.username || 'A').slice(0, 1).toUpperCase()}
          </Avatar>
          <Box>
            <Typography fontWeight={600}>{user?.fullName || 'Alga user'}</Typography>
            <Typography variant="body2" color="text.secondary">@{user?.username || 'username'}</Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, px: 1.5, mb: 1.5 }}>
        <FormControlLabel
          control={<Switch checked={theme === 'dark'} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />}
          label="Тёмная тема"
        />
        <FormControlLabel
          control={<Switch checked={glowMode} onChange={(e) => setGlowMode(e.target.checked)} />}
          label="Свечение чатов"
        />
        <FormControlLabel
          control={<Switch checked={bgEffect === 'snow'} onChange={(e) => setBgEffect(e.target.checked ? 'snow' : 'none')} />}
          label="Эффект снега"
        />
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3 }}>
        <List>
          {items.map((item) => (
            <ListItemButton key={item.label} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
          <ListItemButton onClick={logout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Выйти" />
          </ListItemButton>
        </List>
      </Paper>
    </Box>
  );
}
