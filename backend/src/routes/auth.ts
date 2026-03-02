import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../db/prisma.js';
import { authMiddleware } from '../middleware/auth.js';
import { signToken } from '../utils/jwt.js';

export const authRouter = Router();

const registerSchema = z.object({ username: z.string().min(3), fullName: z.string().min(1), password: z.string().min(6) });
const loginSchema = z.object({ username: z.string(), password: z.string() });

authRouter.post('/register', async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });

  const { username, fullName, password } = parsed.data;
  const exists = await prisma.user.findUnique({ where: { username } });
  if (exists) return res.status(409).json({ error: 'Username already exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { username, fullName, passwordHash } });
  await prisma.privacySetting.create({
    data: {
      userId: user.id,
      lastSeen: { value: 'everybody', alwaysShareWith: [], neverShareWith: [] },
      profilePhoto: { value: 'everybody', alwaysShareWith: [], neverShareWith: [] },
      bio: { value: 'everybody', alwaysShareWith: [], neverShareWith: [] },
      searchByUsername: { value: 'everybody', alwaysShareWith: [], neverShareWith: [] },
    },
  });

  const token = signToken({ userId: user.id });
  return res.json({ token, user: { id: user.id, username: user.username, fullName: user.fullName } });
});

authRouter.post('/login', async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Invalid payload' });

  const { username, password } = parsed.data;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  if (user.isBanned) return res.status(403).json({ error: 'banned', reason: user.banReason || '' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken({ userId: user.id });
  return res.json({ token, user: { id: user.id, username: user.username, fullName: user.fullName, avatar: user.avatar } });
});

authRouter.get('/verify', authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  return res.json({ user: { id: user!.id, username: user!.username, fullName: user!.fullName, avatar: user!.avatar } });
});
