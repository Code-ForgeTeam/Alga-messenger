import { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Divider, FormControlLabel, Paper, Switch, Typography, Button } from '@mui/material';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { AppHeader } from '../components/AppHeader';
import { storageApi } from '../lib/api';
import { useSettingsStore } from '../stores/settingsStore';
import { useSnackbarStore } from '../stores/snackbarStore';

type StorageStats = {
  photosBytes: number;
  videosBytes: number;
  audioBytes: number;
  filesBytes: number;
  cacheBytes: number;
  totalBytes: number;
};

const ZERO_STATS: StorageStats = {
  photosBytes: 0,
  videosBytes: 0,
  audioBytes: 0,
  filesBytes: 0,
  cacheBytes: 0,
  totalBytes: 0,
};

const formatBytes = (value: number): string => {
  const bytes = Math.max(0, Number(value || 0));
  if (bytes < 1024) return `${bytes} Б`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb >= 100 ? 0 : 1)} КБ`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(mb >= 100 ? 0 : 1)} МБ`;
  const gb = mb / 1024;
  return `${gb.toFixed(gb >= 10 ? 1 : 2)} ГБ`;
};

const mediaConfig = [
  { key: 'photos', label: 'Фото', color: '#E880F7', icon: <ImageRoundedIcon />, statKey: 'photosBytes' as const },
  { key: 'videos', label: 'Видео', color: '#6F8AF7', icon: <VideocamRoundedIcon />, statKey: 'videosBytes' as const },
  { key: 'audio', label: 'Аудио', color: '#51A7F8', icon: <AudiotrackRoundedIcon />, statKey: 'audioBytes' as const },
  { key: 'files', label: 'Файлы', color: '#4DDF86', icon: <DescriptionRoundedIcon />, statKey: 'filesBytes' as const },
] as const;

export default function DataStoragePage() {
  const [stats, setStats] = useState<StorageStats>(ZERO_STATS);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const pushSnackbar = useSnackbarStore((s) => s.push);
  const storageAutoDownload = useSettingsStore((s) => s.storageAutoDownload);
  const setStorageAutoDownload = useSettingsStore((s) => s.setStorageAutoDownload);

  const loadStats = async () => {
    setLoading(true);
    try {
      const payload = await storageApi.getStats();
      setStats({
        photosBytes: Number(payload?.photosBytes ?? payload?.photos_bytes ?? 0),
        videosBytes: Number(payload?.videosBytes ?? payload?.videos_bytes ?? 0),
        audioBytes: Number(payload?.audioBytes ?? payload?.audio_bytes ?? 0),
        filesBytes: Number(payload?.filesBytes ?? payload?.files_bytes ?? 0),
        cacheBytes: Number(payload?.cacheBytes ?? payload?.cache_bytes ?? 0),
        totalBytes: Number(payload?.totalBytes ?? payload?.total_bytes ?? 0),
      });
    } catch {
      setStats(ZERO_STATS);
      pushSnackbar({ message: 'Не удалось загрузить данные хранилища', timeout: 2300, tone: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadStats();
  }, []);

  const usagePercent = useMemo(() => {
    const base = stats.totalBytes <= 0 ? 1 : stats.totalBytes;
    const used = stats.photosBytes + stats.videosBytes + stats.audioBytes + stats.filesBytes;
    return Math.max(6, Math.min(100, Math.round((used / base) * 100)));
  }, [stats]);

  const clearCache = async () => {
    setClearing(true);
    try {
      const response = await storageApi.clearCache();
      const freed = Number(response?.clearedBytes ?? response?.freedBytes ?? response?.cacheBytes ?? 0);
      pushSnackbar({
        message: `Кэш очищен${freed > 0 ? ` (${formatBytes(freed)})` : ''}`,
        timeout: 2200,
        tone: 'success',
      });
      await loadStats();
    } catch {
      pushSnackbar({ message: 'Не удалось очистить кэш', timeout: 2400, tone: 'error' });
    } finally {
      setClearing(false);
    }
  };

  return (
    <Box
      sx={{
        px: 1.5,
        pb: 'max(env(safe-area-inset-bottom), 92px)',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <AppHeader title="Данные и хранилище" />

      <Paper elevation={0} sx={{ p: 2, mb: 1.2, borderRadius: 3 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.5 }}>
          Использование хранилища
        </Typography>

        {loading ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 2 }}>
            <CircularProgress size={28} />
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
              <Typography sx={{ fontSize: 16 }}>Всего используется</Typography>
              <Typography sx={{ fontSize: 16, fontWeight: 700 }}>{formatBytes(stats.totalBytes)}</Typography>
            </Box>
            <Box sx={{ width: '100%', height: 10, borderRadius: 99, bgcolor: 'rgba(0,0,0,0.08)', mb: 1.4 }}>
              <Box sx={{ width: `${usagePercent}%`, height: '100%', borderRadius: 99, bgcolor: 'primary.main' }} />
            </Box>

            {mediaConfig.map((row, idx) => (
              <Box key={row.label}>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.1 }}>
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: 1.8,
                      bgcolor: row.color,
                      color: '#fff',
                      display: 'grid',
                      placeItems: 'center',
                      mr: 1.3,
                    }}
                  >
                    {row.icon}
                  </Box>
                  <Typography sx={{ fontSize: 16, flex: 1 }}>{row.label}</Typography>
                  <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                    {formatBytes(stats[row.statKey])}
                  </Typography>
                </Box>
                {idx < mediaConfig.length - 1 && <Divider />}
              </Box>
            ))}
          </>
        )}
      </Paper>

      <Paper elevation={0} sx={{ p: 2, mb: 1.2, borderRadius: 3 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.4, display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <WifiRoundedIcon sx={{ fontSize: 19 }} /> Автозагрузка через Wi-Fi
        </Typography>
        {mediaConfig.map((row, idx) => (
          <Box key={`wifi-${row.key}`}>
            <FormControlLabel
              sx={{ width: '100%', m: 0, py: 0.9, justifyContent: 'space-between' }}
              control={
                <Switch
                  checked={storageAutoDownload.wifi[row.key]}
                  onChange={(e) => setStorageAutoDownload('wifi', row.key, e.target.checked)}
                  color="primary"
                />
              }
              label={<Typography sx={{ fontSize: 16 }}>{row.label}</Typography>}
              labelPlacement="start"
            />
            {idx < mediaConfig.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>

      <Paper elevation={0} sx={{ p: 2, mb: 1.2, borderRadius: 3 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.4, display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <SignalCellularAltRoundedIcon sx={{ fontSize: 19 }} /> Автозагрузка через мобильную сеть
        </Typography>
        {mediaConfig.map((row, idx) => (
          <Box key={`cellular-${row.key}`}>
            <FormControlLabel
              sx={{ width: '100%', m: 0, py: 0.9, justifyContent: 'space-between' }}
              control={
                <Switch
                  checked={storageAutoDownload.cellular[row.key]}
                  onChange={(e) => setStorageAutoDownload('cellular', row.key, e.target.checked)}
                  color="primary"
                />
              }
              label={<Typography sx={{ fontSize: 16 }}>{row.label}</Typography>}
              labelPlacement="start"
            />
            {idx < mediaConfig.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>

      <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 3 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.2 }}>
          Кэш
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#C84646' }}>
            <DeleteOutlineRoundedIcon sx={{ mr: 1 }} />
            <Box>
              <Typography sx={{ fontSize: 18 }}>Очистить кэш</Typography>
              <Typography color="text.secondary">{formatBytes(stats.cacheBytes)}</Typography>
            </Box>
          </Box>
          <Button color="error" variant="outlined" onClick={clearCache} disabled={clearing}>
            {clearing ? 'Очистка...' : 'Очистить'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
