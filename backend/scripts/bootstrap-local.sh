#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  cp .env.example .env
  echo "[info] .env created from .env.example"
fi

echo "[step] installing backend dependencies"
npm install

echo "[step] starting MySQL via docker compose"
docker compose up -d

echo "[step] initializing database (prisma generate + push + seed)"
npm run db:init

echo "[step] starting backend dev server"
npm run dev
