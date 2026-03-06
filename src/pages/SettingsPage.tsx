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
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';
import { useAuthStore } from '../stores/authStore';

export default function SettingsPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const { theme, bgEffect } = useSettingsStore();

  return (
    <Box sx={{ p: 1.5, height: '100%', overflowY: 'auto' }}>
      <Paper elevation={0} sx={{ borderRadius: 0, p: 1.5, mb: 1.2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
          <Typography variant="h5" sx={{ fontWeight: 700, ml: 1, flex: 1 }}>Настройки</Typography>
          <IconButton onClick={() => navigate('/edit-profile')}><EditIcon /></IconButton>
        </Box>

        <Box sx={{ textAlign: 'center', pb: 1, position: 'relative' }}>
          <Avatar sx={{ width: 120, height: 120, mx: 'auto', mb: 1, bgcolor: 'primary.main', fontSize: 42 }}>
            {(user?.fullName || user?.username || 'A').slice(0, 1).toUpperCase()}
          </Avatar>
          <Typography variant="h4" fontWeight={700} sx={{ fontSize: 42 }}>{user?.fullName || 'BVE'}</Typography>
          <Typography color="primary.main" sx={{ fontSize: 18 }}>в сети</Typography>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, mb: 1.2 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.5 }}>АККАУНТ</Typography>
        <Typography sx={{ fontSize: 34 }}>@{user?.username || 'AlfaCode'}</Typography>
        <Typography color="text.secondary">Имя пользователя</Typography>
        <Divider sx={{ my: 1.5 }} />
        <Typography sx={{ fontSize: 30 }}>{String(user?.id || '51...')}</Typography>
        <Typography color="text.secondary">ID</Typography>
        <Divider sx={{ my: 1.5 }} />
        <Typography sx={{ fontSize: 30 }}>{user?.bio || 'Не указано'}</Typography>
        <Typography color="text.secondary">О себе</Typography>
      </Paper>

      <Paper elevation={0} sx={{ mb: 1.2 }}>
        <List>
          <ListItemButton onClick={() => navigate('/settings')}>
            <ListItemIcon><ChatBubbleOutlineRoundedIcon /></ListItemIcon>
            <ListItemText primary="Настройки чата" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => navigate('/privacy')}>
            <ListItemIcon><LockOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Конфиденциальность" />
          </ListItemButton>
          <Divider />
          <ListItemButton>
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
          <ListItemButton>
            <ListItemIcon><LanguageRoundedIcon /></ListItemIcon>
            <ListItemText primary="Язык" />
            <Typography color="primary.main">Русский</Typography>
          </ListItemButton>
          <Divider />
          <ListItemButton>
            <ListItemIcon><PaletteOutlinedIcon /></ListItemIcon>
            <ListItemText primary="Оформление" />
            <Typography color="primary.main">{theme === 'dark' ? 'Тёмная' : 'Светлая'}</Typography>
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={() => navigate('/devices')}>
            <ListItemIcon><AutoAwesomeRoundedIcon /></ListItemIcon>
            <ListItemText primary="Эффекты" />
            <Typography color="primary.main">{bgEffect === 'snow' ? 'Снегопад' : 'Откл.'}</Typography>
          </ListItemButton>
        </List>
      </Paper>

      <Paper elevation={0}>
        <List>
          <ListItemButton>
            <ListItemIcon><InfoOutlinedIcon /></ListItemIcon>
            <ListItemText primary="О приложении" secondary="Alga v1.0.0" />
          </ListItemButton>
          <Divider />
          <ListItemButton onClick={logout}>
            <ListItemIcon><LogoutRoundedIcon color="error" /></ListItemIcon>
            <ListItemText primary="Выйти" primaryTypographyProps={{ color: 'error.main' }} />
          </ListItemButton>
        </List>
      </Paper>
    </Box>
  );
}
