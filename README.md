# LIRIS — FREEDOM FOR ALL · Drop 001

Minimal, mysterious coming-soon sanctuary + full brand dossier for liris.world.
Merged from the complete Google AI Studio Argon drop progression (Nov 2 21:59 → Nov 3 00:22, 3D iteration excluded).

## Run
```bash
npm install
npm run dev      # http://localhost:3000  (/brand = dossier)
npm test         # domain unit tests (node --test)
npm run lint     # tsc --noEmit
npm run build    # vite build → dist/
```

## Routes
- `/` — release sanctuary: MARK 01 emblem, jumbled horizon clock, single-CTA early access (`POST /api/early-access`), theme toggle
- `/brand` — dossier: 9-tile IG monolith, BOLD SVG MARKS (MARK 00/01/02 + **download suite**: SVG/PNG/JPEG), psychology research, SEO & palette

## Cloudflare
Worker + assets + KV + D1 + R2 + Email Workers collection. See `docs/DEPLOY.md`. Brand system: `docs/BRAND-SUITE.md`.

## Stack
Svelte 5 · Vite 8 · Tailwind 4 · Cloudflare Workers (wrangler.jsonc) · Stripe standby checkout.
