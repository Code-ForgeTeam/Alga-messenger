import { useRef, useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import { useAuthStore } from '../stores/authStore';
import { AppHeader } from '../components/AppHeader';
import { profileApi } from '../lib/api';
import { useSnackbarStore } from '../stores/snackbarStore';

const extractBirthdayDigits = (value: unknown): string => {
  const raw = String(value ?? '').trim();
  if (!raw) return '';
  const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (iso) return `${iso[3]}${iso[2]}${iso[1]}`;
  return raw.replace(/\D/g, '').slice(0, 8);
};

const digitsToIsoBirthday = (digits: string): string | null => {
  const normalized = digits.replace(/\D/g, '');
  if (normalized.length !== 8) return null;

  const day = Number(normalized.slice(0, 2));
  const month = Number(normalized.slice(2, 4));
  const year = Number(normalized.slice(4, 8));
  const currentYear = new Date().getFullYear();

  if (year < 1900 || year > currentYear || month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const probe = new Date(year, month - 1, day);
  if (probe.getFullYear() !== year || probe.getMonth() !== month - 1 || probe.getDate() !== day) {
    return null;
  }

  return `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export default function EditProfilePage() {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const pushSnackbar = useSnackbarStore((s) => s.push);

  const [fullName, setFullName] = useState(user?.fullName || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [birthdayDigits, setBirthdayDigits] = useState(
    extractBirthdayDigits((user as any)?.birthday || (user as any)?.birthDate || (user as any)?.birth_date || (user as any)?.dob),
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const uploadAvatar = async (file: File) => {
    setUploading(true);
    try {
      const data = await profileApi.uploadAvatar(file);
      if (data?.url) {
        setAvatar(data.url);
        pushSnackbar({ message: 'Аватар загружен', timeout: 1800, tone: 'success' });
      }
    } catch {
      pushSnackbar({ message: 'Не удалось загрузить фото', timeout: 2200, tone: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const saveProfile = async () => {
    const normalizedName = fullName.trim();
    if (!normalizedName) {
      pushSnackbar({ message: 'Имя не может быть пустым', timeout: 2200, tone: 'error' });
      return;
    }

    const normalizedDigits = birthdayDigits.replace(/\D/g, '');
    let birthday: string | null = null;
    if (normalizedDigits.length > 0) {
      if (normalizedDigits.length !== 8) {
        pushSnackbar({ message: 'Дата рождения: введите 8 цифр (ДДММГГГГ)', timeout: 2400, tone: 'error' });
        return;
      }
      birthday = digitsToIsoBirthday(normalizedDigits);
      if (!birthday) {
        pushSnackbar({ message: 'Некорректная дата рождения', timeout: 2200, tone: 'error' });
        return;
      }
    }

    setSaving(true);
    try {
      await updateProfile({ fullName: normalizedName, bio, avatar, birthday });
      pushSnackbar({ message: 'Сохранено', timeout: 1700, tone: 'success' });
    } catch {
      pushSnackbar({ message: 'Не удалось сохранить профиль', timeout: 2300, tone: 'error' });
    } finally {
      setSaving(false);
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
              if (file) void uploadAvatar(file);
            }}
          />
          <Button
            variant="outlined"
            startIcon={<PhotoCameraRoundedIcon />}
            onClick={() => fileRef.current?.click()}
            disabled={uploading || saving}
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

      <TextField
        fullWidth
        label="День рождения"
        placeholder="ДДММГГГГ"
        value={birthdayDigits}
        onChange={(e) => setBirthdayDigits(e.target.value.replace(/\D/g, '').slice(0, 8))}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 8 }}
        helperText="Только цифры, формат ДДММГГГГ"
        sx={{ mb: 2 }}
      />

      <Button variant="contained" onClick={saveProfile} disabled={saving || uploading}>
        {saving ? 'Сохраняем...' : 'Сохранить'}
      </Button>
    </Box>
  );
}
