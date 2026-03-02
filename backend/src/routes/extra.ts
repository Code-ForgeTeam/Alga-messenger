import { Router } from 'express';
import { prisma } from '../db/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

export const extraRouter = Router();
extraRouter.use(authMiddleware);

extraRouter.get('/saved/chat', async (req, res) => {
  let chat = await prisma.chat.findFirst({ where: { type: 'saved', participants: { some: { userId: req.user!.id } } } });
  if (!chat) {
    chat = await prisma.chat.create({
      data: { type: 'saved', name: 'Избранное', participants: { create: { userId: req.user!.id } } },
    });
  }
  res.json({ ...chat, participants: [] });
});

extraRouter.get('/ai/chat', async (req, res) => {
  let chat = await prisma.chat.findFirst({ where: { type: 'ai', participants: { some: { userId: req.user!.id } } } });
  if (!chat) {
    chat = await prisma.chat.create({
      data: { type: 'ai', name: 'AI Assistant', participants: { create: { userId: req.user!.id } } },
    });
  }
  res.json({ ...chat, participants: [] });
});

extraRouter.post('/ai/message', async (req, res) => {
  const { chatId, text } = req.body;
  const userMessage = await prisma.message.create({ data: { chatId, userId: req.user!.id, text } });
  const aiMessage = await prisma.message.create({ data: { chatId, userId: req.user!.id, text: `AI echo: ${text}` } });
  res.json({ userMessage, aiMessage });
});

extraRouter.get('/contacts', async (req, res) => {
  const contacts = await prisma.contact.findMany({ where: { ownerUserId: req.user!.id }, include: { user: true } });
  res.json(contacts);
});

extraRouter.post('/contacts', async (req, res) => {
  const { userId, displayName } = req.body;
  const contact = await prisma.contact.create({ data: { ownerUserId: req.user!.id, contactUserId: userId, displayName: displayName || '' }, include: { user: true } });
  res.status(201).json(contact);
});
