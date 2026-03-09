import { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  CircularProgress,
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
import { aiApi } from '../lib/api';
import { useSettingsStore } from '../stores/settingsStore';

type Msg = { from: 'ai' | 'me'; text: string };

export default function SupportPage() {
  const navigate = useNavigate();
  const { aiProvider, aiApiKey } = useSettingsStore();
  const [provider, setProvider] = useState<'g4f' | 'custom'>(aiProvider);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState<string>('');
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    aiApi
      .getAIChat()
      .then((chat) => setChatId(String(chat?.id || '')))
      .catch(() => setChatId(''));
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const onSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { from: 'me', text }]);
    setInput('');
    setLoading(true);

    try {
      const resolvedChatId = chatId || String((await aiApi.getAIChat())?.id || '');
      if (!resolvedChatId) throw new Error('AI chat id missing');
      if (!chatId) setChatId(resolvedChatId);

      // Пока backend использует встроенный AI endpoint.
      // Для custom провайдера сохраняем совместимость и обязательно возвращаем ответ.
      if (provider === 'custom' && !aiApiKey.trim()) {
        setMessages((prev) => [...prev, { from: 'ai', text: 'Введите AI API ключ в Спец. возможностях.' }]);
      } else {
        const payload = await aiApi.sendMessage(resolvedChatId, text);
        const answer = String(payload?.aiMessage?.text || payload?.message || 'Ответ получен.');
        setMessages((prev) => [...prev, { from: 'ai', text: answer }]);
      }
    } catch {
      setMessages((prev) => [...prev, { from: 'ai', text: 'Ошибка ответа AI. Проверьте подключение к backend.' }]);
    } finally {
      setLoading(false);
    }
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

      <Box ref={listRef} sx={{ flex: 1, overflowY: 'auto', pr: 0.2, display: 'grid', gap: 1, alignContent: 'start' }}>
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

        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1 }}>
            <CircularProgress size={16} />
            <Typography variant="body2" color="text.secondary">AI печатает...</Typography>
          </Box>
        )}
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
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          fullWidth
          InputProps={{ disableUnderline: true }}
        />
        <IconButton color="primary" onClick={onSend} disabled={!input.trim() || loading}><SendRoundedIcon /></IconButton>
      </Paper>
    </Box>
  );
}
