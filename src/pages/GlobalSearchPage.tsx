import { useState } from 'react';
import { Box, CircularProgress, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../lib/api';
import type { User } from '../lib/types';

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
      const result = await userApi.search(value);
      setUsers(result || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <TextField fullWidth placeholder="Search" value={q} onChange={(e) => search(e.target.value)} />
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
