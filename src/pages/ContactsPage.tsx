import { Avatar, Box, Fab, List, ListItemButton, ListItemText, TextField, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useContactsStore } from '../stores/contactsStore';
import { AppHeader } from '../components/AppHeader';

export default function ContactsPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const contacts = useContactsStore((s) => s.contacts);
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    if (!needle) return contacts;
    return contacts.filter((c) => `${c.displayName} ${c.user.username}`.toLowerCase().includes(needle));
  }, [contacts, q]);

  return (
    <Box
      sx={{
        px: 1.5,
        pb: 'max(env(safe-area-inset-bottom), 96px)',
        height: '100%',
        overflowY: 'auto',
        bgcolor: isDark ? '#0D1A2E' : '#FFFFFF',
      }}
    >
      <AppHeader title="Контакты" />

      <TextField
        fullWidth
        size="small"
        placeholder="Поиск контактов..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        InputProps={{ startAdornment: <SearchRoundedIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            bgcolor: isDark ? 'rgba(255,255,255,0.08)' : '#EEF2F5',
            color: isDark ? '#EAF1FF' : 'text.primary',
          },
        }}
      />

      <List sx={{ mt: 1.5 }}>
        {filtered.map((contact) => (
          <ListItemButton
            key={contact.id}
            onClick={() => navigate(`/user/${contact.userId}`)}
            sx={{
              borderRadius: 2.5,
              mb: 0.6,
              border: '1px solid',
              borderColor: isDark ? 'rgba(255,255,255,0.12)' : '#E3E9EE',
              bgcolor: isDark ? 'rgba(255,255,255,0.03)' : '#FFFFFF',
            }}
          >
            <Avatar
              src={contact.user.avatar}
              sx={{ width: 44, height: 44, mr: 1.3, bgcolor: isDark ? '#2B5F8F' : 'primary.main' }}
            >
              {(contact.displayName || contact.user.username || '?').slice(0, 1).toUpperCase()}
            </Avatar>
            <ListItemText
              primary={<Typography fontWeight={700}>{contact.displayName}</Typography>}
              secondary={
                <Typography variant="body2" color="text.secondary" noWrap>
                  @{contact.user.username}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>

      {!filtered.length && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 8, fontSize: 18 }}>
          Нет контактов
        </Typography>
      )}

      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          right: 'max(env(safe-area-inset-right), 24px)',
          bottom: 'max(env(safe-area-inset-bottom), 106px)',
          boxShadow: isDark ? '0 10px 24px rgba(125,106,227,0.45)' : '0 10px 24px rgba(31,163,91,0.35)',
        }}
        onClick={() => navigate('/add-contact')}
      >
        <PersonAddAlt1RoundedIcon />
      </Fab>
    </Box>
  );
}
