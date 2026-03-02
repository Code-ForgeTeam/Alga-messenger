# Beget (free plan): SQL-only workflow

Если у вас нет SSH/терминала на Beget, но есть доступ к SQL-консоли — это нормально.

## Что можно сделать на Beget free

1. Создать схему БД через SQL-консоль.
2. Хранить данные приложения в этой MySQL базе.

## Что нельзя сделать на Beget free

- Запустить Node.js backend (Express/Socket.IO) напрямую без shell/process manager.

Итого: backend нужно запускать на другом сервисе (Render/Railway/VPS),
а Beget использовать как внешний MySQL.

## Шаг 1. Инициализируйте БД через SQL

Выполните содержимое файла:

- `backend/sql/beget_init.sql`

После этого проверьте:

```sql
SHOW TABLES;
SELECT COUNT(*) FROM users;
```

## Шаг 2. Подключите backend к Beget MySQL

На сервере, где крутится Node.js backend, задайте:

```env
DATABASE_URL=mysql://USER:PASSWORD@HOST:3306/DB_NAME
```

Для вашего backend это переменная из `backend/.env.example`.

## Шаг 3. Подключите frontend

В корневом `.env` фронта задайте:

```env
VITE_API_BASE_URL=https://YOUR_BACKEND_HOST/api
VITE_SOCKET_URL=https://YOUR_BACKEND_HOST
VITE_APP_HOST=https://YOUR_BACKEND_HOST
```

## Быстрые SQL-примеры (для проверки)

```sql
-- активные уведомления
SELECT id, title, min_version_code, is_active FROM notifications WHERE is_active = 1;

-- последние сообщения
SELECT id, chat_id, user_id, created_at FROM messages ORDER BY created_at DESC LIMIT 20;
```
