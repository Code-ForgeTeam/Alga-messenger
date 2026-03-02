import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { storageApi } from '../lib/api';

export default function DataStoragePage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    storageApi.getStats().then(setStats).catch(() => null);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Data & Storage</Typography>
      <Typography sx={{ mb: 2 }}>Used: {stats?.used ?? '...'}</Typography>
      <Button variant="contained" color="warning" onClick={() => storageApi.clearCache()}>Clear cache</Button>
    </Box>
  );
}
