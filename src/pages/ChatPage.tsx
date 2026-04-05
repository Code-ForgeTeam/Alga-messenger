import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { messageApi, uploadApi, userApi } from '../lib/api';
import { useChatStore } from '../stores/chatStore';
import { useAuthStore } from '../stores/authStore';
import { useContactsStore } from '../stores/contactsStore';
import type { Attachment, Message, User } from '../lib/types';
import { useSnackbarStore } from '../stores/snackbarStore';

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

const QUICK_REACTIONS = ['❤️', '👍', '👎', '🔥'] as const;
type QuickReaction = (typeof QUICK_REACTIONS)[number];
const USERNAME_MENTION_RE = /@([A-Za-z0-9_]{3,32})/g;

const formatAttachmentSize = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 102.4) / 10} KB`;
  return `${Math.round(bytes / 104857.6) / 10} MB`;
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
    updateMessage,
  } = useChatStore();

  const me = useAuthStore((s) => s.user);
  const getContactByUserId = useContactsStore((s) => s.getContactByUserId);
  const pushSnackbar = useSnackbarStore((s) => s.push);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [text, setText] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [msgMenuAnchor, setMsgMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [reactionAnchor, setReactionAnchor] = useState<HTMLElement | null>(null);
  const [reactionMessageId, setReactionMessageId] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploaded, setUploaded] = useState<any[]>([]);
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const messageListRef = useRef<HTMLDivElement | null>(null);
  const lastRenderedMessageIdRef = useRef<string>('');
  const mentionCacheRef = useRef<Record<string, string>>({});
  const edgeSwipeRef = useRef<{ active: boolean; startX: number; startY: number; swiped: boolean }>({
    active: false,
    startX: 0,
    startY: 0,
    swiped: false,
  });
  const messageGestureRef = useRef<{ messageId: string; startX: number; startY: number; swipeDone: boolean } | null>(null);
  const reactionTimerRef = useRef<number | null>(null);

  const chat = chats.find((c) => c.id === chatId);

  useEffect(() => {
    setCurrentChat(chatId);
    loadMessages(chatId);
    markAsRead(chatId).catch(() => null);
    return () => setCurrentChat(null);
  }, [chatId, loadMessages, markAsRead, setCurrentChat]);

  useEffect(() => {
    if (!chatId) return;
    const timerId = window.setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;
      loadMessages(chatId).catch(() => null);
    }, 5000);
    return () => window.clearInterval(timerId);
  }, [chatId, loadMessages]);

  useEffect(() => {
    lastRenderedMessageIdRef.current = '';
    setSelectedMessage(null);
    setEditingMessage(null);
  }, [chatId]);

  const chatMessages = useMemo(() => messages[chatId] || [], [messages, chatId]);

  useEffect(() => {
    if (!chatId || isLoadingMessages || !chatMessages.length) return;
    const lastMessageId = String(chatMessages[chatMessages.length - 1]?.id || '').trim();
    if (!lastMessageId) return;
    if (lastRenderedMessageIdRef.current === lastMessageId) return;

    lastRenderedMessageIdRef.current = lastMessageId;
    const scrollToBottom = () => {
      const list = messageListRef.current;
      if (!list) return;
      list.scrollTop = list.scrollHeight;
    };

    scrollToBottom();
    const frameId = window.requestAnimationFrame(scrollToBottom);
    const timerId = window.setTimeout(scrollToBottom, 120);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(timerId);
    };
  }, [chatId, chatMessages, isLoadingMessages]);

  useEffect(() => {
    if (!chatId || !me?.id || !chatMessages.length) return;
    const last = chatMessages[chatMessages.length - 1];
    if (!last || String(last.userId) === String(me.id)) return;
    markAsRead(chatId).catch(() => null);
  }, [chatId, chatMessages, me?.id, markAsRead]);

  const reactions = useMemo(() => {
    const map: Record<string, { mine?: string; top?: string; total: number }> = {};
    for (const item of chatMessages) {
      const raw = (item as any)?.reactions;
      const mine = typeof raw?.mine === 'string' ? raw.mine : undefined;
      const counts = raw?.counts && typeof raw.counts === 'object' ? (raw.counts as Record<string, number>) : {};
      const entries = Object.entries(counts || {}).filter(([key]) => !!key);
      const top = entries.sort((a, b) => (b[1] || 0) - (a[1] || 0))[0]?.[0];
      const total = entries.reduce((sum, [, value]) => sum + Number(value || 0), 0);
      map[item.id] = { mine, top, total };
    }
    return map;
  }, [chatMessages]);

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
    const localDisplayName = peerUser ? getContactByUserId(peerUser.id)?.displayName : '';
    if (localDisplayName) return localDisplayName;
    return peerUser?.fullName || (peerUser?.username ? `@${peerUser.username}` : 'Чат');
  }, [chat, getContactByUserId, peerUser]);

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
    try {
      const uploadedFiles = await uploadApi.uploadFiles(arr);
      setUploaded((prev) => [...prev, ...(Array.isArray(uploadedFiles) ? uploadedFiles : [])]);
    } catch {
      setFiles((prev) => prev.slice(0, Math.max(0, prev.length - arr.length)));
      pushSnackbar({ message: 'Не удалось загрузить фото', timeout: 2200, tone: 'error' });
    } finally {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const submit = async () => {
    if (editingMessage) {
      const ok = await updateMessage(chatId, editingMessage.id, text);
      if (!ok) {
        pushSnackbar({ message: 'Не удалось изменить сообщение', timeout: 2200, tone: 'error' });
        return;
      }
      setText('');
      setEditingMessage(null);
      setSelectedMessage(null);
      return;
    }

    if (!text.trim() && !uploaded.length) return;
    await sendMessage(chatId, text, uploaded, replyToMessage?.id);
    setText('');
    setFiles([]);
    setUploaded([]);
    setReplyToMessage(null);
  };

  const removePendingAttachment = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploaded((prev) => prev.filter((_, i) => i !== index));
  };

  const filePreviewUrls = useMemo(
    () =>
      files.map((file) => (file.type.startsWith('image/') ? URL.createObjectURL(file) : '')),
    [files],
  );

  useEffect(() => {
    return () => {
      filePreviewUrls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [filePreviewUrls]);

  const clearReactionTimer = () => {
    if (reactionTimerRef.current !== null) {
      window.clearTimeout(reactionTimerRef.current);
      reactionTimerRef.current = null;
    }
  };

  const clearMessageGesture = () => {
    messageGestureRef.current = null;
    clearReactionTimer();
  };

  const getReplyPreviewText = (message: Pick<Message, 'text' | 'attachments'>): string => {
    const rawText = String(message.text ?? '').trim();
    if (rawText !== '') return rawText;
    if (Array.isArray(message.attachments) && message.attachments.length > 0) {
      const hasImage = message.attachments.some((item) => item?.type === 'image');
      const hasVideo = message.attachments.some((item) => item?.type === 'video');
      if (!hasImage && hasVideo) return 'Видео';
      return hasImage ? 'Фото' : 'Вложение';
    }
    return 'Сообщение';
  };

  const markMessageForReply = (message: Message) => {
    setReplyToMessage(message);
    setMsgMenuAnchor(null);
    setSelectedMessage(null);
    setEditingMessage(null);
  };

  const copySelectedMessage = async () => {
    if (!selectedMessage) return;
    const textValue = String(selectedMessage.text || '').trim();
    const fallback = (selectedMessage.attachments || []).map((item) => item.url).filter(Boolean).join('\n');
    const payload = textValue || fallback;
    if (!payload) return;
    try {
      await navigator.clipboard.writeText(payload);
      pushSnackbar({ message: 'Скопировано', timeout: 1800 });
    } catch {
      pushSnackbar({ message: 'Не удалось скопировать', timeout: 2200, tone: 'error' });
    } finally {
      setSelectedMessage(null);
    }
  };

  const canEditMessage = (message: Message | null): boolean => {
    return !!message && message.userId === me?.id;
  };

  const startEditSelectedMessage = () => {
    if (!selectedMessage || !canEditMessage(selectedMessage)) return;
    setEditingMessage(selectedMessage);
    setReplyToMessage(null);
    setText(selectedMessage.text || '');
    setSelectedMessage(null);
  };

  const downloadAttachment = (attachment: Attachment) => {
    const url = String(attachment?.url || '').trim();
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = attachment.name || 'photo';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleRootPointerDown = (event: any) => {
    if (event.pointerType === 'mouse') {
      edgeSwipeRef.current.active = false;
      return;
    }
    if (event.clientX <= 24) {
      edgeSwipeRef.current = {
        active: true,
        startX: event.clientX,
        startY: event.clientY,
        swiped: false,
      };
      return;
    }
    edgeSwipeRef.current.active = false;
  };

  const handleRootPointerMove = (event: any) => {
    const state = edgeSwipeRef.current;
    if (!state.active || state.swiped) return;

    const dx = event.clientX - state.startX;
    const dy = Math.abs(event.clientY - state.startY);
    if (dy > 52 || dx < -8) {
      state.active = false;
      return;
    }

    if (dx > 88 && dy < 42) {
      state.swiped = true;
      state.active = false;
      navigate('/chats');
    }
  };

  const resetRootSwipe = () => {
    edgeSwipeRef.current.active = false;
    edgeSwipeRef.current.swiped = false;
  };

  const handleMessagePointerDown = (event: any, message: Message) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.pointerType !== 'mouse') event.preventDefault();

    const target = event.currentTarget as HTMLElement;
    messageGestureRef.current = {
      messageId: message.id,
      startX: event.clientX,
      startY: event.clientY,
      swipeDone: false,
    };

    clearReactionTimer();
    reactionTimerRef.current = window.setTimeout(() => {
      const gesture = messageGestureRef.current;
      if (!gesture || gesture.messageId !== message.id || gesture.swipeDone) return;
      openReactionPicker(message, target);
    }, 450);
  };

  const handleMessagePointerMove = (event: any, message: Message) => {
    const state = messageGestureRef.current;
    if (!state || state.messageId !== message.id || state.swipeDone) return;
    if (state.startX <= 26) return;

    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;

    if (Math.abs(dx) > 12 || Math.abs(dy) > 10) {
      clearReactionTimer();
    }

    if (dx > 72 && Math.abs(dy) < 34) {
      state.swipeDone = true;
      clearReactionTimer();
      setReplyToMessage(message);
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate(10);
      }
    }
  };

  useEffect(() => () => clearMessageGesture(), []);

  const openProfileFromHeader = () => {
    if (!peerUser) return;
    navigate(`/user/${peerUser.id}?chatId=${encodeURIComponent(chatId)}`);
  };

  const openReactionPicker = (message: Message, anchor: HTMLElement) => {
    setSelectedMessage(message);
    setReactionMessageId(message.id);
    setReactionAnchor(anchor);
  };

  const closeReactionPicker = () => {
    setReactionAnchor(null);
    setReactionMessageId(null);
  };

  const applyReaction = async (value: QuickReaction) => {
    if (!reactionMessageId) return;
    const currentMine = reactions[reactionMessageId]?.mine;
    try {
      if (currentMine === value) {
        await messageApi.removeReaction(reactionMessageId);
      } else {
        await messageApi.setReaction(reactionMessageId, value);
      }
      await loadMessages(chatId);
    } catch {
      pushSnackbar({ message: 'Не удалось обновить реакцию', timeout: 2200 });
    } finally {
      closeReactionPicker();
    }
  };

  const openMessageActionsFromReactions = () => {
    if (!selectedMessage) return;
    setMsgMenuAnchor(reactionAnchor);
  };

  const openMentionProfile = async (username: string) => {
    const normalized = username.replace(/^@/, '').trim().toLowerCase();
    if (!normalized) return;

    const cachedId = mentionCacheRef.current[normalized];
    if (cachedId) {
      navigate(`/user/${cachedId}?chatId=${encodeURIComponent(chatId)}`);
      return;
    }

    try {
      const profile = await userApi.getByUsername(normalized);
      const targetId = String(profile?.id ?? '').trim();
      if (!targetId) {
        throw new Error('User not found');
      }
      mentionCacheRef.current[normalized] = targetId;
      navigate(`/user/${targetId}?chatId=${encodeURIComponent(chatId)}`);
    } catch {
      pushSnackbar({ message: `Пользователь @${normalized} не найден`, timeout: 2200 });
    }
  };

  const renderMessageText = (value: string) => {
    USERNAME_MENTION_RE.lastIndex = 0;
    const chunks: any[] = [];
    let cursor = 0;
    let match: RegExpExecArray | null = null;

    while ((match = USERNAME_MENTION_RE.exec(value)) !== null) {
      const fullMatch = match[0];
      const username = match[1] || '';
      const start = match.index;
      const end = start + fullMatch.length;

      if (start > cursor) {
        chunks.push(value.slice(cursor, start));
      }

      chunks.push(
        <Box
          component="span"
          key={`mention-${start}-${username}`}
          onClick={(event) => {
            event.stopPropagation();
            void openMentionProfile(username);
          }}
          sx={{
            color: isDark ? '#88C0FF' : '#0A8D4F',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {fullMatch}
        </Box>,
      );

      cursor = end;
    }

    if (cursor < value.length) {
      chunks.push(value.slice(cursor));
    }

    return chunks;
  };

  if (!chat) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Чат не найден</Typography>
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => navigate('/chats')}>Назад</Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: isDark ? '#0A1A32' : '#FFFFFF', color: isDark ? '#EAF1FF' : 'text.primary' }}
      onPointerDown={handleRootPointerDown}
      onPointerMove={handleRootPointerMove}
      onPointerUp={resetRootSwipe}
      onPointerCancel={resetRootSwipe}
      onPointerLeave={resetRootSwipe}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 'max(env(safe-area-inset-left), 8px)', pr: 'max(env(safe-area-inset-right), 8px)', pt: 'max(env(safe-area-inset-top), 12px)', pb: 1, borderBottom: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'divider', bgcolor: isDark ? 'rgba(20,33,52,0.88)' : '#FFFFFF' }}>
        <IconButton onClick={() => navigate('/chats')} sx={{ color: isDark ? '#AFC1D9' : '#6F7D8A' }}><ArrowBackIcon /></IconButton>

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
          <Avatar src={avatarSrc} sx={{ width: 46, height: 46, bgcolor: chat.type === 'saved' ? '#D6A21B' : '#5E5BF0' }}>
            {chat.type === 'saved' ? <BookmarkRoundedIcon sx={{ fontSize: 27 }} /> : title.slice(0, 1).toUpperCase()}
          </Avatar>
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
            if (selectedMessage) {
              markMessageForReply(selectedMessage);
            } else {
              setMsgMenuAnchor(null);
              setSelectedMessage(null);
            }
          }}
        >
          Отметить для ответа
        </MenuItem>
        <MenuItem
          onClick={() => {
            void copySelectedMessage();
            setMsgMenuAnchor(null);
          }}
        >
          Копировать
        </MenuItem>
        <MenuItem
          disabled={!canEditMessage(selectedMessage)}
          onClick={() => {
            startEditSelectedMessage();
            setMsgMenuAnchor(null);
          }}
        >
          Изменить
        </MenuItem>
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

      <Popover
        open={!!reactionAnchor}
        anchorEl={reactionAnchor}
        onClose={closeReactionPicker}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 99,
              px: 0.6,
              py: 0.4,
              bgcolor: isDark ? 'rgba(19,33,52,0.96)' : 'rgba(255,255,255,0.96)',
              border: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.08)',
            },
          },
        }}
      >
        <Box sx={{ display: 'grid', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, justifyContent: 'center' }}>
            {QUICK_REACTIONS.map((item) => (
              <ButtonBase
                key={item}
                onClick={() => { void applyReaction(item); }}
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  fontSize: 20,
                  '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)' },
                }}
              >
                {item}
              </ButtonBase>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 0.4, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button size="small" onClick={() => void copySelectedMessage()}>Копировать</Button>
            <Button size="small" disabled={!canEditMessage(selectedMessage)} onClick={startEditSelectedMessage}>Изменить</Button>
            <Button size="small" onClick={() => selectedMessage && markMessageForReply(selectedMessage)}>Ответить</Button>
            <Button
              size="small"
              color="error"
              onClick={() => {
                if (!selectedMessage) return;
                deleteMessage(chatId, selectedMessage.id, false);
                closeReactionPicker();
                setSelectedMessage(null);
              }}
            >
              Удалить
            </Button>
            <Button size="small" onClick={() => { closeReactionPicker(); setSelectedMessage(null); }}>Закрыть</Button>
            <Button size="small" onClick={openMessageActionsFromReactions}>Ещё</Button>
          </Box>
        </Box>
      </Popover>

      <Dialog
        open={!!previewAttachment}
        onClose={() => setPreviewAttachment(null)}
        fullWidth
        maxWidth="md"
      >
        <Box
          sx={{
            bgcolor: '#000',
            minHeight: 240,
            maxHeight: '85dvh',
            display: 'grid',
            placeItems: 'center',
            position: 'relative',
          }}
        >
          {previewAttachment?.type === 'video' ? (
            <Box
              component="video"
              src={String(previewAttachment?.url || '')}
              controls
              autoPlay
              playsInline
              sx={{ width: '100%', maxHeight: '85dvh', bgcolor: '#000' }}
            />
          ) : (
            <Box
              component="img"
              src={String(previewAttachment?.url || '')}
              alt={previewAttachment?.name || 'photo'}
              sx={{ width: '100%', maxHeight: '85dvh', objectFit: 'contain' }}
            />
          )}
          <IconButton
            onClick={() => setPreviewAttachment(null)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#fff',
              bgcolor: 'rgba(0,0,0,0.45)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.62)' },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      </Dialog>

      <Box ref={messageListRef} sx={{ flex: 1, overflow: 'auto', p: 1.2, bgcolor: isDark ? '#0A1A32' : '#FFFFFF' }}>
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
            const reaction = reactions[m.id];
            const reactionGlyph = reaction?.mine || reaction?.top;
            const messageAttachments = Array.isArray((m as any).attachments)
              ? ((m as any).attachments as Attachment[])
              : [];
            const hasText = String(m.text ?? '').trim() !== '';
            return (
              <Box key={row.key} sx={{ mb: 1, display: 'flex', justifyContent: m.userId === me?.id ? 'flex-end' : 'flex-start' }}>
                <Box
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setSelectedMessage(m);
                    setMsgMenuAnchor(e.currentTarget);
                  }}
                  onPointerDown={(event) => handleMessagePointerDown(event, m)}
                  onPointerMove={(event) => handleMessagePointerMove(event, m)}
                  onPointerUp={clearMessageGesture}
                  onPointerLeave={clearMessageGesture}
                  onPointerCancel={clearMessageGesture}
                  sx={{
                    px: 1.5,
                    py: 0.95,
                    borderRadius: 2.8,
                    maxWidth: '72%',
                    bgcolor: m.userId === me?.id ? (isDark ? '#2F5888' : '#D8F2E4') : (isDark ? '#152741' : '#F2F5F8'),
                    WebkitTouchCallout: 'none',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    touchAction: 'manipulation',
                  }}
                >
                  {!!m.replyTo && (
                    <Box
                      sx={{
                        mb: 0.55,
                        px: 0.8,
                        py: 0.55,
                        minWidth: 0,
                        maxWidth: '100%',
                        borderRadius: 1.4,
                        borderLeft: '3px solid',
                        borderLeftColor: isDark ? '#79B8FF' : '#1FA35B',
                        bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                      }}
                    >
                      <Typography variant="caption" sx={{ display: 'block', fontWeight: 700, lineHeight: 1.1 }}>
                        {m.replyTo.fullName || 'Ответ'}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          opacity: 0.82,
                          display: '-webkit-box',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflowWrap: 'anywhere',
                          wordBreak: 'break-word',
                          maxWidth: '100%',
                        }}
                      >
                        {String(m.replyTo.text || 'Сообщение')}
                      </Typography>
                    </Box>
                  )}
                  {!!messageAttachments.length && (
                    <Box sx={{ display: 'grid', gap: 0.55, mb: hasText ? 0.75 : 0.25 }}>
                      {messageAttachments.map((attachment, index) => {
                        const url = String(attachment?.url ?? '').trim();
                        if (!url) return null;
                        if (attachment.type === 'image') {
                          return (
                            <Box
                              key={`${m.id}-att-${index}`}
                              sx={{
                                width: 'min(240px, 64vw)',
                                maxWidth: '100%',
                                position: 'relative',
                              }}
                            >
                              <Box
                                component="img"
                                src={url}
                                alt={attachment.name || 'photo'}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setPreviewAttachment(attachment);
                                }}
                                sx={{
                                  width: '100%',
                                  borderRadius: 2,
                                  display: 'block',
                                  objectFit: 'cover',
                                  cursor: 'pointer',
                                  border: '1px solid',
                                  borderColor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.08)',
                                }}
                              />
                              <IconButton
                                size="small"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  downloadAttachment(attachment);
                                }}
                                sx={{
                                  position: 'absolute',
                                  right: 6,
                                  top: 6,
                                  width: 24,
                                  height: 24,
                                  color: '#fff',
                                  bgcolor: 'rgba(0,0,0,0.45)',
                                  '&:hover': { bgcolor: 'rgba(0,0,0,0.62)' },
                                }}
                              >
                                <DownloadRoundedIcon sx={{ fontSize: 15 }} />
                              </IconButton>
                            </Box>
                          );
                        }

                        if (attachment.type === 'video') {
                          return (
                            <Box
                              key={`${m.id}-att-${index}`}
                              onClick={(event) => {
                                event.stopPropagation();
                                setPreviewAttachment(attachment);
                              }}
                              sx={{
                                width: 'min(240px, 64vw)',
                                maxWidth: '100%',
                                borderRadius: 2,
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: 'pointer',
                                border: '1px solid',
                                borderColor: isDark ? 'rgba(255,255,255,0.18)' : 'rgba(0,0,0,0.08)',
                                bgcolor: '#000',
                              }}
                            >
                              <Box
                                component="video"
                                src={url}
                                muted
                                playsInline
                                preload="metadata"
                                sx={{
                                  width: '100%',
                                  maxHeight: 220,
                                  display: 'block',
                                  objectFit: 'cover',
                                }}
                              />
                              <Box
                                sx={{
                                  position: 'absolute',
                                  right: 8,
                                  bottom: 8,
                                  width: 28,
                                  height: 28,
                                  borderRadius: '50%',
                                  display: 'grid',
                                  placeItems: 'center',
                                  fontSize: 16,
                                  color: '#fff',
                                  bgcolor: 'rgba(0,0,0,0.5)',
                                }}
                              >
                                ▶
                              </Box>
                            </Box>
                          );
                        }

                        return (
                          <ButtonBase
                            key={`${m.id}-att-${index}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              window.open(url, '_blank', 'noopener,noreferrer');
                            }}
                            sx={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.85,
                              borderRadius: 2,
                              px: 1,
                              py: 0.75,
                              justifyContent: 'flex-start',
                              bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)',
                            }}
                          >
                            <InsertDriveFileRoundedIcon sx={{ fontSize: 18, color: isDark ? '#B7C8DD' : '#5E6E7F' }} />
                            <Box sx={{ minWidth: 0, textAlign: 'left' }}>
                              <Typography sx={{ fontSize: 13, lineHeight: 1.2 }} noWrap>
                                {attachment.name || 'Файл'}
                              </Typography>
                              {!!attachment.size && (
                                <Typography variant="caption" sx={{ opacity: 0.72 }}>
                                  {formatAttachmentSize(Number(attachment.size || 0))}
                                </Typography>
                              )}
                            </Box>
                          </ButtonBase>
                        );
                      })}
                    </Box>
                  )}
                  {hasText && (
                    <Typography sx={{ fontSize: 16, color: isDark ? '#EAF1FF' : '#1D2A22', whiteSpace: 'pre-wrap', wordBreak: 'break-word', userSelect: 'none', WebkitUserSelect: 'none' }}>
                      {renderMessageText(m.text)}
                    </Typography>
                  )}
                  <Box sx={{ mt: 0.2, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.35 }}>
                    <Typography variant="caption" sx={{ opacity: 0.72, display: 'block', textAlign: 'right' }}>
                      {new Date(m.createdAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                      {m.edited ? ' · изм.' : ''}
                    </Typography>
                    {m.userId === me?.id && (
                      m.status === 'read' ? (
                        <DoneAllIcon sx={{ fontSize: 14, color: isDark ? '#79B8FF' : '#12864A' }} />
                      ) : m.status === 'error' || m.status === 'sending' ? null : (
                        <DoneRoundedIcon sx={{ fontSize: 14, color: isDark ? '#AFC1D9' : '#6F7D8A' }} />
                      )
                    )}
                  </Box>
                  {!!reactionGlyph && (
                    <Box
                      sx={{
                        mt: 0.45,
                        ml: 'auto',
                        minWidth: 26,
                        height: 22,
                        px: reaction?.total && reaction.total > 1 ? 0.65 : 0,
                        borderRadius: 11,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0.25,
                        bgcolor: isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.06)',
                      }}
                    >
                      <Typography sx={{ fontSize: 14, lineHeight: 1 }}>{reactionGlyph}</Typography>
                      {reaction?.total && reaction.total > 1 && (
                        <Typography sx={{ fontSize: 11, lineHeight: 1, fontWeight: 700 }}>{reaction.total}</Typography>
                      )}
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })
        )}
      </Box>

      {!!files.length && (
        <Box
          sx={{
            px: 1.2,
            py: 0.7,
            borderTop: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'divider',
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
          }}
        >
          {files.map((file, index) => {
            const previewUrl = filePreviewUrls[index];
            const isImage = !!previewUrl;
            return (
              <Box
                key={`${file.name}-${index}`}
                sx={{
                  position: 'relative',
                  minWidth: isImage ? 70 : 120,
                  maxWidth: isImage ? 70 : 180,
                  borderRadius: 1.8,
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.1)',
                  overflow: 'hidden',
                  bgcolor: isDark ? 'rgba(255,255,255,0.06)' : '#F2F5F8',
                }}
              >
                {isImage ? (
                  <Box
                    component="img"
                    src={previewUrl}
                    alt={file.name}
                    sx={{
                      width: 70,
                      height: 70,
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                ) : (
                  <Box sx={{ px: 1, py: 0.75, display: 'flex', alignItems: 'center', gap: 0.7 }}>
                    <InsertDriveFileRoundedIcon sx={{ fontSize: 16, color: isDark ? '#B7C8DD' : '#637687' }} />
                    <Typography variant="caption" noWrap sx={{ maxWidth: 126 }}>
                      {file.name}
                    </Typography>
                  </Box>
                )}
                <IconButton
                  size="small"
                  onClick={() => removePendingAttachment(index)}
                  sx={{
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    width: 20,
                    height: 20,
                    bgcolor: 'rgba(0,0,0,0.58)',
                    color: '#fff',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.68)' },
                  }}
                >
                  <CloseRoundedIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      )}

      {!!replyToMessage && (
        <Box
          sx={{
            px: 1.1,
            py: 0.55,
            borderTop: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            bgcolor: isDark ? 'rgba(16,29,46,0.95)' : '#FAFBFC',
          }}
        >
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              borderLeft: '3px solid',
              borderLeftColor: isDark ? '#79B8FF' : '#1FA35B',
              pl: 0.9,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 700, lineHeight: 1.15, display: 'block' }}>
              Ответ на сообщение
            </Typography>
            <Typography
              variant="caption"
              sx={{
                opacity: 0.82,
                display: '-webkit-box',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflowWrap: 'anywhere',
                wordBreak: 'break-word',
              }}
            >
              {getReplyPreviewText(replyToMessage)}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setReplyToMessage(null)} sx={{ color: isDark ? '#AFC1D9' : '#708090' }}>
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      )}

      {!!editingMessage && (
        <Box
          sx={{
            px: 1.1,
            py: 0.55,
            borderTop: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'divider',
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            bgcolor: isDark ? 'rgba(16,29,46,0.95)' : '#FAFBFC',
          }}
        >
          <Typography variant="caption" sx={{ fontWeight: 700, flex: 1 }}>
            Редактирование сообщения (до 15 минут)
          </Typography>
          <IconButton size="small" onClick={() => { setEditingMessage(null); setText(''); }} sx={{ color: isDark ? '#AFC1D9' : '#708090' }}>
            <CloseRoundedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      )}

      <Box sx={{ px: 1, pt: 1, pb: 'max(env(safe-area-inset-bottom), 8px)', display: 'flex', gap: 1, alignItems: 'center', bgcolor: isDark ? 'rgba(14,29,47,0.95)' : '#FFFFFF', borderTop: '1px solid', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'divider' }}>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*,.pdf,.txt,.zip,.rar,.7z,.doc,.docx"
          style={{ display: 'none' }}
          onChange={(e) => onPickFiles(e.target.files)}
        />
        <IconButton onClick={() => inputRef.current?.click()} sx={{ color: isDark ? '#8EA3BB' : '#6F7D8A' }}><AttachFileIcon /></IconButton>
        <TextField
          fullWidth
          size="small"
          multiline
          minRows={1}
          maxRows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={editingMessage ? 'Изменить сообщение...' : 'Сообщение...'}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 99,
              bgcolor: isDark ? 'rgba(255,255,255,0.08)' : '#F3F5F7',
              color: isDark ? '#fff' : '#1D2A22',
            },
            '& .MuiInputBase-inputMultiline': {
              whiteSpace: 'pre-wrap',
              overflowWrap: 'anywhere',
              wordBreak: 'break-word',
              overflowX: 'hidden',
              lineHeight: 1.35,
            },
          }}
        />
        <IconButton onClick={submit} disabled={!text.trim() && !uploaded.length} sx={{ color: isDark ? '#8EA3BB' : '#6F7D8A' }}><SendRoundedIcon /></IconButton>
      </Box>
    </Box>
  );
}
