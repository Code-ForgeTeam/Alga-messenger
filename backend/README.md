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
CREATOR_USER_ID=uuid-of-owner-account
AI_SERVICE_URL=http://127.0.0.1:8099/reply
AI_MODEL=gpt-4o-mini
FCM_SERVER_KEY=your_firebase_server_key
```

`CREATOR_USER_ID` is used for `/api/admin/*` tools access.
If it is empty, the backend automatically uses the oldest user in the database as the creator.

`AI_SERVICE_URL` is optional. If empty, backend uses local fallback AI replies.
When configured, backend forwards `/api/ai/message` prompts to this endpoint.

`FCM_SERVER_KEY` is optional. If empty, native push notifications are disabled.
When configured, backend sends real push notifications through Firebase Cloud Messaging.

## 2) Initialize database

Run SQL from `sql/beget_init.sql` in your MySQL console.

## 3) Run with PHP built-in server (for test)

```bash
cd backend
php -S 0.0.0.0:3001 -t public
```

Healthcheck: `http://SERVER_IP:3001/health`

## Optional: g4f bridge (Python)

If you want free g4f responses instead of fallback text:

```bash
cd backend/ai
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn g4f_service:app --host 0.0.0.0 --port 8099
```

Then set in `backend/.env`:

```env
AI_SERVICE_URL=http://127.0.0.1:8099/reply
```

## Optional: real push notifications (Android + iOS)

1. Create project in Firebase and connect Android/iOS apps.
2. Configure APNs in Firebase for iOS delivery.
3. Put FCM server key into `backend/.env`:

```env
FCM_SERVER_KEY=your_firebase_server_key
```

Frontend app automatically registers device token through `/api/push/token`.


## Troubleshooting: 500 on `/backend/public/index.php/health`

If you receive HTTP 500:

1. Verify PHP version is **8.0+** (recommended 8.1+).
2. Ensure `.env` exists in `backend/.env` and DB credentials are valid.
3. Ensure MySQL extension for PHP is enabled (`pdo_mysql`).
4. Use one of these URLs:
   - `http://your-domain/backend/public/index.php/health`
   - `http://your-domain/health` (if document root points to `backend/public`)

This backend now normalizes `.../index.php/health` paths automatically.
