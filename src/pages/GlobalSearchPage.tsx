import { useState } from 'react';
import { Box, CircularProgress, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../lib/api';
import type { User } from '../lib/types';
import { AppHeader } from '../components/AppHeader';

export default function GlobalSearchPage() {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  const search = async (value: string) => {
    setQ(value);
    if (!value.trim()) return setUsers([]);
    setLoading(true);
    try {
      const query = value.replace('@', '').trim();
      const result = await userApi.search(query);
      if (Array.isArray(result) && result.length > 0) {
        setUsers(result);
      } else {
        try {
          const exact = await userApi.getByUsername(query);
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
      <AppHeader title="Поиск пользователей" />
      <TextField fullWidth placeholder="username или @username" value={q} onChange={(e) => search(e.target.value)} />
      {loading ? <CircularProgress sx={{ mt: 2 }} /> : null}
      <List>
        {users.map((u) => (
          <ListItemButton key={u.id} onClick={() => navigate(`/user/${u.id}`)}>
            <ListItemText primary={u.fullName} secondary={`@${u.username}`} />
          </ListItemButton>
        ))}
      </List>
      {!loading && users.length === 0 && q && <Typography color="text.secondary">Ничего не найдено</Typography>}
    </Box>
  );
}
