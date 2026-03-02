# Alga Messenger Backend (PHP)

Backend rewritten to PHP (no Node.js required).

## Structure

- `public/index.php` — entrypoint/router
- `app/` — config, db, jwt, API handlers
- `sql/beget_init.sql` — MySQL schema bootstrap

## 1) Configure environment

```bash
cd backend
cp .env.example .env
```

Fill DB credentials in `.env`:

```env
DB_HOST=...
DB_PORT=3306
DB_NAME=q99916rz_alga
DB_USER=...
DB_PASS=...
JWT_SECRET=...
CORS_ORIGIN=http://q99916rz.beget.tech
```

## 2) Initialize database

Run SQL from `sql/beget_init.sql` in your MySQL console.

## 3) Run with PHP built-in server (for test)

```bash
cd backend
php -S 0.0.0.0:3001 -t public
```

Healthcheck: `http://SERVER_IP:3001/health`
