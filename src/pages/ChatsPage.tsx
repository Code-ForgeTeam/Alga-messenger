import { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Fab, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../stores/chatStore';
import { useContactsStore } from '../stores/contactsStore';

export default function ChatsPage() {
  const navigate = useNavigate();
  const { chats, isLoading, loadChats } = useChatStore();
  const getContactByUserId = useContactsStore((s) => s.getContactByUserId);
  const [q, setQ] = useState('');

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
      <Typography variant="h6" sx={{ p: 1 }}>Alga</Typography>
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

      <Fab color="primary" sx={{ position: 'fixed', right: 16, bottom: 88 }} onClick={() => navigate('/search')}>
        <AddIcon />
      </Fab>
    </Box>
  );
}
