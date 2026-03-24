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
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { AppHeader } from '../components/AppHeader';
import { adminApi } from '../lib/api';
import { isCreatorUser } from '../lib/creator';
import { useAuthStore } from '../stores/authStore';
import { useAdminStore } from '../stores/adminStore';
import { useChatStore } from '../stores/chatStore';
import { useSnackbarStore } from '../stores/snackbarStore';

type AdminOverview = {
  users?: number;
  chats?: number;
  messages?: number;
  creatorUserId?: string;
};

type AdminAction = 'clear-chats' | 'clear-messages' | 'clear-content' | 'reset-users' | null;

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
  'clear-content': {
    title: 'Очистить весь медиа-контент?',
    body: 'Будут удалены все фото и файлы из чатов на сервере.',
    button: 'Очистить контент',
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
  const canUseAdminTools = useAdminStore((s) => s.canUseAdminTools);
  const setAdminAccess = useAdminStore((s) => s.setAdminAccess);
  const loadChats = useChatStore((s) => s.loadChats);
  const pushSnackbar = useSnackbarStore((s) => s.push);

  const [overview, setOverview] = useState<AdminOverview>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [action, setAction] = useState<AdminAction>(null);
  const [targetUsername, setTargetUsername] = useState('');
  const [confirmDeleteUserOpen, setConfirmDeleteUserOpen] = useState(false);

  const isCreator = isCreatorUser(me) || canUseAdminTools;

  const refreshOverview = async () => {
    if (!me?.id) return;
    setIsLoading(true);
    try {
      let result: any = null;
      const data = await adminApi.getOverview();
      setAdminAccess(true, me.id);
      setOverview(data || {});
    } catch (error: any) {
      if (error?.response?.status === 403) {
        setAdminAccess(false, me.id);
        return;
      }
      pushSnackbar({ message: error?.response?.data?.error || 'Не удалось загрузить данные админ-панели', timeout: 2600 });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!me?.id) return;
    void refreshOverview();
  }, [me?.id]);

  const runAction = async () => {
    if (!action) return;
    setIsBusy(true);
    try {
      let result: any = null;
      if (action === 'clear-chats') {
        result = await adminApi.clearAllChats();
      } else if (action === 'clear-messages') {
        result = await adminApi.clearAllMessages();
      } else if (action === 'clear-content') {
        result = await adminApi.clearAllContent();
      } else if (action === 'reset-users') {
        result = await adminApi.resetUsersExceptCreator();
      }

      await loadChats({ silent: true });
      await refreshOverview();
      if (action === 'clear-content') {
        const clearedBytes = Number(result?.clearedFilesBytes ?? 0);
        const clearedMb = clearedBytes > 0 ? Math.round((clearedBytes / (1024 * 1024)) * 10) / 10 : 0;
        pushSnackbar({
          message: clearedMb > 0 ? `Контент очищен (${clearedMb} MB)` : 'Контент очищен',
          timeout: 2600,
        });
        setAction(null);
        return;
      }
      pushSnackbar({ message: 'Операция выполнена', timeout: 2200 });
      setAction(null);
    } catch (error: any) {
      pushSnackbar({ message: error?.response?.data?.error || 'Операция не выполнена', timeout: 2600 });
    } finally {
      setIsBusy(false);
    }
  };

  const deleteByUsername = async () => {
    const username = targetUsername.replace('@', '').trim();
    if (!username) {
      pushSnackbar({ message: 'Введите username', timeout: 2200 });
      return;
    }
    setIsBusy(true);
    try {
      await adminApi.deleteUserByUsername(username);
      pushSnackbar({ message: `Пользователь @${username} удалён`, timeout: 2300 });
      setTargetUsername('');
      setConfirmDeleteUserOpen(false);
      await loadChats({ silent: true });
      await refreshOverview();
    } catch (error: any) {
      pushSnackbar({ message: error?.response?.data?.error || 'Не удалось удалить пользователя', timeout: 2600 });
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
                  <Button color="error" variant="outlined" onClick={() => setAction('clear-content')}>
                    Очистить весь контент
                  </Button>
                  <Button color="error" variant="outlined" onClick={() => setAction('clear-chats')}>
                    Очистить все чаты
                  </Button>
                  <Button color="error" variant="contained" onClick={() => setAction('reset-users')}>
                    Сбросить пользователей (кроме владельца)
                  </Button>
                </Stack>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  mt: 1.4,
                  p: 1.4,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: isDark ? 'rgba(175,193,217,0.28)' : '#DDE7E2',
                  bgcolor: isDark ? 'rgba(14,29,47,0.74)' : '#F7FBF8',
                }}
              >
                <Typography sx={{ fontWeight: 800, mb: 1 }}>Удаление пользователя</Typography>
                <Stack spacing={1}>
                  <TextField
                    size="small"
                    label="Username"
                    placeholder="@username"
                    value={targetUsername}
                    onChange={(e) => setTargetUsername(e.target.value)}
                  />
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      if (!targetUsername.replace('@', '').trim()) {
                        pushSnackbar({ message: 'Введите username', timeout: 2200 });
                        return;
                      }
                      setConfirmDeleteUserOpen(true);
                    }}
                    disabled={isBusy}
                  >
                    Удалить пользователя
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

      <Dialog open={confirmDeleteUserOpen} onClose={() => (!isBusy ? setConfirmDeleteUserOpen(false) : null)} fullWidth maxWidth="xs">
        <DialogTitle>Удалить пользователя?</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            Пользователь @{targetUsername.replace('@', '').trim()} будет удалён из системы. Это действие необратимо.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={isBusy} onClick={() => setConfirmDeleteUserOpen(false)}>Отмена</Button>
          <Button disabled={isBusy} color="error" variant="contained" onClick={deleteByUsername}>
            {isBusy ? 'Удаление...' : 'Удалить'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
