# Alga Messenger Frontend (Vite + React + Capacitor)

## 1) Important: env path for APK build

For Android/iOS build, Vite reads variables at build time.
Use **root** file `.env.production` (not backend env):

```bash
cp .env.production.example .env.production
```

Set your backend URL in `.env.production`:

```env
VITE_API_BASE_URL=http://q99916rz.beget.tech/backend/public/index.php/api
VITE_SOCKET_URL=
VITE_APP_HOST=http://q99916rz.beget.tech/backend/public/index.php
```

If this file is missing, app can fallback to localhost in dev mode and fail in APK.

## 2) Local web run

```bash
cp .env.example .env
npm install
npm run dev
```

## 3) Build web production

```bash
npm run build
npm run preview
```

## 4) Android APK (real file extraction)

```bash
npm run build
npm run cap:sync
npm run cap:open:android
```

In Android Studio:
1. `Build` -> `Build Bundle(s) / APK(s)` -> `Build APK(s)`
2. Click `locate` in success popup
3. APK path usually:
   - `android/app/build/outputs/apk/debug/app-debug.apk`
   - or `android/app/build/outputs/apk/release/app-release.apk`

Then copy APK from that folder to your phone and install.

## 5) iOS IPA without Xcode (important)

Direct local IPA build **without Xcode** is not supported by Apple toolchain.
You have options:

- Use a Mac + Xcode (standard way), or
- Use cloud CI that has macOS/Xcode runners (Codemagic, Bitrise, GitHub Actions macOS, etc.)

So: no pure Windows/Linux local command can produce signed IPA without macOS build environment.

## 6) Backend (PHP)

Backend is in `backend/` and can run without Node.js.
DB schema: `backend/sql/beget_init.sql`.
Health URL check example:

- `http://q99916rz.beget.tech/backend/public/index.php/health`

If health returns `{"ok":true}`, backend entrypoint works.
