import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { uploadApi } from '../lib/api';
import { useChatStore } from '../stores/chatStore';
import { useAuthStore } from '../stores/authStore';
import type { Message, User } from '../lib/types';

const formatPresence = (status?: User['status'], lastSeen?: string): string => {
  if (status === 'online') return 'в сети';
  if (status === 'away') return 'отошел(ла)';
  if (status === 'hidden') return 'был(а) недавно';
  if (!lastSeen) return 'не в сети';

  const date = new Date(lastSeen);
  if (Number.isNaN(date.getTime())) return 'не в сети';

  return `был(а) ${date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })}`;
};

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
    deleteMessage,
  } = useChatStore();

  const me = useAuthStore((s) => s.user);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [text, setText] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [msgMenuAnchor, setMsgMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
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

  const rows = useMemo(() => {
    const result: Array<{ type: 'date'; key: string; label: string } | { type: 'message'; key: string; value: Message }> = [];
    let prevDate = '';

    for (const m of chatMessages) {
      const d = new Date(m.createdAt);
      const dateKey = Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
      if (dateKey !== prevDate) {
        const label = Number.isNaN(d.getTime())
          ? 'Сегодня'
          : d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
        result.push({ type: 'date', key: `date-${dateKey || m.id}`, label });
        prevDate = dateKey;
      }
      result.push({ type: 'message', key: m.id, value: m });
    }

    return result;
  }, [chatMessages]);

  const peerUser = useMemo(() => {
    if (!chat || chat.type === 'saved' || chat.type === 'ai') return null;
    return chat.participants?.find((p) => p.id !== me?.id) || chat.participants?.[0] || null;
  }, [chat, me?.id]);

  const title = useMemo(() => {
    if (!chat) return 'Чат';
    if (chat.type === 'saved') return 'Избранное';
    if (chat.name?.trim()) return chat.name.trim();
    return peerUser?.fullName || (peerUser?.username ? `@${peerUser.username}` : 'Чат');
  }, [chat, peerUser]);

  const avatarSrc = useMemo(() => {
    return chat?.avatar || peerUser?.avatar;
  }, [chat, peerUser]);

  const subtitle = useMemo(() => {
    if (typingUsers[chatId]?.length) return 'печатает...';
    if (chat?.type === 'saved') return 'сообщения самому себе';
    if (chat?.type === 'ai') return 'AI-помощник';
    return formatPresence(peerUser?.status, peerUser?.lastSeen);
  }, [typingUsers, chatId, chat?.type, peerUser?.status, peerUser?.lastSeen]);

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

  const openProfileFromHeader = () => {
    if (!peerUser) return;
    navigate(`/user/${peerUser.id}?chatId=${encodeURIComponent(chatId)}`);
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
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: isDark ? '#0A1A32' : '#FFFFFF', color: isDark ? '#EAF1FF' : 'text.primary' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1, pt: 'max(env(safe-area-inset-top), 8px)', pb: 1, borderBottom: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'divider', bgcolor: isDark ? 'rgba(20,33,52,0.88)' : '#FFFFFF' }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: isDark ? '#AFC1D9' : '#6F7D8A' }}><ArrowBackIcon /></IconButton>

        <ButtonBase
          onClick={openProfileFromHeader}
          disabled={!peerUser}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            borderRadius: 2,
            px: 0.5,
            py: 0.25,
            flex: 1,
            justifyContent: 'flex-start',
            textAlign: 'left',
          }}
        >
          <Avatar src={avatarSrc} sx={{ width: 46, height: 46, bgcolor: '#5E5BF0' }}>{title.slice(0, 1).toUpperCase()}</Avatar>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 18 }} noWrap>{title}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              {peerUser?.status === 'online' && !typingUsers[chatId]?.length && (
                <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: '#32C26A', flexShrink: 0 }} />
              )}
              <Typography variant="caption" color={isDark ? '#B7C8DD' : 'text.secondary'} noWrap>
                {subtitle}
              </Typography>
            </Box>
          </Box>
        </ButtonBase>

        <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ color: isDark ? '#AFC1D9' : '#6F7D8A' }}><MoreVertIcon /></IconButton>
      </Box>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        <MenuItem onClick={() => { pinChat(chatId); setMenuAnchor(null); }}>{chat.pinned ? 'Открепить' : 'Закрепить'}</MenuItem>
        <MenuItem onClick={() => { muteChat(chatId); setMenuAnchor(null); }}>{chat.muted ? 'Включить звук' : 'Выключить звук'}</MenuItem>
        <MenuItem onClick={() => { chat.archived ? unarchiveChat(chatId) : archiveChat(chatId); setMenuAnchor(null); }}>{chat.archived ? 'Вернуть из архива' : 'В архив'}</MenuItem>
        <MenuItem onClick={() => { clearChat(chatId); setMenuAnchor(null); }}>Очистить чат</MenuItem>
        <MenuItem onClick={() => { deleteChat(chatId); setMenuAnchor(null); navigate('/chats'); }} sx={{ color: 'error.main' }}>Удалить чат</MenuItem>
      </Menu>

      <Menu anchorEl={msgMenuAnchor} open={!!msgMenuAnchor} onClose={() => { setMsgMenuAnchor(null); setSelectedMessage(null); }}>
        <MenuItem
          onClick={() => {
            if (selectedMessage) deleteMessage(chatId, selectedMessage.id, false);
            setMsgMenuAnchor(null);
            setSelectedMessage(null);
          }}
        >
          Удалить у себя
        </MenuItem>
        <MenuItem
          disabled={!selectedMessage || selectedMessage.userId !== me?.id}
          onClick={() => {
            if (selectedMessage) deleteMessage(chatId, selectedMessage.id, true);
            setMsgMenuAnchor(null);
            setSelectedMessage(null);
          }}
        >
          Удалить у всех
        </MenuItem>
      </Menu>

      <Box sx={{ flex: 1, overflow: 'auto', p: 1.2, bgcolor: isDark ? '#0A1A32' : '#FFFFFF' }}>
        {isLoadingMessages && chatMessages.length === 0 ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}><CircularProgress /></Box>
        ) : (
          rows.map((row) => {
            if (row.type === 'date') {
              return (
                <Box key={row.key} sx={{ display: 'flex', justifyContent: 'center', my: 1.2 }}>
                  <Box sx={{ px: 1.2, py: 0.4, borderRadius: 99, bgcolor: isDark ? 'rgba(255,255,255,0.11)' : '#E8EDF2' }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: isDark ? '#D0DCEE' : '#6A7785' }}>{row.label}</Typography>
                  </Box>
                </Box>
              );
            }

            const m = row.value;
            return (
              <Box key={row.key} sx={{ mb: 1, display: 'flex', justifyContent: m.userId === me?.id ? 'flex-end' : 'flex-start' }}>
                <Box
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setSelectedMessage(m);
                    setMsgMenuAnchor(e.currentTarget);
                  }}
                  onPointerDown={(e) => {
                    const target = e.currentTarget as HTMLElement;
                    const timer = window.setTimeout(() => {
                      setSelectedMessage(m);
                      setMsgMenuAnchor(target);
                    }, 450);
                    const clear = () => window.clearTimeout(timer);
                    target.addEventListener('pointerup', clear, { once: true });
                    target.addEventListener('pointerleave', clear, { once: true });
                  }}
                  sx={{ px: 1.5, py: 0.95, borderRadius: 2.8, maxWidth: '72%', bgcolor: m.userId === me?.id ? (isDark ? '#2F5888' : '#D8F2E4') : (isDark ? '#152741' : '#F2F5F8') }}
                >
                  <Typography sx={{ fontSize: 16, color: isDark ? '#EAF1FF' : '#1D2A22', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{m.text}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.72, display: 'block', textAlign: 'right' }}>
                    {new Date(m.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>

      {!!files.length && (
        <Box sx={{ px: 1.5, py: 0.8, borderTop: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'divider', display: 'flex', gap: 1, overflowX: 'auto' }}>
          {files.map((f, i) => <Typography key={`${f.name}-${i}`} variant="caption">{f.name}</Typography>)}
        </Box>
      )}

      <Box sx={{ px: 1, pt: 1, pb: 'max(env(safe-area-inset-bottom), 8px)', display: 'flex', gap: 1, alignItems: 'center', bgcolor: isDark ? 'rgba(14,29,47,0.95)' : '#FFFFFF', borderTop: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'divider' }}>
        <input ref={inputRef} type="file" multiple style={{ display: 'none' }} onChange={(e) => onPickFiles(e.target.files)} />
        <IconButton onClick={() => inputRef.current?.click()} sx={{ color: isDark ? '#8EA3BB' : '#6F7D8A' }}><AttachFileIcon /></IconButton>
        <TextField
          fullWidth
          size="small"
          multiline
          minRows={1}
          maxRows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Сообщение..."
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 99, bgcolor: isDark ? 'rgba(255,255,255,0.08)' : '#F3F5F7', color: isDark ? '#fff' : '#1D2A22' } }}
        />
        <IconButton onClick={submit} disabled={!text.trim() && !uploaded.length} sx={{ color: isDark ? '#8EA3BB' : '#6F7D8A' }}><SendRoundedIcon /></IconButton>
      </Box>
    </Box>
  );
}