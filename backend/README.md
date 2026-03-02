# Alga Messenger Backend (MySQL)

## Quick start (local)

```bash
cd backend
cp .env.example .env
npm install
docker compose up -d
npm run db:init
npm run dev
```

API: `http://localhost:3001/api`
Health: `http://localhost:3001/health`

Default seeded user:
- username: `admin`
- password: `admin12345`

## Production (your hosting MySQL)

1. Create MySQL database/user on hosting.
2. Set `DATABASE_URL` in `.env`.
3. Run:

```bash
npm install
npm run prisma:generate
npm run prisma:migrate || npm run prisma:push
npm run prisma:seed
npm run build
npm run start
```

## Frontend wiring

Set frontend `.env`:

```env
VITE_API_BASE_URL=https://YOUR_BACKEND_HOST/api
VITE_SOCKET_URL=https://YOUR_BACKEND_HOST
VITE_APP_HOST=https://YOUR_BACKEND_HOST
```
