# LIRIS — Complete Brand & Design Suite

**LIRIS · liris.world · FREEDOM FOR ALL · Drop 001**
Minimal, mysterious, sharp. Luxury Didone base + one youth signal. Monochrome-safe everywhere.

---

## 1. Color system (psychology-backed)

| Token | Hex | Role | Psychology |
|---|---|---|---|
| ABYSSAL VOID | `#050508` | primary ground | black = power, mystery, premium |
| SANCTUARY SLATE | `#0C0D14` | elevated surfaces | depth without noise |
| ALABASTER LIGHT | `#F6F5F0` | primary type / light ground | ivory = refined, editorial |
| ALCHEMICAL GOLD | `#E2CFA8` | metallic accent: rules, diamonds, keylines | gold = opulence/exclusivity; champagne = candlelight-on-linen restraint |
| MIDNIGHT SAPPHIRE | `#232C5E` | jewel-tone aura (light theme `#2E3A9E`) | deep blue = regal, rare, trust |
| OXBLOOD SIGNAL | `#7A1E2B` | alerts/seals only (light `#8E2434`) | burgundy richness, never retail neon |

Rules: max 3 colors per composition + one metallic accent. Never neon cobalt/crimson (reads gaming/retail). Gold only as detail: hairlines, diamonds, monograms.
Contrast (WCAG): bone-on-void 18.65:1, champagne-on-void 13.3:1 — all AA.

## 2. Typography

| Role | Face | Weight | Notes |
|---|---|---|---|
| Wordmark (marks) | **Bodoni Moda** | 900 | Didone = the luxury signal: extreme stroke contrast, hairline serifs |
| Display/headings | Syne | 800 | wide geometric grotesque |
| Slogan bars | Bungee | 400 | bold geometric block (youth signal) |
| Seal script | Qwitcher Grypen | 700 | sharp-nib calligraphy (MARK 02) |
| Body | Space Grotesk | 400/500 | geometric grotesque, readable |
| Data/mono | JetBrains Mono | 400–600 | coordinates, specs, tags |

Type scale: modular 1.25, hero `clamp(1.5rem, 4.5vw, 2.5rem)`. Tracking: display 0.12em, mono 0.2–0.4em, all-caps everywhere for labels.

## 3. The marks (download from `/brand` → BOLD SVG MARKS → DOWNLOAD SUITE)

- **MARK 00** — negative-space veiled silhouette (header logo). `veiled-silhouette-logo`
- **MARK 01 — SIGNAL SLASH** — Bodoni Moda 900 "LIRIS" over a metallic champagne gradient slash, FREEDOM FOR ALL knocked out of an inverted slanted bar, `001 //` tag with diamond. `arched-emblem`
- **MARK 02 — Architectural Calligraphic Seal** — Qwitcher Grypen 700 "LIRIS" wordmark + split baseline diamond, no background geometry. `calligraphic-signature`

Clear space = the champagne diamond's width on all sides. Minimum size: 120px wide (print 30mm).

## 4. Layout & motion system

- 8pt spacing grid (all padding/margins on 4/8 multiples); max content width 2xl–6xl by page.
- Single-viewport sanctuary on the release page (fits 320→1920 with no horizontal scroll).
- Tap targets ≥ 44×44px; focus-visible = champagne ring.
- Motion: expo-out `cubic-bezier(0.16,1,0.3,1)`, staggered 50–520ms load reveals, `prefers-reduced-motion` respected, press = scale(0.97).
- Texture: 5% film-grain overlay; hairline frame with corner registration marks.
- Background: only the slow-spinning sacred loom (`geoOrbitSlow`, 72s) — no floating clutter.

## 5. Voice & psychology pillars (retail research)

1. Information gap / mystery (Loewenstein) — zero product spoilers; enigmatic marks.
2. Zeigarnik anticipation — the jumbled horizon clock keeps Drop 001 "unfinished" in memory.
3. Gen-Z anti-marketing — four-word declarations, sacred geometry, movement framing.
4. Social identity (Tajfel & Turner) — emblem + "FREEDOM FOR ALL" + initiate counter.
5. Endowed initiate credential (Nunes & Drèze) — instant LRS-WRLD access key, screenshot-shareable.
Plus: Hick (one CTA), Von Restorff (single inverted CTA), Fitts (44px targets), scarcity (genuine limited editions only).

## 6. Social system

9-tile Instagram monolith (checkerboard), reels scripts, profile spec — see `/brand` → 01 / 9-TILE MONOLITH. Export tiles as 1080×1080 SVG from the dossier.

## 7. Source assets

`/assets/aistudio/` — arched emblem + signature script JPEGs (downloadable from the dossier).
R2 bucket `liris-lookbook-assets` serves `/assets/lookbook/*` in production.

## 8. Tech

Svelte 5 + Vite + Tailwind 4 → static `dist/` served by Cloudflare Workers (`src/worker/index.ts`):
- `/api/health`, `/api/early-access` (KV + D1 persist, 5/min rate limit, UTM capture), `/api/stripe/checkout` (standby until keys set)
- Inbound email collection via Email Workers `email` handler → D1 `emails` + forward to `FORWARD_TO`
- Security headers + CSP on every response; SPA fallback; custom domains liris.world / www.liris.world
- Cloudflare Web Analytics (cookieless) beacon in `index.html`

Deploy: see `docs/DEPLOY.md`.
