import { Box, FormControlLabel, List, ListItemButton, ListItemText, Switch, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';
import { useAuthStore } from '../stores/authStore';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { theme, setTheme, glowMode, setGlowMode, bgEffect, setBgEffect } = useSettingsStore();
  const logout = useAuthStore((s) => s.logout);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>Settings</Typography>
      <FormControlLabel
        control={<Switch checked={theme === 'dark'} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />}
        label="Dark mode"
      />
      <FormControlLabel
        control={<Switch checked={glowMode} onChange={(e) => setGlowMode(e.target.checked)} />}
        label="Glow mode"
      />
      <FormControlLabel
        control={<Switch checked={bgEffect === 'snow'} onChange={(e) => setBgEffect(e.target.checked ? 'snow' : 'none')} />}
        label="Snow effect"
      />

      <List>
        <ListItemButton onClick={() => navigate('/edit-profile')}><ListItemText primary="Edit profile" /></ListItemButton>
        <ListItemButton onClick={() => navigate('/privacy')}><ListItemText primary="Privacy" /></ListItemButton>
        <ListItemButton onClick={() => navigate('/data-storage')}><ListItemText primary="Data & storage" /></ListItemButton>
        <ListItemButton onClick={() => navigate('/devices')}><ListItemText primary="Devices" /></ListItemButton>
        <ListItemButton onClick={() => navigate('/support')}><ListItemText primary="Support" /></ListItemButton>
      </List>

      <ListItemButton onClick={logout}><ListItemText primary="Logout" /></ListItemButton>
    </Box>
  );
}
