import { useState } from 'react';
import { Box, Button, CircularProgress, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { userApi } from '../lib/api';
import { useContactsStore } from '../stores/contactsStore';
import type { User } from '../lib/types';
import { AppHeader } from '../components/AppHeader';

export default function AddContactPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const addContact = useContactsStore((s) => s.addContact);

  const search = async () => {
    const queryValue = query.replace('@', '').trim();
    if (!queryValue) return setUsers([]);

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
    <Box sx={{ p: 2 }}>
      <AppHeader title="Добавить контакт" />
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') search();
          }}
          placeholder="username или @username"
        />
        <Button variant="contained" onClick={search}>Найти</Button>
      </Box>
      {loading ? <CircularProgress /> : null}
      <List>
        {users.map((u) => (
          <ListItemButton key={u.id}>
            <ListItemText primary={u.fullName} secondary={`@${u.username}`} />
            <Button onClick={() => addContact(u)}>Добавить</Button>
          </ListItemButton>
        ))}
      </List>
      {!loading && users.length === 0 && query.trim() && <Typography color="text.secondary">Пользователь не найден</Typography>}
    </Box>
  );
}
