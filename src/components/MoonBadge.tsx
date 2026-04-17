import { Box } from '@mui/material';

interface MoonBadgeProps {
  size?: number;
}

export function MoonBadge({ size = 26 }: MoonBadgeProps) {
  return (
    <Box
      aria-hidden
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        position: 'relative',
        background: 'radial-gradient(circle at 30% 28%, #FDF7D6 0%, #F4D37A 48%, #D5A84B 100%)',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.22), 0 0 14px rgba(255,210,117,0.55)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '78%',
          height: '78%',
          right: '-6%',
          top: '11%',
          borderRadius: '50%',
          background: 'rgba(14, 24, 40, 0.62)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '28%',
          height: '28%',
          left: '18%',
          top: '22%',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.56)',
          filter: 'blur(0.3px)',
        },
      }}
    />
  );
}
