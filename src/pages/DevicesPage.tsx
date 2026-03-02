import { Box, Typography } from '@mui/material';

export default function DevicesPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Devices</Typography>
      <Typography color="text.secondary">Active sessions management will be shown here.</Typography>
    </Box>
  );
}
