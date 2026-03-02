import { ChatType } from '@prisma/client';
import { Router } from 'express';
import { prisma } from '../db/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

export const chatsRouter = Router();
chatsRouter.use(authMiddleware);

chatsRouter.get('/', async (req, res) => {
  const rows = await prisma.chatParticipant.findMany({
    where: { userId: req.user!.id },
    include: {
      chat: {
        include: {
          participants: { include: { user: true } },
          messages: { orderBy: { createdAt: 'desc' }, take: 1, include: { user: true, attachments: true } },
        },
      },
    },
  });

  const chats = rows.map((r) => ({
    ...r.chat,
    participants: r.chat.participants.map((p) => p.user),
    archived: r.archived,
    pinned: r.pinned,
    muted: r.muted,
    unreadCount: r.unreadCount,
    lastMessage: r.chat.messages[0] || null,
    lastMessageText: r.chat.messages[0]?.text || '',
    lastMessageTime: r.chat.messages[0]?.createdAt,
  }));

  res.json(chats);
});

chatsRouter.post('/', async (req, res) => {
  const { name, type, participantIds = [] } = req.body as { name?: string; type: ChatType; participantIds: string[] };
  const ids = Array.from(new Set([req.user!.id, ...participantIds]));

  const chat = await prisma.chat.create({
    data: {
      name,
      type,
      participants: { createMany: { data: ids.map((userId) => ({ userId })) } },
    },
    include: { participants: { include: { user: true } } },
  });

  res.status(201).json({ ...chat, participants: chat.participants.map((p) => p.user) });
});

chatsRouter.get('/:chatId', async (req, res) => {
  const chat = await prisma.chat.findUnique({
    where: { id: req.params.chatId },
    include: { participants: { include: { user: true } } },
  });
  if (!chat) return res.status(404).json({ error: 'Not found' });
  res.json({ ...chat, participants: chat.participants.map((p) => p.user) });
});

chatsRouter.delete('/:chatId/messages', async (req, res) => {
  await prisma.message.deleteMany({ where: { chatId: req.params.chatId } });
  res.json({ ok: true });
});

chatsRouter.delete('/:chatId', async (req, res) => {
  await prisma.chat.delete({ where: { id: req.params.chatId } });
  res.json({ ok: true });
});

chatsRouter.post('/:chatId/archive', async (req, res) => {
  await prisma.chatParticipant.update({ where: { chatId_userId: { chatId: req.params.chatId, userId: req.user!.id } }, data: { archived: true } });
  res.json({ ok: true });
});

chatsRouter.delete('/:chatId/archive', async (req, res) => {
  await prisma.chatParticipant.update({ where: { chatId_userId: { chatId: req.params.chatId, userId: req.user!.id } }, data: { archived: false } });
  res.json({ ok: true });
});

chatsRouter.post('/:chatId/mute', async (req, res) => {
  await prisma.chatParticipant.update({ where: { chatId_userId: { chatId: req.params.chatId, userId: req.user!.id } }, data: { muted: true } });
  res.json({ ok: true });
});

chatsRouter.post('/:chatId/pin', async (req, res) => {
  await prisma.chatParticipant.update({ where: { chatId_userId: { chatId: req.params.chatId, userId: req.user!.id } }, data: { pinned: true } });
  res.json({ ok: true });
});

chatsRouter.post('/:chatId/block', async (_req, res) => res.json({ ok: true }));
chatsRouter.delete('/:chatId/block', async (_req, res) => res.json({ ok: true }));
