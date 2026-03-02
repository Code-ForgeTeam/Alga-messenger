import type { NextFunction, Request, Response } from 'express';
import { prisma } from '../db/prisma.js';
import { verifyToken } from '../utils/jwt.js';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const token = auth.slice(7);
    const payload = verifyToken(token);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return res.status(401).json({ error: 'Unauthorized' });
    if (user.isBanned) return res.status(403).json({ error: 'banned', reason: user.banReason || '' });

    req.user = { id: user.id, username: user.username, fullName: user.fullName };
    next();
  } catch {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}
