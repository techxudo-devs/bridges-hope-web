#!/usr/bin/env bash
set -euo pipefail

echo "Stopping if any npm processes are running..."
if pgrep -f "npm|npx" >/dev/null 2>&1; then
  echo "Detected running npm/npx processes. Please close them and re-run."
  exit 1
fi

echo "Clearing npm lock cache and verifying cache..."
rm -rf ~/.npm/_locks
npm cache verify

echo "Removing node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "Reinstalling dependencies..."
npm install

echo "Done. You can now run: npx sanity dev"
