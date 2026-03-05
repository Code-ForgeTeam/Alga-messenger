import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { storageApi } from '../lib/api';
import { AppHeader } from '../components/AppHeader';

export default function DataStoragePage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    storageApi.getStats().then(setStats).catch(() => null);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <AppHeader title="Данные и память" />
      <Typography sx={{ mb: 2 }}>Used: {stats?.used ?? '...'}</Typography>
      <Button variant="contained" color="warning" onClick={() => storageApi.clearCache()}>Clear cache</Button>
    </Box>
  );
}
