import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import { useSettingsStore } from '../stores/settingsStore';

export default function SettingsPage() {
  const { theme, setTheme } = useSettingsStore();
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Settings</Typography>
      <FormControlLabel
        control={<Switch checked={theme === 'dark'} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />}
        label="Dark mode"
      />
    </Box>
  );
}
