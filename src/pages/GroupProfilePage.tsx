import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { useNavigate, useParams } from 'react-router-dom';
import { chatApi, uploadApi, userApi } from '../lib/api';
import type { User } from '../lib/types';
import { AppHeader } from '../components/AppHeader';
import { useAuthStore } from '../stores/authStore';
import { useChatStore } from '../stores/chatStore';
import { useContactsStore } from '../stores/contactsStore';
import { useSnackbarStore } from '../stores/snackbarStore';

const GROUP_LIMIT = 15;

type Candidate = {
  id: string;
  username: string;
  fullName: string;
  avatar?: string;
};

const toCandidate = (user: Partial<User> | null | undefined): Candidate | null => {
  const id = String(user?.id || '').trim();
  if (!id) return null;
  return {
    id,
    username: String(user?.username || '').trim(),
    fullName: String(user?.fullName || '').trim(),
    avatar: user?.avatar,
  };
};

const normalizeUser = (user: User): User => ({
  ...user,
  fullName: String(user.fullName || user.username || 'Пользователь').trim(),
  username: String(user.username || '').trim(),
});

export default function GroupProfilePage() {
  const { chatId = '' } = useParams();
  const navigate = useNavigate();
  const pushSnackbar = useSnackbarStore((s) => s.push);
  const me = useAuthStore((s) => s.user);
  const { chats, loadChats, deleteChat } = useChatStore();
  const contacts = useContactsStore((s) => s.contacts);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [renameDraft, setRenameDraft] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isRemovingMemberId, setIsRemovingMemberId] = useState<string | null>(null);
  const [avatarPreviewOpen, setAvatarPreviewOpen] = useState(false);

  const chat = useMemo(
    () => chats.find((item) => item.id === chatId && item.type === 'group') || null,
    [chats, chatId],
  );

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    loadChats({ silent: true })
      .catch(() => null)
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => {
      active = false;
    };
  }, [loadChats, chatId]);

  useEffect(() => {
    setRenameDraft(String(chat?.name || '').trim());
  }, [chat?.name]);

  const canManageGroup = Boolean(chat?.isAdmin);

  const members = useMemo(() => {
    const map = new Map<string, User>();
    if (me?.id) {
      map.set(
        me.id,
        normalizeUser({
          ...me,
          fullName: me.fullName || 'Вы',
          isAdmin: Boolean(chat?.isAdmin),
        }),
      );
    }
    (chat?.participants || []).forEach((participant) => {
      map.set(participant.id, normalizeUser(participant));
    });
    return Array.from(map.values());
  }, [chat?.participants, chat?.isAdmin, me]);

  const admins = useMemo(() => members.filter((item) => item.isAdmin), [members]);
  const membersIds = useMemo(() => new Set(members.map((item) => item.id)), [members]);
  const membersCount = members.length;
  const canAddCount = Math.max(0, GROUP_LIMIT - membersCount);

  const contactCandidates = useMemo(() => {
    const list: Candidate[] = [];
    const seen = new Set<string>();
    for (const contact of contacts) {
      const candidate = toCandidate({
        ...contact.user,
        fullName: contact.displayName || contact.user?.fullName || '',
      });
      if (!candidate) continue;
      if (seen.has(candidate.id)) continue;
      if (membersIds.has(candidate.id)) continue;
      seen.add(candidate.id);
      list.push(candidate);
    }
    return list;
  }, [contacts, membersIds]);

  const mergedCandidates = useMemo(() => {
    const map = new Map<string, Candidate>();
    contactCandidates.forEach((candidate) => map.set(candidate.id, candidate));

    searchedUsers.forEach((user) => {
      const candidate = toCandidate(user);
      if (!candidate) return;
      if (membersIds.has(candidate.id)) return;
      const existing = map.get(candidate.id);
      if (existing) {
        map.set(candidate.id, {
          ...existing,
          fullName: existing.fullName || candidate.fullName,
          username: existing.username || candidate.username,
          avatar: existing.avatar || candidate.avatar,
        });
      } else {
        map.set(candidate.id, candidate);
      }
    });

    return Array.from(map.values());
  }, [contactCandidates, searchedUsers, membersIds]);

  const searchUsers = async (value: string) => {
    const queryValue = value.replace('@', '').trim();
    setQuery(value);
    if (queryValue.length < 2) {
      setSearchedUsers([]);
      return;
    }

    setIsSearching(true);
    try {
      const result = await userApi.search(queryValue);
      if (Array.isArray(result) && result.length > 0) {
        setSearchedUsers(result);
      } else {
        try {
          const exact = await userApi.getByUsername(queryValue);
          setSearchedUsers(exact ? [exact] : []);
        } catch {
          setSearchedUsers([]);
        }
      }
    } finally {
      setIsSearching(false);
    }
  };

  const resetAddDialog = () => {
    setAddDialogOpen(false);
    setQuery('');
    setSearchedUsers([]);
    setSelectedIds([]);
  };

  const toggleCandidate = (candidateId: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(candidateId)) {
        return prev.filter((id) => id !== candidateId);
      }
      if (prev.length >= canAddCount) {
        pushSnackbar({
          message: `Лимит участников: ${GROUP_LIMIT}`,
          timeout: 2200,
          tone: 'error',
        });
        return prev;
      }
      return [...prev, candidateId];
    });
  };

  const addParticipants = async () => {
    if (!chat) return;
    if (!canManageGroup) {
      pushSnackbar({ message: 'Добавлять участников может только админ группы', timeout: 2400, tone: 'error' });
      return;
    }
    const ids = selectedIds.filter((id) => !membersIds.has(id));
    if (!ids.length) {
      pushSnackbar({ message: 'Выберите участников', timeout: 2200, tone: 'error' });
      return;
    }

    setIsAdding(true);
    try {
      await chatApi.addParticipants(chat.id, ids);
      await loadChats({ silent: true });
      pushSnackbar({ message: 'Участники добавлены', timeout: 2200, tone: 'success' });
      resetAddDialog();
    } catch (error: any) {
      pushSnackbar({
        message: error?.response?.data?.error || 'Не удалось добавить участников',
        timeout: 2600,
        tone: 'error',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const saveGroupName = async () => {
    if (!chat || !canManageGroup) return;
    const normalized = renameDraft.trim();
    if (!normalized) {
      pushSnackbar({ message: 'Введите название группы', timeout: 2200, tone: 'error' });
      return;
    }
    if (normalized === String(chat.name || '').trim()) return;

    setIsSavingName(true);
    try {
      await chatApi.updateGroup(chat.id, { name: normalized });
      await loadChats({ silent: true });
      pushSnackbar({ message: 'Название группы сохранено', timeout: 2200, tone: 'success' });
    } catch (error: any) {
      pushSnackbar({
        message: error?.response?.data?.error || 'Не удалось обновить название группы',
        timeout: 2600,
        tone: 'error',
      });
    } finally {
      setIsSavingName(false);
    }
  };

  const uploadGroupAvatar = async (file: File | null | undefined) => {
    if (!chat || !canManageGroup || !file) return;
    setIsUploadingAvatar(true);
    try {
      const uploaded = await uploadApi.uploadGroupAvatar(file);
      const nextAvatar = String(uploaded?.url || '').trim();
      if (!nextAvatar) throw new Error('empty-url');
      await chatApi.updateGroup(chat.id, { avatar: nextAvatar });
      await loadChats({ silent: true });
      pushSnackbar({ message: 'Аватар группы обновлен', timeout: 2200, tone: 'success' });
    } catch (error: any) {
      pushSnackbar({
        message: error?.response?.data?.error || 'Не удалось загрузить аватар группы',
        timeout: 2600,
        tone: 'error',
      });
    } finally {
      setIsUploadingAvatar(false);
      if (avatarInputRef.current) avatarInputRef.current.value = '';
    }
  };

  const removeParticipant = async (member: User) => {
    if (!chat || !canManageGroup) return;
    if (!member?.id || member.id === me?.id) return;
    const label = member.fullName || `@${member.username}`;
    if (!window.confirm(`Удалить ${label} из группы?`)) return;

    setIsRemovingMemberId(member.id);
    try {
      await chatApi.removeParticipant(chat.id, member.id);
      await loadChats({ silent: true });
      pushSnackbar({ message: 'Участник удален из группы', timeout: 2200, tone: 'success' });
    } catch (error: any) {
      pushSnackbar({
        message: error?.response?.data?.error || 'Не удалось удалить участника',
        timeout: 2600,
        tone: 'error',
      });
    } finally {
      setIsRemovingMemberId(null);
    }
  };

  const leaveGroup = async () => {
    if (!chat) return;
    if (!window.confirm('Покинуть группу?')) return;

    setIsLeaving(true);
    try {
      await deleteChat(chat.id);
      pushSnackbar({ message: 'Вы покинули группу', timeout: 2200, tone: 'success' });
      navigate('/chats');
    } catch {
      pushSnackbar({ message: 'Не удалось покинуть группу', timeout: 2600, tone: 'error' });
    } finally {
      setIsLeaving(false);
    }
  };

  if (isLoading && !chat) {
    return (
      <Box sx={{ p: 3, display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!chat) {
    return (
      <Box sx={{ p: 2 }}>
        <AppHeader title="Группа" />
        <Typography sx={{ mt: 1 }}>Группа не найдена</Typography>
        <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate('/chats')}>
          Назад
        </Button>
      </Box>
    );
  }

  const title = String(chat.name || 'Группа').trim() || 'Группа';
  const adminsLabel = admins
    .map((item) => (item.id === me?.id ? 'Вы' : item.fullName || `@${item.username}`))
    .join(', ');

  return (
    <Box sx={{ p: 2, pb: 'max(env(safe-area-inset-bottom), 96px)', height: '100%', overflowY: 'auto' }}>
      <AppHeader title="Группа" />

      <input
        ref={avatarInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(event) => {
          const file = event.target.files?.[0];
          void uploadGroupAvatar(file);
        }}
      />

      <Box sx={{ mt: 1, display: 'grid', justifyItems: 'center', textAlign: 'center' }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={chat.avatar}
            onClick={() => {
              if (chat.avatar) setAvatarPreviewOpen(true);
            }}
            sx={{
              width: 94,
              height: 94,
              bgcolor: '#5E5BF0',
              mb: 1.2,
              cursor: chat.avatar ? 'zoom-in' : 'default',
            }}
          >
            {title.slice(0, 1).toUpperCase()}
          </Avatar>
          {canManageGroup && (
            <IconButton
              onClick={() => avatarInputRef.current?.click()}
              disabled={isUploadingAvatar}
              sx={{
                position: 'absolute',
                right: -2,
                bottom: 6,
                width: 30,
                height: 30,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': { bgcolor: 'background.default' },
              }}
            >
              <CameraAltRoundedIcon sx={{ fontSize: 16 }} />
            </IconButton>
          )}
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 700 }}>{title}</Typography>
        <Typography color="text.secondary" sx={{ mt: 0.2 }}>
          {membersCount} из {GROUP_LIMIT} участников
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5, fontSize: 13 }}>
          Админ: {adminsLabel || 'не назначен'}
        </Typography>
      </Box>

      {canManageGroup && (
        <Box sx={{ mt: 1.8, display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            size="small"
            fullWidth
            label="Название группы"
            value={renameDraft}
            onChange={(event) => setRenameDraft(event.target.value)}
          />
          <Button
            variant="contained"
            startIcon={<EditRoundedIcon />}
            onClick={saveGroupName}
            disabled={isSavingName}
          >
            {isSavingName ? 'Сохраняем...' : 'Сохранить'}
          </Button>
        </Box>
      )}

      <Box sx={{ mt: 2, display: 'grid', gap: 1 }}>
        <Button
          variant="contained"
          startIcon={<GroupAddRoundedIcon />}
          onClick={() => setAddDialogOpen(true)}
          disabled={!canManageGroup || canAddCount <= 0}
        >
          Добавить участников
        </Button>
        <Button color="error" variant="outlined" onClick={leaveGroup} disabled={isLeaving}>
          {isLeaving ? 'Выходим...' : 'Покинуть группу'}
        </Button>
      </Box>

      <Typography sx={{ mt: 2.2, mb: 0.8, fontWeight: 700 }}>
        Участники
      </Typography>
      <List sx={{ p: 0 }}>
        {members.map((member) => {
          const isSelf = member.id === me?.id;
          const canRemove = canManageGroup && !isSelf;
          return (
            <ListItemButton
              key={member.id}
              onClick={() => navigate(`/user/${member.id}?chatId=${encodeURIComponent(chat.id)}`)}
              sx={{ borderRadius: 2, mb: 0.45 }}
            >
              <Avatar src={member.avatar} sx={{ width: 38, height: 38, mr: 1.2, bgcolor: 'primary.main' }}>
                {(member.fullName || member.username || 'U').slice(0, 1).toUpperCase()}
              </Avatar>
              <ListItemText
                primary={isSelf ? `${member.fullName} (Вы)` : member.fullName}
                secondary={member.username ? `@${member.username}` : ''}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                {member.isAdmin && (
                  <Typography
                    variant="caption"
                    sx={{
                      px: 0.7,
                      py: 0.25,
                      borderRadius: 1,
                      fontWeight: 700,
                      bgcolor: 'rgba(250,187,58,0.2)',
                      color: '#8C5B00',
                    }}
                  >
                    Админ
                  </Typography>
                )}

                {canRemove && (
                  <Button
                    size="small"
                    color="error"
                    onClick={(event) => {
                      event.stopPropagation();
                      void removeParticipant(member);
                    }}
                    disabled={isRemovingMemberId === member.id}
                  >
                    {isRemovingMemberId === member.id ? '...' : 'Удалить'}
                  </Button>
                )}
              </Box>
            </ListItemButton>
          );
        })}
      </List>

      <Dialog
        open={avatarPreviewOpen}
        onClose={() => setAvatarPreviewOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent
          sx={{
            p: 0,
            bgcolor: '#000',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          {chat.avatar ? (
            <Box
              component="img"
              src={chat.avatar}
              alt="group-avatar"
              sx={{ width: '100%', maxHeight: '80dvh', objectFit: 'contain' }}
            />
          ) : null}
        </DialogContent>
        <DialogActions sx={{ px: 1.5, py: 1 }}>
          <Button onClick={() => setAvatarPreviewOpen(false)}>Закрыть</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialogOpen} onClose={resetAddDialog} fullWidth maxWidth="sm">
        <DialogTitle>Добавить участников</DialogTitle>
        <DialogContent>
          <TextField
            size="small"
            fullWidth
            label="Поиск по @username"
            value={query}
            onChange={(event) => searchUsers(event.target.value)}
            sx={{ mt: 0.5 }}
            InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
          />
          <Typography sx={{ mt: 1, fontSize: 12, color: 'text.secondary' }}>
            Можно добавить еще: {canAddCount}
          </Typography>
          <Box sx={{ mt: 1, border: '1px solid', borderColor: 'divider', borderRadius: 2.5, maxHeight: 320, overflowY: 'auto' }}>
            {isSearching ? (
              <Box sx={{ display: 'grid', placeItems: 'center', py: 3 }}>
                <CircularProgress size={22} />
              </Box>
            ) : mergedCandidates.length === 0 ? (
              <Typography sx={{ py: 3, textAlign: 'center', color: 'text.secondary' }}>
                Нет доступных пользователей
              </Typography>
            ) : (
              <List disablePadding>
                {mergedCandidates.map((candidate) => {
                  const checked = selectedIds.includes(candidate.id);
                  return (
                    <ListItemButton key={candidate.id} onClick={() => toggleCandidate(candidate.id)}>
                      <ListItemIcon sx={{ minWidth: 38 }}>
                        <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple />
                      </ListItemIcon>
                      <ListItemText
                        primary={candidate.fullName || `@${candidate.username}`}
                        secondary={candidate.username ? `@${candidate.username}` : 'без username'}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetAddDialog} disabled={isAdding}>Отмена</Button>
          <Button variant="contained" onClick={addParticipants} disabled={isAdding || selectedIds.length === 0}>
            {isAdding ? 'Добавляем...' : 'Добавить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
