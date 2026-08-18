import { Box } from '@mui/material';

type PlusBadgeProps = {
  compact?: boolean;
};

export function PlusBadge({ compact = false }: PlusBadgeProps) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: compact ? 18 : 20,
        height: compact ? 18 : 20,
        px: compact ? 0.5 : 0.7,
        borderRadius: 999,
        bgcolor: 'rgba(217,45,32,0.12)',
        color: '#D92D20',
        fontSize: compact ? 11 : 12,
        fontWeight: 900,
        lineHeight: 1,
        border: '1px solid rgba(217,45,32,0.4)',
        boxShadow: '0 4px 10px rgba(217,45,32,0.14)',
        flexShrink: 0,
      }}
    >
      +
    </Box>
  );
}
