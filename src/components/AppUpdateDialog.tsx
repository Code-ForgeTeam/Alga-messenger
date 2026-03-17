import { useMemo } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import type { AppUpdateInfo } from '../lib/types';

interface AppUpdateDialogProps {
  open: boolean;
  updateInfo: AppUpdateInfo | null;
  onClose: () => void;
}

const formatSize = (bytes?: number | null): string | null => {
  if (!bytes || bytes <= 0) return null;
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};

export function AppUpdateDialog({ open, updateInfo, onClose }: AppUpdateDialogProps) {
  const mandatory = !!updateInfo?.mandatory;
  const downloadUrl = updateInfo?.downloadUrl || '/update/update.apk';

  const subtitle = useMemo(() => {
    const versionLabel = updateInfo?.latestVersionName
      ? `Версия ${updateInfo.latestVersionName}`
      : updateInfo?.latestVersionCode
        ? `Сборка #${updateInfo.latestVersionCode}`
        : 'Доступна новая версия';

    const sizeLabel = formatSize(updateInfo?.fileSize);
    return sizeLabel ? `${versionLabel} • ${sizeLabel}` : versionLabel;
  }, [updateInfo?.fileSize, updateInfo?.latestVersionCode, updateInfo?.latestVersionName]);

  const handleUpdate = () => {
    window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    if (!mandatory) onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={mandatory ? undefined : onClose}
      aria-labelledby="app-update-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle id="app-update-title">Обновление приложения</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 1.5 }}>
          Доступна новая версия Alga Messenger. Для стабильной работы рекомендуем установить обновление.
        </Typography>

        <Box
          sx={{
            borderRadius: 2,
            p: 1.5,
            backgroundColor: 'action.hover',
            mb: 1.5,
          }}
        >
          <Typography sx={{ fontWeight: 600 }}>{subtitle}</Typography>
          {mandatory && (
            <Typography color="error.main" sx={{ fontSize: 13, mt: 0.5 }}>
              Обновление обязательно: старая версия скоро перестанет поддерживаться.
            </Typography>
          )}
        </Box>

        {!!updateInfo?.changelog?.length && (
          <>
            <Typography sx={{ fontWeight: 600, mb: 0.5 }}>Что нового</Typography>
            <List dense disablePadding>
              {updateInfo.changelog.slice(0, 6).map((item, idx) => (
                <ListItem key={`${item}-${idx}`} disableGutters sx={{ py: 0.25 }}>
                  <ListItemText primary={`• ${item}`} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {!mandatory && (
          <Button onClick={onClose} color="inherit">
            Позже
          </Button>
        )}
        <Button variant="contained" onClick={handleUpdate}>
          Обновить
        </Button>
      </DialogActions>
    </Dialog>
  );
}
