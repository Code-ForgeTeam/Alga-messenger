import { Box, List, ListItemButton, ListItemText, Switch, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { useSettingsStore } from '../stores/settingsStore';

const ITEMS = [
  { key: 'lastSeen', title: 'Время последнего посещения' },
  { key: 'profilePhoto', title: 'Фото профиля' },
  { key: 'bio', title: 'Описание профиля' },
  { key: 'searchByUsername', title: 'Поиск по имени пользователя' },
] as const;

function mapRuleValue(value: string) {
  if (value === 'everybody') return 'Все';
  if (value === 'contacts') return 'Мои контакты';
  if (value === 'nobody') return 'Никто';
  return 'Не задано';
}

export default function PrivacyPage() {
  const navigate = useNavigate();
  const privacySettings = useSettingsStore((s) => s.privacySettings);
  const setHideReadTime = useSettingsStore((s) => s.setHideReadTime);

  return (
    <Box sx={{ p: 1.5, pb: 'max(env(safe-area-inset-bottom), 20px)' }}>
      <AppHeader title="Конфиденциальность" />
      <Typography sx={{ px: 0.8, pb: 0.8, color: 'text.secondary', fontSize: 13 }}>
        Кто видит ваши данные и активность
      </Typography>

      <List>
        {ITEMS.map((item) => (
          <ListItemButton
            key={item.key}
            onClick={() => navigate(`/privacy/${item.key}`)}
            sx={{ borderRadius: 2, mb: 0.6 }}
          >
            <ListItemText
              primary={item.title}
              secondary={mapRuleValue((privacySettings as any)[item.key]?.value)}
            />
          </ListItemButton>
        ))}

        <ListItemButton sx={{ borderRadius: 2, mt: 0.7 }}>
          <ListItemText
            primary="Скрывать время прочтения"
            secondary="Не показывать, когда вы прочитали сообщение"
          />
          <Switch
            edge="end"
            checked={!!privacySettings.hideReadTime}
            onChange={(e) => setHideReadTime(e.target.checked)}
          />
        </ListItemButton>
      </List>
    </Box>
  );
}
