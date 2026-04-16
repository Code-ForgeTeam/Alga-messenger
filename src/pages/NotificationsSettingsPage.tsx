import { Box, List, ListItem, ListItemText, Paper, Switch, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppHeader } from '../components/AppHeader';
import { useSettingsStore } from '../stores/settingsStore';
import { useSnackbarStore } from '../stores/snackbarStore';

export default function NotificationsSettingsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const notificationSettings = useSettingsStore((s) => s.notificationSettings);
  const setNotificationSetting = useSettingsStore((s) => s.setNotificationSetting);
  const pushSnackbar = useSnackbarStore((s) => s.push);

  const onToggle = async (key: 'privateChats' | 'groupChats', value: boolean) => {
    await setNotificationSetting(key, value);
    pushSnackbar({
      message: value ? 'Уведомления включены' : 'Уведомления выключены',
      timeout: 1600,
      tone: 'success',
    });
  };

  return (
    <Box
      sx={{
        px: 1.5,
        pb: 'max(env(safe-area-inset-bottom), 96px)',
        height: '100%',
        overflowY: 'auto',
        bgcolor: isDark ? '#0D1A2E' : '#F8FAFC',
      }}
    >
      <AppHeader title="Уведомления" />

      <Paper
        elevation={0}
        sx={{
          mt: 1,
          borderRadius: 3,
          border: '1px solid',
          borderColor: isDark ? 'rgba(152,185,218,0.25)' : 'rgba(31,163,91,0.2)',
          bgcolor: isDark ? 'rgba(17,33,50,0.75)' : '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        <List disablePadding>
          <ListItem
            secondaryAction={(
              <Switch
                edge="end"
                checked={notificationSettings.privateChats}
                onChange={(event) => {
                  void onToggle('privateChats', event.target.checked);
                }}
              />
            )}
            sx={{ py: 1.2 }}
          >
            <ListItemText
              primary="Личные чаты"
              secondary="Получать push-уведомления о сообщениях в личных диалогах"
            />
          </ListItem>
          <ListItem
            secondaryAction={(
              <Switch
                edge="end"
                checked={notificationSettings.groupChats}
                onChange={(event) => {
                  void onToggle('groupChats', event.target.checked);
                }}
              />
            )}
            sx={{ py: 1.2 }}
          >
            <ListItemText
              primary="Группы"
              secondary="Получать push-уведомления о сообщениях в группах"
            />
          </ListItem>
        </List>
      </Paper>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1.2, px: 0.4 }}>
        Настройки применяются и локально, и для серверных push-уведомлений.
      </Typography>
    </Box>
  );
}
