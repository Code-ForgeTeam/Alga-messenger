import { Box, Typography } from '@mui/material';

export default function AdminPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Admin panel</Typography>
      <Typography color="text.secondary">Broadcast notifications and moderation controls can be added here.</Typography>
    </Box>
  );
}
