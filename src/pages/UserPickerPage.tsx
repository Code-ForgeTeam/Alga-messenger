import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';

const TITLES: Record<string, string> = {
  always: 'Всегда показывать',
  never: 'Никогда не показывать',
};

export default function UserPickerPage() {
  const { exceptionType = 'always' } = useParams();

  return (
    <Box sx={{ p: 1.5 }}>
      <AppHeader title={TITLES[exceptionType] || 'Исключения'} />
      <Typography variant="body2" color="text.secondary">
        Выбор пользователей для исключений будет добавлен в следующем обновлении.
      </Typography>
    </Box>
  );
}
