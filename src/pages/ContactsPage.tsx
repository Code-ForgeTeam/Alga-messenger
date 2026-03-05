import { Box, Button, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContactsStore } from '../stores/contactsStore';
import { AppHeader } from '../components/AppHeader';

export default function ContactsPage() {
  const navigate = useNavigate();
  const contacts = useContactsStore((s) => s.contacts);

  return (
    <Box sx={{ p: 2 }}>
      <AppHeader
        title="Контакты"
        showBack={false}
        rightSlot={<Button size="small" onClick={() => navigate('/add-contact')}>Добавить</Button>}
      />

      <List>
        {contacts.map((contact) => (
          <ListItemButton key={contact.id} onClick={() => navigate(`/user/${contact.userId}`)}>
            <ListItemText primary={contact.displayName} secondary={`@${contact.user.username}`} />
          </ListItemButton>
        ))}
      </List>

      {!contacts.length && <Typography color="text.secondary">Нет контактов</Typography>}
    </Box>
  );
}
