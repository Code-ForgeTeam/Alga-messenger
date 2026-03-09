import {
  Avatar,
  Box,
  Divider,
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

  return (
    <Box sx={{ p: 1.5, height: '100%', overflowY: 'auto' }}>
      <Paper elevation={0} sx={{ p: 1.5, mb: 1.2, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
          <Typography variant="h6" sx={{ fontWeight: 700, ml: 1, flex: 1 }}>Настройки</Typography>
          <IconButton onClick={() => navigate('/edit-profile')}><EditIcon /></IconButton>
        </Box>

        <Box sx={{ textAlign: 'center', pb: 1 }}>
          <Avatar src={user?.avatar} sx={{ width: 94, height: 94, mx: 'auto', mb: 1, bgcolor: 'primary.main' }}>
            {(user?.fullName || user?.username || 'A').slice(0, 1).toUpperCase()}
          </Avatar>
          <Typography fontWeight={700}>{user?.fullName || 'Пользователь'}</Typography>
          <Typography color="text.secondary">@{user?.username || 'username'}</Typography>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', mb: 1.2 }}>
        <Typography sx={{ px: 2, pt: 1.5, pb: 0.5, color: 'text.secondary', fontSize: 13 }}>ОСНОВНЫЕ</Typography>
        <List disablePadding>
          <ListItemButton onClick={() => push({ message: 'Скоро добавим расширенные настройки чата.', timeout: 2200 })} sx={{ py: 1.25 }}>
            <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}><ChatBubbleOutlineRoundedIcon /></ListItemIcon>
            <ListItemText primary="Настройки чата" primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }} />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/privacy')} sx={{ py: 1.25 }}>
            <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}><LockOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Конфиденциальность" primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }} />
          </ListItemButton>
          <ListItemButton onClick={() => push({ message: 'Панель уведомлений в доработке.', timeout: 2200 })} sx={{ py: 1.25 }}>
            <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}><NotificationsNoneRoundedIcon /></ListItemIcon>
            <ListItemText primary="Уведомления" primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }} />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/data-storage')} sx={{ py: 1.25 }}>
            <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}><StorageRoundedIcon /></ListItemIcon>
            <ListItemText primary="Данные и хранилище" primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }} />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/devices')} sx={{ py: 1.25 }}>
            <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}><DevicesRoundedIcon /></ListItemIcon>
            <ListItemText primary="Устройства" primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }} />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/special-features')} sx={{ py: 1.25 }}>
            <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}><AutoAwesomeRoundedIcon /></ListItemIcon>
            <ListItemText primary="Спец. возможности" primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }} />
          </ListItemButton>
        </List>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Typography sx={{ px: 2, pt: 1.5, pb: 0.5, color: 'text.secondary', fontSize: 13 }}>ПРИЛОЖЕНИЕ</Typography>
        <List disablePadding>
          <ListItemButton onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} sx={{ py: 1.25 }}>
            <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}><PaletteOutlinedIcon /></ListItemIcon>
            <ListItemText
              primary={theme === 'dark' ? 'Тема: Тёмная' : 'Тема: Светлая'}
              primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
            />
          </ListItemButton>
          <ListItemButton onClick={() => push({ message: 'Alga v1.0.0', timeout: 2200 })} sx={{ py: 1.25 }}>
            <ListItemIcon sx={{ minWidth: 38, color: 'text.secondary' }}><InfoOutlinedIcon /></ListItemIcon>
            <ListItemText primary="О приложении" primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }} />
          </ListItemButton>
        </List>

        <Divider />

        <List disablePadding>
          <ListItemButton onClick={logout} sx={{ py: 1.25 }}>
            <ListItemIcon sx={{ minWidth: 38, color: 'error.main' }}><LogoutRoundedIcon /></ListItemIcon>
            <ListItemText primary="Выйти" primaryTypographyProps={{ color: 'error.main', fontSize: 15, fontWeight: 600 }} />
          </ListItemButton>
        </List>
      </Paper>
    </Box>
  );
}
