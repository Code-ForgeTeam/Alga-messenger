#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -f .env ]; then
  cp .env.example .env
  echo "[info] frontend .env created"
fi

if [ ! -f backend/.env ]; then
  cp backend/.env.example backend/.env
  echo "[info] backend .env created"
fi

echo "[step] install frontend deps"
npm install

echo "[next] run SQL schema in your MySQL console: backend/sql/beget_init.sql"
echo "[next] run PHP backend: cd backend && php -S 0.0.0.0:3001 -t public"
echo "[next] run frontend: npm run dev"
