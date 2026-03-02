# Deployment quick commands

## 1) Local full bootstrap (frontend + backend + MySQL)

```bash
npm run setup:local
```

Then run servers in separate terminals:

```bash
npm run dev
cd backend && npm run dev
```

## 2) Backend-only bootstrap

```bash
cd backend
npm run setup:local
```

## 3) Hosting MySQL bootstrap

1. `cd backend && cp .env.example .env`
2. Set `DATABASE_URL` to your hosting MySQL DSN.
3. Run:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate || npm run prisma:push
npm run prisma:seed
npm run build
npm run start
```

## 4) Point frontend to backend host

Set root `.env`:

```env
VITE_API_BASE_URL=https://YOUR_BACKEND_HOST/api
VITE_SOCKET_URL=https://YOUR_BACKEND_HOST
VITE_APP_HOST=https://YOUR_BACKEND_HOST
```

Then:

```bash
npm install
npm run build
```
