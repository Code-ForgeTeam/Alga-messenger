import { Box, Typography } from '@mui/material';

export default function UserPickerPage() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">User picker</Typography>
      <Typography color="text.secondary">Use this page to select exceptions for privacy settings.</Typography>
    </Box>
  );
}
