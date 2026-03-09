import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';

export default function PrivacySettingPage() {
  const { settingKey = '' } = useParams();
  const settings = useSettingsStore((s) => s.privacySettings);
  const update = useSettingsStore((s) => s.updatePrivacyRule);

  const rule = (settings as any)[settingKey];
  if (!rule || settingKey === 'hideReadTime') return <Box sx={{ p: 2 }}><Typography>Unknown setting</Typography></Box>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{settingKey}</Typography>
      <FormControl fullWidth>
        <InputLabel>Visibility</InputLabel>
        <Select
          label="Visibility"
          value={rule.value}
          onChange={(e) => update(settingKey as any, { value: e.target.value as any })}
        >
          <MenuItem value="everybody">Everybody</MenuItem>
          <MenuItem value="contacts">My contacts</MenuItem>
          <MenuItem value="nobody">Nobody</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
