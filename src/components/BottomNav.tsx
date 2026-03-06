import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export function BottomNav() {
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
        left: 16,
        right: 16,
        bottom: 16,
        borderRadius: 99,
        overflow: 'hidden',
        backdropFilter: 'blur(6px)',
      }}
      elevation={6}
    >
      <BottomNavigation
        value={value}
        onChange={(_, v) => navigate(tabs[v].path)}
        showLabels
        sx={{
          height: 74,
          '& .MuiBottomNavigationAction-root': { color: '#8A8F98' },
          '& .MuiBottomNavigationAction-root.Mui-selected': { color: 'primary.main' },
          bgcolor: 'rgba(255,255,255,0.96)',
        }}
      >
        {tabs.map((tab) => (
          <BottomNavigationAction key={tab.path} label={tab.label} icon={tab.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
