import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';

export const uploadRouter = Router();
uploadRouter.use(authMiddleware);

uploadRouter.post('/', async (_req, res) => {
  res.json({ files: [] });
});

uploadRouter.get('/storage-stats', async (_req, res) => {
  res.json({ usedBytes: 0, filesCount: 0 });
});

uploadRouter.delete('/clear-cache', async (_req, res) => {
  res.json({ ok: true });
});

uploadRouter.get('/info/:id', async (req, res) => {
  res.json({ id: req.params.id });
});

uploadRouter.delete('/:id', async (_req, res) => {
  res.json({ ok: true });
});
