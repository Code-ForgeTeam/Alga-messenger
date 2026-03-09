import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';
import { useAuthStore } from '../stores/authStore';
import { useSnackbarStore } from '../stores/snackbarStore';

export default function SettingsPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const { theme, setTheme } = useSettingsStore();
  const push = useSnackbarStore((s) => s.push);

  const items = [
    { icon: <ChatBubbleOutlineRoundedIcon />, title: 'Настройки чата', action: () => push({ message: 'Скоро добавим расширенные настройки чата.', timeout: 2200 }) },
    { icon: <LockOutlinedIcon />, title: 'Конфиденциальность', action: () => navigate('/privacy') },
    { icon: <NotificationsNoneRoundedIcon />, title: 'Уведомления', action: () => push({ message: 'Панель уведомлений в доработке.', timeout: 2200 }) },
    { icon: <StorageRoundedIcon />, title: 'Данные и хранилище', action: () => navigate('/data-storage') },
    { icon: <DevicesRoundedIcon />, title: 'Устройства', action: () => navigate('/devices') },
    { icon: <AutoAwesomeRoundedIcon />, title: 'Спец. возможности', action: () => navigate('/special-features') },
    {
      icon: <PaletteOutlinedIcon />,
      title: theme === 'dark' ? 'Тема: Тёмная' : 'Тема: Светлая',
      action: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    },
    { icon: <InfoOutlinedIcon />, title: 'О приложении', action: () => push({ message: 'Alga v1.0.0', timeout: 2200 }) },
  ];

  return (
    <Box sx={{ p: 1.5, height: '100%', overflowY: 'auto' }}>
      <Paper elevation={0} sx={{ p: 1.5, mb: 1.2, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700, ml: 1, flex: 1 }}>Настройки</Typography>
          <IconButton onClick={() => navigate('/edit-profile')}><EditIcon /></IconButton>
        </Box>

        <Box sx={{ textAlign: 'center', pb: 1 }}>
          <Avatar src={user?.avatar} sx={{ width: 90, height: 90, mx: 'auto', mb: 1, bgcolor: 'primary.main' }}>
            {(user?.fullName || user?.username || 'A').slice(0, 1).toUpperCase()}
          </Avatar>
          <Typography fontWeight={700}>{user?.fullName || 'Пользователь'}</Typography>
          <Typography color="text.secondary">@{user?.username || 'username'}</Typography>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <List disablePadding>
          {items.map((item) => (
            <ListItemButton key={item.title} onClick={item.action} sx={{ py: 1.25 }}>
              <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
              />
            </ListItemButton>
          ))}

          <ListItemButton onClick={logout} sx={{ py: 1.25 }}>
            <ListItemIcon sx={{ minWidth: 38, color: 'error.main' }}><LogoutRoundedIcon /></ListItemIcon>
            <ListItemText primary="Выйти" primaryTypographyProps={{ color: 'error.main', fontSize: 15, fontWeight: 600 }} />
          </ListItemButton>
        </List>
      </Paper>
    </Box>
  );
}
