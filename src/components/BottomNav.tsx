import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ContactsIcon from '@mui/icons-material/Contacts';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation, useNavigate } from 'react-router-dom';

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const value = ['/chats', '/contacts', '/settings'].indexOf(pathname);
  if (value < 0) return null;

  return (
    <Paper sx={{ position: 'fixed', left: 12, right: 12, bottom: 12, borderRadius: 4 }} elevation={8}>
      <BottomNavigation value={value} onChange={(_, v) => navigate(['/chats', '/contacts', '/settings'][v])}>
        <BottomNavigationAction label="Chats" icon={<ChatIcon />} />
        <BottomNavigationAction label="Contacts" icon={<ContactsIcon />} />
        <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
