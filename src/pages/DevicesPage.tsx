import { Box, FormControlLabel, MenuItem, Switch, TextField, Typography } from '@mui/material';
import { useSettingsStore } from '../stores/settingsStore';
import { AppHeader } from '../components/AppHeader';

export default function DevicesPage() {
  const { glowMode, setGlowMode, bgEffect, setBgEffect, fontSize, setFontSize } = useSettingsStore();

  return (
    <Box sx={{ p: 2 }}>
      <AppHeader title="Спец возможности" />
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Быстрые визуальные настройки интерфейса в стиле Telegram.
      </Typography>

      <FormControlLabel
        control={<Switch checked={bgEffect === 'snow'} onChange={(e) => setBgEffect(e.target.checked ? 'snow' : 'none')} />}
        label="Эффект снега"
      />
      <FormControlLabel
        control={<Switch checked={glowMode} onChange={(e) => setGlowMode(e.target.checked)} />}
        label="Свечение чатов"
      />

      <TextField
        select
        fullWidth
        label="Размер шрифта"
        size="small"
        value={fontSize}
        onChange={(e) => setFontSize(e.target.value as 'small' | 'medium' | 'large')}
        sx={{ mt: 2 }}
      >
        <MenuItem value="small">Маленький</MenuItem>
        <MenuItem value="medium">Средний</MenuItem>
        <MenuItem value="large">Крупный</MenuItem>
      </TextField>
    </Box>
  );
}
