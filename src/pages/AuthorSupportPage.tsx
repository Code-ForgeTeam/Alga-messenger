import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TerminalRoundedIcon from '@mui/icons-material/TerminalRounded';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

export default function AuthorSupportPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
        background: isDark
          ? 'linear-gradient(160deg, #050D1A, #0A1C31 52%, #09253E)'
          : 'linear-gradient(160deg, #F5FBFF, #E8F7EF 58%, #EAF4FF)',
        color: isDark ? '#E8F1FF' : '#11293D',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          pt: 'max(env(safe-area-inset-top), 12px)',
          pl: 'max(env(safe-area-inset-left), 8px)',
          pr: 'max(env(safe-area-inset-right), 8px)',
          pb: 1,
        }}
      >
        <IconButton onClick={() => navigate('/chats')} sx={{ color: 'inherit' }}>
          <ArrowBackIcon />
        </IconButton>
      </Box>

      <Box sx={{ px: 2, pb: 'max(env(safe-area-inset-bottom), 24px)' }}>
        <Box sx={{ display: 'grid', justifyItems: 'center', mt: 2.5 }}>
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: 3,
              display: 'grid',
              placeItems: 'center',
              border: '1px solid',
              borderColor: isDark ? 'rgba(104,182,255,0.45)' : 'rgba(22,126,83,0.3)',
              bgcolor: isDark ? 'rgba(13,30,49,0.86)' : '#FFFFFF',
              boxShadow: isDark ? '0 14px 32px rgba(0,0,0,0.36)' : '0 14px 32px rgba(31,163,91,0.22)',
            }}
          >
            <TerminalRoundedIcon sx={{ fontSize: 36, color: isDark ? '#77BBFF' : '#1FA35B' }} />
          </Box>

          <Typography
            sx={{
              mt: 2.2,
              fontSize: { xs: 26, sm: 30 },
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            Спасибо за каждый Рубль!
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 3,
            border: '1px solid',
            borderColor: isDark ? 'rgba(125,185,255,0.35)' : 'rgba(31,163,91,0.24)',
            bgcolor: isDark ? 'rgba(9,21,38,0.84)' : '#FFFFFF',
            fontFamily: 'Consolas, "Courier New", monospace',
            boxShadow: isDark ? 'inset 0 0 0 1px rgba(108,188,255,0.15)' : 'inset 0 0 0 1px rgba(31,163,91,0.10)',
          }}
        >
          <Typography sx={{ color: isDark ? '#93BCE8' : '#487366', fontSize: 12 }}>$ payment/card</Typography>
          <Typography sx={{ mt: 1, fontSize: { xs: 20, sm: 24 }, fontWeight: 700, letterSpacing: 0.7 }}>
            Карта Т-Банк: 2200 7019 6952 9293
          </Typography>
          <Typography sx={{ mt: 1.2, color: 'text.secondary', fontSize: 13 }}>
            Поддержка помогает ускорять доработки и выпускать обновления чаще.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
