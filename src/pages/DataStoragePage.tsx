import { Box, Divider, FormControlLabel, IconButton, Paper, Switch, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useNavigate } from 'react-router-dom';

const mediaRows = [
  { label: 'Фото', amount: '43.2 МБ', color: '#E880F7' },
  { label: 'Видео', amount: '0 Б', color: '#6F8AF7' },
  { label: 'Аудио', amount: '6.4 МБ', color: '#51A7F8' },
  { label: 'Файлы', amount: '0 Б', color: '#4DDF86' },
];

export default function DataStoragePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 1.5, height: '100%', overflowY: 'auto' }}>
      <Paper elevation={0} sx={{ p: 1.5, mb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
          <Typography variant="h5" fontWeight={700} sx={{ ml: 1 }}>Данные и хранилище</Typography>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ p: 2, mb: 1.5 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.5 }}>ИСПОЛЬЗОВАНИЕ ХРАНИЛИЩА</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography sx={{ fontSize: 16 }}>Всего используется</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700 }}>49.6 МБ</Typography>
        </Box>
        <Box sx={{ width: 86, height: 10, borderRadius: 5, bgcolor: 'primary.main', opacity: 0.8, mb: 1.2 }} />

        {mediaRows.map((row) => (
          <Box key={row.label}>
            <Box sx={{ display: 'flex', alignItems: 'center', py: 1.1 }}>
              <Box sx={{ width: 56, height: 56, borderRadius: 2.2, bgcolor: row.color, mr: 1.5 }} />
              <Typography sx={{ flex: 1, fontSize: 16 }}>{row.label}</Typography>
              <Typography color="text.secondary" sx={{ fontSize: 16 }}>{row.amount}</Typography>
            </Box>
            <Divider />
          </Box>
        ))}
      </Paper>

      <Paper elevation={0} sx={{ p: 2, mb: 1.5 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.7 }}>
          <WifiRoundedIcon fontSize="small" /> АВТОЗАГРУЗКА ЧЕРЕЗ WI-FI
        </Typography>
        {['Фото', 'Видео', 'Файлы', 'Аудио'].map((item) => (
          <Box key={item}>
            <FormControlLabel control={<Switch defaultChecked color="primary" />} label={item} sx={{ py: 0.6, width: '100%', justifyContent: 'space-between', m: 0 }} />
            <Divider />
          </Box>
        ))}
      </Paper>

      <Paper elevation={0} sx={{ p: 2, mb: 1.5 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.5, display: 'flex', alignItems: 'center', gap: 0.7 }}>
          <SignalCellularAltRoundedIcon fontSize="small" /> АВТОЗАГРУЗКА ЧЕРЕЗ МОБИЛЬНУЮ СЕТЬ
        </Typography>
        {['Фото', 'Видео', 'Файлы', 'Аудио'].map((item, idx) => (
          <Box key={item}>
            <FormControlLabel control={<Switch defaultChecked={idx % 2 === 0} color="primary" />} label={item} sx={{ py: 0.6, width: '100%', justifyContent: 'space-between', m: 0 }} />
            <Divider />
          </Box>
        ))}
      </Paper>

      <Paper elevation={0} sx={{ p: 2 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.5 }}>КЭШ</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'error.main' }}>
          <DeleteOutlineRoundedIcon />
          <Box>
            <Typography sx={{ fontSize: 16 }}>Очистить кэш</Typography>
            <Typography color="text.secondary">8.6 КБ</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
