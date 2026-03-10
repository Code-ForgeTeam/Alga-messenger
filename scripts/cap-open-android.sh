#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -d "android" ]; then
  echo "[info] Android platform is not added yet. Running: npx cap add android"
  npx cap add android
fi

echo "[info] Syncing Capacitor project"
npx cap sync android

echo "[info] Opening Android Studio project"
npx cap open android
