import type { ReactNode } from 'react';
import { Box, Divider, FormControlLabel, IconButton, Paper, Switch, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import ImageRoundedIcon from '@mui/icons-material/ImageRounded';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { useNavigate } from 'react-router-dom';

const mediaRows = [
  { label: 'Фото', amount: '43.2 МБ', color: '#E880F7', icon: <ImageRoundedIcon /> },
  { label: 'Видео', amount: '0 Б', color: '#6F8AF7', icon: <VideocamRoundedIcon /> },
  { label: 'Аудио', amount: '6.4 МБ', color: '#51A7F8', icon: <AudiotrackRoundedIcon /> },
  { label: 'Файлы', amount: '0 Б', color: '#4DDF86', icon: <DescriptionRoundedIcon /> },
];

const Toggles = ({ title, icon }: { title: string; icon: ReactNode }) => (
  <Paper elevation={0} sx={{ p: 2, mb: 1.2 }}>
    <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.4, display: 'flex', alignItems: 'center', gap: 0.8 }}>
      {icon} {title}
    </Typography>
    {['Фото', 'Видео', 'Файлы', 'Аудио'].map((label, idx) => (
      <Box key={`${title}-${label}`}>
        <FormControlLabel
          sx={{ width: '100%', m: 0, py: 0.9, justifyContent: 'space-between' }}
          control={<Switch defaultChecked={idx % 3 !== 1 || title.includes('WI-FI')} color="primary" />}
          label={<Typography sx={{ fontSize: 16 }}>{label}</Typography>}
          labelPlacement="start"
        />
        {idx < 3 && <Divider />}
      </Box>
    ))}
  </Paper>
);

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

      <Paper elevation={0} sx={{ p: 2, mb: 1.2 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.5 }}>ИСПОЛЬЗОВАНИЕ ХРАНИЛИЩА</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
          <Typography sx={{ fontSize: 16 }}>Всего используется</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 700 }}>49.6 МБ</Typography>
        </Box>
        <Box sx={{ width: 52, height: 10, borderRadius: 99, bgcolor: 'primary.main', mb: 1.3 }} />

        {mediaRows.map((row, idx) => (
          <Box key={row.label}>
            <Box sx={{ display: 'flex', alignItems: 'center', py: 1.1 }}>
              <Box sx={{ width: 42, height: 42, borderRadius: 1.8, bgcolor: row.color, color: '#fff', display: 'grid', placeItems: 'center', mr: 1.3 }}>
                {row.icon}
              </Box>
              <Typography sx={{ fontSize: 16, flex: 1 }}>{row.label}</Typography>
              <Typography color="text.secondary" sx={{ fontSize: 14 }}>{row.amount}</Typography>
            </Box>
            {idx < mediaRows.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>

      <Toggles title="АВТОЗАГРУЗКА ЧЕРЕЗ WI-FI" icon={<WifiRoundedIcon sx={{ fontSize: 19 }} />} />
      <Toggles title="АВТОЗАГРУЗКА ЧЕРЕЗ МОБИЛЬНУЮ СЕТЬ" icon={<SignalCellularAltRoundedIcon sx={{ fontSize: 19 }} />} />

      <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
        <Typography color="primary.main" fontWeight={700} sx={{ mb: 1.2 }}>КЭШ</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#C84646' }}>
          <DeleteOutlineRoundedIcon sx={{ mr: 1 }} />
          <Box>
            <Typography sx={{ fontSize: 18 }}>Очистить кэш</Typography>
            <Typography color="text.secondary">8.6 КБ</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
