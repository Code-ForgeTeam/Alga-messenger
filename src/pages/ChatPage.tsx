import { useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, Box, Button, CircularProgress, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
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

  const avatarSrc = useMemo(() => {
    const peer = chat?.participants?.find((p) => p.id !== me?.id) || chat?.participants?.[0];
    return chat?.avatar || peer?.avatar;
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0A1A32', color: '#EAF1FF' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1, py: 1, borderBottom: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(20,33,52,0.88)' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#AFC1D9' }}><ArrowBackIcon /></IconButton>
        <Avatar src={avatarSrc} sx={{ width: 46, height: 46, bgcolor: '#5E5BF0' }}>{title.slice(0, 1).toUpperCase()}</Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 34 }}>{title}</Typography>
          {!!typingUsers[chatId]?.length && <Typography variant="caption" color="#B7C8DD">печатает...</Typography>}
        </Box>
        <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ color: '#AFC1D9' }}><MoreVertIcon /></IconButton>
      </Box>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => { pinChat(chatId); setMenuAnchor(null); }}>{chat.pinned ? 'Открепить' : 'Закрепить'}</MenuItem>
        <MenuItem onClick={() => { muteChat(chatId); setMenuAnchor(null); }}>{chat.muted ? 'Включить звук' : 'Выключить звук'}</MenuItem>
        <MenuItem onClick={() => { chat.archived ? unarchiveChat(chatId) : archiveChat(chatId); setMenuAnchor(null); }}>{chat.archived ? 'Вернуть из архива' : 'В архив'}</MenuItem>
        <MenuItem onClick={() => { clearChat(chatId); setMenuAnchor(null); }}>Очистить чат</MenuItem>
        <MenuItem onClick={() => { deleteChat(chatId); setMenuAnchor(null); navigate('/chats'); }} sx={{ color: 'error.main' }}>Удалить чат</MenuItem>
      </Menu>

      <Box sx={{ flex: 1, overflow: 'auto', p: 1.2 }}>
        {isLoadingMessages && chatMessages.length === 0 ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}><CircularProgress /></Box>
        ) : (
          chatMessages.map((m) => (
            <Box key={m.id} sx={{ mb: 1, display: 'flex', justifyContent: m.userId === me?.id ? 'flex-end' : 'flex-start' }}>
              <Box sx={{ px: 1.5, py: 0.95, borderRadius: 2.8, maxWidth: '72%', bgcolor: m.userId === me?.id ? '#2F5888' : '#152741' }}>
                <Typography sx={{ fontSize: 18 }}>{m.text}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.72, display: 'block', textAlign: 'right' }}>
                  {new Date(m.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {!!files.length && (
        <Box sx={{ px: 1.5, py: 0.8, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', gap: 1, overflowX: 'auto' }}>
          {files.map((f, i) => <Typography key={`${f.name}-${i}`} variant="caption">{f.name}</Typography>)}
        </Box>
      )}

      <Box sx={{ p: 1, display: 'flex', gap: 1, alignItems: 'center', bgcolor: 'rgba(14,29,47,0.95)' }}>
        <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={(e) => onPickFiles(e.target.files)} />
        <IconButton onClick={() => inputRef.current?.click()} sx={{ color: '#8EA3BB' }}><AttachFileIcon /></IconButton>
        <TextField
          fullWidth
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Сообщение..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 99, bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' } }}
        />
        <IconButton onClick={submit} disabled={!text.trim() && !uploaded.length} sx={{ color: '#8EA3BB' }}><SendRoundedIcon /></IconButton>
      </Box>
    </Box>
  );
}
