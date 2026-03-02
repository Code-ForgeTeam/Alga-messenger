import { useState } from 'react';
import { Box, Button, CircularProgress, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import { userApi } from '../lib/api';
import { useContactsStore } from '../stores/contactsStore';
import type { User } from '../lib/types';

export default function AddContactPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const addContact = useContactsStore((s) => s.addContact);

  const search = async () => {
    setLoading(true);
    try {
      const result = await userApi.search(query);
      setUsers(result || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Add contact</Typography>
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField fullWidth value={query} onChange={(e) => setQuery(e.target.value)} placeholder="username" />
        <Button variant="contained" onClick={search}>Search</Button>
      </Box>
      {loading ? <CircularProgress /> : null}
      <List>
        {users.map((u) => (
          <ListItemButton key={u.id}>
            <ListItemText primary={u.fullName} secondary={`@${u.username}`} />
            <Button onClick={() => addContact(u)}>Add</Button>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
