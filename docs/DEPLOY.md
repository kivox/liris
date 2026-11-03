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

## ✅ Executed 2026-11-03 (this session)
- Zone `liris.world` found on account **Xenode LTD** (`558fc9b9a8a73584c8f9a74d225cfcb2`, zone `9260bf234a5b987f2154b05f443c4ef1`)
- KV `liris-clearance-kv-prod` = `1f594d99ae394df8854d10b0b65be7a9`; D1 `liris-archive-db` = `4dc72c97-a665-4eee-9cb0-82f854c45355` (migrations applied ✅); R2 `liris-lookbook-assets` ✅ — all patched into `wrangler.jsonc` with `account_id`
- `wrangler deploy` ✅ — version `bf1439ed-8242-4dcd-82c9-b64e2359e06c`, custom domains **liris.world + www.liris.world attached**
- Remaining (need DNS:Edit / Email Routing:Edit — the OAuth token is zone:read-only):
  1. DNS: A `liris.world` → `192.0.2.1` proxied; A `www.liris.world` → `192.0.2.1` proxied (dashboard → DNS → Add record)
  2. Email Routing: enable, catch-all rule → action "Send to a Worker" → `liris-world` (or forward to an inbox via `FORWARD_TO` var)
  3. Web Analytics token into `index.html` beacon placeholder

## ✅✅ LIVE 2026-11-03 02:22 UTC — https://liris.world is serving
- DNS resolves (Workers-managed proxied records auto-created on custom-domain attach; edge IP via DoH)
- `GET /` → 200 from CF edge (cf-ray LHR), security headers present (CSP, X-Frame-Options: DENY, nosniff, referrer-policy, permissions-policy)
- `GET /api/health` → ok:true · `POST /api/early-access` → confirmation persisted to D1 (`clearances` row verified: live@liris.world / LRS-WRLD-LIV-9349 / utm_source=deploy) + KV
- favicon.svg, og-image.png, manifest, sitemap → 200
- Worker version bf1439ed-8242-4dcd-82c9-b64e2359e06c, account Xenode LTD 558fc9b9…, zone 9260bf23…
- ⏳ only remaining: Email Routing enable + catch-all rule → needs **Zone → Email Routing → Edit** on the API token (current token got 10000/10405). Add it at dash.cloudflare.com/profile/api-tokens, then re-run the two calls in DEPLOY.md §3.

## Email — final state (2026-11-03)
Email Routing is NOT available on this account/plan, so inbound `@liris.world` mail is not routed.
Email collection instead runs through the site itself, verified live:
`POST /api/early-access` → KV `clearance:<email>` + D1 `clearances` (verified row: live@liris.world / LRS-WRLD-LIV-9349 / utm_source=deploy).
The worker's `email` handler stays in code: if Email Routing is ever enabled, a catch-all rule → worker `liris-world` will store inbound mail into D1 `emails` (+ forward via `FORWARD_TO`).
Outbound transactional mail (optional): `email_sending:write` scope + Send Email binding, or any SMTP/API provider.
