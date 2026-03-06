import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, CircularProgress, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
  }, [chatId, loadMessages, markAsRead, setCurrentChat]);

  const chatMessages = useMemo(() => messages[chatId] || [], [messages, chatId]);

  const title = useMemo(() => {
    if (!chat) return 'Чат';
    if (chat.type === 'saved') return 'Избранное';
    if (chat.name?.trim()) return chat.name.trim();
    const peer = chat.participants?.find((p) => p.id !== me?.id) || chat.participants?.[0];
    return peer?.fullName || (peer?.username ? `@${peer.username}` : 'Чат');
  }, [chat, me?.id]);

  const onPickFiles = async (list: FileList | null) => {
    if (!list?.length) return;
    const arr = Array.from(list);
    setFiles((prev) => [...prev, ...arr]);
    const uploadedFiles = await uploadApi.uploadFiles(arr);
    setUploaded((prev) => [...prev, ...uploadedFiles]);
  };

  const submit = async () => {
    if (!text.trim() && !uploaded.length) return;
    await sendMessage(chatId, text, uploaded);
    setText('');
    setFiles([]);
    setUploaded([]);
  };

  if (!chat) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Чат не найден</Typography>
        <Button onClick={() => navigate('/chats')}>Назад</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
          {!!typingUsers[chatId]?.length && <Typography variant="caption" color="primary.main">печатает...</Typography>}
        </Box>
        <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)}><MoreVertIcon /></IconButton>
      </Box>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => { pinChat(chatId); setMenuAnchor(null); }}>{chat.pinned ? 'Открепить' : 'Закрепить'}</MenuItem>
        <MenuItem onClick={() => { muteChat(chatId); setMenuAnchor(null); }}>{chat.muted ? 'Включить звук' : 'Выключить звук'}</MenuItem>
        <MenuItem onClick={() => { chat.archived ? unarchiveChat(chatId) : archiveChat(chatId); setMenuAnchor(null); }}>
          {chat.archived ? 'Вернуть из архива' : 'В архив'}
        </MenuItem>
        <MenuItem onClick={() => { clearChat(chatId); setMenuAnchor(null); }}>Очистить чат</MenuItem>
        <MenuItem onClick={() => { deleteChat(chatId); setMenuAnchor(null); navigate('/chats'); }} sx={{ color: 'error.main' }}>Удалить чат</MenuItem>
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
        <Button variant="contained" onClick={submit} disabled={!text.trim() && !uploaded.length}>Отпр.</Button>
      </Box>
    </Box>
  );
}
