# Beget + PHP backend

Теперь backend не требует Node.js.

## Вариант A: PHP backend на вашем сервере (155.212.221.92)

1. Разместите папку `backend/` на сервере.
2. Создайте `backend/.env` из `.env.example`.
3. Выполните SQL `backend/sql/beget_init.sql` в базе Beget.
4. Запустите php-fpm/nginx (или `php -S` для теста).

## Вариант B: SQL-only в Beget

Если на Beget только SQL доступ — держите MySQL там,
а PHP backend запускайте на вашем отдельном сервере.

## Обязательные env

```env
DB_HOST=...
DB_PORT=3306
DB_NAME=q99916rz_alga
DB_USER=...
DB_PASS=...
JWT_SECRET=...
CORS_ORIGIN=http://q99916rz.beget.tech
```
