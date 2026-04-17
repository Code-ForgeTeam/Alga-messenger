# Alga Backend (PHP)

Backend rewritten to PHP (no Node.js required).

## Structure

- `public/index.php` — entrypoint/router
- `app/` — config, db, jwt, API handlers
- `sql/beget_init.sql` — MySQL schema bootstrap
- `sql/beget_reset.sql` — full DB reset (drop all tables/data)

## 1) Configure environment

```bash
cd backend
cp .env.example .env
```

Fill DB credentials in `.env`:

```env
DB_HOST=...
DB_PORT=3306
DB_NAME=...
DB_USER=...
DB_PASS=...
JWT_SECRET=...
CORS_ORIGIN=http://your-domain
CREATOR_USER_ID=uuid-of-owner-account
AI_SERVICE_URL=http://127.0.0.1:8099/reply
AI_MODEL=gpt-4o-mini
FCM_PROJECT_ID=your-firebase-project-id
FCM_CLIENT_EMAIL=firebase-adminsdk-xxx@your-firebase-project-id.iam.gserviceaccount.com
FCM_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FCM_SERVER_KEY=legacy_server_key_optional
```

`CREATOR_USER_ID` is used for `/api/admin/*` access.
If empty, backend falls back to the oldest user in DB.

`AI_SERVICE_URL` is optional. If empty, backend uses local fallback AI replies.

`FCM_PROJECT_ID`, `FCM_CLIENT_EMAIL`, `FCM_PRIVATE_KEY` are recommended for modern FCM HTTP v1.
`FCM_SERVER_KEY` is optional legacy fallback (used only when HTTP v1 creds are not configured).

## 2) Initialize database

Run SQL from `sql/beget_init.sql` in your MySQL console.

For a full clean rebuild:

1. Run `sql/beget_reset.sql`
2. Run `sql/beget_init.sql`
3. Set `CREATOR_USER_ID` in backend `.env` to your owner UUID

If your database already existed before, run this patch manually once:

```sql
ALTER TABLE chat_participants ADD COLUMN unread_count INT NOT NULL DEFAULT 0;
CREATE TABLE IF NOT EXISTS chat_read_state (
  chat_id CHAR(36) NOT NULL,
  user_id CHAR(36) NOT NULL,
  last_read_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (chat_id, user_id),
  INDEX idx_chat_read_state_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

If MySQL returns `Duplicate column name 'unread_count'`, continue to the next command.

`beget_init.sql` now also includes groundwork for Telegram-like 24h statuses:

- `stories`
- `story_views`

## 3) Run with PHP built-in server (test)

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

Use guide: `../FCM_SETUP.md` (full step-by-step).

Backend supports:

1. **FCM HTTP v1** (recommended): `FCM_PROJECT_ID + FCM_CLIENT_EMAIL + FCM_PRIVATE_KEY`
2. **Legacy server key** (fallback): `FCM_SERVER_KEY`

Frontend app automatically registers device token through `/api/push/token` when `VITE_ENABLE_NATIVE_PUSH=true`.

## Troubleshooting: 500 on `/backend/public/index.php/health`

If you receive HTTP 500:

1. Verify PHP version is **8.0+** (recommended 8.1+).
2. Ensure `.env` exists in `backend/.env` and DB credentials are valid.
3. Ensure PHP extension `pdo_mysql` is enabled.
4. Use one of these URLs:
   - `http://your-domain/backend/public/index.php/health`
   - `http://your-domain/health` (if document root points to `backend/public`)

Backend normalizes `.../index.php/health` paths automatically.
