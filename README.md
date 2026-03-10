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


### Если в Actions видите только `Configure` и нет `Run workflow`
1. Проверьте, что файл `.github/workflows/ios-unsigned-ipa.yml` уже в **default branch** (обычно `main`).
2. Repo Settings → Actions → General:
   - включено `Allow all actions and reusable workflows`;
   - у вас есть права на запуск workflow.
3. Откройте именно страницу workflow **Build unsigned iOS IPA** (а не шаблоны в `set up a workflow yourself`).
4. После попадания файла в `main` появится кнопка **Run workflow**.

> Дополнительно: workflow теперь запускается и автоматически при push в `main` (по изменению релевантных файлов), так что артефакт можно получить даже без ручного запуска.

## 4) Быстрая проверка backend

- `.../index.php/health` → `{"ok":true}`
- `.../index.php/api` → `{"ok":true,...}`
- регистрация: `POST .../index.php/api/auth/register`

## 5) Backend

PHP backend находится в `backend/`, SQL схема — `backend/sql/beget_init.sql`.
