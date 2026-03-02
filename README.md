# Alga Messenger (Restored Frontend)

React + TypeScript + Vite client prepared for web and Android (Capacitor) packaging.

## 1) Setup

```bash
cp .env.example .env
npm install
npm run dev
```

## 2) Environment configuration

All backend endpoints are configured via `.env`:

- `VITE_API_BASE_URL` — REST API base, e.g. `https://api.example.com/api`
- `VITE_SOCKET_URL` — Socket.IO server, e.g. `https://api.example.com`
- `VITE_APP_HOST` — optional host for app-level integrations/version checks
- `VITE_APP_VERSION_NAME` / `VITE_APP_VERSION_CODE` — version values used by client features

To migrate backend to another host later, just update these values and rebuild.

## 3) Production build

```bash
npm run build
npm run preview
```

## 4) Android / APK flow (Capacitor)

```bash
npm run cap:add:android     # once
npm run cap:sync            # after every frontend change
npm run cap:open:android    # opens Android Studio
```

Then generate APK/AAB from Android Studio (`Build > Build Bundle(s) / APK(s)`).

## 5) Notes

- Project uses Vite env variables (`import.meta.env`), so build-time `.env` must be present.
- If backend host changes, no code rewrite is needed; only env values should change.


## 6) Build troubleshooting (MUI + Emotion)

If you see an error like:
`CacheProvider is not exported by __vite-optional-peer-dep:@emotion/react`
it means Emotion peer dependencies are missing.

Install/update:

```bash
npm install @emotion/react @emotion/styled
```

Then reinstall/build again:

```bash
npm install
npm run build
```
