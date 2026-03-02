import { Box, Button, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContactsStore } from '../stores/contactsStore';

export default function ContactsPage() {
  const navigate = useNavigate();
  const contacts = useContactsStore((s) => s.contacts);

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6">Контакты</Typography>
        <Button size="small" onClick={() => navigate('/add-contact')}>Add</Button>
      </Box>

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
