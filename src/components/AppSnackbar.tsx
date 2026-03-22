import { Box, Button, Snackbar, Typography } from '@mui/material';
import { useSnackbarStore } from '../stores/snackbarStore';

export function AppSnackbar() {
  const { current, undo, dismiss } = useSnackbarStore();

  return (
    <Snackbar
      open={!!current}
      onClose={(_, reason) => {
        if (reason !== 'clickaway') dismiss();
      }}
      autoHideDuration={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      sx={{ bottom: 'calc(88px + env(safe-area-inset-bottom, 0px)) !important' }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'rgba(30,40,55,0.95)',
        borderRadius: 2,
        px: 2,
        py: 1,
      }}>
        <Typography sx={{ color: '#fff', fontSize: 14, mr: 1 }}>{current?.message}</Typography>
        {current?.onUndo && <Button onClick={undo}>Отменить</Button>}
      </Box>
    </Snackbar>
  );
}
