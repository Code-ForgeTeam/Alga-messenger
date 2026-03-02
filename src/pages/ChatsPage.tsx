import { useEffect } from 'react';
import { Box, CircularProgress, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../stores/chatStore';

export default function ChatsPage() {
  const navigate = useNavigate();
  const { chats, isLoading, loadChats } = useChatStore();

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  if (isLoading) {
    return <Box sx={{ p: 4, display: 'grid', placeItems: 'center' }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h6" sx={{ p: 1 }}>Чаты</Typography>
      <List>
        {chats.map((chat) => (
          <ListItemButton key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)}>
            <ListItemText
              primary={chat.name || chat.participants?.[0]?.fullName || 'Чат'}
              secondary={chat.lastMessageText || 'Без сообщений'}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
