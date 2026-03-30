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
VITE_ENABLE_NATIVE_PUSH=false
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

## 3) Сборка IPA через GitHub (без Apple Developer и без сертификатов)

Добавлен workflow: `.github/workflows/ios-unsigned-ipa.yml`.

Он собирает **unsigned** `.ipa` (без подписи) на `macos-14` runner и кладёт файл в GitHub Artifacts.

### Как запустить
1. Откройте GitHub → `Actions`.
2. Выберите workflow **Build unsigned iOS IPA**.
3. Нажмите **Run workflow**.
4. После завершения скачайте артефакт `AlgaMessenger-unsigned-ipa`.

### Что важно понимать
- Это именно **unsigned IPA**: Apple Developer, сертификаты и provisioning profile не нужны.
- Такой IPA обычно подходит для анализа/распаковки/тестов в спец. окружениях.
- Для установки на обычный iPhone и публикации в TestFlight/App Store всё равно потребуется подпись Apple.

### Альтернатива (если позже понадобится подписанный IPA)
Можно подключить Codemagic/EAS и добавить Apple-signing.

## 4) Быстрая проверка backend

- `.../index.php/health` → `{"ok":true}`
- `.../index.php/api` → `{"ok":true,...}`
- регистрация: `POST .../index.php/api/auth/register`

## 5) Backend

PHP backend находится в `backend/`, SQL схема — `backend/sql/beget_init.sql`.

## 6) FCM Push (Android + iOS)

Подробная инструкция: `FCM_SETUP.md`.

Коротко:
- для фронта включить `VITE_ENABLE_NATIVE_PUSH=true`
- для backend указать FCM креды в `backend/.env`
- добавить Firebase-конфиги в нативные проекты (`google-services.json`, `GoogleService-Info.plist`)
