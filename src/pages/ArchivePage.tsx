import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useChatStore } from '../stores/chatStore';

export default function ArchivePage() {
  const navigate = useNavigate();
  const chats = useChatStore((s) => s.chats.filter((c) => c.archived));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Архив</Typography>
      {chats.length === 0 ? (
        <Typography color="text.secondary">Архив пуст</Typography>
      ) : (
        <List>
          {chats.map((chat) => (
            <ListItemButton key={chat.id} onClick={() => navigate(`/chat/${chat.id}`)}>
              <ListItemText primary={chat.name || 'Чат'} secondary={chat.lastMessageText || ''} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
