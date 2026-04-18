# FCM Setup (Android + iOS) for Vibe Messenger

Этот файл — практическая инструкция, чтобы push-уведомления работали через Firebase Cloud Messaging в текущем проекте.

## 1) Что нужно заранее

- Google-аккаунт (Firebase Console)
- Для iOS: Apple Developer аккаунт (нужен APNs Key)
- Корректные `appId`/bundle IDs:
  - Android package: `com.alga.messenger`
  - iOS bundle id: `com.alga.messenger`

## 2) Создать Firebase проект

1. Откройте [Firebase Console](https://console.firebase.google.com/).
2. Создайте новый проект.
3. Включите Cloud Messaging (обычно активируется автоматически после создания проекта).

## 3) Подключить Android-приложение

1. В Firebase: `Project settings` → `Your apps` → `Add app` → Android.
2. Укажите package name: `com.alga.messenger`.
3. Скачайте `google-services.json`.
4. Положите файл в:
   - `android/app/google-services.json`

## 4) Подключить iOS-приложение

1. В Firebase: `Project settings` → `Your apps` → `Add app` → iOS.
2. Укажите bundle ID: `com.alga.messenger`.
3. Скачайте `GoogleService-Info.plist`.
4. Положите файл в:
   - `ios/App/App/GoogleService-Info.plist`

## 5) Настроить APNs для iOS

1. В Apple Developer: `Certificates, Identifiers & Profiles` → `Keys` → создать APNs Auth Key.
2. Скачайте `.p8`, запомните `Key ID` и `Team ID`.
3. В Firebase: `Project settings` → `Cloud Messaging` → `Apple app configuration`:
   - загрузите `.p8`
   - укажите `Key ID`, `Team ID`, bundle id

Без APNs push на iOS доставляться не будут.

## 6) Настроить backend (рекомендуется HTTP v1)

В `backend/.env` задайте:

```env
FCM_PROJECT_ID=your-firebase-project-id
FCM_CLIENT_EMAIL=firebase-adminsdk-xxx@your-firebase-project-id.iam.gserviceaccount.com
FCM_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Где взять значения:

1. Firebase Console → `Project settings` → `Service accounts`.
2. Нажмите `Generate new private key`.
3. Из скачанного JSON возьмите:
   - `project_id` → `FCM_PROJECT_ID`
   - `client_email` → `FCM_CLIENT_EMAIL`
   - `private_key` → `FCM_PRIVATE_KEY` (в `.env` переносы строк оставить как `\n`)

Fallback (не рекомендуется, но поддерживается):

```env
FCM_SERVER_KEY=legacy_server_key
```

## 7) Настроить frontend

В `.env.production` или `.env`:

```env
VITE_ENABLE_NATIVE_PUSH=true
```

Если `false`, токен не регистрируется и push отключен.

## 8) Синхронизация Capacitor

```bash
npm install
npm run build
npm run cap:sync:android
npm run cap:sync:ios
```

Если нативные папки ещё не созданы:

```bash
npm run cap:prepare:android
npm run cap:prepare:ios
```

## 9) Проверка Android/iOS частей

### Android

- Убедитесь, что `android/app/google-services.json` реально существует.
- Соберите APK/AAB и установите на устройство.

### iOS

- В Xcode для `App` включите capability:
  - `Push Notifications`
  - `Background Modes` → `Remote notifications`
- В `AppDelegate.swift` должны быть callbacks регистрации APNs (по документации Capacitor Push Notifications):
  - `didRegisterForRemoteNotificationsWithDeviceToken`
  - `didFailToRegisterForRemoteNotificationsWithError`

## 10) Проверка в приложении

1. Войдите под двумя разными пользователями на двух устройствах.
2. Отправьте сообщение с устройства A устройству B.
3. На B в фоне должно прийти системное push-уведомление.
4. Тап по push должен открыть чат с отправителем.

## 11) Быстрый чек, если push не пришёл

- В `backend/.env` пустые FCM-поля.
- `VITE_ENABLE_NATIVE_PUSH` не включён.
- Неверные package/bundle IDs.
- Для iOS не настроен APNs key в Firebase.
- Неверный формат `FCM_PRIVATE_KEY` (сломанные `\n`).
- Токен не сохранился в таблицу `push_tokens`.
- В Android логах есть `Default FirebaseApp failed to initialize... google-services was not applied`:
  - проверь `android/app/google-services.json`
  - пересобери проект (`Clean Project` + `Rebuild`)
  - убедись, что эмулятор с образом **Google Play** (не AOSP-only)
