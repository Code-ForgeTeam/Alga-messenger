import { useState } from 'react';
import { Box, CircularProgress, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../lib/api';
import { AppHeader } from '../components/AppHeader';
import { useChatStore } from '../stores/chatStore';
import { useContactsStore } from '../stores/contactsStore';
import type { User } from '../lib/types';
import { useTheme } from '@mui/material/styles';

export default function AddContactPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const createChat = useChatStore((s) => s.createChat);
  const addContact = useContactsStore((s) => s.addContact);

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

  const openChatWithUser = async (user: User) => {
    addContact(user);
    const chat = await createChat('', 'private', [user.id]);
    navigate(`/chat/${chat.id}`);
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
    </Box>
  );
}
