import { useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import { useAuthStore } from '../stores/authStore';
import brandLogo from '../assets/brand-logo.jpg';

export function AuthPage() {
  const { login, register, isLoading, error } = useAuthStore();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedUsername = username.trim();
    const normalizedFullName = fullName.trim();

    try {
      if (isRegister) {
        await register(normalizedUsername, normalizedFullName, password);
      } else {
        await login(normalizedUsername, password);
      }
    } catch {
      // Error text is stored in authStore and rendered below.
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'grid', placeItems: 'center', p: 2 }}>
      <Box component="form" onSubmit={submit} sx={{ width: '100%', maxWidth: 360 }}>
        <Box
          component="img"
          src={brandLogo}
          alt="Alga"
          sx={{
            width: 72,
            height: 72,
            borderRadius: 2.5,
            display: 'block',
            mb: 1.6,
            boxShadow: '0 8px 20px rgba(0,0,0,0.18)',
          }}
        />
        <TextField
          fullWidth
          label="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          sx={{ mb: 2 }}
        />
        {isRegister && (
          <TextField
            fullWidth
            label="Имя и фамилия"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            sx={{ mb: 2 }}
          />
        )}
        <TextField
          fullWidth
          type="password"
          label="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          sx={{ mb: 2 }}
        />
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Button fullWidth type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? <CircularProgress size={18} /> : isRegister ? 'Зарегистрироваться' : 'Войти'}
        </Button>
        <Button fullWidth sx={{ mt: 1 }} onClick={() => setIsRegister((v) => !v)}>
          {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </Button>
      </Box>
    </Box>
  );
}
