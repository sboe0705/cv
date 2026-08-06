#!/usr/bin/env bash
#
# Build the production site into dist/.
#
# Runs a clean dependency install, type-checks with vue-tsc and bundles with
# Vite — the same steps the GitHub Pages workflow runs, so a green run here
# means a green deploy.
#
# Usage:
#   ./build.sh               # build into dist/
#   ./build.sh --preview     # build, then serve the result locally

set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")"

preview=false
for arg in "$@"; do
  case "$arg" in
    --preview) preview=true ;;
    -h | --help)
      sed -n '2,12p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      echo "Unknown option: $arg (try --preview or --help)" >&2
      exit 1
      ;;
  esac
done

if ! command -v npm >/dev/null 2>&1; then
  echo "npm not found. Install Node.js 20 or newer: https://nodejs.org" >&2
  exit 1
fi

# `npm ci` installs exactly what package-lock.json pins — reproducible, and it
# fails loudly if the lockfile and package.json have drifted apart.
if [[ -f package-lock.json ]]; then
  npm ci
else
  npm install
fi

# Start from a clean slate so removed files cannot linger in the output.
rm -rf dist

npm run build

echo
echo "Build complete → $(pwd)/dist"
du -sh dist | awk '{ print "Total size:    " $1 }'

if [[ "$preview" == true ]]; then
  echo
  exec npm run preview
fi
