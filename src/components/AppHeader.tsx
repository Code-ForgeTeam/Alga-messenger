import type { ReactNode } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export function AppHeader({ title, showBack = true, leftSlot, rightSlot }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight: 48,
        px: 0.5,
        pt: 'max(env(safe-area-inset-top), 12px)',
        mb: 1,
      }}
    >
      {leftSlot ??
        (showBack ? (
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
        ) : (
          <Box sx={{ width: 40 }} />
        ))}

      <Typography variant="h6" sx={{ fontSize: 20, fontWeight: 700, ml: 0.5, flex: 1 }}>
        {title}
      </Typography>

      {rightSlot ?? <Box sx={{ width: 40 }} />}
    </Box>
  );
}
