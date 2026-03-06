import { useState } from 'react';
import { Box, CircularProgress, IconButton, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../lib/api';
import { useContactsStore } from '../stores/contactsStore';
import type { User } from '../lib/types';

export default function AddContactPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
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

  return (
    <Box sx={{ p: 2, height: '100%', overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
        <TextField
          autoFocus
          fullWidth
          size="small"
          placeholder="Поиск по имени пользователя..."
          value={query}
          onChange={(e) => search(e.target.value)}
          InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 5, bgcolor: 'rgba(255,255,255,0.8)' } }}
        />
      </Box>

      {loading && <CircularProgress sx={{ mt: 2 }} />}

      {!loading && query.trim().length < 2 && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 8, fontSize: 18 }}>
          Введите минимум 2 символа для поиска
        </Typography>
      )}

      <List>
        {users.map((u) => (
          <ListItemButton key={u.id} onClick={() => addContact(u)}>
            <ListItemText primary={u.fullName} secondary={`@${u.username}`} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
