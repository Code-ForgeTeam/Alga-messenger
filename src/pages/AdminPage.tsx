import { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppHeader } from '../components/AppHeader';
import { adminApi } from '../lib/api';
import { isCreatorUser } from '../lib/creator';
import { useAuthStore } from '../stores/authStore';
import { useChatStore } from '../stores/chatStore';
import { useSnackbarStore } from '../stores/snackbarStore';

type AdminOverview = {
  users?: number;
  chats?: number;
  messages?: number;
  creatorUserId?: string;
};

type AdminAction = 'clear-chats' | 'clear-messages' | 'reset-users' | null;

const ACTION_TEXT: Record<Exclude<AdminAction, null>, { title: string; body: string; button: string }> = {
  'clear-chats': {
    title: 'Очистить все чаты?',
    body: 'Будут удалены все чаты и вложенные сообщения для всех пользователей.',
    button: 'Очистить чаты',
  },
  'clear-messages': {
    title: 'Удалить все сообщения?',
    body: 'Чаты останутся, но вся история сообщений будет удалена.',
    button: 'Очистить сообщения',
  },
  'reset-users': {
    title: 'Сбросить пользователей?',
    body: 'Будут удалены все пользователи, кроме владельца (создателя).',
    button: 'Сбросить пользователей',
  },
};

export default function AdminPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const me = useAuthStore((s) => s.user);
  const loadChats = useChatStore((s) => s.loadChats);
  const pushSnackbar = useSnackbarStore((s) => s.push);

  const [overview, setOverview] = useState<AdminOverview>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [action, setAction] = useState<AdminAction>(null);

  const isCreator = isCreatorUser(me);

  const refreshOverview = async () => {
    if (!isCreator) return;
    setIsLoading(true);
    try {
      const data = await adminApi.getOverview();
      setOverview(data || {});
    } catch (error: any) {
      pushSnackbar({ message: error?.response?.data?.error || 'Не удалось загрузить данные админ-панели', timeout: 2600 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void refreshOverview();
  }, [isCreator]);

  const runAction = async () => {
    if (!action) return;
    setIsBusy(true);
    try {
      if (action === 'clear-chats') {
        await adminApi.clearAllChats();
      } else if (action === 'clear-messages') {
        await adminApi.clearAllMessages();
      } else if (action === 'reset-users') {
        await adminApi.resetUsersExceptCreator();
      }

      await loadChats({ silent: true });
      await refreshOverview();
      pushSnackbar({ message: 'Операция выполнена', timeout: 2200 });
      setAction(null);
    } catch (error: any) {
      pushSnackbar({ message: error?.response?.data?.error || 'Операция не выполнена', timeout: 2600 });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <Box
      sx={{
        px: 1.5,
        pb: 'max(env(safe-area-inset-bottom), 96px)',
        height: '100%',
        overflowY: 'auto',
        bgcolor: isDark ? '#0D1A2E' : '#FFFFFF',
      }}
    >
      <AppHeader title="Инструменты" />

      {!isCreator ? (
        <Alert severity="error" sx={{ mt: 1.2 }}>
          Доступ запрещен. Этот раздел доступен только владельцу приложения.
        </Alert>
      ) : (
        <>
          {isLoading ? (
            <Box sx={{ display: 'grid', placeItems: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(175,193,217,0.2)' : '#E5ECE9',
                  bgcolor: isDark ? 'rgba(17,33,50,0.8)' : '#F7FBF8',
                }}
              >
                <Typography sx={{ fontWeight: 800, mb: 1 }}>Состояние сервера</Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                  <Paper sx={{ px: 1.4, py: 1, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Пользователи</Typography>
                    <Typography sx={{ fontWeight: 800 }}>{overview.users ?? 0}</Typography>
                  </Paper>
                  <Paper sx={{ px: 1.4, py: 1, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Чаты</Typography>
                    <Typography sx={{ fontWeight: 800 }}>{overview.chats ?? 0}</Typography>
                  </Paper>
                  <Paper sx={{ px: 1.4, py: 1, borderRadius: 2 }}>
                    <Typography variant="caption" color="text.secondary">Сообщения</Typography>
                    <Typography sx={{ fontWeight: 800 }}>{overview.messages ?? 0}</Typography>
                  </Paper>
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  mt: 1.4,
                  p: 1.4,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(228,75,75,0.35)' : 'rgba(228,75,75,0.25)',
                  bgcolor: isDark ? 'rgba(37,17,26,0.55)' : 'rgba(255,242,242,0.92)',
                }}
              >
                <Typography sx={{ fontWeight: 800, mb: 1 }}>Опасные действия</Typography>
                <Stack spacing={1}>
                  <Button color="error" variant="outlined" onClick={() => setAction('clear-messages')}>
                    Очистить все сообщения
                  </Button>
                  <Button color="error" variant="outlined" onClick={() => setAction('clear-chats')}>
                    Очистить все чаты
                  </Button>
                  <Button color="error" variant="contained" onClick={() => setAction('reset-users')}>
                    Сбросить пользователей (кроме владельца)
                  </Button>
                </Stack>
              </Paper>
            </>
          )}
        </>
      )}

      <Dialog open={!!action} onClose={() => (!isBusy ? setAction(null) : null)} fullWidth maxWidth="xs">
        <DialogTitle>{action ? ACTION_TEXT[action].title : ''}</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            {action ? ACTION_TEXT[action].body : ''}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={isBusy} onClick={() => setAction(null)}>Отмена</Button>
          <Button disabled={isBusy} color="error" variant="contained" onClick={runAction}>
            {isBusy ? 'Выполняется...' : action ? ACTION_TEXT[action].button : 'Подтвердить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

