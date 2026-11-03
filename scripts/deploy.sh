#!/usr/bin/env bash
# LIRIS → Cloudflare deploy, end to end. Requires wrangler auth (wrangler login) or CLOUDFLARE_API_TOKEN.
set -euo pipefail
cd "$(dirname "$0")/.."

echo "== auth check =="
npx wrangler whoami

echo "== create resources (idempotent) =="
KV_ID=$(npx wrangler kv namespace create LIRIS_CLEARANCE_KV --json | python3 -c "import json,sys;print(json.load(sys.stdin)['id'])")
D1_ID=$(npx wrangler d1 create liris-archive-db --json | python3 -c "import json,sys;print(json.load(sys.stdin)['uuid'])")
npx wrangler r2 bucket create liris-lookbook-assets 2>/dev/null || true
echo "KV=$KV_ID D1=$D1_ID"

echo "== patch wrangler.jsonc with real ids =="
python3 - "$KV_ID" "$D1_ID" <<'PY'
import json, sys, re
kv, d1 = sys.argv[1], sys.argv[2]
p = 'wrangler.jsonc'
s = open(p).read()
s = re.sub(r'("binding": "LIRIS_CLEARANCE_KV",\s*"id": ")[^"]*(")', r'\g<1>' + kv + r'\g<2>', s)
s = re.sub(r'("database_id": ")[^"]*(")', r'\g<1>' + d1 + r'\g<2>', s)
open(p, 'w').write(s)
print('patched wrangler.jsonc')
PY

echo "== d1 migrations =="
npx wrangler d1 migrations apply liris-archive-db --remote

echo "== build =="
npm run build

echo "== deploy =="
npx wrangler deploy

echo "== done. Custom domains liris.world / www.liris.world attach automatically if the zone is on this account. =="
echo "Then: Email Routing catch-all → this worker; Web Analytics token into index.html."
