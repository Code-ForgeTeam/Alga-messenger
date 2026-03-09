# Alga Messenger

Короткая инструкция по сборке фронтенда, APK и IPA (без macOS).

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

## 3) Сборка IPA без macOS (облачный CI)

Локально без macOS подписанный `.ipa` собрать нельзя — используйте облачный Mac runner.

### Вариант A: Codemagic
1. Подключите репозиторий в Codemagic.
2. Включите workflow для iOS и укажите Apple Team / сертификаты / provisioning profile.
3. Перед iOS build запустите шаги:
   ```bash
   npm ci
   npm run build
   npx cap sync ios
   ```
4. Запустите iOS build — на выходе получите `.ipa` в артефактах.

### Вариант B: EAS Build (Expo services, даже для bare/capacitor проекта)
1. Установите CLI и авторизуйтесь:
   ```bash
   npm i -g eas-cli
   eas login
   ```
2. Настройте `eas.json` для iOS profile.
3. Запустите удалённую сборку:
   ```bash
   eas build -p ios
   ```
4. Скачайте готовый `.ipa` из ссылки в логе.

> Для App Store/TestFlight всё равно нужен действующий Apple Developer аккаунт.

## 4) Быстрая проверка backend

- `.../index.php/health` → `{"ok":true}`
- `.../index.php/api` → `{"ok":true,...}`
- регистрация: `POST .../index.php/api/auth/register`

## 5) Backend

PHP backend находится в `backend/`, SQL схема — `backend/sql/beget_init.sql`.
