# Deploy LIRIS to Cloudflare

## 0. Auth
In Vibe: `/reload`, then `/mcp status`, then `/mcp login cloudflare` (OAuth to your CF account).
CLI alternative: `npx wrangler login`.

## 1. Resources (once per account)
```bash
cd liris-world
npx wrangler kv namespace create LIRIS_CLEARANCE_KV          # put real id into wrangler.jsonc
npx wrangler d1 create liris-archive-db                        # put real database_id into wrangler.jsonc
npx wrangler r2 bucket create liris-lookbook-assets
npx wrangler d1 migrations apply liris-archive-db --remote     # applies migrations/0001_init.sql
```

## 2. Secrets / vars
```bash
npx wrangler secret put STRIPE_SECRET_KEY        # optional — checkout stays in standby without it
npx wrangler secret put STRIPE_PRICE_ID_FOUNDERS_PASS
npx wrangler secret put STRIPE_WEBHOOK_SECRET
# set FORWARD_TO in wrangler.jsonc vars to your inbox for email collection
```

## 3. Email collection (Email Routing)
Dashboard → liris.world → Email → Email Routing: enable, add catch-all rule → action "Send to a Worker" → `liris-world` (the `email` handler stores to D1/KV and forwards to `FORWARD_TO`). Or "Forward to addresses" directly.
Custom addresses (e.g. `atelier@liris.world`) → same Worker or forward.

## 4. Web Analytics (marketing, cookieless)
Dashboard → liris.world → Analytics → Web Analytics → enable, copy the site token, replace `CLOUDFLARE_WEB_ANALYTICS_TOKEN` in `index.html` (beacon already wired, `static.cloudflareinsights.com` is CSP-allowed).

## 5. Build & deploy
```bash
npm install
npm run build
npx wrangler deploy --dry-run     # validate first
npx wrangler deploy               # workers.dev URL printed
# custom domains: Dashboard → Workers & Pages → liris-world → Triggers → add liris.world + www.liris.world
# (routes are already declared in wrangler.jsonc)
```

## 6. DNS / SEO checklist
- A/AAAA or CNAME flattening for liris.world (proxied, orange cloud).
- SSL/TLS mode: Full (strict). Always Use HTTPS on.
- Speed: Brotli + Early Hints on (defaults fine).
- sitemap.xml + robots.txt are in `public/` and deploy with the assets.
- JSON-LD Organization/Brand/WebSite/Event, OG + Twitter cards in `index.html`.
- Verify: `curl -I https://liris.world/`, Lighthouse, `https://securityheaders.com`.
