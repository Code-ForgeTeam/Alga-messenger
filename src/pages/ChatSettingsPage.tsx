import { Box, MenuItem, Paper, Switch, TextField, Typography } from '@mui/material';
import { AppHeader } from '../components/AppHeader';
import { useSettingsStore } from '../stores/settingsStore';

export default function ChatSettingsPage() {
  const fontSize = useSettingsStore((s) => s.fontSize);
  const setFontSize = useSettingsStore((s) => s.setFontSize);
  const chatCompactMode = useSettingsStore((s) => s.chatCompactMode);
  const setChatCompactMode = useSettingsStore((s) => s.setChatCompactMode);

  return (
    <Box
      sx={{
        px: 1.5,
        pb: 'max(env(safe-area-inset-bottom), 92px)',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <AppHeader title="Настройки чатов" />

      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, mb: 1.5 }}>
        <Typography fontWeight={700} sx={{ mb: 1.2 }}>
          Текст
        </Typography>
        <TextField
          select
          fullWidth
          size="small"
          label="Размер шрифта"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value as 'small' | 'medium' | 'large')}
        >
          <MenuItem value="small">Маленький</MenuItem>
          <MenuItem value="medium">Средний</MenuItem>
          <MenuItem value="large">Крупный</MenuItem>
        </TextField>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
        <Typography fontWeight={700} sx={{ mb: 1.2 }}>
          Список чатов
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography fontWeight={600}>Компактный режим</Typography>
            <Typography variant="body2" color="text.secondary">
              Меньше отступы и аватарки в списке
            </Typography>
          </Box>
          <Switch checked={chatCompactMode} onChange={(e) => setChatCompactMode(e.target.checked)} />
        </Box>
      </Paper>
    </Box>
  );
}
