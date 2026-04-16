import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  Dialog,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate } from 'react-router-dom';
import { aiApi, uploadApi } from '../lib/api';
import type { Attachment } from '../lib/types';
import { useSettingsStore } from '../stores/settingsStore';
import { useAuthStore } from '../stores/authStore';
import { useChatStore } from '../stores/chatStore';
import { useSnackbarStore } from '../stores/snackbarStore';

type UiMessage = {
  id: string;
  from: 'ai' | 'me';
  text: string;
  attachments: Attachment[];
};

const stripAiPrefix = (text: string) => text.replace(/^AI:\s*/i, '').trim();
const isAiMessage = (text: string, isAiFlag?: boolean) => Boolean(isAiFlag) || /^AI:\s*/i.test(text);

export default function SupportPage() {
  const navigate = useNavigate();
  const { aiProvider, aiApiKey } = useSettingsStore();
  const me = useAuthStore((s) => s.user);
  const { messages, loadMessages, isLoadingMessages, clearChat } = useChatStore();
  const pushSnackbar = useSnackbarStore((s) => s.push);

  const [provider, setProvider] = useState<'g4f' | 'custom'>(aiProvider);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState<string>('');
  const [sending, setSending] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [mediaPreviewUrl, setMediaPreviewUrl] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    aiApi
      .getAIChat()
      .then((chat) => setChatId(String(chat?.id || '')))
      .catch(() => setChatId(''));
  }, []);

  useEffect(() => {
    if (aiProvider === 'custom' && !aiApiKey.trim()) {
      setProvider('g4f');
      return;
    }
    setProvider(aiProvider);
  }, [aiProvider, aiApiKey]);

  useEffect(() => {
    if (!chatId) return;
    loadMessages(chatId).catch(() => null);
  }, [chatId, loadMessages]);

  useEffect(() => {
    const nextUrls = pendingFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(nextUrls);
    return () => {
      nextUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [pendingFiles]);

  const uiMessages = useMemo<UiMessage[]>(() => {
    const list = messages[chatId] || [];
    return list.map((m) => {
      const ai = isAiMessage(m.text, (m as any).isAi);
      const attachments = Array.isArray((m as any).attachments)
        ? ((m as any).attachments as Attachment[])
        : [];
      if (ai) {
        return { id: m.id, from: 'ai', text: stripAiPrefix(m.text), attachments };
      }
      return { id: m.id, from: m.userId === me?.id ? 'me' : 'ai', text: m.text, attachments };
    });
  }, [messages, chatId, me?.id]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [uiMessages, sending, isLoadingMessages]);

  const onPickFiles = (files: FileList | null) => {
    if (!files) return;
    const images = Array.from(files).filter((file) => file.type.startsWith('image/'));
    if (!images.length) return;
    setPendingFiles((prev) => [...prev, ...images].slice(0, 8));
  };

  const onSend = async () => {
    const text = input.trim();
    if ((!text && pendingFiles.length === 0) || sending) return;

    if (!chatId) {
      const chat = await aiApi.getAIChat();
      const resolved = String(chat?.id || '');
      if (!resolved) return;
      setChatId(resolved);
    }

    if (provider === 'custom' && !aiApiKey.trim()) {
      pushSnackbar({ message: 'Добавьте AI API ключ в Спец. возможностях', timeout: 2200, tone: 'error' });
      return;
    }

    setSending(true);
    try {
      const resolvedChatId = chatId || String((await aiApi.getAIChat())?.id || '');
      if (!resolvedChatId) return;
      if (resolvedChatId !== chatId) {
        setChatId(resolvedChatId);
      }

      let uploadedAttachments: Attachment[] = [];
      if (pendingFiles.length > 0) {
        uploadedAttachments = (await uploadApi.uploadFiles(pendingFiles)) as Attachment[];
      }

      await aiApi.sendMessage(resolvedChatId, text, {
        provider,
        apiKey: provider === 'custom' ? aiApiKey.trim() : '',
        attachments: uploadedAttachments,
      });

      setInput('');
      setPendingFiles([]);
      await loadMessages(resolvedChatId);
    } catch (error: any) {
      const apiError = String(error?.response?.data?.error || '').trim();
      pushSnackbar({
        message: apiError || 'Не удалось отправить сообщение в AI чат',
        timeout: 2600,
        tone: 'error',
      });
    } finally {
      setSending(false);
    }
  };

  const onClearChat = async () => {
    if (!chatId || clearing || sending) return;
    const confirmed = window.confirm('Очистить AI чат?');
    if (!confirmed) return;

    setClearing(true);
    try {
      await clearChat(chatId);
      await loadMessages(chatId);
      pushSnackbar({ message: 'AI чат очищен', timeout: 2000, tone: 'success' });
    } catch {
      pushSnackbar({ message: 'Не удалось очистить AI чат', timeout: 2400, tone: 'error' });
    } finally {
      setClearing(false);
    }
  };

  const showCustomWarning = provider === 'custom' && !aiApiKey.trim();

  return (
    <Box
      sx={{
        p: 1.2,
        pt: 'max(env(safe-area-inset-top), 8px)',
        pb: 'max(env(safe-area-inset-bottom), 8px)',
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 'max(env(safe-area-inset-left), 2px)',
        }}
      >
        <IconButton onClick={() => navigate('/chats')}>
          <ArrowBackIcon />
        </IconButton>
        <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main' }}>
          <PsychologyRoundedIcon sx={{ fontSize: 20 }} />
        </Avatar>
        <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
          AI
        </Typography>
        <Select size="small" value={provider} onChange={(e) => setProvider(e.target.value as 'g4f' | 'custom')}>
          <MenuItem value="g4f">g4f</MenuItem>
          <MenuItem value="custom">Свой API</MenuItem>
        </Select>
        <IconButton
          onClick={() => void onClearChat()}
          disabled={!chatId || clearing || sending}
          color="error"
          size="small"
        >
          <DeleteSweepRoundedIcon />
        </IconButton>
      </Box>

      {showCustomWarning && (
        <Paper
          sx={{
            p: 1.1,
            borderRadius: 2,
            bgcolor: 'rgba(228,75,75,0.12)',
            border: '1px solid',
            borderColor: 'rgba(228,75,75,0.36)',
          }}
        >
          <Typography variant="body2">Введите AI API ключ в разделе «Спец. возможности».</Typography>
        </Paper>
      )}

      <Box
        ref={listRef}
        sx={{ flex: 1, minHeight: 0, overflowY: 'auto', pr: 0.2, display: 'grid', gap: 1, alignContent: 'start' }}
      >
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
              {m.attachments.length > 0 && (
                <Stack spacing={0.6} sx={{ mb: m.text ? 0.8 : 0 }}>
                  {m.attachments.map((attachment) => {
                    const isImage = attachment.type === 'image';
                    return (
                      <Box key={attachment.id} sx={{ display: 'grid', gap: 0.45 }}>
                        {isImage ? (
                          <Box
                            component="img"
                            src={attachment.url}
                            alt={attachment.name || 'photo'}
                            onClick={() => setMediaPreviewUrl(attachment.url)}
                            sx={{
                              width: 170,
                              maxWidth: '100%',
                              borderRadius: 1.5,
                              display: 'block',
                              cursor: 'pointer',
                              border: '1px solid rgba(255,255,255,0.25)',
                            }}
                          />
                        ) : (
                          <Typography variant="body2" sx={{ opacity: 0.94 }}>
                            {attachment.name || 'Вложение'}
                          </Typography>
                        )}
                      </Box>
                    );
                  })}
                </Stack>
              )}
              {!!m.text && <Typography sx={{ whiteSpace: 'pre-wrap' }}>{m.text}</Typography>}
            </Paper>
          ))
        )}

        {sending && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pl: 1 }}>
            <CircularProgress size={16} />
            <Typography variant="body2" color="text.secondary">
              AI печатает...
            </Typography>
          </Box>
        )}
      </Box>

      {previewUrls.length > 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 0.8,
            borderRadius: 2.3,
            border: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            gap: 0.7,
            overflowX: 'auto',
            flexShrink: 0,
          }}
        >
          {previewUrls.map((url, index) => (
            <Box key={url} sx={{ position: 'relative', flex: '0 0 auto' }}>
              <Box
                component="img"
                src={url}
                alt={`selected-${index}`}
                sx={{
                  width: 62,
                  height: 62,
                  borderRadius: 1.2,
                  objectFit: 'cover',
                  border: '1px solid rgba(0,0,0,0.14)',
                }}
              />
              <IconButton
                size="small"
                onClick={() =>
                  setPendingFiles((prev) => prev.filter((_, fileIndex) => fileIndex !== index))
                }
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  bgcolor: 'rgba(20,20,20,0.75)',
                  color: '#fff',
                  '&:hover': { bgcolor: 'rgba(20,20,20,0.92)' },
                }}
              >
                <CloseRoundedIcon sx={{ fontSize: 15 }} />
              </IconButton>
            </Box>
          ))}
        </Paper>
      )}

      <Paper
        elevation={0}
        sx={{
          p: 0.8,
          borderRadius: 99,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          flexShrink: 0,
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          onChange={(event) => {
            onPickFiles(event.target.files);
            event.currentTarget.value = '';
          }}
        />
        <IconButton size="small" onClick={() => fileInputRef.current?.click()} disabled={sending}>
          <AttachFileRoundedIcon />
        </IconButton>
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
        <IconButton
          color="primary"
          onClick={() => void onSend()}
          disabled={sending || (!input.trim() && pendingFiles.length === 0)}
        >
          <SendRoundedIcon />
        </IconButton>
      </Paper>

      <Dialog open={Boolean(mediaPreviewUrl)} onClose={() => setMediaPreviewUrl(null)} maxWidth="lg">
        <Box
          component="img"
          src={mediaPreviewUrl || ''}
          alt="preview"
          sx={{ maxWidth: '100vw', maxHeight: '90vh', display: 'block' }}
        />
      </Dialog>
    </Box>
  );
}
