import { Box, FormControl, InputLabel, List, ListItemButton, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useSettingsStore } from '../stores/settingsStore';

const TITLES: Record<string, string> = {
  lastSeen: 'Время последнего посещения',
  profilePhoto: 'Фото профиля',
  bio: 'Описание профиля',
  searchByUsername: 'Поиск по имени пользователя',
};

export default function PrivacySettingPage() {
  const { settingKey = '' } = useParams();
  const navigate = useNavigate();
  const settings = useSettingsStore((s) => s.privacySettings);
  const update = useSettingsStore((s) => s.updatePrivacyRule);

  const rule = (settings as any)[settingKey];
  if (!rule || settingKey === 'hideReadTime') {
    return (
      <Box sx={{ p: 1.5 }}>
        <AppHeader title="Конфиденциальность" />
        <Typography color="text.secondary">Параметр не найден.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1.5 }}>
      <AppHeader title={TITLES[settingKey] || 'Параметр'} />

      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel>Кто видит</InputLabel>
        <Select
          label="Кто видит"
          value={rule.value}
          onChange={(e) => update(settingKey as any, { value: e.target.value as any })}
        >
          <MenuItem value="everybody">Все</MenuItem>
          <MenuItem value="contacts">Мои контакты</MenuItem>
          <MenuItem value="nobody">Никто</MenuItem>
        </Select>
      </FormControl>

      <List sx={{ mt: 1.2 }}>
        <ListItemButton
          sx={{ borderRadius: 2, mb: 0.6 }}
          onClick={() => navigate(`/privacy/${settingKey}/always`)}
        >
          <ListItemText
            primary="Всегда показывать"
            secondary={rule.alwaysShareWith?.length ? `${rule.alwaysShareWith.length} выбрано` : 'Пока пусто'}
          />
        </ListItemButton>
        <ListItemButton
          sx={{ borderRadius: 2 }}
          onClick={() => navigate(`/privacy/${settingKey}/never`)}
        >
          <ListItemText
            primary="Никогда не показывать"
            secondary={rule.neverShareWith?.length ? `${rule.neverShareWith.length} выбрано` : 'Пока пусто'}
          />
        </ListItemButton>
      </List>
    </Box>
  );
}
