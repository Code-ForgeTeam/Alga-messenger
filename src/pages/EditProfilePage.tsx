import { useRef, useState } from 'react';
import { Avatar, Box, Button, IconButton, TextField, Typography } from '@mui/material';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import { useAuthStore } from '../stores/authStore';
import { AppHeader } from '../components/AppHeader';
import { profileApi } from '../lib/api';
import { useSnackbarStore } from '../stores/snackbarStore';

export default function EditProfilePage() {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [uploading, setUploading] = useState(false);
  const pushSnackbar = useSnackbarStore((s) => s.push);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const uploadAvatar = async (file: File) => {
    setUploading(true);
    try {
      const data = await profileApi.uploadAvatar(file);
      if (data?.url) {
        setAvatar(data.url);
      }
    } catch {
      pushSnackbar({ message: 'Не удалось загрузить фото', timeout: 2200 });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <AppHeader title="Профиль" />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
        <Avatar src={avatar} sx={{ width: 72, height: 72, bgcolor: 'primary.main' }}>
          {(fullName || user?.username || 'A').slice(0, 1).toUpperCase()}
        </Avatar>
        <Box>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) uploadAvatar(file);
            }}
          />
          <Button
            variant="outlined"
            startIcon={<PhotoCameraRoundedIcon />}
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? 'Загрузка...' : 'Поставить фото'}
          </Button>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
            JPG, PNG, WEBP до 5MB
          </Typography>
        </Box>
      </Box>

      <TextField
        fullWidth
        label="Имя"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        multiline
        minRows={3}
        label="О себе"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={() => updateProfile({ fullName, bio, avatar })}>Сохранить</Button>
    </Box>
  );
}
