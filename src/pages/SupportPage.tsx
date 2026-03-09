import { useState } from 'react';
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import { useNavigate } from 'react-router-dom';
import { useSettingsStore } from '../stores/settingsStore';

export default function SupportPage() {
  const navigate = useNavigate();
  const { aiProvider, aiApiKey } = useSettingsStore();
  const [provider, setProvider] = useState<'g4f' | 'custom'>(aiProvider);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Я помогаю с разработкой софта, кодом и техническими вопросами.' },
  ] as { from: 'ai' | 'me'; text: string }[]);

  const onSend = () => {
    const text = input.trim();
    if (!text) return;

    const response =
      provider === 'custom' && !aiApiKey
        ? 'Добавьте API ключ в Настройки → Спец. возможности, чтобы использовать свой AI.'
        : `Принял: ${text}`;

    setMessages((prev) => [...prev, { from: 'me', text }, { from: 'ai', text: response }]);
    setInput('');
  };

  return (
    <Box sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
        <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main' }}>
          <PsychologyRoundedIcon sx={{ fontSize: 20 }} />
        </Avatar>
        <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>AI</Typography>
        <Select size="small" value={provider} onChange={(e) => setProvider(e.target.value as 'g4f' | 'custom')}>
          <MenuItem value="g4f">g4f</MenuItem>
          <MenuItem value="custom">Свой API</MenuItem>
        </Select>
      </Box>

      <Paper elevation={0} sx={{ p: 1.2, borderRadius: 3, bgcolor: 'rgba(125,106,227,0.12)' }}>
        <Typography fontWeight={700} sx={{ color: 'primary.main' }}>ПРОЦЕСС МЫШЛЕНИЯ</Typography>
        <Chip label="4.6s" size="small" sx={{ mt: 0.8 }} />
      </Paper>

      <Box sx={{ flex: 1, overflowY: 'auto', pr: 0.2, display: 'grid', gap: 1 }}>
        {messages.map((m, i) => (
          <Paper
            key={`${m.from}-${i}`}
            elevation={0}
            sx={{
              p: 1.4,
              borderRadius: 3,
              maxWidth: '92%',
              justifySelf: m.from === 'me' ? 'end' : 'start',
              bgcolor: m.from === 'me' ? 'primary.main' : 'background.paper',
              color: m.from === 'me' ? '#fff' : 'text.primary',
            }}
          >
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>{m.text}</Typography>
          </Paper>
        ))}
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 0.8,
          borderRadius: 99,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <IconButton size="small"><AttachFileRoundedIcon /></IconButton>
        <TextField
          variant="standard"
          placeholder="Напиши сообщение..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSend()}
          fullWidth
          InputProps={{ disableUnderline: true }}
        />
        <IconButton color="primary" onClick={onSend}><SendRoundedIcon /></IconButton>
      </Paper>
    </Box>
  );
}
