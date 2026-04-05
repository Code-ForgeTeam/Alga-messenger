import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMemo, useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useContactsStore } from '../stores/contactsStore';
import type { Contact } from '../lib/types';
import { AppHeader } from '../components/AppHeader';
import { useSnackbarStore } from '../stores/snackbarStore';

export default function ContactsPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const contacts = useContactsStore((s) => s.contacts);
  const addContact = useContactsStore((s) => s.addContact);
  const removeContact = useContactsStore((s) => s.removeContact);
  const renameContact = useContactsStore((s) => s.renameContact);
  const resetContactName = useContactsStore((s) => s.resetContactName);
  const pushSnackbar = useSnackbarStore((s) => s.push);
  const [q, setQ] = useState('');
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameDraft, setRenameDraft] = useState('');

  const filtered = useMemo(() => {
    const needle = q.toLowerCase().trim();
    if (!needle) return contacts;
    return contacts.filter((c) => `${c.displayName} ${c.user.username}`.toLowerCase().includes(needle));
  }, [contacts, q]);

  const defaultDisplayName = (contact: Contact): string =>
    (contact.user.fullName || (contact.user.username ? `@${contact.user.username}` : 'Пользователь')).trim();

  const openContactMenu = (event: MouseEvent<HTMLElement>, contact: Contact) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedContact(contact);
  };

  const closeContactMenu = () => {
    setMenuAnchor(null);
  };

  const openRenameDialog = () => {
    if (!selectedContact) return;
    setRenameDraft(selectedContact.displayName || defaultDisplayName(selectedContact));
    closeContactMenu();
    setRenameOpen(true);
  };

  const saveLocalName = () => {
    if (!selectedContact) return;
    const nextName = renameDraft.trim();
    if (!nextName) {
      pushSnackbar({ message: 'Введите имя контакта', timeout: 2200, tone: 'error' });
      return;
    }
    const contactId = selectedContact.id;
    const prevName = selectedContact.displayName;
    renameContact(contactId, nextName);
    setRenameOpen(false);
    pushSnackbar({
      message: 'Локальное имя сохранено',
      timeout: 4200,
      tone: 'success',
      onUndo: () => renameContact(contactId, prevName),
    });
  };

  const resetLocalName = () => {
    if (!selectedContact) return;
    const contactId = selectedContact.id;
    const prevName = selectedContact.displayName;
    resetContactName(contactId);
    closeContactMenu();
    pushSnackbar({
      message: 'Локальное имя сброшено',
      timeout: 4200,
      onUndo: () => renameContact(contactId, prevName),
    });
  };

  const deleteContact = () => {
    if (!selectedContact) return;
    const target = selectedContact;
    if (!window.confirm(`Удалить контакт ${target.displayName}?`)) return;
    removeContact(target.id);
    closeContactMenu();
    pushSnackbar({
      message: 'Контакт удален',
      timeout: 4200,
      onUndo: () => addContact(target.user, target.displayName),
    });
    setSelectedContact(null);
  };

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
            <IconButton
              onClick={(event) => openContactMenu(event, contact)}
              sx={{ color: isDark ? '#AFC1D9' : '#607383' }}
            >
              <MoreVertIcon />
            </IconButton>
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

      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={closeContactMenu}
      >
        <MenuItem onClick={openRenameDialog}>Изменить имя локально</MenuItem>
        <MenuItem onClick={resetLocalName}>Сбросить имя</MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={deleteContact}>Удалить контакт</MenuItem>
      </Menu>

      <Dialog open={renameOpen} onClose={() => setRenameOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Локальное имя контакта</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            size="small"
            label="Имя"
            value={renameDraft}
            onChange={(event) => setRenameDraft(event.target.value)}
            sx={{ mt: 0.5 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRenameOpen(false)}>Отмена</Button>
          <Button variant="contained" onClick={saveLocalName}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
