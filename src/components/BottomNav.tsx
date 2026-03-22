import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useTheme } from '@mui/material/styles';

export function BottomNav() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAuthStore((s) => s.user);
  const isAdmin = ['2'].includes(String(user?.id || ''));

  const tabs = [
    { path: '/chats', label: 'Чаты', icon: <ChatBubbleOutlineRoundedIcon /> },
    { path: '/contacts', label: 'Контакты', icon: <Groups2RoundedIcon /> },
    { path: '/settings', label: 'Настройки', icon: <SettingsRoundedIcon /> },
    ...(isAdmin ? [{ path: '/admin', label: 'Админ', icon: <AdminPanelSettingsIcon /> }] : []),
  ];

  const value = tabs.findIndex((t) => t.path === pathname);
  if (value < 0) return null;

  return (
    <Paper
      sx={{
        position: 'fixed',
        left: 'max(env(safe-area-inset-left), 16px)',
        right: 'max(env(safe-area-inset-right), 16px)',
        bottom: 'max(env(safe-area-inset-bottom), 14px)',
        borderRadius: 99,
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        bgcolor: isDark ? 'rgba(23,33,43,0.95)' : 'rgba(252,252,255,0.92)',
      }}
      elevation={8}
    >
      <BottomNavigation
        value={value}
        onChange={(_, v) => navigate(tabs[v].path)}
        showLabels
        sx={{
          height: 74,
          '& .MuiBottomNavigationAction-root': {
            color: isDark ? '#95A2B3' : '#7AA08B',
            minWidth: 64,
          },
          '& .MuiBottomNavigationAction-label': { fontSize: 12 },
          '& .MuiBottomNavigationAction-root.Mui-selected': { color: isDark ? '#7D6AE3' : '#1FA35B' },
          bgcolor: 'transparent',
        }}
      >
        {tabs.map((tab) => (
          <BottomNavigationAction key={tab.path} label={tab.label} icon={tab.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
