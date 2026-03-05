import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useAuthStore((s) => s.user);
  const isAdmin = ['2'].includes(String(user?.id || ''));

  const tabs = [
    { path: '/chats', label: 'Чаты', icon: <ChatIcon /> },
    { path: '/contacts', label: 'Контакты', icon: <ContactsIcon /> },
    { path: '/settings', label: 'Настройки', icon: <SettingsIcon /> },
    ...(isAdmin ? [{ path: '/admin', label: 'Админ', icon: <AdminPanelSettingsIcon /> }] : []),
  ];

  const value = tabs.findIndex((t) => t.path === pathname);
  if (value < 0) return null;

  return (
    <Paper sx={{ position: 'fixed', left: 12, right: 12, bottom: 12, borderRadius: 6, overflow: 'hidden' }} elevation={8}>
      <BottomNavigation value={value} onChange={(_, v) => navigate(tabs[v].path)} showLabels>
        {tabs.map((tab) => (
          <BottomNavigationAction key={tab.path} label={tab.label} icon={tab.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
