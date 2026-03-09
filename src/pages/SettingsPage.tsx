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
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';
import { useAuthStore } from '../stores/authStore';
import { useSnackbarStore } from '../stores/snackbarStore';

export default function SettingsPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const { theme, bgEffect, language, setTheme, setBgEffect } = useSettingsStore();
  const push = useSnackbarStore((s) => s.push);

  const cycleEffect = () => {
    const order = ['snow', 'leaves', 'flowers', 'rain', 'none'] as const;
    const currentIdx = order.indexOf(bgEffect as (typeof order)[number]);
    const next = order[(currentIdx + 1) % order.length];
    setBgEffect(next);
  };

  const effectLabel =
    bgEffect === 'snow'
      ? 'Снегопад'
      : bgEffect === 'leaves'
        ? 'Листопад'
        : bgEffect === 'flowers'
          ? 'Цветочки'
          : bgEffect === 'rain'
            ? 'Дождик'
            : 'Выключены';

  return (
    <Box sx={{ p: 1.5, height: '100%', overflowY: 'auto' }}>
      <Paper elevation={0} sx={{ p: 1.5, mb: 1.2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
          <Typography variant="h5" sx={{ fontWeight: 700, ml: 1, flex: 1 }}>Настройки</Typography>
          <IconButton onClick={() => navigate('/edit-profile')}><EditIcon /></IconButton>
        </Box>

        <Box sx={{ textAlign: 'center', pb: 1, position: 'relative' }}>
          <Avatar src={user?.avatar} sx={{ width: 112, height: 112, mx: 'auto', mb: 1, bgcolor: 'primary.main', fontSize: 34 }}>
            {(user?.fullName || user?.username || 'A').slice(0, 1).toUpperCase()}
          </Avatar>
          <Typography variant="h5" fontWeight={700}>{user?.fullName || 'BVE'}</Typography>
          <Typography color="primary.main">в сети</Typography>
          <IconButton onClick={() => navigate('/edit-profile')} sx={{ position: 'absolute', right: 4, top: 58, bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: 'primary.dark' } }}>
            <AddAPhotoRoundedIcon />
          </IconButton>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, mb: 1.2 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.2 }}>АККАУНТ</Typography>
        <Typography>@{user?.username || 'AlfaCode'}</Typography>
        <Typography color="text.secondary">Имя пользователя</Typography>
        <Divider sx={{ my: 1.2 }} />
        <Typography>{String(user?.id || '51...')}</Typography>
        <Typography color="text.secondary">ID</Typography>
        <Divider sx={{ my: 1.2 }} />
        <Typography>{user?.bio || 'Не указано'}</Typography>
        <Typography color="text.secondary">О себе</Typography>
      </Paper>

      <Paper elevation={0} sx={{ mb: 1.2 }}>
        <List>
          <ListItemButton onClick={() => push({ message: 'Настройки чата будут расширены далее.', timeout: 1800 })}>
            <ListItemIcon><ChatBubbleOutlineRoundedIcon /></ListItemIcon>
            <ListItemText primary="Настройки чата" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => navigate('/privacy')}>
            <ListItemIcon><LockOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Конфиденциальность" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => push({ message: 'Уведомления и звуки добавим следующим шагом.', timeout: 1800 })}>
            <ListItemIcon><NotificationsNoneRoundedIcon /></ListItemIcon>
            <ListItemText primary="Уведомления и звуки" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => navigate('/data-storage')}>
            <ListItemIcon><StorageRoundedIcon /></ListItemIcon>
            <ListItemText primary="Данные и хранилище" />
          </ListItemButton>
        </List>
      </Paper>

      <Paper elevation={0} sx={{ mb: 1.2 }}>
        <List>
          <ListItemButton onClick={() => navigate('/devices')}>
            <ListItemIcon><DevicesRoundedIcon /></ListItemIcon>
            <ListItemText primary="Устройства" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => push({ message: 'Русский язык уже активен', timeout: 1600 })}>
            <ListItemIcon><LanguageRoundedIcon /></ListItemIcon>
            <ListItemText primary="Язык" secondary={language === 'ru' ? 'Русский' : 'English'} />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            <ListItemIcon><PaletteOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Оформление" secondary={theme === 'light' ? 'Светлая' : 'Тёмная'} />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={cycleEffect}>
            <ListItemIcon><AutoAwesomeRoundedIcon /></ListItemIcon>
            <ListItemText primary="Эффекты" secondary={effectLabel} />
          </ListItemButton>
        </List>
      </Paper>

      <Paper elevation={0} sx={{ mb: 1.2 }}>
        <List>
          <ListItemButton onClick={() => push({ message: 'Alga v1.0.0', timeout: 1800 })}>
            <ListItemIcon><InfoOutlinedIcon /></ListItemIcon>
            <ListItemText primary="О приложении" secondary="Alga v1.0.0" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={logout}>
            <ListItemIcon><LogoutRoundedIcon sx={{ color: '#D14747' }} /></ListItemIcon>
            <ListItemText primary="Выйти" primaryTypographyProps={{ color: '#C84646' }} />
          </ListItemButton>
        </List>
      </Paper>
    </Box>
  );
}
