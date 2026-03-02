import { TicketStatus } from '@prisma/client';
import { Router } from 'express';
import { prisma } from '../db/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

export const supportRouter = Router();
supportRouter.use(authMiddleware);

supportRouter.post('/tickets', async (req, res) => {
  const { category, subject } = req.body;
  const ticket = await prisma.supportTicket.create({ data: { category, subject, authorId: req.user!.id } });
  res.status(201).json(ticket);
});

supportRouter.get('/tickets/my', async (req, res) => {
  const tickets = await prisma.supportTicket.findMany({ where: { authorId: req.user!.id }, orderBy: { createdAt: 'desc' } });
  res.json(tickets);
});

supportRouter.get('/tickets', async (req, res) => {
  const status = req.query.status as TicketStatus | undefined;
  const tickets = await prisma.supportTicket.findMany({ where: status ? { status } : {}, orderBy: { createdAt: 'desc' } });
  res.json(tickets);
});

supportRouter.get('/tickets/:id', async (req, res) => {
  const ticket = await prisma.supportTicket.findUnique({ where: { id: req.params.id } });
  if (!ticket) return res.status(404).json({ error: 'Not found' });
  res.json(ticket);
});

supportRouter.post('/tickets/:id/claim', async (req, res) => {
  const ticket = await prisma.supportTicket.update({ where: { id: req.params.id }, data: { agentId: req.user!.id, status: 'in_progress' } });
  res.json(ticket);
});

supportRouter.post('/tickets/:id/close', async (req, res) => {
  const ticket = await prisma.supportTicket.update({ where: { id: req.params.id }, data: { status: 'closed', closedAt: new Date() } });
  res.json(ticket);
});

supportRouter.get('/tickets/:id/messages', async (req, res) => {
  const messages = await prisma.supportMessage.findMany({ where: { ticketId: req.params.id }, orderBy: { createdAt: 'asc' } });
  res.json(messages);
});

supportRouter.post('/tickets/:id/messages', async (req, res) => {
  const { text } = req.body;
  const message = await prisma.supportMessage.create({ data: { ticketId: req.params.id, userId: req.user!.id, text } });
  res.status(201).json(message);
});
