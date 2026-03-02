#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -f .env ]; then
  cp .env.example .env
  echo "[info] frontend .env created"
fi

echo "[step] install frontend deps"
npm install

echo "[step] install backend deps"
(cd backend && npm install)

echo "[step] start MySQL"
(cd backend && docker compose up -d)

echo "[step] init DB"
(cd backend && npm run db:init)

echo "[done] start servers in separate terminals:"
echo "  1) npm run dev"
echo "  2) cd backend && npm run dev"
