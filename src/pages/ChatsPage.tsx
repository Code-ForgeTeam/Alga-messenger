import { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  CircularProgress,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../stores/chatStore';
import { useContactsStore } from '../stores/contactsStore';
import { useAuthStore } from '../stores/authStore';
import { AppHeader } from '../components/AppHeader';
import { useSnackbarStore } from '../stores/snackbarStore';
import { useTheme } from '@mui/material/styles';
import { useSettingsStore } from '../stores/settingsStore';
import type { Chat } from '../lib/types';

const formatChatDate = (value?: string) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
};

function getChatName(chat: Chat, myId?: string) {
  if (chat.type === 'saved') return 'Избранное';
  if (chat.name?.trim()) return chat.name.trim();
  const peer = chat.participants?.find((p) => p.id !== myId) || chat.participants?.[0];
  return peer?.fullName || (peer?.username ? `@${peer.username}` : 'Чат');
}

function getChatAvatar(chat: Chat, myId?: string) {
  if (chat.type === 'saved') return { initial: 'И', src: undefined as string | undefined };
  const peer = chat.participants?.find((p) => p.id !== myId) || chat.participants?.[0];
  const title = getChatName(chat, myId);
  return { initial: title.slice(0, 1).toUpperCase(), src: chat.avatar || peer?.avatar };
}

function getPeer(chat: Chat, myId?: string) {
  return chat.participants?.find((p) => p.id !== myId) || chat.participants?.[0];
}

function getPeerStatusLabel(chat: Chat, myId?: string) {
  if (chat.type !== 'private') return null;
  const peer = getPeer(chat, myId);
  return peer?.status === 'online' ? 'В сети' : 'Не в сети';
}

export default function ChatsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const setTheme = useSettingsStore((s) => s.setTheme);
  const navigate = useNavigate();
  const { chats, isLoading, loadChats } = useChatStore();
  const getContactByUserId = useContactsStore((s) => s.getContactByUserId);
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const pushSnackbar = useSnackbarStore((s) => s.push);
  const [q, setQ] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const visible = useMemo(() => {
    const needle = q.toLowerCase().trim();
    const base = chats.filter((c) => !c.archived);
    if (!needle) return base;

    return base.filter((chat) => {
      const peer = chat.participants?.find((p) => p.id !== user?.id) || chat.participants?.[0];
      const contactName = peer ? getContactByUserId(peer.id)?.displayName : '';
      const name = chat.name || contactName || peer?.fullName || peer?.username || '';
      return name.toLowerCase().includes(needle);
    });
  }, [chats, q, getContactByUserId, user?.id]);

  if (isLoading) {
    return <Box sx={{ p: 4, display: 'grid', placeItems: 'center' }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: 1.5, height: '100%', overflow: 'auto', bgcolor: isDark ? 'transparent' : '#FFFFFF' }}>
      <AppHeader
        title="Alga"
        showBack={false}
        leftSlot={
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ bgcolor: isDark ? 'rgba(39,57,78,0.75)' : 'rgba(31,163,91,0.12)' }}>
            <Box sx={{ width: 22, display: 'grid', gap: 0.6 }}>
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#2DBB63' }} />
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#FFFFFF', border: '1px solid #D2D7DF' }} />
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#E8443A' }} />
            </Box>
          </IconButton>
        }
        rightSlot={<IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}><MoreVertIcon /></IconButton>}
      />

      <TextField
        fullWidth
        size="small"
        placeholder="Поиск чата"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: isDark ? 'rgba(26,40,56,0.95)' : '#F5F7F8' } }}
      />

      <List sx={{ mt: 1 }}>
        {visible.map((chat) => {
          const name = getChatName(chat, user?.id);
          const statusLabel = getPeerStatusLabel(chat, user?.id);
          const subtitle =
            (statusLabel ? `${statusLabel}${chat.lastMessageText ? ` • ${chat.lastMessageText}` : ''}` : '') ||
            chat.lastMessageText ||
            (chat.type === 'saved' ? 'сообщения самому себе' : '');
          const date = formatChatDate(chat.lastMessageTime || chat.updatedAt);
          const avatarData = getChatAvatar(chat, user?.id);

          return (
            <ListItemButton key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)} sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1.2, bgcolor: isDark ? 'transparent' : '#FFFFFF' }}>
              <Avatar src={avatarData.src} sx={{ mr: 1.5, width: 56, height: 56, bgcolor: chat.type === 'saved' ? '#5E5BF0' : 'primary.main' }}>
                {avatarData.initial}
              </Avatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                    <Typography fontWeight={700}>{name}</Typography>
                    {statusLabel && (
                      <Typography
                        component="span"
                        sx={{
                          fontSize: 12,
                          color: statusLabel === 'В сети' ? 'success.main' : 'text.secondary',
                        }}
                      >
                        {statusLabel}
                      </Typography>
                    )}
                  </Box>
                }
                secondary={<Typography color="text.secondary" noWrap>{subtitle}</Typography>}
              />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary">{date}</Typography>
                {chat.lastMessageText && <DoneAllIcon sx={{ fontSize: 16, color: 'text.secondary', mt: 0.5 }} />}
              </Box>
            </ListItemButton>
          );
        })}
      </List>

      {!visible.length && <Typography sx={{ p: 2, textAlign: 'center' }} color="text.secondary">Пока нет чатов</Typography>}

      <Fab color="primary" sx={{ position: 'fixed', right: 24, bottom: 110, boxShadow: isDark ? '0 10px 24px rgba(125,106,227,0.45)' : '0 10px 24px rgba(31,163,91,0.35)' }} onClick={() => navigate('/add-contact')}>
        <EditIcon />
      </Fab>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 320, height: '100%', bgcolor: isDark ? '#0E1B2A' : '#F7FAF8' }}>
          <Box
            sx={{
              pt: 'max(env(safe-area-inset-top), 12px)',
              px: 2,
              pb: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
              background: isDark ? 'linear-gradient(160deg, #13283D, #0E1B2A)' : 'linear-gradient(160deg, #1FA35B, #22C36A)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center' }}>
              <Avatar src={user?.avatar} sx={{ width: 58, height: 58, bgcolor: 'primary.main', flexShrink: 0 }}>
                {(user?.fullName || user?.username || 'A').slice(0, 1).toUpperCase()}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', fontSize: 18 }} noWrap>
                  {user?.fullName || 'Пользователь'}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }} noWrap>
                  @{user?.username || 'username'}
                </Typography>
              </Box>
              <IconButton
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                size="small"
                sx={{
                  border: '1px solid',
                  borderColor: 'rgba(255,255,255,0.45)',
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.12)',
                  flexShrink: 0,
                }}
              >
                {isDark ? <LightModeOutlinedIcon sx={{ color: '#fff' }} /> : <DarkModeOutlinedIcon sx={{ color: '#fff' }} />}
              </IconButton>
            </Box>
          </Box>

          <List sx={{ pt: 1 }}>
            <ListItemButton onClick={() => { navigate('/edit-profile'); setDrawerOpen(false); }}>
              <ListItemIcon><PersonIcon sx={{ color: 'text.secondary' }} /></ListItemIcon><ListItemText primary="Мой профиль" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/contacts'); setDrawerOpen(false); }}>
              <ListItemIcon><Groups2RoundedIcon sx={{ color: 'text.secondary' }} /></ListItemIcon><ListItemText primary="Контакты" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/favorites'); setDrawerOpen(false); }}>
              <ListItemIcon><BookmarkRoundedIcon sx={{ color: 'text.secondary' }} /></ListItemIcon><ListItemText primary="Избранное" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/settings'); setDrawerOpen(false); }}>
              <ListItemIcon><SettingsRoundedIcon sx={{ color: 'text.secondary' }} /></ListItemIcon><ListItemText primary="Настройки" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/support'); setDrawerOpen(false); }}>
              <ListItemIcon><PsychologyRoundedIcon sx={{ color: 'text.secondary' }} /></ListItemIcon><ListItemText primary="AI" />
            </ListItemButton>
            <ListItemButton onClick={logout}><ListItemText primary="Выйти" primaryTypographyProps={{ color: 'error.main', sx: { ml: 1 } }} /></ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => { pushSnackbar({ message: 'Режим выделения чатов включим следующим шагом.', timeout: 2200 }); setMenuAnchor(null); }}>
          Выделить чаты
        </MenuItem>
      </Menu>
    </Box>
  );
}
