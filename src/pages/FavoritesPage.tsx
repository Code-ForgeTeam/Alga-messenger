import { useEffect, useMemo } from 'react';
import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../stores/chatStore';
import { useAuthStore } from '../stores/authStore';
import { AppHeader } from '../components/AppHeader';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const meId = useAuthStore((s) => s.user?.id);
  const chats = useChatStore((s) => s.chats);
  const loadChats = useChatStore((s) => s.loadChats);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const favorites = useMemo(() => chats.filter((c) => c.pinned || c.type === 'saved'), [chats]);

  const chatTitle = (chat: (typeof favorites)[number]) => {
    if (chat.type === 'saved') return 'Избранное';
    if (chat.name?.trim()) return chat.name;
    const peer = chat.participants?.find((p) => p.id !== meId) || chat.participants?.[0];
    return peer?.fullName || (peer?.username ? `@${peer.username}` : 'Чат');
  };

  return (
    <Box sx={{ p: 2 }}>
      <AppHeader title="Избранное" />

      {favorites.length === 0 ? (
        <Typography color="text.secondary">Пока ничего нет в избранном.</Typography>
      ) : (
        <List>
          {favorites.map((chat) => (
            <ListItemButton key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)}>
              <ListItemText
                primary={chatTitle(chat)}
                secondary={chat.lastMessageText || (chat.type === 'saved' ? 'Сообщения самому себе' : '')}
              />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
