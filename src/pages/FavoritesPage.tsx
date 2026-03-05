import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../stores/chatStore';
import { AppHeader } from '../components/AppHeader';

export default function FavoritesPage() {
  const navigate = useNavigate();
  const favorites = useChatStore((s) => s.chats.filter((c) => c.pinned || c.type === 'saved'));

  return (
    <Box sx={{ p: 2 }}>
      <AppHeader title="Избранное" />

      {favorites.length === 0 ? (
        <Typography color="text.secondary">Пока ничего нет в избранном.</Typography>
      ) : (
        <List>
          {favorites.map((chat) => (
            <ListItemButton key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)}>
              <ListItemText primary={chat.name || 'Чат'} secondary={chat.lastMessageText || ''} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}

