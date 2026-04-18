import { Box, MenuItem, Paper, Slider, Switch, TextField, Typography } from '@mui/material';
import { AppHeader } from '../components/AppHeader';
import { APP_NAME } from '../lib/appMeta';
import { useSettingsStore } from '../stores/settingsStore';

export default function SpecialFeaturesPage() {
  const {
    aiProvider,
    aiApiKey,
    effectIntensity,
    bgEffect,
    launchIntroEnabled,
    setAiProvider,
    setAiApiKey,
    setEffectIntensity,
    setBgEffect,
    setLaunchIntroEnabled,
  } = useSettingsStore();

  return (
    <Box
      sx={{
        px: 1.5,
        pb: 'max(env(safe-area-inset-bottom), 92px)',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <AppHeader title="Спец. возможности" />

      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, mb: 1.5 }}>
        <Typography fontWeight={700} sx={{ mb: 1.2 }}>
          Заставка
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography fontWeight={600}>Показывать при запуске</Typography>
            <Typography variant="body2" color="text.secondary">
              Анимация {APP_NAME} → главное меню
            </Typography>
          </Box>
          <Switch checked={launchIntroEnabled} onChange={(e) => setLaunchIntroEnabled(e.target.checked)} />
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 3, mb: 1.5 }}>
        <Typography fontWeight={700} sx={{ mb: 1.2 }}>
          AI
        </Typography>

        <TextField
          select
          fullWidth
          label="Провайдер AI"
          value={aiProvider}
          onChange={(e) => setAiProvider(e.target.value as 'g4f' | 'custom')}
          size="small"
          sx={{ mb: 1.5 }}
        >
          <MenuItem value="g4f">g4f (встроенный)</MenuItem>
          <MenuItem value="custom">Свой API</MenuItem>
        </TextField>

        {aiProvider === 'custom' && (
          <TextField
            fullWidth
            label="AI API ключ"
            value={aiApiKey}
            onChange={(e) => setAiApiKey(e.target.value)}
            size="small"
            placeholder="sk-..."
            helperText="Ключ хранится локально на устройстве"
          />
        )}
      </Paper>

      <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
        <Typography fontWeight={700} sx={{ mb: 1.2 }}>
          Визуальные эффекты
        </Typography>

        <TextField
          select
          fullWidth
          label="Эффект"
          value={bgEffect}
          onChange={(e) => setBgEffect(e.target.value as 'none' | 'snow' | 'leaves' | 'flowers' | 'rain')}
          size="small"
          sx={{ mb: 2 }}
        >
          <MenuItem value="none">Выключены</MenuItem>
          <MenuItem value="snow">Снег</MenuItem>
          <MenuItem value="leaves">Листья</MenuItem>
          <MenuItem value="flowers">Цветы</MenuItem>
          <MenuItem value="rain">Дождь</MenuItem>
        </TextField>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Плотность эффекта
        </Typography>
        <Slider
          value={effectIntensity}
          onChange={(_, value) => setEffectIntensity(value as number)}
          min={20}
          max={160}
          step={10}
          marks
          valueLabelDisplay="auto"
          sx={{ mb: 2 }}
        />
      </Paper>
    </Box>
  );
}
