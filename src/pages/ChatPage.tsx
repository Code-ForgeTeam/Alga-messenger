import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadApi } from '../lib/api';
import { useChatStore } from '../stores/chatStore';
import { useAuthStore } from '../stores/authStore';

export default function ChatPage() {
  const { chatId = '' } = useParams();
  const navigate = useNavigate();

  const {
    chats,
    messages,
    loadMessages,
    sendMessage,
    isLoadingMessages,
    setCurrentChat,
    typingUsers,
    markAsRead,
    clearChat,
    archiveChat,
    unarchiveChat,
    muteChat,
    pinChat,
    deleteChat,
  } = useChatStore();

  const me = useAuthStore((s) => s.user);
  const [text, setText] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploaded, setUploaded] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const chat = chats.find((c) => c.id === chatId);

  useEffect(() => {
    setCurrentChat(chatId);
    loadMessages(chatId);
    markAsRead(chatId).catch(() => null);
    return () => setCurrentChat(null);
  }, [chatId]);

  const chatMessages = useMemo(() => messages[chatId] || [], [messages, chatId]);

  const onPickFiles = async (list: FileList | null) => {
    if (!list?.length) return;
    const arr = Array.from(list);
    setFiles((prev) => [...prev, ...arr]);
    const uploadedFiles = await uploadApi.uploadFiles(arr);
    setUploaded((prev) => [...prev, ...uploadedFiles]);
  };

  const submit = async () => {
    await sendMessage(chatId, text, uploaded);
    setText('');
    setFiles([]);
    setUploaded([]);
  };

  if (!chat) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Chat not found</Typography>
        <Button onClick={() => navigate('/chats')}>Back</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1.5, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 600 }}>{chat.name || 'Chat'}</Typography>
          {!!typingUsers[chatId]?.length && <Typography variant="caption" color="primary.main">typing...</Typography>}
        </Box>
        <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}><MoreVertIcon /></IconButton>
      </Box>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => { pinChat(chatId); setMenuAnchor(null); }}>{chat.pinned ? 'Unpin' : 'Pin'}</MenuItem>
        <MenuItem onClick={() => { muteChat(chatId); setMenuAnchor(null); }}>{chat.muted ? 'Unmute' : 'Mute'}</MenuItem>
        <MenuItem onClick={() => { chat.archived ? unarchiveChat(chatId) : archiveChat(chatId); setMenuAnchor(null); }}>
          {chat.archived ? 'Unarchive' : 'Archive'}
        </MenuItem>
        <MenuItem onClick={() => { clearChat(chatId); setMenuAnchor(null); }}>Clear messages</MenuItem>
        <MenuItem onClick={() => { deleteChat(chatId); setMenuAnchor(null); navigate('/chats'); }} sx={{ color: 'error.main' }}>Delete chat</MenuItem>
      </Menu>

      <Box sx={{ flex: 1, overflow: 'auto', p: 1 }}>
        {isLoadingMessages && chatMessages.length === 0 ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}><CircularProgress /></Box>
        ) : (
          chatMessages.map((m) => (
            <Box key={m.id} sx={{ mb: 1, display: 'flex', justifyContent: m.userId === me?.id ? 'flex-end' : 'flex-start' }}>
              <Box sx={{ px: 1.2, py: 0.7, borderRadius: 2, bgcolor: m.userId === me?.id ? 'primary.main' : 'background.paper' }}>
                <Typography variant="body2">{m.text}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.65 }}>{new Date(m.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {!!files.length && (
        <Box sx={{ px: 1.5, py: 0.8, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1, overflowX: 'auto' }}>
          {files.map((f, i) => <Typography key={`${f.name}-${i}`} variant="caption">{f.name}</Typography>)}
        </Box>
      )}

      <Box sx={{ p: 1, display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={(e) => onPickFiles(e.target.files)} />
        <IconButton onClick={() => inputRef.current?.click()}><AttachFileIcon /></IconButton>
        <TextField
          fullWidth
          size="small"
          multiline
          maxRows={4}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            const socket = (window as any).__socket;
            if (socket && text.trim()) socket.emit('typing:start', { chatId });
          }}
          placeholder="Сообщение..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
        />
        <Button variant="contained" onClick={submit} disabled={!text.trim() && !uploaded.length}>Send</Button>
      </Box>
    </Box>
  );
}
