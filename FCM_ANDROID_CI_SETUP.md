# Android Push (FCM) Quick Setup

This project now auto-injects `google-services.json` into `android/app` during sync/build.

## 1) Local build setup

1. Put your Firebase file at repo root:
   - `./google-services.json`
2. Run:
   - `npm run cap:sync:android`
3. The script copies it to:
   - `android/app/google-services.json`

Notes:
- `google-services.json` is ignored by git and will not be committed.
- If you delete `android/`, just run sync again.

## 2) GitHub Actions setup

Workflow: `.github/workflows/android-apk.yml`

Required secret (recommended):
- `GOOGLE_SERVICES_JSON_B64`

Optional alternative:
- `GOOGLE_SERVICES_JSON` (raw json text)

The workflow uses strict mode and fails if Firebase config is missing.

### How to create `GOOGLE_SERVICES_JSON_B64` on Windows (PowerShell)

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\Users\AUSU\Desktop\google-services.json"))
```

Copy output string into GitHub:
- Repository -> Settings -> Secrets and variables -> Actions -> New repository secret
- Name: `GOOGLE_SERVICES_JSON_B64`

## 3) Backend env for sending push (FCM HTTP v1)

Set in `backend/.env`:

```env
FCM_PROJECT_ID=your-project-id
FCM_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project-id.iam.gserviceaccount.com
FCM_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

Fallback legacy key (optional):

```env
FCM_SERVER_KEY=
```

## 4) Frontend env

Enable native push in `.env.production`:

```env
VITE_ENABLE_NATIVE_PUSH=true
```

## 5) Quick diagnostics

1. Login on Android device.
2. Allow notifications permission.
3. Send message from another account.
4. Verify token exists in DB table `push_tokens`.
5. If no notifications, check backend env and FCM credentials first.
