# Alga Messenger

Короткая инструкция по сборке фронтенда и APK.

## 1) Подготовка env

Создайте `.env.production` в корне:

```bash
cp .env.production.example .env.production
```

Пример:

```env
VITE_API_BASE_URL=http://q99916rz.beget.tech/backend/public/index.php/api
VITE_SOCKET_URL=
VITE_APP_HOST=http://q99916rz.beget.tech/backend/public/index.php
VITE_FORCE_HTTPS=0
```

> Если нет SSL — оставляйте `http://`.

## 2) Сборка APK (обязательная последовательность)

```bash
npm install
npm audit fix --force
npm run build
npm run cap:prepare:android
npm run cap:open:android
```

Дальше в Android Studio:
- `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
- готовый APK обычно в `android/app/build/outputs/apk/...`

## 3) Быстрая проверка backend

- `.../index.php/health` → `{"ok":true}`
- `.../index.php/api` → `{"ok":true,...}`
- регистрация: `POST .../index.php/api/auth/register`

## 4) Backend

PHP backend находится в `backend/`, SQL схема — `backend/sql/beget_init.sql`.
