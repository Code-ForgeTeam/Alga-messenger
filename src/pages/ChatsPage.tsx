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
import AddIcon from '@mui/icons-material/Add';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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

  const archived = chats.filter((c) => c.archived);

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
    <Box sx={{ p: 1, height: '100%', overflow: 'auto' }}>
      <AppHeader
        title="Alga"
        showBack={false}
        leftSlot={
          <IconButton onClick={() => setDrawerOpen(true)}>
            <Box sx={{ width: 18, display: 'grid', gap: 0.45 }}>
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#1FA35B' }} />
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#FFFFFF', border: '1px solid #DDE6E0' }} />
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#E53935' }} />
            </Box>
          </IconButton>
        }
        rightSlot={
          <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
        }
      />

      <Box sx={{ px: 1, pb: 1 }}>
        <TextField fullWidth size="small" placeholder="Поиск чата" value={q} onChange={(e) => setQ(e.target.value)} />
      </Box>

      {archived.length > 0 && !q && (
        <ListItemButton onClick={() => navigate('/archive')}>
          <ArchiveIcon sx={{ mr: 1 }} />
          <ListItemText primary="Архив" secondary={`${archived.length} чатов`} />
        </ListItemButton>
      )}

      <List>
        {visible.map((chat) => (
          <ListItemButton key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)}>
            <ListItemText
              primary={chat.name || chat.participants?.[0]?.fullName || 'Чат'}
              secondary={chat.lastMessageText || 'Без сообщений'}
            />
            {!!chat.unreadCount && <Typography color="primary.main">{chat.unreadCount}</Typography>}
          </ListItemButton>
        ))}
      </List>

      {!visible.length && <Typography sx={{ p: 2 }} color="text.secondary">Пока нет чатов</Typography>}

      <Fab color="primary" sx={{ position: 'fixed', right: 16, bottom: 88 }} onClick={() => navigate('/add-contact')}>
        <AddIcon />
      </Fab>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 290, p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>{(user?.fullName || user?.username || 'A').slice(0, 1).toUpperCase()}</Avatar>
            <Box>
              <ListItemText primary={user?.fullName || 'Alga user'} secondary={`@${user?.username || 'username'}`} />
            </Box>
          </Box>

          <List>
            <ListItemButton onClick={() => { navigate('/settings'); setDrawerOpen(false); }}>
              <ListItemText primary="Настройки" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/favorites'); setDrawerOpen(false); }}>
              <ListItemText primary="Избранное" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/archive'); setDrawerOpen(false); }}>
              <ListItemText primary="Архив" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/support'); setDrawerOpen(false); }}>
              <ListItemText primary="Поддержка" />
            </ListItemButton>
            <ListItemButton onClick={logout}>
              <ListItemText primary="Выйти" />
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
