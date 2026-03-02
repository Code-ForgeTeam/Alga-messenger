import { Router } from 'express';
import { prisma } from '../db/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

export const notificationsRouter = Router();
notificationsRouter.use(authMiddleware);

notificationsRouter.get('/', async (req, res) => {
  const vc = Number(req.query.vc || 1);
  const banners = await prisma.notification.findMany({ where: { isActive: true, minVersionCode: { lte: vc } } });
  res.json(banners);
});

notificationsRouter.post('/:id/dismiss', async (_req, res) => {
  res.json({ ok: true });
});
