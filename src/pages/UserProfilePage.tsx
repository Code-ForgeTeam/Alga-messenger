import { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { chatApi, userApi } from '../lib/api';
import type { Chat, User } from '../lib/types';
import { useAuthStore } from '../stores/authStore';
import { useChatStore } from '../stores/chatStore';
import { useSnackbarStore } from '../stores/snackbarStore';
import { AppHeader } from '../components/AppHeader';

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

const findPrivateChatWithUser = (chats: Chat[], peerId: string): Chat | undefined =>
  chats.find((chat) => chat.type === 'private' && chat.participants.some((p) => p.id === peerId));

export default function UserProfilePage() {
  const { userId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<'message' | 'block' | 'delete' | null>(null);

  const navigate = useNavigate();
  const pushSnackbar = useSnackbarStore((s) => s.push);
  const myUser = useAuthStore((s) => s.user);
  const { chats, createChat, deleteChat, loadChats } = useChatStore();

  const incomingChatId = searchParams.get('chatId') || '';

  useEffect(() => {
    let active = true;
    setLoading(true);

    userApi
      .getById(userId)
      .then((payload) => {
        if (active) setUser(payload);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [userId]);

  const isSelfProfile = myUser?.id === userId;

  const privateChat = useMemo(() => {
    if (!userId) return undefined;
    return findPrivateChatWithUser(chats, userId);
  }, [chats, userId]);

  const resolvedChatId = incomingChatId || privateChat?.id || '';
  const isBlocked = !!privateChat?.blocked;

  const ensurePrivateChat = async (): Promise<Chat> => {
    if (incomingChatId) {
      const existing = chats.find((c) => c.id === incomingChatId);
      if (existing) return existing;
    }

    if (privateChat) return privateChat;
    return createChat('', 'private', [userId]);
  };

  const openChat = async () => {
    if (isSelfProfile) return;
    setActionLoading('message');
    try {
      const chat = await ensurePrivateChat();
      navigate(`/chat/${chat.id}`);
    } finally {
      setActionLoading(null);
    }
  };

  const toggleBlockUser = async () => {
    if (!user) return;

    setActionLoading('block');
    try {
      const chat = await ensurePrivateChat();
      if (isBlocked) {
        await chatApi.unblock(chat.id, user.id);
        pushSnackbar({ message: 'Пользователь разблокирован', timeout: 2200 });
      } else {
        await chatApi.block(chat.id, user.id);
        pushSnackbar({ message: 'Пользователь заблокирован', timeout: 2200 });
      }
      await loadChats();
    } catch {
      pushSnackbar({ message: 'Не удалось изменить блокировку', timeout: 2600 });
    } finally {
      setActionLoading(null);
    }
  };

  const removeChat = async () => {
    const chatId = resolvedChatId;
    if (!chatId) return;
    if (!window.confirm('Удалить этот чат?')) return;

    setActionLoading('delete');
    try {
      await deleteChat(chatId);
      pushSnackbar({ message: 'Чат удален', timeout: 2200 });
      navigate('/chats');
    } catch {
      pushSnackbar({ message: 'Не удалось удалить чат', timeout: 2600 });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ p: 2 }}>
        <AppHeader title="Профиль" />
        <Typography variant="h6">Пользователь не найден</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2, pb: 12 }}>
      <AppHeader title="Профиль" />

      <Box sx={{ display: 'grid', justifyItems: 'center', textAlign: 'center', mt: 1 }}>
        <Avatar src={user.avatar} sx={{ width: 110, height: 110, bgcolor: 'primary.main', mb: 1.5 }}>
          {(user.fullName || user.username || '?').slice(0, 1).toUpperCase()}
        </Avatar>

        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          {user.fullName || user.username}
        </Typography>
        <Typography color="text.secondary">@{user.username}</Typography>
        <Typography sx={{ mt: 0.5 }} color={user.status === 'online' ? 'success.main' : 'text.secondary'}>
          {formatPresence(user.status, user.lastSeen)}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle2" color="text.secondary">
        Описание
      </Typography>
      <Typography sx={{ mt: 0.5, whiteSpace: 'pre-wrap' }}>
        {user.bio?.trim() || 'Описание пока не добавлено'}
      </Typography>

      {!isSelfProfile ? (
        <Stack direction="column" spacing={1.2} sx={{ mt: 4 }}>
          <Button variant="contained" onClick={openChat} disabled={actionLoading !== null}>
            {actionLoading === 'message' ? 'Открываем чат...' : 'Написать сообщение'}
          </Button>
          <Button color={isBlocked ? 'success' : 'warning'} variant="outlined" onClick={toggleBlockUser} disabled={actionLoading !== null}>
            {actionLoading === 'block'
              ? 'Сохраняем...'
              : isBlocked
                ? 'Разблокировать пользователя'
                : 'Заблокировать пользователя'}
          </Button>
          <Button color="error" variant="outlined" onClick={removeChat} disabled={actionLoading !== null || !resolvedChatId}>
            {actionLoading === 'delete' ? 'Удаляем...' : 'Удалить чат'}
          </Button>
        </Stack>
      ) : (
        <Stack direction="column" spacing={1.2} sx={{ mt: 4 }}>
          <Button variant="contained" onClick={() => navigate('/edit-profile')}>
            Редактировать профиль
          </Button>
        </Stack>
      )}
    </Box>
  );
}
