import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../db/prisma.js';
import { authMiddleware } from '../middleware/auth.js';

export const usersRouter = Router();
usersRouter.use(authMiddleware);

usersRouter.get('/me', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  res.json(user);
});

usersRouter.put('/me', async (req, res) => {
  const { fullName, avatar, bio } = req.body || {};
  const user = await prisma.user.update({ where: { id: req.user!.id }, data: { fullName, avatar, bio } });
  res.json(user);
});

usersRouter.put('/me/password', async (req, res) => {
  const { currentPassword, newPassword } = req.body || {};
  const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
  if (!user) return res.status(404).json({ error: 'User not found' });
  const ok = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!ok) return res.status(400).json({ error: 'Wrong current password' });
  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
  res.json({ ok: true });
});

usersRouter.get('/search', async (req, res) => {
  const q = String(req.query.q || '');
  const users = await prisma.user.findMany({ where: { username: { contains: q } }, take: 30 });
  res.json(users);
});

usersRouter.get('/by-username/:username', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { username: req.params.username } });
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

usersRouter.get('/:id', async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

usersRouter.get('/me/privacy', async (req, res) => {
  const privacy = await prisma.privacySetting.findUnique({ where: { userId: req.user!.id } });
  res.json(privacy);
});

usersRouter.put('/me/privacy', async (req, res) => {
  const { settingKey, value, alwaysShareWith, neverShareWith } = req.body;
  const privacy = await prisma.privacySetting.findUnique({ where: { userId: req.user!.id } });
  if (!privacy) return res.status(404).json({ error: 'Privacy not found' });

  const patch = { value, alwaysShareWith, neverShareWith };
  const updated = await prisma.privacySetting.update({
    where: { userId: req.user!.id },
    data: { [settingKey]: patch },
  });
  res.json(updated);
});
