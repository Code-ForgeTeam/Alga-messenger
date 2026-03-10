# Deployment quick commands (PHP backend)

## 1) Database bootstrap

Execute SQL in your MySQL:

- `backend/sql/beget_init.sql`

## 2) Backend deploy (PHP, no Node.js)

```bash
cd backend
cp .env.example .env
# edit .env with DB credentials
php -S 0.0.0.0:3001 -t public
```

For production use nginx/apache + php-fpm and point document root to `backend/public`.

## 3) Frontend env

```env
VITE_API_BASE_URL=http://155.212.221.92:3001/api
VITE_SOCKET_URL=http://155.212.221.92:3001
VITE_APP_HOST=http://155.212.221.92:3001
```

Then build frontend:

```bash
npm install
npm run build
```
