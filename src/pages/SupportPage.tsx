import { useEffect, useMemo, useRef, useState } from 'react';
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
import { useAuthStore } from '../stores/authStore';
import { useChatStore } from '../stores/chatStore';

type UiMessage = { id: string; from: 'ai' | 'me'; text: string };

const stripAiPrefix = (text: string) => text.replace(/^AI:\s*/i, '').trim();
const isAiMessage = (text: string, isAiFlag?: boolean) => Boolean(isAiFlag) || /^AI:\s*/i.test(text);

export default function SupportPage() {
  const navigate = useNavigate();
  const { aiProvider, aiApiKey } = useSettingsStore();
  const me = useAuthStore((s) => s.user);
  const { messages, loadMessages, isLoadingMessages } = useChatStore();

  const [provider, setProvider] = useState<'g4f' | 'custom'>(aiProvider);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState<string>('');
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    aiApi
      .getAIChat()
      .then((chat) => setChatId(String(chat?.id || '')))
      .catch(() => setChatId(''));
  }, []);

  useEffect(() => {
    setProvider(aiProvider);
  }, [aiProvider]);

  useEffect(() => {
    if (!chatId) return;
    loadMessages(chatId).catch(() => null);
  }, [chatId, loadMessages]);

  const uiMessages = useMemo<UiMessage[]>(() => {
    const list = messages[chatId] || [];
    return list.map((m) => {
      const ai = isAiMessage(m.text, (m as any).isAi);
      if (ai) {
        return { id: m.id, from: 'ai', text: stripAiPrefix(m.text) };
      }
      return { id: m.id, from: m.userId === me?.id ? 'me' : 'ai', text: m.text };
    });
  }, [messages, chatId, me?.id]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [uiMessages, sending, isLoadingMessages]);

  const onSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    if (!chatId) {
      const chat = await aiApi.getAIChat();
      const resolved = String(chat?.id || '');
      if (!resolved) return;
      setChatId(resolved);
    }

    if (provider === 'custom' && !aiApiKey.trim()) {
      return;
    }

    setInput('');
    setSending(true);
    try {
      const resolvedChatId = chatId || String((await aiApi.getAIChat())?.id || '');
      if (!resolvedChatId) return;
      if (resolvedChatId !== chatId) {
        setChatId(resolvedChatId);
      }
      await aiApi.sendMessage(resolvedChatId, text);
      await loadMessages(resolvedChatId);
    } finally {
      setSending(false);
    }
  };

  const showCustomWarning = provider === 'custom' && !aiApiKey.trim();

  return (
    <Box sx={{ p: 1.5, height: '100%', display: 'flex', flexDirection: 'column', gap: 1.2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pt: 'max(env(safe-area-inset-top), 12px)',
          pl: 'max(env(safe-area-inset-left), 4px)',
          pr: 'max(env(safe-area-inset-right), 4px)',
        }}
      >
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

      {showCustomWarning && (
        <Paper sx={{ p: 1.1, borderRadius: 2, bgcolor: 'rgba(228,75,75,0.12)', border: '1px solid', borderColor: 'rgba(228,75,75,0.36)' }}>
          <Typography variant="body2">Введите AI API ключ в разделе «Спец. возможности».</Typography>
        </Paper>
      )}

      <Box ref={listRef} sx={{ flex: 1, overflowY: 'auto', pr: 0.2, display: 'grid', gap: 1, alignContent: 'start' }}>
        {isLoadingMessages && !uiMessages.length ? (
          <Box sx={{ display: 'grid', placeItems: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
          uiMessages.map((m) => (
            <Paper
              key={m.id}
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
          ))
        )}

        {sending && (
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
              void onSend();
            }
          }}
          fullWidth
          InputProps={{ disableUnderline: true }}
        />
        <IconButton color="primary" onClick={() => void onSend()} disabled={!input.trim() || sending}><SendRoundedIcon /></IconButton>
      </Paper>
    </Box>
  );
}
