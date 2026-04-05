import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../lib/api';
import { AppHeader } from '../components/AppHeader';
import { useChatStore } from '../stores/chatStore';
import { useContactsStore } from '../stores/contactsStore';
import type { User } from '../lib/types';
import { useTheme } from '@mui/material/styles';
import { useAuthStore } from '../stores/authStore';
import { useSnackbarStore } from '../stores/snackbarStore';

const MAX_GROUP_MEMBERS = 15;

type GroupCandidate = {
  id: string;
  username: string;
  fullName: string;
  avatar?: string;
};

const toCandidate = (user: Partial<User> | null | undefined): GroupCandidate | null => {
  const id = String(user?.id || '').trim();
  if (!id) return null;
  return {
    id,
    username: String(user?.username || '').trim(),
    fullName: String(user?.fullName || '').trim(),
    avatar: user?.avatar,
  };
};

export default function AddContactPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [groupOpen, setGroupOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupQuery, setGroupQuery] = useState('');
  const [groupLoading, setGroupLoading] = useState(false);
  const [groupSearchUsers, setGroupSearchUsers] = useState<User[]>([]);
  const [groupSelectedIds, setGroupSelectedIds] = useState<string[]>([]);

  const currentUser = useAuthStore((s) => s.user);
  const createChat = useChatStore((s) => s.createChat);
  const addContact = useContactsStore((s) => s.addContact);
  const contacts = useContactsStore((s) => s.contacts);
  const pushSnackbar = useSnackbarStore((s) => s.push);

  const maxSelectable = Math.max(1, MAX_GROUP_MEMBERS - 1);

  const contactCandidates = useMemo(() => {
    const list: GroupCandidate[] = [];
    const seen = new Set<string>();
    for (const contact of contacts) {
      const candidate = toCandidate({
        ...contact.user,
        fullName: contact.displayName || contact.user?.fullName || '',
      });
      if (!candidate) continue;
      if (currentUser?.id && candidate.id === currentUser.id) continue;
      if (seen.has(candidate.id)) continue;
      seen.add(candidate.id);
      list.push(candidate);
    }
    return list;
  }, [contacts, currentUser?.id]);

  const mergedGroupCandidates = useMemo(() => {
    const map = new Map<string, GroupCandidate>();
    for (const contact of contactCandidates) {
      map.set(contact.id, contact);
    }
    for (const user of groupSearchUsers) {
      const candidate = toCandidate(user);
      if (!candidate) continue;
      if (currentUser?.id && candidate.id === currentUser.id) continue;
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
    }
    return Array.from(map.values());
  }, [contactCandidates, groupSearchUsers, currentUser?.id]);

  const selectedGroupUsers = useMemo(() => {
    const byId = new Map(mergedGroupCandidates.map((item) => [item.id, item]));
    return groupSelectedIds
      .map((id) => byId.get(id))
      .filter((value): value is GroupCandidate => !!value);
  }, [groupSelectedIds, mergedGroupCandidates]);

  const search = async (value: string) => {
    const queryValue = value.replace('@', '').trim();
    setQuery(value);

    if (queryValue.length < 2) {
      setUsers([]);
      return;
    }

    setLoading(true);
    try {
      const result = await userApi.search(queryValue);
      if (Array.isArray(result) && result.length > 0) {
        setUsers(result);
      } else {
        try {
          const exact = await userApi.getByUsername(queryValue);
          setUsers(exact ? [exact] : []);
        } catch {
          setUsers([]);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const searchGroupUsers = async (value: string) => {
    const queryValue = value.replace('@', '').trim();
    setGroupQuery(value);

    if (queryValue.length < 2) {
      setGroupSearchUsers([]);
      return;
    }

    setGroupLoading(true);
    try {
      const result = await userApi.search(queryValue);
      if (Array.isArray(result) && result.length > 0) {
        setGroupSearchUsers(result);
      } else {
        try {
          const exact = await userApi.getByUsername(queryValue);
          setGroupSearchUsers(exact ? [exact] : []);
        } catch {
          setGroupSearchUsers([]);
        }
      }
    } finally {
      setGroupLoading(false);
    }
  };

  const openChatWithUser = async (user: User) => {
    addContact(user);
    const chat = await createChat('', 'private', [user.id]);
    navigate(`/chat/${chat.id}`);
  };

  const toggleGroupUser = (candidate: GroupCandidate) => {
    setGroupSelectedIds((prev) => {
      if (prev.includes(candidate.id)) {
        return prev.filter((id) => id !== candidate.id);
      }
      if (prev.length >= maxSelectable) {
        pushSnackbar({
          message: `Лимит группы: ${MAX_GROUP_MEMBERS} участников`,
          timeout: 2300,
          tone: 'error',
        });
        return prev;
      }
      return [...prev, candidate.id];
    });
  };

  const resetGroupDialog = () => {
    setGroupOpen(false);
    setGroupName('');
    setGroupQuery('');
    setGroupSearchUsers([]);
    setGroupSelectedIds([]);
  };

  const createGroup = async () => {
    const name = groupName.trim();
    if (!name) {
      pushSnackbar({ message: 'Введите название группы', timeout: 2200, tone: 'error' });
      return;
    }
    if (groupSelectedIds.length < 1) {
      pushSnackbar({ message: 'Добавьте минимум одного участника', timeout: 2200, tone: 'error' });
      return;
    }

    try {
      for (const member of selectedGroupUsers) {
        addContact({
          id: member.id,
          username: member.username,
          fullName: member.fullName || (member.username ? `@${member.username}` : 'Пользователь'),
          avatar: member.avatar,
        });
      }

      const chat = await createChat(name, 'group', groupSelectedIds);
      resetGroupDialog();
      navigate(`/chat/${chat.id}`);
    } catch {
      pushSnackbar({ message: 'Не удалось создать группу', timeout: 2400, tone: 'error' });
    }
  };

  return (
    <Box sx={{ p: 2, pb: 'max(env(safe-area-inset-bottom), 88px)', height: '100%', overflowY: 'auto' }}>
      <AppHeader title="Новый чат" />

      <TextField
        autoFocus
        fullWidth
        size="small"
        placeholder="Поиск по имени пользователя"
        value={query}
        onChange={(e) => search(e.target.value)}
        InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 5,
            bgcolor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.88)',
          },
        }}
      />

      <Button
        fullWidth
        sx={{ mt: 1, borderRadius: 3 }}
        variant="outlined"
        startIcon={<GroupAddRoundedIcon />}
        onClick={() => setGroupOpen(true)}
      >
        Создать группу
      </Button>

      {loading && <CircularProgress sx={{ mt: 2 }} />}

      {!loading && query.trim().length < 2 && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 8, fontSize: 16 }}>
          Введите минимум 2 символа для поиска
        </Typography>
      )}

      {!loading && query.trim().length >= 2 && users.length === 0 && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 8, fontSize: 16 }}>
          Пользователь не найден
        </Typography>
      )}

      <List>
        {users.map((u) => (
          <ListItemButton key={u.id} onClick={() => openChatWithUser(u)}>
            <ListItemText primary={u.fullName} secondary={`@${u.username}`} />
          </ListItemButton>
        ))}
      </List>

      <Dialog open={groupOpen} onClose={resetGroupDialog} fullWidth maxWidth="sm">
        <DialogTitle>Создать группу</DialogTitle>
        <DialogContent>
          <TextField
            size="small"
            label="Название группы"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            fullWidth
            sx={{ mt: 0.4 }}
          />

          <TextField
            size="small"
            label="Поиск участников (@username)"
            value={groupQuery}
            onChange={(e) => searchGroupUsers(e.target.value)}
            fullWidth
            sx={{ mt: 1.2 }}
            InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
          />

          <Typography sx={{ mt: 1.1, fontSize: 12, color: 'text.secondary' }}>
            Участников выбрано: {groupSelectedIds.length + 1}/{MAX_GROUP_MEMBERS} (включая вас)
          </Typography>

          {!!selectedGroupUsers.length && (
            <Box sx={{ mt: 1, display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
              {selectedGroupUsers.map((item) => (
                <Chip
                  key={item.id}
                  label={item.fullName || `@${item.username}`}
                  onDelete={() => toggleGroupUser(item)}
                />
              ))}
            </Box>
          )}

          <Box sx={{ mt: 1.2, border: '1px solid', borderColor: 'divider', borderRadius: 2.5, maxHeight: 340, overflowY: 'auto' }}>
            {groupLoading ? (
              <Box sx={{ display: 'grid', placeItems: 'center', py: 3 }}>
                <CircularProgress size={22} />
              </Box>
            ) : mergedGroupCandidates.length === 0 ? (
              <Typography sx={{ py: 3, textAlign: 'center', color: 'text.secondary' }}>
                Нет контактов для добавления
              </Typography>
            ) : (
              <List disablePadding>
                {mergedGroupCandidates.map((candidate) => {
                  const checked = groupSelectedIds.includes(candidate.id);
                  return (
                    <ListItemButton
                      key={candidate.id}
                      onClick={() => toggleGroupUser(candidate)}
                      sx={{ py: 0.8 }}
                    >
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
          <Button onClick={resetGroupDialog}>Отмена</Button>
          <Button variant="contained" onClick={createGroup}>
            Создать
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
