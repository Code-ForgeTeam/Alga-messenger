import { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { chatApi, userApi } from '../lib/api';
import type { User } from '../lib/types';

export default function UserProfilePage() {
  const { userId = '' } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    userApi.getById(userId).then(setUser).finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Box sx={{ p: 3 }}><CircularProgress /></Box>;
  if (!user) return <Box sx={{ p: 3 }}><Typography>User not found</Typography></Box>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5">{user.fullName}</Typography>
      <Typography color="text.secondary">@{user.username}</Typography>
      <Typography sx={{ mt: 2 }}>{user.bio || 'No bio'}</Typography>
      <Button sx={{ mt: 2 }} variant="contained" onClick={async () => {
        const chat = await chatApi.create('', 'private', [user.id]);
        navigate(`/chat/${chat.id}`);
      }}>Write message</Button>
    </Box>
  );
}
