import { useEffect, useState } from 'react';
import { Box, Button, List, ListItemText, Typography } from '@mui/material';
import { supportApi } from '../lib/api';

export default function SupportAgentPage() {
  const [tickets, setTickets] = useState<any[]>([]);

  const reload = () => supportApi.getAllTickets().then((data) => setTickets(data || []));

  useEffect(() => {
    reload();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Support Agent</Typography>
      <List>
        {tickets.map((t) => (
          <Box key={t.id} sx={{ mb: 1, p: 1, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <ListItemText primary={t.subject} secondary={t.status} />
            {t.status === 'open' && <Button onClick={async () => { await supportApi.claimTicket(t.id); reload(); }}>Claim</Button>}
            {t.status !== 'closed' && <Button onClick={async () => { await supportApi.closeTicket(t.id); reload(); }}>Close</Button>}
          </Box>
        ))}
      </List>
    </Box>
  );
}
