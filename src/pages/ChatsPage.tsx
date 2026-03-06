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
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../stores/chatStore';
import { useContactsStore } from '../stores/contactsStore';
import { useAuthStore } from '../stores/authStore';
import { AppHeader } from '../components/AppHeader';
import { useSnackbarStore } from '../stores/snackbarStore';

export default function ChatsPage() {
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
      const peer = chat.participants?.[0];
      const contactName = peer ? getContactByUserId(peer.id)?.displayName : '';
      const name = chat.name || contactName || peer?.fullName || '';
      return name.toLowerCase().includes(needle);
    });
  }, [chats, q, getContactByUserId]);

  if (isLoading) {
    return <Box sx={{ p: 4, display: 'grid', placeItems: 'center' }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: 1.5, height: '100%', overflow: 'auto' }}>
      <AppHeader
        title="Alga"
        showBack={false}
        leftSlot={
          <IconButton onClick={() => setDrawerOpen(true)}>
            <Box sx={{ width: 20, display: 'grid', gap: 0.5 }}>
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#2DBB63' }} />
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#FFFFFF', border: '1px solid #D2D7DF' }} />
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#E8443A' }} />
            </Box>
          </IconButton>
        }
        rightSlot={
          <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        }
      />

      <TextField
        fullWidth
        size="small"
        placeholder="Поиск чата"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        InputProps={{
          startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} />,
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.75)',
          },
        }}
      />

      <List sx={{ mt: 1 }}>
        {visible.map((chat) => {
          const name = chat.name || chat.participants?.[0]?.fullName || 'Чат';
          const subtitle = chat.lastMessageText || 'Без сообщений';
          const date = (chat.lastMessageTime || chat.updatedAt || '').slice(5, 10).replace('-', '.');
          const initial = (name || 'A').slice(0, 1).toUpperCase();

          return (
            <ListItemButton
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 1.2 }}
            >
              <Avatar sx={{ mr: 1.5, width: 56, height: 56, bgcolor: chat.type === 'saved' ? '#6B5BEE' : '#5A69F6' }}>
                {initial}
              </Avatar>
              <ListItemText
                primary={<Typography fontWeight={700}>{name}</Typography>}
                secondary={<Typography color="text.secondary" noWrap>{subtitle}</Typography>}
              />
              <Typography variant="body2" color="text.secondary">{date || ''}</Typography>
            </ListItemButton>
          );
        })}
      </List>

      {!visible.length && <Typography sx={{ p: 2, textAlign: 'center' }} color="text.secondary">Пока нет чатов</Typography>}

      <Fab color="primary" sx={{ position: 'fixed', right: 24, bottom: 110 }} onClick={() => navigate('/add-contact')}>
        <EditIcon />
      </Fab>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 320 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Avatar sx={{ width: 74, height: 74, bgcolor: 'primary.main' }}>
                  {(user?.fullName || user?.username || 'A').slice(0, 1).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{user?.fullName || 'BVE'}</Typography>
                  <Typography color="text.secondary">@{user?.username || 'AlfaCode'}</Typography>
                </Box>
              </Box>
              <Typography color="text.secondary">☀️</Typography>
            </Box>
          </Box>

          <List sx={{ pt: 1 }}>
            <ListItemButton onClick={() => { navigate('/edit-profile'); setDrawerOpen(false); }}>
              <PersonIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <ListItemText primary="Мой профиль" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/contacts'); setDrawerOpen(false); }}>
              <Groups2RoundedIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <ListItemText primary="Контакты" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/favorites'); setDrawerOpen(false); }}>
              <BookmarkRoundedIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <ListItemText primary="Избранное" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/settings'); setDrawerOpen(false); }}>
              <SettingsRoundedIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <ListItemText primary="Настройки" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/support'); setDrawerOpen(false); }}>
              <SupportAgentRoundedIcon sx={{ mr: 2, color: 'text.secondary' }} />
              <ListItemText primary="Поддержка" />
            </ListItemButton>
            <ListItemButton onClick={logout}>
              <ListItemText primary="Выйти" primaryTypographyProps={{ color: 'error.main' }} />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        <MenuItem
          onClick={() => {
            pushSnackbar({ message: 'Режим выделения чатов включим следующим шагом.', timeout: 2200 });
            setMenuAnchor(null);
          }}
        >
          Выделить чаты
        </MenuItem>
      </Menu>
    </Box>
  );
}
