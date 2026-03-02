import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import { env } from './config/env.js';
import { authRouter } from './routes/auth.js';
import { usersRouter } from './routes/users.js';
import { chatsRouter } from './routes/chats.js';
import { messagesRouter } from './routes/messages.js';
import { notificationsRouter } from './routes/notifications.js';
import { supportRouter } from './routes/support.js';
import { uploadRouter } from './routes/upload.js';
import { extraRouter } from './routes/extra.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: env.corsOrigin, credentials: true },
});

io.on('connection', (socket) => {
  socket.on('typing:start', (payload) => socket.broadcast.emit('typing:start', payload));
  socket.on('typing:stop', (payload) => socket.broadcast.emit('typing:stop', payload));
  socket.on('message:send', (payload, cb) => cb?.({ success: true, message: payload }));
});

app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/chats', chatsRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/support', supportRouter);
app.use('/api/upload', uploadRouter);
app.use('/api', extraRouter);

server.listen(env.port, () => {
  console.log(`API running on http://localhost:${env.port}`);
});
