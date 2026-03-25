import type { ReactNode } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface AppHeaderProps {
  title: ReactNode;
  showBack?: boolean;
  backTo?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
}

export function AppHeader({ title, showBack = true, backTo = '/chats', leftSlot, rightSlot }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        minHeight: 48,
        pl: 'max(env(safe-area-inset-left), 8px)',
        pr: 'max(env(safe-area-inset-right), 8px)',
        pt: 'max(env(safe-area-inset-top), 12px)',
        mb: 1,
      }}
    >
      {leftSlot ??
        (showBack ? (
          <IconButton onClick={() => navigate(backTo)}>
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
