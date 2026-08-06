#!/usr/bin/env bash
#
# Start the local development server with hot reload.
#
# Usage:
#   ./dev.sh                 # http://localhost:5173
#   ./dev.sh --port 8080     # any extra arguments are passed on to Vite
#   ./dev.sh --host          # expose the server on the local network

set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found. Install Node.js 20 or newer: https://nodejs.org" >&2
  exit 1
fi

# First run, or dependencies changed since the last install.
if [[ ! -d node_modules ]] || [[ package-lock.json -nt node_modules ]]; then
  echo "Installing dependencies…"
  npm install
fi

exec npm run dev -- "$@"
