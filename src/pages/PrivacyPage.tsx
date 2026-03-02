import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ITEMS = [
  { key: 'lastSeen', label: 'Last seen' },
  { key: 'profilePhoto', label: 'Profile photo' },
  { key: 'bio', label: 'Bio' },
  { key: 'searchByUsername', label: 'Search by username' },
];

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Privacy</Typography>
      <List>
        {ITEMS.map((item) => (
          <ListItemButton key={item.key} onClick={() => navigate(`/privacy/${item.key}`)}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
