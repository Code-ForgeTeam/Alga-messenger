import { Router } from 'express';
import { prisma } from '../db/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

export const messagesRouter = Router();
messagesRouter.use(authMiddleware);

messagesRouter.get('/chat/:chatId', async (req, res) => {
  const limit = Number(req.query.limit || 50);
  const offset = Number(req.query.offset || 0);
  const messages = await prisma.message.findMany({
    where: { chatId: req.params.chatId },
    include: { attachments: true },
    orderBy: { createdAt: 'asc' },
    skip: offset,
    take: limit,
  });
  res.json(messages);
});

messagesRouter.post('/', async (req, res) => {
  const { chatId, text, attachments = [] } = req.body;
  const message = await prisma.message.create({
    data: {
      chatId,
      text: text || '',
      userId: req.user!.id,
      attachments: {
        create: (attachments as any[]).map((a) => ({
          name: a.name || 'file',
          url: a.url || '',
          type: a.type || 'file',
          size: Number(a.size || 0),
        })),
      },
    },
    include: { attachments: true },
  });

  await prisma.chat.update({ where: { id: chatId }, data: { updatedAt: new Date() } });
  res.status(201).json({ message });
});

messagesRouter.post('/read', async (req, res) => {
  const { chatId } = req.body;
  await prisma.chatParticipant.update({ where: { chatId_userId: { chatId, userId: req.user!.id } }, data: { unreadCount: 0 } });
  res.json({ ok: true });
});
