#!/bin/sh
set -eu

mkdir -p /app/public

cat > /app/public/mechanic-config.js <<EOF
window.__MECHANIC_CONFIG__ = {
  GOOGLE_MAPS_API_KEY: "${GOOGLE_MAPS_API_KEY:-}",
  GOOGLE_MAPS_MAP_ID: "${GOOGLE_MAPS_MAP_ID:-}",
  WS_BASE_URL: "${WS_BASE_URL:-}"
};
EOF

exec "$@"