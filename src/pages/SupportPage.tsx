import { useEffect, useState } from 'react';
import { Box, Button, List, ListItemText, TextField, Typography } from '@mui/material';
import { supportApi } from '../lib/api';

export default function SupportPage() {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('general');
  const [tickets, setTickets] = useState<any[]>([]);

  const reload = () => supportApi.getMyTickets().then((data) => setTickets(data || []));

  useEffect(() => {
    reload();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Support</Typography>
      <TextField fullWidth sx={{ mb: 1 }} label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
      <TextField fullWidth sx={{ mb: 1 }} label="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <Button variant="contained" onClick={async () => {
        await supportApi.createTicket(category, subject);
        setSubject('');
        reload();
      }}>Create ticket</Button>

      <Typography sx={{ mt: 3, mb: 1 }}>My tickets</Typography>
      <List>
        {tickets.map((t) => (
          <ListItemText key={t.id} primary={t.subject} secondary={t.status} />
        ))}
      </List>
    </Box>
  );
}
