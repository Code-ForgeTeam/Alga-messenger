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
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../stores/chatStore';
import { useContactsStore } from '../stores/contactsStore';
import { useAuthStore } from '../stores/authStore';
import { AppHeader } from '../components/AppHeader';
import { useSnackbarStore } from '../stores/snackbarStore';
import { useTheme } from '@mui/material/styles';
import { useSettingsStore } from '../stores/settingsStore';
import { userApi } from '../lib/api';
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

export default function ChatsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const setTheme = useSettingsStore((s) => s.setTheme);
  const navigate = useNavigate();
  const { chats, isLoading, loadChats } = useChatStore();
  const getContactByUserId = useContactsStore((s) => s.getContactByUserId);
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);
  const logout = useAuthStore((s) => s.logout);
  const pushSnackbar = useSnackbarStore((s) => s.push);
  const [q, setQ] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuItemSx = {
    borderRadius: 2.5,
    px: 1.2,
    py: 1,
    mb: 0.5,
    '& .MuiListItemIcon-root': {
      minWidth: 36,
      color: isDark ? '#AFC1D9' : '#45635A',
    },
    '&:hover': {
      bgcolor: isDark ? 'rgba(143,177,213,0.14)' : 'rgba(31,163,91,0.10)',
    },
  };

  useEffect(() => {
    if (!user?.id) return;
    loadChats();
  }, [loadChats, user?.id]);

  useEffect(() => {
    let active = true;
    if (!user?.id) return;
    if (user.username && user.fullName) return;

    userApi
      .getMe()
      .then((profile) => {
        if (!active) return;
        const username = profile?.username ?? profile?.user_name ?? user.username;
        const fullName = profile?.fullName ?? profile?.full_name ?? profile?.name ?? user.fullName;
        const lastSeen = profile?.lastSeen ?? profile?.last_seen ?? user.lastSeen;

        updateUser({
          username,
          fullName,
          avatar: profile?.avatar ?? user.avatar,
          bio: profile?.bio ?? user.bio,
          status: profile?.status ?? user.status,
          lastSeen,
        });
      })
      .catch(() => null);

    return () => {
      active = false;
    };
  }, [user?.id, user?.username, user?.fullName, user?.avatar, user?.bio, user?.status, user?.lastSeen, updateUser]);

  const visible = useMemo(() => {
    const needle = q.toLowerCase().trim();
    const base = chats.filter((c) => !c.archived && c.type !== 'ai');
    if (!needle) return base;

    return base.filter((chat) => {
      const peer = chat.participants?.find((p) => p.id !== user?.id) || chat.participants?.[0];
      const contactName = peer ? getContactByUserId(peer.id)?.displayName : '';
      const name = chat.name || contactName || peer?.fullName || peer?.username || '';
      return name.toLowerCase().includes(needle);
    });
  }, [chats, q, getContactByUserId, user?.id]);

  const openSavedFromDrawer = async () => {
    setDrawerOpen(false);
    try {
      let saved = chats.find((c) => c.type === 'saved');

      if (!saved) {
        await loadChats();
        saved = useChatStore.getState().chats.find((c) => c.type === 'saved');
      }

      if (saved) {
        navigate(`/chat/${saved.id}`);
        return;
      }
    } catch {
      // fallback below
    }

    navigate('/favorites');
  };

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
        placeholder="Поиск по чатам"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: isDark ? 'rgba(26,40,56,0.95)' : '#F5F7F8' } }}
      />

      <List sx={{ mt: 1 }}>
        {visible.map((chat) => {
          const name = getChatName(chat, user?.id);
          const subtitle = chat.lastMessageText || (chat.type === 'saved' ? 'Сообщения самому себе' : '');
          const date = formatChatDate(chat.lastMessageTime || chat.updatedAt);
          const avatarData = getChatAvatar(chat, user?.id);
          const unreadCount = Math.max(0, Number(chat.unreadCount || 0));
          const hasUnread = unreadCount > 0;
          const ownLastMessage = chat.lastMessage?.userId === user?.id;
          const lastMessageStatus = chat.lastMessage?.status;
          const isLastReadByPeer = lastMessageStatus === 'read';
          const isLastSent = lastMessageStatus === 'sent' || lastMessageStatus === 'delivered';

          return (
            <ListItemButton
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              sx={{
                borderBottom: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#E6EBEF',
                py: 1.2,
                borderRadius: 2.4,
                mb: 0.45,
                bgcolor: hasUnread
                  ? isDark
                    ? 'rgba(63,117,166,0.28)'
                    : 'rgba(31,163,91,0.13)'
                  : isDark
                    ? 'transparent'
                    : '#FFFFFF',
              }}
            >
              <Avatar src={avatarData.src} sx={{ mr: 1.5, width: 56, height: 56, bgcolor: chat.type === 'saved' ? '#5E5BF0' : 'primary.main' }}>
                {chat.type === 'saved' ? <BookmarkRoundedIcon sx={{ fontSize: 30 }} /> : avatarData.initial}
              </Avatar>
              <ListItemText
                primary={<Typography fontWeight={hasUnread ? 800 : 700}>{name}</Typography>}
                secondary={<Typography color="text.secondary" noWrap>{subtitle}</Typography>}
              />
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary">{date}</Typography>
                {hasUnread ? (
                  <Box
                    sx={{
                      mt: 0.6,
                      minWidth: 20,
                      height: 20,
                      px: unreadCount > 9 ? 0.6 : 0,
                      borderRadius: 99,
                      display: 'inline-grid',
                      placeItems: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#fff',
                      bgcolor: isDark ? '#3E92E2' : '#1FA35B',
                    }}
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Box>
                ) : ownLastMessage && chat.lastMessageText ? (
                  isLastReadByPeer ? (
                    <DoneAllIcon sx={{ fontSize: 16, color: isDark ? '#73B4FF' : '#1C9C58', mt: 0.5 }} />
                  ) : isLastSent ? (
                    <DoneAllIcon sx={{ fontSize: 16, color: 'text.secondary', mt: 0.5 }} />
                  ) : (
                    <DoneRoundedIcon sx={{ fontSize: 16, color: 'text.secondary', mt: 0.5 }} />
                  )
                ) : null}
              </Box>
            </ListItemButton>
          );
        })}
      </List>

      {!visible.length && <Typography sx={{ p: 2, textAlign: 'center' }} color="text.secondary">Чаты не найдены</Typography>}

      <Fab color="primary" sx={{ position: 'fixed', right: 'max(env(safe-area-inset-right), 24px)', bottom: 'max(env(safe-area-inset-bottom), 106px)', boxShadow: isDark ? '0 10px 24px rgba(125,106,227,0.45)' : '0 10px 24px rgba(31,163,91,0.35)' }} onClick={() => navigate('/add-contact')}>
        <EditIcon />
      </Fab>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 'min(320px, 88vw)', height: '100%', bgcolor: isDark ? '#0E1B2A' : '#F7FAF8' }}>
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
              <Avatar src={user?.avatar} onClick={() => { if (user?.id) { navigate(`/user/${user.id}`); setDrawerOpen(false); } }} sx={{ width: 58, height: 58, bgcolor: 'primary.main', flexShrink: 0, cursor: 'pointer' }}>
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

          <Box sx={{ p: 1.5 }}>
            <Box
              sx={{
                borderRadius: 3,
                p: 0.8,
                border: '1px solid',
                borderColor: isDark ? 'rgba(175,193,217,0.18)' : 'rgba(31,163,91,0.2)',
                bgcolor: isDark ? 'rgba(17,33,50,0.75)' : '#FFFFFF',
                boxShadow: isDark ? '0 8px 22px rgba(0,0,0,0.28)' : '0 8px 22px rgba(31,163,91,0.12)',
              }}
            >
              <Typography
                sx={{
                  px: 1.2,
                  pt: 0.6,
                  pb: 0.7,
                  fontSize: 12,
                  letterSpacing: 0.45,
                  textTransform: 'uppercase',
                  color: isDark ? '#8FA8C2' : '#5E7168',
                }}
              >
                Меню
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItemButton sx={menuItemSx} onClick={() => { navigate('/edit-profile'); setDrawerOpen(false); }}>
                  <ListItemIcon><PersonIcon /></ListItemIcon><ListItemText primary="Мой профиль" />
                </ListItemButton>
                <ListItemButton sx={menuItemSx} onClick={() => { navigate('/contacts'); setDrawerOpen(false); }}>
                  <ListItemIcon><Groups2RoundedIcon /></ListItemIcon><ListItemText primary="Контакты" />
                </ListItemButton>
                <ListItemButton sx={menuItemSx} onClick={() => { void openSavedFromDrawer(); }}>
                  <ListItemIcon><BookmarkRoundedIcon /></ListItemIcon><ListItemText primary="Избранное" />
                </ListItemButton>
                <ListItemButton sx={menuItemSx} onClick={() => { navigate('/settings'); setDrawerOpen(false); }}>
                  <ListItemIcon><SettingsRoundedIcon /></ListItemIcon><ListItemText primary="Настройки" />
                </ListItemButton>
                <ListItemButton sx={menuItemSx} onClick={() => { navigate('/support'); setDrawerOpen(false); }}>
                  <ListItemIcon><PsychologyRoundedIcon /></ListItemIcon><ListItemText primary="AI чат" />
                </ListItemButton>
                <ListItemButton
                  sx={{
                    ...menuItemSx,
                    mt: 0.4,
                    mb: 0,
                    '& .MuiTypography-root': { color: '#E44B4B', fontWeight: 600 },
                  }}
                  onClick={() => {
                    setDrawerOpen(false);
                    logout();
                  }}
                >
                  <ListItemText primary="Выйти" />
                </ListItemButton>
              </List>
            </Box>
          </Box>
        </Box>
      </Drawer>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => { pushSnackbar({ message: 'Функция будет добавлена позже.', timeout: 2200 }); setMenuAnchor(null); }}>
          Создать папку чатов
        </MenuItem>
      </Menu>
    </Box>
  );
}

