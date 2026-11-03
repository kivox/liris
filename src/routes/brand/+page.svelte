<script lang="ts">
  import LirisSvgArt from '../../components/LirisSvgArt.svelte';
  import FreedomScrambleText from '../../components/FreedomScrambleText.svelte';
  import PrivateEarlyAccessDrawer from '../../components/PrivateEarlyAccessDrawer.svelte';
  import { downloadSvgByLabel, downloadPngByLabel, downloadFile } from '../../lib/download';
  import {
    BRAND_IDENTITY,
    PSYCHOLOGY_RESEARCH_PILLARS,
    BRAND_COLOR_TOKENS,
    INSTAGRAM_PROFILE_SPEC,
    INSTAGRAM_GRID_POSTS,
    SHORT_FORM_TRANSMISSIONS,
    type InstagramGridTile,
    type EarlyAccessConfirmation
  } from '../../domain/lirisDropData';

  type TabId = 'vectors' | 'psychology' | 'social' | 'seo';
  let activeTab = $state<TabId>('social');
  let selectedPostIndex = $state<number>(0);
  let selectedPost = $derived<InstagramGridTile>(INSTAGRAM_GRID_POSTS[selectedPostIndex]);
  let openPsychId = $state<string>(PSYCHOLOGY_RESEARCH_PILLARS[0].id);
  let copiedId = $state<string | null>(null);
  let activeHighlightId = $state<string>(INSTAGRAM_PROFILE_SPEC.highlights[0].id);

  // Private early access drawer
  let drawerOpen = $state(false);
  let accessConfirmation = $state<EarlyAccessConfirmation | null>(null);

  const SEO_ARCHITECTURE_LAYERS = [
    {
      layer: '01 · CANONICAL & ROBOTS DIRECTIVES',
      implementation: 'https://liris.world · index, follow, max-image-preview:large',
      purpose: 'Establishes domain authority for liris.world while preserving high-contrast visual previews across search and social discovery engines.'
    },
    {
      layer: '02 · SCHEMA.ORG JSON-LD GRAPH',
      implementation: 'Organization + Brand + WebSite + WebPage (@graph)',
      purpose: 'Binds the LIRIS entity, the "FREEDOM FOR ALL" slogan, and @liris.world Instagram identity into Google Knowledge Graph without cluttering the visible UI.'
    },
    {
      layer: '03 · OPENGRAPH & TWITTER CARDS',
      implementation: 'summary_large_image · 1200×630 Arched Emblem Card',
      purpose: 'Ensures private links shared in iMessage, WhatsApp, Discord, X, and Instagram DMs unfurl as an austere black monolith sigil.'
    },
    {
      layer: '04 · SEMANTIC LANDMARKS & A11Y',
      implementation: 'ARIA live regions, SVG title/role attributes, reduced-motion compliance',
      purpose: 'Maintains WCAG AA contrast (#F6F5F0 on #050508 = 18.6:1) and screen-reader legibility even when visual timers are intentionally jumbled.'
    }
  ] as const;

  function selectPrevTile() {
    selectedPostIndex = (selectedPostIndex - 1 + INSTAGRAM_GRID_POSTS.length) % INSTAGRAM_GRID_POSTS.length;
  }

  function selectNextTile() {
    selectedPostIndex = (selectedPostIndex + 1) % INSTAGRAM_GRID_POSTS.length;
  }

  function copyCaption(id: string, text: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      copiedId = id;
      setTimeout(() => {
        if (copiedId === id) copiedId = null;
      }, 2000);
    }
  }

  function exportTileSvg(post: InstagramGridTile) {
    if (typeof document === 'undefined') return;
    const bg = post.darkBg ? '#050508' : '#F6F5F0';
    const fg = post.darkBg ? '#F6F5F0' : '#050508';
    const accent = post.darkBg ? '#E2CFA8' : '#050508';
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
  <rect width="1080" height="1080" fill="${bg}" />
  <rect x="44" y="44" width="992" height="992" fill="none" stroke="${fg}" stroke-opacity="0.22" stroke-width="2" />
  <text x="90" y="108" fill="${accent}" font-family="monospace" font-size="22" letter-spacing="8">${post.position} // ${post.gridCoord}</text>
  <text x="990" y="108" text-anchor="end" fill="${fg}" fill-opacity="0.55" font-family="monospace" font-size="20" letter-spacing="6">${post.kicker}</text>
  <circle cx="540" cy="480" r="220" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="2" />
  <polygon points="540,220 800,480 540,740 280,480" fill="none" stroke="${fg}" stroke-opacity="0.3" stroke-width="2" />
  <text x="540" y="845" text-anchor="middle" fill="${fg}" font-family="sans-serif" font-weight="800" font-size="56" letter-spacing="14">${post.headline}</text>
  <text x="540" y="905" text-anchor="middle" fill="${accent}" font-family="monospace" font-size="26" letter-spacing="12">${post.subline}</text>
  <text x="540" y="990" text-anchor="middle" fill="${fg}" fill-opacity="0.45" font-family="monospace" font-size="18" letter-spacing="10">LIRIS.WORLD — FREEDOM FOR ALL</text>
</svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LIRIS-IG-TILE-${post.position}-${post.codename.replace(/\s+/g, '-')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
</script>

<main class="min-h-screen w-full bg-[#050508] text-[#F6F5F0] relative selection:bg-[#E2CFA8] selection:text-[#050508] pb-24">
  <div class="grain-overlay" aria-hidden="true"></div>
  <!-- Subtle Structural Grid -->
  <div
    class="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
    style="background-image: linear-gradient(to right, #F6F5F0 1px, transparent 1px), linear-gradient(to bottom, #F6F5F0 1px, transparent 1px); background-size: 96px 96px;"
  ></div>

  <!-- Top Navigation Bar with Centered FREEDOM FOR ALL & Unclipped Section Tabs -->
  <header class="sticky top-0 z-30 backdrop-blur-md bg-[#050508]/92 border-b border-[#F6F5F0]/12 px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
    <a
      href="/"
      class="inline-flex items-center gap-3 min-h-11 font-mono text-[10px] tracking-[0.3em] uppercase text-[#F6F5F0]/80 hover:text-[#E2CFA8] transition-colors border border-[#F6F5F0]/20 px-3 py-3 shrink-0"
    >
      <span class="w-4 h-4 block text-[#E2CFA8]">
        <LirisSvgArt variant="veiled-silhouette-logo" />
      </span>
      ← SANCTUARY VIEW
    </a>

    <!-- Centered FREEDOM FOR ALL Lockup -->
    <div class="flex items-center justify-center text-center gap-3">
      <span class="font-display text-xs tracking-[0.35em] uppercase text-[#F6F5F0]/60">{BRAND_IDENTITY.name}</span>
      <span class="text-[#F6F5F0]/25">—</span>
      <span class="font-mono text-[11px] tracking-[0.38em] uppercase text-[#E2CFA8] font-semibold">
        <FreedomScrambleText text={BRAND_IDENTITY.tagline} intervalMs={7000} durationMs={750} />
      </span>
    </div>

    <!-- Section Switcher (Never Clipped) -->
    <nav class="flex flex-wrap items-center justify-center gap-1.5" aria-label="Brand Dossier Sections">
      {#each [
        { id: 'social', label: '01 / 9-TILE MONOLITH' },
        { id: 'vectors', label: '02 / BOLD SVG MARKS' },
        { id: 'psychology', label: '03 / PSYCHOLOGY RESEARCH' },
        { id: 'seo', label: '04 / SEO & PALETTE' }
      ] as tab}
        <button
          type="button"
          onclick={() => (activeTab = tab.id as TabId)}
          class="pressable font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase px-3 py-3 min-h-11 border transition-all duration-300 cursor-pointer whitespace-nowrap {activeTab === tab.id
            ? 'border-[#E2CFA8] bg-[#E2CFA8] text-[#050508] font-semibold'
            : 'border-[#F6F5F0]/15 text-[#F6F5F0]/60 hover:border-[#F6F5F0]/40 hover:text-[#F6F5F0]'}"
        >
          {tab.label}
        </button>
      {/each}
      <button
        type="button"
        onclick={() => (drawerOpen = true)}
        data-testid="brand-open-access-drawer"
        class="pressable font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase px-3 py-3 min-h-11 border border-[#E2CFA8]/60 text-[#E2CFA8] hover:bg-[#E2CFA8] hover:text-[#050508] transition-all duration-300 cursor-pointer whitespace-nowrap font-semibold"
      >
        PRIVATE ACCESS
      </button>
    </nav>
  </header>

  <!-- Main Content Container -->
  <div class="relative z-10 max-w-6xl mx-auto px-6 md:px-12 pt-12 md:pt-16">
    <!-- Dossier Header Centered (Zero Italics — Pure Upright Geometric Precision) -->
    <div class="border-b border-[#F6F5F0]/12 pb-10 mb-12 text-center flex flex-col items-center">
      <div class="w-12 h-12 mb-4 text-[#E2CFA8]">
        <LirisSvgArt variant="veiled-silhouette-logo" />
      </div>
      <p class="font-mono text-[10px] tracking-[0.42em] uppercase text-[#E2CFA8] mb-3">
        EMPIRICAL RETAIL PSYCHOLOGY · BOLD MODERN SVG SYSTEM · @LIRIS.WORLD MONOLITH
      </p>
      <h1 class="font-display text-2xl sm:text-4xl tracking-[0.24em] uppercase text-[#F6F5F0] font-extrabold max-w-3xl">
        {BRAND_IDENTITY.name} — {BRAND_IDENTITY.tagline}
      </h1>
      <p class="font-mono text-xs sm:text-sm tracking-[0.16em] uppercase text-[#F6F5F0]/65 max-w-2xl mt-4 leading-relaxed">
        Every vector blade, negative-space silhouette, chisel-blade calligraphic monogram, and 9-tile Instagram plate is engineered from peer-reviewed human perception and luxury retail psychology.
      </p>
    </div>

    <!-- TAB 1: INSTAGRAM 9-TILE ARCHITECTURAL MONOLITH (FULLY BUILT OUT) -->
    {#if activeTab === 'social'}
      <section class="space-y-12" aria-label="Instagram 9-Tile Architectural Monolith">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <!-- Left Column (7 cols): Full @liris.world Profile Header + Story Highlights + 9-Tile Monolith Grid -->
          <div class="lg:col-span-7 border border-[#F6F5F0]/18 bg-[#0A0B10] p-6 sm:p-8 space-y-7">
            <!-- Top Bar -->
            <div class="flex flex-wrap items-center justify-between gap-4 border-b border-[#F6F5F0]/12 pb-4">
              <div>
                <span class="font-mono text-[9px] tracking-[0.34em] uppercase text-[#E2CFA8] block">
                  INSTAGRAM 9-TILE ARCHITECTURAL MONOLITH
                </span>
                <h2 class="font-display text-base sm:text-lg tracking-[0.25em] uppercase text-[#F6F5F0] font-bold mt-1">
                  {INSTAGRAM_PROFILE_SPEC.handle} — 3×3 CHECKERBOARD SYSTEM
                </h2>
              </div>
              <a
                href="https://instagram.com/liris.world"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center min-h-11 font-mono text-[9px] tracking-[0.28em] uppercase border border-[#E2CFA8]/50 px-3.5 py-2 text-[#E2CFA8] hover:bg-[#E2CFA8] hover:text-[#050508] transition-colors"
              >
                OPEN @LIRIS.WORLD ↗
              </a>
            </div>

            <!-- Simulated @liris.world Instagram Profile Header & Bio -->
            <div class="border border-[#F6F5F0]/12 bg-[#050508] p-5 space-y-5">
              <div class="flex flex-col sm:flex-row sm:items-center gap-5">
                <!-- Profile Avatar with Negative-Space Veiled Silhouette Logo -->
                <div class="w-20 h-20 rounded-full border-2 border-[#E2CFA8] p-1.5 bg-[#050508] flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                  <div class="w-12 h-12 text-[#F6F5F0]">
                    <LirisSvgArt variant="veiled-silhouette-logo" />
                  </div>
                </div>

                <!-- Handle, Stats & Bio -->
                <div class="flex-1 space-y-3 text-center sm:text-left">
                  <div class="flex flex-wrap items-center justify-center sm:justify-between gap-3">
                    <div class="flex items-center gap-2">
                      <span class="font-mono text-xs tracking-[0.24em] uppercase text-[#F6F5F0] font-semibold">
                        liris.world
                      </span>
                      <span class="inline-block w-2 h-2 rotate-45 bg-[#E2CFA8]" title="Verified Sovereign Collective"></span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="font-mono text-[9px] tracking-[0.24em] uppercase bg-[#F6F5F0] text-[#050508] font-semibold px-3 py-1">
                        FOLLOW
                      </span>
                      <span class="font-mono text-[9px] tracking-[0.24em] uppercase border border-[#F6F5F0]/25 text-[#F6F5F0]/80 px-3 py-1">
                        PORTAL KEY
                      </span>
                    </div>
                  </div>

                  <!-- Counters -->
                  <div class="flex items-center justify-center sm:justify-start gap-6 font-mono text-[10px] tracking-[0.2em] uppercase">
                    <span><strong class="text-[#F6F5F0]">{INSTAGRAM_PROFILE_SPEC.postsCount}</strong> <span class="text-[#F6F5F0]/50">PLATES</span></span>
                    <span><strong class="text-[#E2CFA8]">{INSTAGRAM_PROFILE_SPEC.initiatesCount}</strong> <span class="text-[#F6F5F0]/50">INITIATES</span></span>
                    <span><strong class="text-[#F6F5F0]">{INSTAGRAM_PROFILE_SPEC.followingCount}</strong> <span class="text-[#F6F5F0]/50">FOLLOWING</span></span>
                  </div>
                </div>
              </div>

              <!-- Profile Bio Centered on FREEDOM FOR ALL -->
              <div class="border-t border-[#F6F5F0]/10 pt-4 space-y-1.5 text-center">
                <p class="font-display text-xs tracking-[0.34em] uppercase text-[#E2CFA8] font-bold">
                  <FreedomScrambleText text={BRAND_IDENTITY.tagline} intervalMs={6500} durationMs={800} />
                </p>
                {#each INSTAGRAM_PROFILE_SPEC.bioLines as line}
                  <p class="font-mono text-[10px] tracking-[0.22em] uppercase text-[#F6F5F0]/70">
                    {line}
                  </p>
                {/each}
                <p class="font-mono text-[10px] tracking-[0.28em] uppercase text-[#F6F5F0] pt-1">
                  🔗 {INSTAGRAM_PROFILE_SPEC.bioLink}
                </p>
              </div>

              <!-- 4 Story Highlights Row -->
              <div class="border-t border-[#F6F5F0]/10 pt-4 flex items-center justify-center gap-6 sm:gap-8">
                {#each INSTAGRAM_PROFILE_SPEC.highlights as hl}
                  <button
                    type="button"
                    onclick={() => (activeHighlightId = hl.id)}
                    class="flex flex-col items-center gap-1.5 group cursor-pointer"
                  >
                    <div
                      class="w-12 h-12 rounded-full border p-2.5 flex items-center justify-center transition-all {activeHighlightId === hl.id
                        ? 'border-[#E2CFA8] bg-[#E2CFA8]/10 text-[#E2CFA8]'
                        : 'border-[#F6F5F0]/25 bg-[#0A0B10] text-[#F6F5F0]/75 group-hover:border-[#E2CFA8]'}"
                    >
                      <LirisSvgArt variant={hl.variant} className="w-full h-full" />
                    </div>
                    <span class="font-mono text-[8px] tracking-[0.26em] uppercase text-[#F6F5F0]/70">
                      {hl.label}
                    </span>
                  </button>
                {/each}
              </div>
            </div>

            <!-- 3×3 ARCHITECTURAL MONOLITH GRID (ALL 9 TILES FULLY ENGINEERED) -->
            <div class="grid grid-cols-3 gap-2.5 sm:gap-3" data-testid="instagram-9-tile-grid">
              {#each INSTAGRAM_GRID_POSTS as post, idx}
                <button
                  type="button"
                  data-testid={`ig-tile-${post.position}`}
                  onclick={() => (selectedPostIndex = idx)}
                  class="group relative aspect-square border transition-all duration-300 p-2.5 sm:p-3.5 flex flex-col justify-between cursor-pointer overflow-hidden text-left {post.darkBg
                    ? 'bg-[#050508] text-[#F6F5F0]'
                    : 'bg-[#F6F5F0] text-[#050508]'} {selectedPostIndex === idx
                    ? 'ring-2 ring-[#E2CFA8] border-[#E2CFA8]'
                    : post.darkBg
                      ? 'border-[#F6F5F0]/18 hover:border-[#E2CFA8]/70'
                      : 'border-[#050508]/25 hover:border-[#E2CFA8]'}"
                >
                  <!-- Top Tile Header: Position + Grid Coord -->
                  <div class="flex items-center justify-between w-full z-10">
                    <span
                      class="font-mono text-[8px] tracking-[0.22em] uppercase {post.darkBg
                        ? 'text-[#E2CFA8]'
                        : 'text-[#050508]/70 font-semibold'}"
                    >
                      {post.position} · {post.gridCoord}
                    </span>
                    <span
                      class="w-1.5 h-1.5 rotate-45 {selectedPostIndex === idx
                        ? 'bg-[#E2CFA8]'
                        : post.darkBg
                          ? 'bg-[#F6F5F0]/30'
                          : 'bg-[#050508]/40'}"
                    ></span>
                  </div>

                  <!-- Center Bespoke SVG Vector Artwork for Every Single Tile -->
                  <div
                    class="w-full h-[54%] flex items-center justify-center px-1 transition-transform duration-300 group-hover:scale-105 {post.darkBg
                      ? 'text-[#F6F5F0]'
                      : 'text-[#050508]'}"
                  >
                    <LirisSvgArt variant={post.svgVariant} className="w-full h-full max-h-full" />
                  </div>

                  <!-- Bottom Tile Lockup: Headline + Subline + Kicker -->
                  <div class="w-full z-10 text-center border-t pt-1.5 {post.darkBg ? 'border-[#F6F5F0]/12' : 'border-[#050508]/15'}">
                    <p
                      class="font-display text-[9px] sm:text-[11px] font-bold tracking-[0.18em] uppercase truncate {post.darkBg
                        ? 'text-[#F6F5F0]'
                        : 'text-[#050508]'}"
                    >
                      {post.headline}
                    </p>
                    <p
                      class="font-mono text-[7px] sm:text-[8px] tracking-[0.22em] uppercase truncate mt-0.5 {post.darkBg
                        ? 'text-[#E2CFA8]'
                        : 'text-[#050508]/70 font-semibold'}"
                    >
                      {post.subline}
                    </p>
                  </div>
                </button>
              {/each}
            </div>
          </div>

          <!-- Right Column (5 cols): Complete Selected Tile Inspector & 1080×1080 SVG Exporter -->
          <div class="lg:col-span-5 border border-[#F6F5F0]/18 bg-[#0A0B10] p-6 sm:p-8 space-y-6">
            <!-- Inspector Header with Prev/Next Controls -->
            <div class="flex items-center justify-between border-b border-[#F6F5F0]/12 pb-4 gap-2">
              <div>
                <span class="font-mono text-[9px] tracking-[0.3em] uppercase text-[#E2CFA8] block">
                  PLATE {selectedPost.position} ({selectedPost.gridCoord}) · {selectedPost.releaseWindow}
                </span>
                <h3 class="font-display text-sm sm:text-base tracking-[0.22em] uppercase text-[#F6F5F0] font-bold mt-1">
                  {selectedPost.codename}
                </h3>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onclick={selectPrevTile}
                  aria-label="Previous tile"
                  class="pressable font-mono text-[10px] border border-[#F6F5F0]/20 min-w-11 min-h-11 px-2.5 text-[#F6F5F0]/75 hover:border-[#E2CFA8] hover:text-[#E2CFA8] cursor-pointer"
                >
                  ←
                </button>
                <button
                  type="button"
                  onclick={selectNextTile}
                  aria-label="Next tile"
                  class="pressable font-mono text-[10px] border border-[#F6F5F0]/20 min-w-11 min-h-11 px-2.5 text-[#F6F5F0]/75 hover:border-[#E2CFA8] hover:text-[#E2CFA8] cursor-pointer"
                >
                  →
                </button>
              </div>
            </div>

            <!-- High-Resolution 1:1 Plate Canvas Preview -->
            <div
              class="aspect-square w-full border p-6 flex flex-col justify-between relative overflow-hidden {selectedPost.darkBg
                ? 'bg-[#050508] text-[#F6F5F0] border-[#F6F5F0]/20'
                : 'bg-[#F6F5F0] text-[#050508] border-[#050508]/30'}"
            >
              <!-- Top Plate Metadata -->
              <div class="flex items-center justify-between font-mono text-[9px] tracking-[0.28em] uppercase">
                <span class={selectedPost.darkBg ? 'text-[#E2CFA8]' : 'text-[#050508]/70 font-semibold'}>
                  {selectedPost.position} // {selectedPost.gridCoord}
                </span>
                <span class={selectedPost.darkBg ? 'text-[#F6F5F0]/60' : 'text-[#050508]/60'}>
                  {selectedPost.kicker}
                </span>
              </div>

              <!-- Center Vector Artwork -->
              <div class="w-full h-[58%] flex items-center justify-center px-4">
                <LirisSvgArt variant={selectedPost.svgVariant} className="w-full h-full" />
              </div>

              <!-- Bottom Plate Typography Lockup -->
              <div class="text-center border-t pt-3 {selectedPost.darkBg ? 'border-[#F6F5F0]/15' : 'border-[#050508]/15'}">
                <p class="font-display text-lg sm:text-xl font-extrabold tracking-[0.22em] uppercase">
                  {selectedPost.headline}
                </p>
                <p
                  class="font-mono text-[10px] tracking-[0.32em] uppercase mt-1 {selectedPost.darkBg
                    ? 'text-[#E2CFA8]'
                    : 'text-[#050508]/75 font-semibold'}"
                >
                  {selectedPost.subline}
                </p>
              </div>
            </div>

            <!-- Export 1080x1080 SVG Button -->
            <button
              type="button"
              onclick={() => exportTileSvg(selectedPost)}
              class="pressable w-full min-h-11 font-mono text-[10px] tracking-[0.28em] uppercase py-3 border border-[#E2CFA8] bg-[#E2CFA8]/10 text-[#E2CFA8] hover:bg-[#E2CFA8] hover:text-[#050508] font-semibold transition-colors cursor-pointer"
            >
              EXPORT 1080×1080 PLATE .SVG ↓
            </button>

            <!-- Complete Architectural & Psychological Metadata for Selected Tile -->
            <div class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="border border-[#F6F5F0]/12 bg-[#050508] p-3.5 space-y-1">
                  <span class="font-mono text-[8px] tracking-[0.28em] uppercase text-[#F6F5F0]/45 block">
                    PRODUCTION SPEC
                  </span>
                  <p class="font-mono text-[10px] text-[#F6F5F0]/90">
                    {selectedPost.productionSpec}
                  </p>
                </div>
                <div class="border border-[#F6F5F0]/12 bg-[#050508] p-3.5 space-y-1">
                  <span class="font-mono text-[8px] tracking-[0.28em] uppercase text-[#E2CFA8] block">
                    RELEASE CADENCE
                  </span>
                  <p class="font-mono text-[10px] text-[#F6F5F0]/90">
                    {selectedPost.releaseWindow}
                  </p>
                </div>
              </div>

              <div class="border border-[#F6F5F0]/12 bg-[#050508] p-4 space-y-1.5">
                <span class="font-mono text-[8px] tracking-[0.3em] uppercase text-[#F6F5F0]/45 block">
                  ARCHITECTURAL &amp; VISUAL DIRECTION
                </span>
                <p class="font-mono text-[11px] leading-relaxed text-[#F6F5F0]/80">
                  {selectedPost.visualDirection}
                </p>
              </div>

              <div class="border border-[#F6F5F0]/12 bg-[#050508] p-4 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-mono text-[8px] tracking-[0.3em] uppercase text-[#E2CFA8]">
                    DISPATCH CAPTION &amp; TAGS
                  </span>
                  <button
                    type="button"
                    onclick={() =>
                      copyCaption(selectedPost.position, `${selectedPost.caption}\n\n${selectedPost.hashtags}`)}
                    class="pressable inline-flex items-center min-h-11 font-mono text-[8px] tracking-[0.25em] uppercase text-[#F6F5F0]/70 hover:text-[#E2CFA8] cursor-pointer"
                  >
                    {copiedId === selectedPost.position ? 'COPIED ✓' : 'COPY CAPTION'}
                  </button>
                </div>
                <pre class="font-mono text-[11px] text-[#F6F5F0]/90 whitespace-pre-wrap leading-relaxed">{selectedPost.caption}</pre>
                <p class="font-mono text-[10px] text-[#E2CFA8]/80 pt-1">{selectedPost.hashtags}</p>
              </div>

              <div class="border border-[#E2CFA8]/25 bg-[#050508] p-4 space-y-1.5">
                <span class="font-mono text-[8px] tracking-[0.3em] uppercase text-[#E2CFA8] block">
                  RETAIL PSYCHOLOGY MECHANISM
                </span>
                <p class="font-mono text-[10px] leading-relaxed text-[#F6F5F0]/80">
                  {selectedPost.psychTrigger}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Short-Form Vertical Video Transmissions (Reels / TikTok) -->
        <div class="border border-[#F6F5F0]/18 bg-[#0A0B10] p-6 sm:p-8 space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-[#F6F5F0]/10 pb-4">
            <div>
              <span class="font-mono text-[9px] tracking-[0.32em] uppercase text-[#E2CFA8] block">
                VERTICAL MOTION TRANSMISSIONS (INSTAGRAM REELS &amp; TIKTOK)
              </span>
              <h3 class="font-display text-sm sm:text-base tracking-[0.24em] uppercase text-[#F6F5F0] font-bold mt-1">
                HIGH-RETENTION LOOP STORYBOARDS
              </h3>
            </div>
            <span class="font-mono text-[9px] tracking-[0.24em] uppercase text-[#F6F5F0]/50">
              9:16 VERTICAL · 1080×1920
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            {#each SHORT_FORM_TRANSMISSIONS as script}
              <div class="border border-[#F6F5F0]/15 bg-[#050508] p-5 space-y-4 flex flex-col justify-between">
                <div class="space-y-2.5">
                  <div class="flex items-center justify-between font-mono text-[9px] tracking-[0.22em] text-[#E2CFA8]">
                    <span>{script.id}</span>
                    <span>{script.duration}</span>
                  </div>
                  <h4 class="font-display text-xs tracking-[0.22em] uppercase text-[#F6F5F0] font-bold">
                    {script.title}
                  </h4>
                  <p class="font-mono text-[10px] leading-relaxed text-[#F6F5F0]/70">
                    {script.visualHook}
                  </p>
                </div>
                <div class="pt-3 border-t border-[#F6F5F0]/10 space-y-2">
                  <p class="font-mono text-[9px] text-[#F6F5F0]/60">
                    <strong class="text-[#F6F5F0]">ON-SCREEN LOCKUP:</strong> {script.captionOverlay}
                  </p>
                  <p class="font-mono text-[9px] text-[#E2CFA8]">
                    {script.retentionDriver}
                  </p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </section>
    {/if}

    <!-- TAB 2: REWORKED BOLD MODERN SVG VECTORS & CALLIGRAPHY -->
    {#if activeTab === 'vectors'}
      <section class="space-y-10" aria-label="SVG Vector Reconstructions">
        <!-- DOWNLOAD SUITE: vector (SVG) + raster (PNG 2x) exports of every mark, plus source imagery -->
        <div class="border border-[#E2CFA8]/30 bg-[#0A0B10] p-6 space-y-4" data-testid="download-suite">
          <div class="flex items-center justify-between flex-wrap gap-3">
            <div>
              <span class="font-mono text-[9px] tracking-[0.34em] uppercase text-[#E2CFA8] block">DOWNLOAD SUITE</span>
              <h2 class="font-display text-sm sm:text-base tracking-[0.25em] uppercase text-[#F6F5F0] font-bold mt-1">
                MARKS &amp; SOURCE ASSETS — SVG / PNG / JPEG
              </h2>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <button type="button" data-testid="dl-mark01-svg" onclick={() => downloadSvgByLabel('Signal Slash', 'LIRIS-MARK-01-arch-emblem.svg')} class="pressable font-mono text-[9px] tracking-[0.2em] uppercase min-h-11 px-3 border border-[#F6F5F0]/20 text-[#F6F5F0]/80 hover:border-[#E2CFA8] hover:text-[#E2CFA8] cursor-pointer">MARK 01 · SVG</button>
            <button type="button" data-testid="dl-mark01-png" onclick={() => downloadPngByLabel('Signal Slash', 'LIRIS-MARK-01-arch-emblem@2x.png')} class="pressable font-mono text-[9px] tracking-[0.2em] uppercase min-h-11 px-3 border border-[#F6F5F0]/20 text-[#F6F5F0]/80 hover:border-[#E2CFA8] hover:text-[#E2CFA8] cursor-pointer">MARK 01 · PNG 2x</button>
            <button type="button" data-testid="dl-mark02-svg" onclick={() => downloadSvgByLabel('Calligraphic Seal', 'LIRIS-MARK-02-calligraphic-seal.svg')} class="pressable font-mono text-[9px] tracking-[0.2em] uppercase min-h-11 px-3 border border-[#F6F5F0]/20 text-[#F6F5F0]/80 hover:border-[#E2CFA8] hover:text-[#E2CFA8] cursor-pointer">MARK 02 · SVG</button>
            <button type="button" data-testid="dl-mark02-png" onclick={() => downloadPngByLabel('Calligraphic Seal', 'LIRIS-MARK-02-calligraphic-seal@2x.png')} class="pressable font-mono text-[9px] tracking-[0.2em] uppercase min-h-11 px-3 border border-[#F6F5F0]/20 text-[#F6F5F0]/80 hover:border-[#E2CFA8] hover:text-[#E2CFA8] cursor-pointer">MARK 02 · PNG 2x</button>
            <button type="button" data-testid="dl-mark00-svg" onclick={() => downloadSvgByLabel('Silhouette', 'LIRIS-MARK-00-header-silhouette.svg')} class="pressable font-mono text-[9px] tracking-[0.2em] uppercase min-h-11 px-3 border border-[#F6F5F0]/20 text-[#F6F5F0]/80 hover:border-[#E2CFA8] hover:text-[#E2CFA8] cursor-pointer">MARK 00 · SVG</button>
            <button type="button" data-testid="dl-mark00-png" onclick={() => downloadPngByLabel('Silhouette', 'LIRIS-MARK-00-header-silhouette@2x.png')} class="pressable font-mono text-[9px] tracking-[0.2em] uppercase min-h-11 px-3 border border-[#F6F5F0]/20 text-[#F6F5F0]/80 hover:border-[#E2CFA8] hover:text-[#E2CFA8] cursor-pointer">MARK 00 · PNG 2x</button>
            <button type="button" data-testid="dl-emblem-jpg" onclick={() => downloadFile('/assets/aistudio/WhatsApp_Image_2026-11-02_at_20.27.48_fa85c2fc.jpeg', 'LIRIS-arched-emblem-source.jpeg')} class="pressable font-mono text-[9px] tracking-[0.2em] uppercase min-h-11 px-3 border border-[#E2CFA8]/50 text-[#E2CFA8] hover:bg-[#E2CFA8] hover:text-[#050508] cursor-pointer">EMBLEM · JPEG</button>
            <button type="button" data-testid="dl-signature-jpg" onclick={() => downloadFile('/assets/aistudio/WhatsApp_Image_2026-11-02_at_20.27.49_2d155d6e.jpeg', 'LIRIS-signature-script-source.jpeg')} class="pressable font-mono text-[9px] tracking-[0.2em] uppercase min-h-11 px-3 border border-[#E2CFA8]/50 text-[#E2CFA8] hover:bg-[#E2CFA8] hover:text-[#050508] cursor-pointer">SIGNATURE · JPEG</button>
          </div>
        </div>
        <!-- Mark 01 & Mark 02 Side-by-Side Hero Comparison -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Mark 01: Razor-Chamfered Blade-Serif Arched Emblem with Centered Upright FREEDOM FOR ALL -->
          <div class="border border-[#F6F5F0]/18 bg-[#0A0B10] p-8 flex flex-col justify-between">
            <div class="flex items-center justify-between border-b border-[#F6F5F0]/10 pb-4 mb-6">
              <div>
                <span class="font-mono text-[9px] tracking-[0.3em] uppercase text-[#E2CFA8] block">
                  MARK 01 · PRIMARY ARCH EMBLEM
                </span>
                <h2 class="font-display text-sm sm:text-base tracking-[0.25em] uppercase text-[#F6F5F0] font-bold mt-1">
                  LIRIS — CENTERED FREEDOM FOR ALL
                </h2>
              </div>
              <span class="font-mono text-[9px] tracking-[0.2em] text-[#E2CFA8] border border-[#E2CFA8]/30 px-2.5 py-1">
                DIDONE + SLASH
              </span>
            </div>

            <div class="my-4 py-8 px-4 flex items-center justify-center bg-[#050508] border border-[#F6F5F0]/12">
              <div class="w-full max-w-[420px]">
                <LirisSvgArt variant="arched-emblem" />
              </div>
            </div>

            <div class="space-y-3 pt-4 border-t border-[#F6F5F0]/10">
              <p class="font-mono text-[11px] leading-relaxed text-[#F6F5F0]/75">
                <strong class="text-[#E2CFA8]">Bodoni Moda 900</strong> Didone wordmark (the luxury signal: extreme stroke contrast, hairline serifs) laid over a single bold cobalt diagonal slash, with <strong class="text-[#E2CFA8]">FREEDOM FOR ALL</strong> knocked out of an inverted slanted bar.
              </p>
              <p class="font-mono text-[10px] text-[#E2CFA8]/80">
                PSYCHOLOGY: High-contrast angularity &amp; symmetry increase perceived luxury authority (Patrick &amp; Hagtvedt, 2011; Reber et al., 2004).
              </p>
            </div>
          </div>

          <!-- Mark 02: Bold Modern Chisel-Blade Calligraphic Monogram -->
          <div class="border border-[#F6F5F0]/18 bg-[#0A0B10] p-8 flex flex-col justify-between">
            <div class="flex items-center justify-between border-b border-[#F6F5F0]/10 pb-4 mb-6">
              <div>
                <span class="font-mono text-[9px] tracking-[0.3em] uppercase text-[#E2CFA8] block">
                  MARK 02 · CHISEL-BLADE CALLIGRAPHY
                </span>
                <h2 class="font-display text-sm sm:text-base tracking-[0.25em] uppercase text-[#F6F5F0] font-bold mt-1">
                  LIRIS — ARCHITECTURAL CALLIGRAPHIC SEAL
                </h2>
              </div>
              <span class="font-mono text-[9px] tracking-[0.2em] text-[#E2CFA8] border border-[#E2CFA8]/30 px-2.5 py-1">
                CHISEL-BLADE VECTOR
              </span>
            </div>

            <div class="my-4 py-8 px-4 flex items-center justify-center bg-[#050508] border border-[#F6F5F0]/12">
              <div class="w-full max-w-[420px]">
                <LirisSvgArt variant="calligraphic-signature" />
              </div>
            </div>

            <div class="space-y-3 pt-4 border-t border-[#F6F5F0]/10">
              <p class="font-mono text-[11px] leading-relaxed text-[#F6F5F0]/75">
                Constructed on a strict geometric axis: chisel-cut vertical pillars for L, I, R, I, S unified by a sweeping overhead sovereign arc, diagonal hairline ligatures, and a razor-tapered horizon katana blade.
              </p>
              <p class="font-mono text-[10px] text-[#E2CFA8]/80">
                PSYCHOLOGY: High-contrast geometric-calligraphic tension signals modern atelier precision (Doyle &amp; Bottomley, 2004).
              </p>
            </div>
          </div>
        </div>

        <!-- Mark 00: Negative-Space Veiled Couture Silhouette Header Logo -->
        <div class="border border-[#F6F5F0]/18 bg-[#0A0B10] p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="max-w-xl space-y-3 text-center md:text-left">
            <span class="font-mono text-[9px] tracking-[0.3em] uppercase text-[#E2CFA8] block">
              MARK 00 · HEADER NEGATIVE-SPACE MONOLITH
            </span>
            <h2 class="font-display text-sm sm:text-base tracking-[0.25em] uppercase text-[#F6F5F0] font-bold">
              VEILED COUTURE SILHOUETTE LOGO
            </h2>
            <p class="font-mono text-[11px] leading-relaxed text-[#F6F5F0]/70">
              Engineered with an <code class="text-[#E2CFA8]">evenodd</code> compound negative-space path: a draped couture hood, sharp shoulder geometry, and floating central blade carved directly out of a brutalist polygon monolith.
            </p>
            <p class="font-mono text-[10px] text-[#E2CFA8]/80">
              PSYCHOLOGY: Gestalt figure-ground reversal (Wagemans et al., 2012) compels the viewer’s visual cortex to actively resolve the veiled form.
            </p>
          </div>
          <div class="flex items-center gap-4 shrink-0">
            <div class="w-32 h-32 border border-[#F6F5F0]/20 bg-[#050508] flex items-center justify-center p-5 text-[#F6F5F0]">
              <LirisSvgArt variant="veiled-silhouette-logo" className="w-full h-full" />
            </div>
            <div class="w-32 h-32 border border-[#050508]/25 bg-[#F6F5F0] flex items-center justify-center p-5 text-[#050508]">
              <LirisSvgArt variant="veiled-silhouette-logo" className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>
    {/if}

    <!-- TAB 3: CENTERED HUMAN RETAIL PSYCHOLOGY RESEARCH (UPRIGHT GEOMETRIC TYPOGRAPHY) -->
    {#if activeTab === 'psychology'}
      <section class="max-w-4xl mx-auto space-y-10" aria-label="Human Retail Psychology Research">
        <div class="border border-[#F6F5F0]/15 bg-[#0A0B10] p-8 text-center space-y-3">
          <span class="font-mono text-[9px] tracking-[0.38em] uppercase text-[#E2CFA8] block">
            EMPIRICAL CONSUMER &amp; SOCIAL PSYCHOLOGY LITERATURE
          </span>
          <h2 class="font-display text-lg sm:text-xl tracking-[0.24em] uppercase text-[#F6F5F0] font-bold">
            WHY EXTREME VAGUENESS OUTPERFORMS EXPLICIT PROMOTION
          </h2>
          <p class="font-mono text-xs tracking-[0.16em] uppercase text-[#F6F5F0]/65 max-w-2xl mx-auto leading-relaxed">
            Grounded in peer-reviewed studies from the Journal of Consumer Research, Journal of Personality and Social Psychology, and Psychological Bulletin.
          </p>
        </div>

        <div class="space-y-4">
          {#each PSYCHOLOGY_RESEARCH_PILLARS as pillar}
            <div class="border border-[#F6F5F0]/15 bg-[#0A0B10] transition-colors">
              <button
                type="button"
                onclick={() => (openPsychId = openPsychId === pillar.id ? '' : pillar.id)}
                class="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#F6F5F0]/[0.02]"
              >
                <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5">
                  <span class="font-mono text-[10px] tracking-[0.3em] text-[#E2CFA8]">
                    {pillar.index} · {pillar.researcher}
                  </span>
                  <h3 class="font-display text-sm sm:text-base tracking-[0.22em] uppercase text-[#F6F5F0] font-bold">
                    {pillar.principle}
                  </h3>
                </div>
                <span class="font-mono text-xs text-[#F6F5F0]/50">
                  {openPsychId === pillar.id ? '−' : '+'}
                </span>
              </button>

              {#if openPsychId === pillar.id}
                <div class="px-6 pb-8 pt-4 border-t border-[#F6F5F0]/10 text-center space-y-6">
                  <p class="font-mono text-[10px] tracking-[0.18em] uppercase text-[#E2CFA8] max-w-2xl mx-auto">
                    {pillar.citation}
                  </p>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                    <div class="border border-[#F6F5F0]/10 bg-[#050508] p-5 space-y-2">
                      <span class="font-mono text-[9px] tracking-[0.3em] uppercase text-[#F6F5F0]/40 block">
                        EMPIRICAL MECHANISM
                      </span>
                      <p class="font-mono text-[11px] leading-relaxed text-[#F6F5F0]/75">
                        {pillar.mechanism}
                      </p>
                    </div>
                    <div class="border border-[#F6F5F0]/10 bg-[#050508] p-5 space-y-2">
                      <span class="font-mono text-[9px] tracking-[0.3em] uppercase text-[#E2CFA8] block">
                        LIRIS ARCHITECTURAL EXECUTION
                      </span>
                      <p class="font-mono text-[11px] leading-relaxed text-[#F6F5F0]/85">
                        {pillar.lirisExecution}
                      </p>
                      <p class="font-mono text-[10px] text-[#E2CFA8]/80 pt-2 border-t border-[#F6F5F0]/10">
                        IMPACT: {pillar.conversionImpact}
                      </p>
                    </div>
                  </div>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- TAB 4: SEO ARCHITECTURE & COLOR TOKENS -->
    {#if activeTab === 'seo'}
      <section class="max-w-4xl mx-auto space-y-10" aria-label="SEO Architecture & Palette">
        <div class="border border-[#F6F5F0]/15 bg-[#0A0B10] p-8 space-y-4 text-center">
          <span class="font-mono text-[9px] tracking-[0.34em] uppercase text-[#E2CFA8] block">
            SEARCH ENGINE &amp; SOCIAL GRAPH OPTIMIZATION
          </span>
          <h2 class="font-display text-base sm:text-lg tracking-[0.24em] uppercase text-[#F6F5F0] font-bold">
            HIGH-AUTHORITY STRUCTURED DATA WITHOUT BREAKING THE FOURTH WALL
          </h2>
          <p class="font-mono text-[11px] leading-relaxed text-[#F6F5F0]/65 max-w-2xl mx-auto">
            While the visual viewport of <code class="text-[#E2CFA8]">liris.world</code> remains deliberately cryptic to human visitors, the document head supplies search crawlers and social link unfurlers with rich JSON-LD <code class="text-[#F6F5F0]">Organization</code>, <code class="text-[#F6F5F0]">Brand</code>, <code class="text-[#F6F5F0]">WebSite</code>, and <code class="text-[#F6F5F0]">WebPage</code> schemas.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each SEO_ARCHITECTURE_LAYERS as item}
            <div class="border border-[#F6F5F0]/15 bg-[#0A0B10] p-6 space-y-3">
              <span class="font-mono text-[9px] tracking-[0.3em] uppercase text-[#E2CFA8] block">
                {item.layer}
              </span>
              <p class="font-mono text-[11px] text-[#F6F5F0] leading-relaxed">
                {item.implementation}
              </p>
              <p class="font-mono text-[10px] text-[#F6F5F0]/55 leading-relaxed pt-2 border-t border-[#F6F5F0]/10">
                {item.purpose}
              </p>
            </div>
          {/each}
        </div>

        <!-- Brand Color Tokens -->
        <div class="border border-[#F6F5F0]/15 bg-[#0A0B10] p-8 space-y-6">
          <div class="text-center">
            <span class="font-mono text-[9px] tracking-[0.34em] uppercase text-[#E2CFA8] block">
              CHROMATIC DISCIPLINE
            </span>
            <h3 class="font-display text-base tracking-[0.24em] uppercase text-[#F6F5F0] font-bold mt-1">
              LIRIS COLOR SYSTEM TOKENS
            </h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {#each BRAND_COLOR_TOKENS as color}
              <div class="border border-[#F6F5F0]/12 bg-[#050508] p-4 space-y-3">
                <div class="h-12 w-full border border-[#F6F5F0]/15" style="background-color: {color.hex};"></div>
                <div>
                  <p class="font-display text-xs tracking-[0.2em] uppercase text-[#F6F5F0]">{color.name}</p>
                  <p class="font-mono text-[10px] text-[#E2CFA8] mt-0.5">{color.hex} · {color.token}</p>
                  <p class="font-mono text-[9px] text-[#F6F5F0]/55 mt-1">{color.role}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </section>
    {/if}

  </div>

  <PrivateEarlyAccessDrawer
    bind:open={drawerOpen}
    onClose={() => (drawerOpen = false)}
    onConfirmed={(c) => (accessConfirmation = c)}
  />

  {#if accessConfirmation}
    <div
      data-testid="brand-access-confirmation"
      class="fixed bottom-6 right-6 z-50 border border-[#E2CFA8] bg-[#050508]/95 backdrop-blur-md px-5 py-4 max-w-xs"
    >
      <p class="font-display text-xs font-bold tracking-[0.22em] uppercase text-[#E2CFA8]">
        ACCESS SEALED · {accessConfirmation.accessKey}
      </p>
      <p class="font-mono text-[10px] text-[#F6F5F0]/60 mt-1.5 leading-relaxed">
        {accessConfirmation.preference} — {accessConfirmation.priorityWindow}
      </p>
      <button
        type="button"
        onclick={() => (accessConfirmation = null)}
        class="font-mono text-[9px] tracking-[0.24em] uppercase text-[#F6F5F0]/50 hover:text-[#E2CFA8] mt-3 cursor-pointer"
      >
        DISMISS
      </button>
    </div>
  {/if}
</main>
