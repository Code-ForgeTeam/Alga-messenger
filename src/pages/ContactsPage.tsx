import { Box, Fab, IconButton, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContactsStore } from '../stores/contactsStore';

export default function ContactsPage() {
  const navigate = useNavigate();
  const contacts = useContactsStore((s) => s.contacts);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    if (!needle) return contacts;
    return contacts.filter((c) =>
      `${c.displayName} ${c.user.username}`.toLowerCase().includes(needle),
    );
  }, [contacts, q]);

  return (
    <Box sx={{ p: 2, height: '100%', overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
        <Typography variant="h5" fontWeight={700} sx={{ ml: 1 }}>Контакты</Typography>
      </Box>

      <TextField
        fullWidth
        size="small"
        placeholder="Поиск контактов..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 5, bgcolor: 'rgba(255,255,255,0.8)' } }}
      />

      <List sx={{ mt: 1.5 }}>
        {filtered.map((contact) => (
          <ListItemButton key={contact.id} onClick={() => navigate(`/user/${contact.userId}`)}>
            <ListItemText primary={contact.displayName} secondary={`@${contact.user.username}`} />
          </ListItemButton>
        ))}
      </List>

      {!filtered.length && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 8, fontSize: 18 }}>
          Нет контактов
        </Typography>
      )}

      <Fab color="primary" sx={{ position: 'fixed', right: 24, bottom: 110 }} onClick={() => navigate('/add-contact')}>
        <PersonAddAlt1RoundedIcon />
      </Fab>
    </Box>
  );
}
