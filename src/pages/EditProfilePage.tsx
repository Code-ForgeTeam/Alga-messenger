import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAuthStore } from '../stores/authStore';
import { AppHeader } from '../components/AppHeader';

export default function EditProfilePage() {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [bio, setBio] = useState(user?.bio || '');

  return (
    <Box sx={{ p: 2 }}>
      <AppHeader title="Профиль" />
      <TextField fullWidth label="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth multiline minRows={3} label="Bio" value={bio} onChange={(e) => setBio(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="contained" onClick={() => updateProfile({ fullName, bio })}>Save</Button>
    </Box>
  );
}
