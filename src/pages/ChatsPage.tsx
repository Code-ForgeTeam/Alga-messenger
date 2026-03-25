import { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  Fab,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SportsEsportsRoundedIcon from '@mui/icons-material/SportsEsportsRounded';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import PushPinRoundedIcon from '@mui/icons-material/PushPinRounded';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useChatStore } from '../stores/chatStore';
import { useContactsStore } from '../stores/contactsStore';
import { useAuthStore } from '../stores/authStore';
import { AppHeader } from '../components/AppHeader';
import { useSnackbarStore } from '../stores/snackbarStore';
import { useTheme } from '@mui/material/styles';
import { useSettingsStore } from '../stores/settingsStore';
import { useAdminStore } from '../stores/adminStore';
import { userApi } from '../lib/api';
import type { Chat } from '../lib/types';
import { isCreatorUser } from '../lib/creator';

const formatChatDate = (value?: string) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
};

function getChatName(chat: Chat, myId?: string, localDisplayName?: string) {
  if (chat.type === 'saved') return 'Избранное';
  if (chat.name?.trim()) return chat.name.trim();
  if (localDisplayName?.trim()) return localDisplayName.trim();
  const peer = chat.participants?.find((p) => p.id !== myId) || chat.participants?.[0];
  return peer?.fullName || (peer?.username ? `@${peer.username}` : 'Чат');
}

function getChatAvatar(chat: Chat, myId?: string, localDisplayName?: string) {
  if (chat.type === 'saved') return { initial: 'И', src: undefined as string | undefined };
  const peer = chat.participants?.find((p) => p.id !== myId) || chat.participants?.[0];
  const title = getChatName(chat, myId, localDisplayName);
  return { initial: title.slice(0, 1).toUpperCase(), src: chat.avatar || peer?.avatar };
}

export default function ChatsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const setTheme = useSettingsStore((s) => s.setTheme);
  const chatCompactMode = useSettingsStore((s) => s.chatCompactMode);
  const navigate = useNavigate();
  const {
    chats,
    messages,
    isLoading,
    loadChats,
    archiveChat,
    unarchiveChat,
    pinChat,
    deleteChat,
  } = useChatStore();
  const getContactByUserId = useContactsStore((s) => s.getContactByUserId);
  const user = useAuthStore((s) => s.user);
  const canUseAdminTools = useAdminStore((s) => s.canUseAdminTools);
  const isCreator = isCreatorUser(user) || canUseAdminTools;
  const updateUser = useAuthStore((s) => s.updateUser);
  const logout = useAuthStore((s) => s.logout);
  const pushSnackbar = useSnackbarStore((s) => s.push);
  const [q, setQ] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatActionsAnchor, setChatActionsAnchor] = useState<null | HTMLElement>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [waveTitleActive, setWaveTitleActive] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const holdTimerRef = useRef<number | null>(null);
  const longPressTriggeredRef = useRef<string | null>(null);
  const menuItemSx = {
    borderRadius: 2.5,
    px: 1.2,
    py: 1,
    mb: 0.5,
    '& .MuiListItemIcon-root': {
      minWidth: 36,
      color: isDark ? '#AFC1D9' : '#45635A',
    },
    '&:hover': {
      bgcolor: isDark ? 'rgba(143,177,213,0.14)' : 'rgba(31,163,91,0.10)',
    },
  };

  useEffect(() => {
    if (!user?.id) return;
    loadChats();
  }, [loadChats, user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    const timerId = window.setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;
      loadChats({ silent: true }).catch(() => null);
    }, 5000);

    return () => window.clearInterval(timerId);
  }, [loadChats, user?.id]);

  useEffect(() => {
    let active = true;
    if (!user?.id) return;
    if (user.username && user.fullName && typeof user.isCreator === 'boolean') return;

    userApi
      .getMe()
      .then((profile) => {
        if (!active) return;
        const username = profile?.username ?? profile?.user_name ?? user.username;
        const fullName = profile?.fullName ?? profile?.full_name ?? profile?.name ?? user.fullName;
        const lastSeen = profile?.lastSeen ?? profile?.last_seen ?? user.lastSeen;

        updateUser({
          username,
          fullName,
          avatar: profile?.avatar ?? user.avatar,
          bio: profile?.bio ?? user.bio,
          status: profile?.status ?? user.status,
          lastSeen,
          isCreator: Boolean(profile?.isCreator ?? profile?.is_creator ?? user.isCreator),
        });
      })
      .catch(() => null);

    return () => {
      active = false;
    };
  }, [user?.id, user?.username, user?.fullName, user?.avatar, user?.bio, user?.status, user?.lastSeen, user?.isCreator, updateUser]);

  useEffect(() => {
    const onIntroFinished = () => {
      setWaveTitleActive(true);
      window.setTimeout(() => setWaveTitleActive(false), 1100);
    };

    window.addEventListener('alga:intro-finished', onIntroFinished as EventListener);
    return () => window.removeEventListener('alga:intro-finished', onIntroFinished as EventListener);
  }, []);

  const visible = useMemo(() => {
    const needle = q.toLowerCase().trim();
    const base = chats.filter((c) => !c.archived && c.type !== 'ai');
    if (!needle) return base;

    return base.filter((chat) => {
      const peer = chat.participants?.find((p) => p.id !== user?.id) || chat.participants?.[0];
      const contactName = peer ? getContactByUserId(peer.id)?.displayName : '';
      const name = chat.name || contactName || peer?.fullName || peer?.username || '';
      return name.toLowerCase().includes(needle);
    });
  }, [chats, q, getContactByUserId, user?.id]);

  const selectedChat = useMemo(
    () => (selectedChatId ? chats.find((item) => item.id === selectedChatId) || null : null),
    [chats, selectedChatId],
  );

  useEffect(() => {
    if (!selectedChatId) return;
    if (!visible.some((chat) => chat.id === selectedChatId)) {
      setSelectedChatId(null);
      setChatActionsAnchor(null);
    }
  }, [visible, selectedChatId]);

  const clearHoldTimer = () => {
    if (holdTimerRef.current !== null) {
      window.clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  useEffect(() => () => clearHoldTimer(), []);

  const startChatLongPress = (chatId: string) => {
    clearHoldTimer();
    longPressTriggeredRef.current = null;
    holdTimerRef.current = window.setTimeout(() => {
      longPressTriggeredRef.current = chatId;
      setSelectedChatId(chatId);
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate(16);
      }
    }, 3000);
  };

  const handleChatClick = (chatId: string) => {
    if (longPressTriggeredRef.current === chatId) {
      longPressTriggeredRef.current = null;
      return;
    }
    if (selectedChatId) {
      setSelectedChatId(selectedChatId === chatId ? null : chatId);
      return;
    }
    navigate(`/chat/${chatId}`);
  };

  const runSelectedChatAction = async (actionType: 'pin' | 'archive' | 'delete') => {
    const target = selectedChat;
    if (!target) return;
    try {
      if (actionType === 'pin') {
        await pinChat(target.id);
      } else if (actionType === 'archive') {
        if (target.archived) {
          await unarchiveChat(target.id);
        } else {
          await archiveChat(target.id);
        }
      } else {
        await deleteChat(target.id);
      }
      setSelectedChatId(null);
      setChatActionsAnchor(null);
    } catch {
      pushSnackbar({ message: 'Не удалось выполнить действие с чатом', timeout: 2200, tone: 'error' });
    }
  };

  const openSavedFromDrawer = async () => {
    setDrawerOpen(false);
    try {
      let saved = chats.find((c) => c.type === 'saved');

      if (!saved) {
        await loadChats();
        saved = useChatStore.getState().chats.find((c) => c.type === 'saved');
      }

      if (saved) {
        navigate(`/chat/${saved.id}`);
        return;
      }
    } catch {
      // fallback below
    }

    navigate('/favorites');
  };

  if (isLoading) {
    return <Box sx={{ p: 4, display: 'grid', placeItems: 'center' }}><CircularProgress /></Box>;
  }

  return (
    <Box sx={{ p: 1.5, height: '100%', overflow: 'auto', bgcolor: isDark ? 'transparent' : '#FFFFFF' }}>
      <AppHeader
        title={
          <Box
            id="alga-home-anchor"
            sx={{ display: 'inline-flex', alignItems: 'center', gap: 0 }}
          >
            {['A', 'l', 'g', 'a'].map((letter, idx) => (
              <Box
                key={`${letter}-${idx}`}
                component="span"
                sx={{
                  display: 'inline-block',
                  fontWeight: 800,
                  ...(waveTitleActive
                    ? {
                        animation: 'algaWaveIn 620ms ease forwards',
                        animationDelay: `${idx * 85}ms`,
                        opacity: 0.35,
                        transform: 'translateY(6px) scale(0.94)',
                      }
                    : {}),
                  '@keyframes algaWaveIn': {
                    '0%': { opacity: 0.35, transform: 'translateY(6px) scale(0.94)' },
                    '55%': { opacity: 1, transform: 'translateY(-2px) scale(1.04)' },
                    '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
                  },
                }}
              >
                {letter}
              </Box>
            ))}
          </Box>
        }
        showBack={false}
        leftSlot={
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ bgcolor: isDark ? 'rgba(39,57,78,0.75)' : 'rgba(31,163,91,0.12)' }}>
            <Box sx={{ width: 22, display: 'grid', gap: 0.6 }}>
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#2DBB63' }} />
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#FFFFFF', border: '1px solid #D2D7DF' }} />
              <Box sx={{ height: 2.5, borderRadius: 2, bgcolor: '#E8443A' }} />
            </Box>
          </IconButton>
        }
        rightSlot={
          selectedChat ? (
            <IconButton
              onClick={(e) => setChatActionsAnchor(e.currentTarget)}
              sx={{ bgcolor: isDark ? 'rgba(143,177,213,0.2)' : 'rgba(31,163,91,0.12)' }}
            >
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
      />

      <TextField
        fullWidth
        size="small"
        placeholder="Поиск по чатам"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4, bgcolor: isDark ? 'rgba(26,40,56,0.95)' : '#F5F7F8' } }}
      />

      <List sx={{ mt: 1 }}>
        {visible.map((chat) => {
          const rawChat = chat as Chat & Record<string, any>;
          const rawLastMessage = (rawChat.lastMessage ?? rawChat.last_message) as Record<string, any> | undefined;
          const peer = chat.participants?.find((p) => p.id !== user?.id) || chat.participants?.[0];
          const localContactName = peer ? getContactByUserId(peer.id)?.displayName : '';
          const name = getChatName(chat, user?.id, localContactName);
          const date = formatChatDate(chat.lastMessageTime || rawChat.last_message_time || chat.updatedAt || rawChat.updated_at);
          const avatarData = getChatAvatar(chat, user?.id, localContactName);
          const serverUnreadCount = Math.max(0, Number(rawChat.unreadCount ?? rawChat.unread_count ?? 0));
          const lastAuthorId = String(
            rawLastMessage?.userId ??
              rawLastMessage?.user_id ??
              rawLastMessage?.senderId ??
              rawLastMessage?.sender_id ??
              rawChat.lastMessageUserId ??
              rawChat.last_message_user_id ??
              '',
          );
          const localLastMessage = (messages[chat.id] || [])[Math.max((messages[chat.id] || []).length - 1, 0)];
          const rawLastAttachments = Array.isArray(rawLastMessage?.attachments) ? rawLastMessage.attachments : [];
          const localLastAttachments = Array.isArray((localLastMessage as any)?.attachments)
            ? ((localLastMessage as any).attachments as any[])
            : [];
          const allLastAttachments = [...rawLastAttachments, ...localLastAttachments];
          const attachmentHint = allLastAttachments.some((item) => item?.type === 'image')
            ? 'Фото'
            : allLastAttachments.some((item) => item?.type === 'video')
              ? 'Видео'
              : allLastAttachments.length > 0
                ? 'Вложение'
                : '';
          const subtitle =
            chat.lastMessageText ||
            rawChat.last_message_text ||
            attachmentHint ||
            (chat.type === 'saved' ? 'Сообщения самому себе' : '');
          const inferredAuthorId =
            lastAuthorId ||
            String(
              localLastMessage?.userId ??
                rawChat.lastMessageUserId ??
                rawChat.last_message_user_id ??
                '',
            );
          const outgoingFlag = Boolean(
            rawLastMessage?.isOutgoing ??
              rawLastMessage?.outgoing ??
              rawChat.lastMessageOutgoing ??
              rawChat.last_message_outgoing ??
              rawChat.last_message_is_mine,
          );
          const ownLastMessage =
            (!!user?.id && !!inferredAuthorId && String(user.id) === inferredAuthorId) ||
            (!!user?.id && !inferredAuthorId && outgoingFlag && serverUnreadCount === 0);
          const lastMessageStatus = String(
            rawLastMessage?.status ?? localLastMessage?.status ?? rawChat.lastMessageStatus ?? rawChat.last_message_status ?? '',
          ).toLowerCase();
          const isLastReadByPeer =
            lastMessageStatus.includes('read') ||
            lastMessageStatus.includes('seen') ||
            localLastMessage?.status === 'read' ||
            !!(
              rawLastMessage?.readAt ||
              rawLastMessage?.read_at ||
              rawLastMessage?.seenAt ||
              rawLastMessage?.seen_at ||
              rawChat.lastMessageReadAt ||
              rawChat.last_message_read_at ||
              rawChat.last_message_read === true ||
              rawChat.last_message_read === 1
            );
          const hasUnread = chat.type !== 'saved' && serverUnreadCount > 0;
          const unreadCount = hasUnread ? serverUnreadCount : 0;
          const isSelected = selectedChatId === chat.id;

          return (
            <ListItemButton
              key={chat.id}
              onClick={() => handleChatClick(chat.id)}
              onContextMenu={(event) => event.preventDefault()}
              onPointerDown={(event) => {
                if (event.pointerType === 'mouse' && event.button !== 0) return;
                startChatLongPress(chat.id);
              }}
              onPointerUp={clearHoldTimer}
              onPointerLeave={clearHoldTimer}
              onPointerCancel={clearHoldTimer}
              sx={{
                borderBottom: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#E6EBEF',
                py: chatCompactMode ? 0.8 : 1.2,
                borderRadius: 2.4,
                mb: 0.45,
                bgcolor: isSelected
                  ? isDark
                    ? 'rgba(92,136,181,0.36)'
                    : 'rgba(31,163,91,0.2)'
                  : hasUnread
                    ? isDark
                      ? 'rgba(63,117,166,0.28)'
                      : 'rgba(31,163,91,0.13)'
                    : isDark
                      ? 'transparent'
                      : '#FFFFFF',
              }}
            >
              <Avatar
                src={avatarData.src}
                sx={{
                  mr: 1.5,
                  width: chatCompactMode ? 48 : 56,
                  height: chatCompactMode ? 48 : 56,
                  bgcolor: chat.type === 'saved' ? '#D6A21B' : 'primary.main',
                }}
              >
                {chat.type === 'saved' ? <BookmarkRoundedIcon sx={{ fontSize: 30 }} /> : avatarData.initial}
              </Avatar>
              <ListItemText
                primary={<Typography fontWeight={hasUnread ? 800 : 700}>{name}</Typography>}
                secondary={<Typography color="text.secondary" noWrap>{subtitle}</Typography>}
              />
              <Box sx={{ textAlign: 'right' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                  {!!chat.pinned && (
                    <PushPinRoundedIcon sx={{ fontSize: 15, color: isDark ? '#A8CBF0' : '#1A8F51' }} />
                  )}
                  <Typography variant="body2" color="text.secondary">{date}</Typography>
                </Box>
                {hasUnread ? (
                  <Box
                    sx={{
                      mt: 0.6,
                      minWidth: 20,
                      height: 20,
                      px: unreadCount > 9 ? 0.6 : 0,
                      borderRadius: 99,
                      display: 'inline-grid',
                      placeItems: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#fff',
                      bgcolor: isDark ? '#3E92E2' : '#1FA35B',
                    }}
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </Box>
                ) : ownLastMessage && !!subtitle ? (
                  isLastReadByPeer ? (
                    <DoneAllIcon sx={{ fontSize: 16, color: isDark ? '#73B4FF' : '#1C9C58', mt: 0.5 }} />
                  ) : (
                    <DoneRoundedIcon sx={{ fontSize: 16, color: 'text.secondary', mt: 0.5 }} />
                  )
                ) : null}
              </Box>
            </ListItemButton>
          );
        })}
      </List>

      {!visible.length && <Typography sx={{ p: 2, textAlign: 'center' }} color="text.secondary">Чаты не найдены</Typography>}

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          right: 'max(env(safe-area-inset-right), 24px)',
          bottom: 'calc(max(env(safe-area-inset-bottom), 14px) + 96px)',
          boxShadow: isDark ? '0 10px 24px rgba(125,106,227,0.45)' : '0 10px 24px rgba(31,163,91,0.35)',
        }}
        onClick={() => navigate('/add-contact')}
      >
        <EditIcon />
      </Fab>

      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 'min(320px, 88vw)', height: '100%', bgcolor: isDark ? '#0E1B2A' : '#F7FAF8', display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              pt: 'max(env(safe-area-inset-top), 12px)',
              px: 2,
              pb: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
              background: isDark ? 'linear-gradient(160deg, #13283D, #0E1B2A)' : 'linear-gradient(160deg, #1FA35B, #22C36A)',
            }}
          >
            <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center' }}>
              <Avatar src={user?.avatar} onClick={() => { if (user?.id) { navigate(`/user/${user.id}`); setDrawerOpen(false); } }} sx={{ width: 58, height: 58, bgcolor: 'primary.main', flexShrink: 0, cursor: 'pointer' }}>
                {(user?.fullName || user?.username || 'A').slice(0, 1).toUpperCase()}
              </Avatar>
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: '#fff', fontSize: 18 }} noWrap>
                  {user?.fullName || 'Пользователь'}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }} noWrap>
                  @{user?.username || 'username'}
                </Typography>
              </Box>
              <IconButton
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                size="small"
                sx={{
                  border: '1px solid',
                  borderColor: 'rgba(255,255,255,0.45)',
                  color: '#fff',
                  bgcolor: 'rgba(255,255,255,0.12)',
                  flexShrink: 0,
                }}
              >
                {isDark ? <LightModeOutlinedIcon sx={{ color: '#fff' }} /> : <DarkModeOutlinedIcon sx={{ color: '#fff' }} />}
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ p: 1.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Box
              sx={{
                borderRadius: 3,
                p: 0.8,
                border: '1px solid',
                borderColor: isDark ? 'rgba(175,193,217,0.18)' : 'rgba(31,163,91,0.2)',
                bgcolor: isDark ? 'rgba(17,33,50,0.75)' : '#FFFFFF',
                boxShadow: isDark ? '0 8px 22px rgba(0,0,0,0.28)' : '0 8px 22px rgba(31,163,91,0.12)',
              }}
            >
              <Typography
                sx={{
                  px: 1.2,
                  pt: 0.6,
                  pb: 0.7,
                  fontSize: 12,
                  letterSpacing: 0.45,
                  textTransform: 'uppercase',
                  color: isDark ? '#8FA8C2' : '#5E7168',
                }}
              >
                Меню
              </Typography>
              <List sx={{ p: 0 }}>
                <ListItemButton
                  sx={menuItemSx}
                  onClick={() => {
                    if (user?.id) navigate(`/user/${user.id}`);
                    setDrawerOpen(false);
                  }}
                >
                  <ListItemIcon><PersonIcon /></ListItemIcon><ListItemText primary="Мой профиль" />
                </ListItemButton>
                <ListItemButton sx={menuItemSx} onClick={() => { navigate('/contacts'); setDrawerOpen(false); }}>
                  <ListItemIcon><Groups2RoundedIcon /></ListItemIcon><ListItemText primary="Контакты" />
                </ListItemButton>
                <ListItemButton sx={menuItemSx} onClick={() => { void openSavedFromDrawer(); }}>
                  <ListItemIcon><BookmarkRoundedIcon /></ListItemIcon><ListItemText primary="Избранное" />
                </ListItemButton>
                <ListItemButton sx={menuItemSx} onClick={() => { navigate('/settings'); setDrawerOpen(false); }}>
                  <ListItemIcon><SettingsRoundedIcon /></ListItemIcon><ListItemText primary="Настройки" />
                </ListItemButton>
                <ListItemButton sx={menuItemSx} onClick={() => { navigate('/support'); setDrawerOpen(false); }}>
                  <ListItemIcon><PsychologyRoundedIcon /></ListItemIcon><ListItemText primary="AI чат" />
                </ListItemButton>
                <ListItemButton sx={menuItemSx} onClick={() => { navigate('/game'); setDrawerOpen(false); }}>
                  <ListItemIcon><SportsEsportsRoundedIcon /></ListItemIcon><ListItemText primary="Pyrga Titan" />
                </ListItemButton>
                {isCreator && (
                  <ListItemButton sx={menuItemSx} onClick={() => { navigate('/admin'); setDrawerOpen(false); }}>
                    <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon><ListItemText primary="Инструменты" />
                  </ListItemButton>
                )}
                <ListItemButton
                  sx={{
                    ...menuItemSx,
                    mt: 0.4,
                    mb: 0,
                    '& .MuiTypography-root': { color: '#E44B4B', fontWeight: 600 },
                  }}
                  onClick={() => {
                    setDrawerOpen(false);
                    setShowLogoutDialog(true);
                  }}
                >
                  <ListItemText primary="Выйти" />
                </ListItemButton>
              </List>
            </Box>
            <Typography
              sx={{
                px: 1.2,
                mt: 'auto',
                pt: 1.1,
                pb: 0.2,
                textAlign: 'center',
                fontSize: 12,
                color: isDark ? 'rgba(188,206,227,0.56)' : 'rgba(56,74,67,0.54)',
                cursor: 'pointer',
              }}
              onClick={() => {
                setDrawerOpen(false);
                navigate('/author-support');
              }}
            >
              Поддержка автора
            </Typography>
          </Box>
        </Box>
      </Drawer>

      <Menu anchorEl={chatActionsAnchor} open={!!chatActionsAnchor} onClose={() => setChatActionsAnchor(null)}>
        <MenuItem
          onClick={() => {
            void runSelectedChatAction('pin');
          }}
        >
          {selectedChat?.pinned ? 'Открепить' : 'Закрепить'}
        </MenuItem>
        {selectedChat?.type !== 'saved' && (
          <MenuItem
            onClick={() => {
              void runSelectedChatAction('archive');
            }}
          >
            {selectedChat?.archived ? 'Вернуть из архива' : 'В архив'}
          </MenuItem>
        )}
        {selectedChat?.type !== 'saved' && (
          <MenuItem
            sx={{ color: 'error.main' }}
            onClick={() => {
              void runSelectedChatAction('delete');
            }}
          >
            Удалить чат
          </MenuItem>
        )}
      </Menu>

      <Dialog open={showLogoutDialog} onClose={() => setShowLogoutDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ color: 'error.main', fontWeight: 800 }}>Выйти из аккаунта?</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">Вы всегда сможете войти снова по логину и паролю.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogoutDialog(false)}>Нет</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              setShowLogoutDialog(false);
              logout();
            }}
          >
            Да
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

