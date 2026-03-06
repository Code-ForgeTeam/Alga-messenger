import { Box, Chip, IconButton, Paper, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  'Аккаунт и авторизация',
  'Сообщения и чаты',
  'Медиа и файлы',
  'Уведомления',
  'Производительность',
  'Сообщить об ошибке',
  'Предложение',
  'Другое',
];

export default function SupportPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
        <Box sx={{ ml: 0.5 }}>
          <Typography variant="h5" fontWeight={700}>Поддержка</Typography>
          <Typography color="text.secondary">бот</Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 2 }}>
        <ShieldRoundedIcon color="primary" sx={{ mt: 0.5 }} />
        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, bgcolor: 'rgba(244,246,252,0.9)', maxWidth: '90%' }}>
          <Typography sx={{ fontSize: 18 }}>
            Здравствуйте! Как мы можем помочь?
            <br />
            Выберите категорию обращения:
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'right' }}>15:34</Typography>
        </Paper>
      </Box>

      <Box sx={{ mt: 1.5, pl: 5, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {CATEGORIES.map((category) => (
          <Chip key={category} label={category} variant="outlined" color="primary" sx={{ fontSize: 28, height: 52, borderRadius: 2 }} />
        ))}
      </Box>
    </Box>
  );
}
