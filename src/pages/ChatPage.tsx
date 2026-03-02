import { useEffect, useMemo, useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useChatStore } from '../stores/chatStore';

export default function ChatPage() {
  const { chatId = '' } = useParams();
  const {
    messages,
    loadMessages,
    sendMessage,
    isLoadingMessages,
    setCurrentChat,
    typingUsers,
  } = useChatStore();

  const [text, setText] = useState('');

  useEffect(() => {
    setCurrentChat(chatId);
    loadMessages(chatId);
    return () => setCurrentChat(null);
  }, [chatId, loadMessages, setCurrentChat]);

  const chatMessages = useMemo(() => messages[chatId] || [], [messages, chatId]);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {isLoadingMessages && chatMessages.length === 0 ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}><CircularProgress /></Box>
        ) : (
          chatMessages.map((m) => (
            <Box key={m.id} sx={{ mb: 1, display: 'flex', justifyContent: m.userId === 'me' ? 'flex-end' : 'flex-start' }}>
              <Box sx={{ px: 1.2, py: 0.7, borderRadius: 2, bgcolor: m.userId === 'me' ? 'primary.main' : 'background.paper' }}>
                <Typography variant="body2">{m.text}</Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {!!typingUsers[chatId]?.length && (
        <Typography variant="caption" sx={{ px: 2, pb: 0.5 }}>Кто-то печатает...</Typography>
      )}

      <Box sx={{ p: 1, display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Сообщение..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage(chatId, text).then(() => setText(''));
            }
          }}
        />
        <Button
          variant="contained"
          onClick={() => sendMessage(chatId, text).then(() => setText(''))}
          disabled={!text.trim()}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}
