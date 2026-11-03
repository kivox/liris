<script lang="ts">
  import { onMount } from 'svelte';
  import LirisSvgArt from '../components/LirisSvgArt.svelte';
  import FreedomScrambleText from '../components/FreedomScrambleText.svelte';
  import ObscureHorizonClock from '../components/ObscureHorizonClock.svelte';
  import {
    BRAND_IDENTITY,
    computeParallaxOffset,
    type EarlyAccessConfirmation,
    type ParallaxOffset,
    validateEarlyAccessInput,
    createEarlyAccessConfirmation,
  } from '../domain/lirisDropData';

  interface Props {
    theme: 'carbon' | 'paper';
    onToggleTheme: () => void;
  }

  let { theme, onToggleTheme }: Props = $props();

  // Minimalist single-field email invitation
  let emailInput = $state('');
  let emailError = $state<string | undefined>(undefined);
  let isSubmitting = $state(false);
  let confirmation = $state<EarlyAccessConfirmation | null>(null);
  let signupCount = $state(1);

  // Spatial parallax mouse-move state (merged from the 23:00 remix)
  let parallax = $state<ParallaxOffset>({
    normX: 0,
    normY: 0,
    deepX: 0,
    deepY: 0,
    midX: 0,
    midY: 0,
    nearX: 0,
    nearY: 0,
  });

  function handlePointerMove(event: PointerEvent) {
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    parallax = computeParallaxOffset(
      event.clientX,
      event.clientY,
      window.innerWidth,
      window.innerHeight,
    );
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    emailError = undefined;

    const validation = validateEarlyAccessInput({ email: emailInput });
    if (!validation.valid) {
      emailError = validation.errors.email;
      return;
    }

    isSubmitting = true;
    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInput }),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          ok?: boolean;
          confirmation?: EarlyAccessConfirmation;
        };
        if (data.ok && data.confirmation) {
          confirmation = data.confirmation;
          signupCount += 1;
          isSubmitting = false;
          return;
        }
      }
    } catch {
      // Deterministic client fallback
    }

    confirmation = createEarlyAccessConfirmation(
      { email: emailInput },
      signupCount,
      new Date().toISOString(),
    );
    signupCount += 1;
    isSubmitting = false;
  }
</script>

<!-- Pure, uninterrupted single-viewport geometric sanctuary with layered spatial parallax. Zero clutter. -->
<div
  class="min-h-dvh w-full relative flex flex-col justify-between overflow-hidden selection:bg-[#E2CFA8] selection:text-[#050508]"
  style="background-image: var(--glow-ambient);"
  role="presentation"
  onpointermove={handlePointerMove}
>
  <!-- Film grain (luxury print texture) -->
  <div class="grain-overlay" aria-hidden="true"></div>

  <!-- Ambient Esoteric Sacred Geometry Background Construct -->
  <div
    class="pointer-events-none fixed inset-0 flex items-center justify-center z-0 transition-transform duration-300 ease-out will-change-transform"
    data-testid="sacred-loom-parallax-container"
    style={`transform: translate3d(${parallax.deepX}px, ${parallax.deepY}px, 0);`}
  >
    <div class="text-[var(--accent-champagne)] opacity-[0.16]">
      <LirisSvgArt
        variant="sacred-loom"
        className="w-[560px] h-[560px] sm:w-[780px] sm:h-[780px] animate-geo-orbit"
      />
    </div>
  </div>

  <!-- Hairline Architectural Frame with Corner Registration Marks -->
  <div class="pointer-events-none fixed inset-3 sm:inset-6 border border-[var(--line-grid)] z-10 geo-corner-tl geo-corner-br"></div>

  <!-- Main Header with Custom Negative-Space SVG Veiled Couture Silhouette Mark & Centered FREEDOM FOR ALL -->
  <header
    class="reveal reveal-1 relative z-20 px-6 sm:px-12 pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-3 items-center font-mono-geo text-[10px] tracking-[0.38em] uppercase text-[var(--text-muted)]"
    data-testid="liris-main-header"
  >
    <div class="flex items-center justify-start">
      <a
        href="/"
        aria-label="LIRIS — Veiled Couture Silhouette Home"
        data-testid="header-silhouette-logo"
        class="inline-flex items-center gap-3 py-2 min-h-11 text-[var(--text-primary)] hover:text-[var(--accent-champagne)] transition-colors whitespace-nowrap shrink-0"
      >
        <span class="w-7 h-7 text-[var(--accent-champagne)] flex items-center justify-center">
          <LirisSvgArt variant="veiled-silhouette-logo" className="w-full h-full" />
        </span>
        <span>LIRIS.WORLD</span>
      </a>
    </div>

    <div class="hidden sm:flex items-center justify-center text-center">
      <FreedomScrambleText
        text={BRAND_IDENTITY.tagline}
        intervalMs={6200}
        durationMs={850}
        className="text-[var(--accent-champagne)]/90 tracking-[0.42em]"
      />
    </div>

    <div class="flex items-center justify-end gap-4 shrink-0">
      <span class="text-[var(--accent-champagne)]">001</span>
      <button
        type="button"
        onclick={onToggleTheme}
        aria-label="Switch atmosphere"
        title={theme === 'carbon' ? 'Switch to Alabaster Light' : 'Switch to Abyssal Void'}
        class="pressable w-11 h-11 border border-[var(--line-strong)] bg-[var(--bg-chamber)]/80 flex items-center justify-center hover:border-[var(--accent-champagne)] cursor-pointer group"
      >
        <span class="w-2 h-2 rotate-45 bg-[var(--accent-champagne)] group-hover:scale-125 transition-transform"></span>
      </button>
    </div>
  </header>

  <!-- Centerpiece: Bespoke Vector SVG Arched Emblem + Obscure Jumbled Clock + Collective Entry -->
  <main class="relative z-20 flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-2 sm:py-3 max-w-2xl mx-auto w-full text-center">
    <div class="reveal reveal-2 w-full flex flex-col items-center">
    <!-- Sharp Vector SVG Arched Emblem (LIRIS + Centered Handwritten FREEDOM FOR ALL) -->
      <div class="w-full max-w-[200px] sm:max-w-[310px] mx-auto text-[var(--text-primary)] flex justify-center">
        <LirisSvgArt variant="arched-emblem" className="w-full h-auto" />
      </div>

    <!-- Enigmatic Geometric Declaration -->
    <h1 class="reveal reveal-3 font-display-geo text-[clamp(1.5rem,4.5vw,2.5rem)] font-extrabold tracking-[0.12em] uppercase text-[var(--text-primary)] leading-[1.15] mt-2">
      WITHOUT WALLS.<br />
      <span class="text-[var(--accent-champagne)]">WITHOUT LIMITS.</span>
    </h1>

    <p class="reveal reveal-3 font-sans-geo text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[var(--text-secondary)] mt-2 font-normal hidden sm:block">
      Silence before the shift · Time undisclosed
    </p>

    <!-- Non-Linear Abstract Jumbled Time Component -->
    <div class="reveal reveal-4 w-full flex justify-center">
      <ObscureHorizonClock intervalMs={420} />
    </div>

    <!-- Single-Line Minimalist Collective Signup (single CTA — Hick's law) -->
    <div class="reveal reveal-4 w-full max-w-md mx-auto">
      {#if !confirmation}
        <form onsubmit={handleSubmit} novalidate class="w-full">
          <div class="flex items-stretch border {emailError ? 'border-[var(--signal-crimson)]' : 'border-[var(--line-strong)] focus-within:border-[var(--accent-champagne)]'} bg-[var(--bg-void)]/90 backdrop-blur-md">
            <label for="liris-email-input" class="sr-only">Email address</label>
            <input
              id="liris-email-input"
              type="email"
              bind:value={emailInput}
              placeholder="ENTER YOUR EMAIL"
              autocomplete="email"
              aria-invalid={Boolean(emailError)}
              class="flex-1 bg-transparent px-4 py-3.5 min-h-11 font-mono-geo text-xs tracking-[0.22em] uppercase text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              class="pressable font-mono-geo text-xs tracking-[0.28em] uppercase px-8 py-3.5 min-h-11 bg-[var(--text-primary)] text-[var(--bg-void)] font-semibold hover:bg-[var(--accent-champagne)] hover:text-[#050508] cursor-pointer shrink-0 disabled:opacity-60"
            >
              {isSubmitting ? '...' : 'JOIN →'}
            </button>
          </div>
          {#if emailError}
            <p role="alert" class="mt-2 font-mono-geo text-[11px] tracking-[0.15em] text-[var(--signal-crimson)]">
              {emailError}
            </p>
          {/if}
        </form>
      {:else}
        <div
          data-testid="clearance-confirmation"
          class="border border-[var(--line-strong)] bg-[var(--bg-void)]/90 backdrop-blur-md px-5 py-4 text-center space-y-1.5"
        >
          <p class="font-display-geo text-sm font-bold tracking-[0.24em] uppercase text-[var(--accent-champagne)]">
            YOU ARE IN · {confirmation.accessKey}
          </p>
          <p class="font-sans-geo text-xs text-[var(--text-secondary)]">
            {confirmation.confirmationBody}
          </p>
        </div>
      {/if}
    </div>

    <!-- Sharp Vector Calligraphic Signature Seal Below -->
    <div class="reveal reveal-5 w-20 sm:w-28 mx-auto text-[var(--accent-champagne)] opacity-85 mt-3">
      <LirisSvgArt variant="calligraphic-signature" className="w-full h-auto" />
    </div>
    </div>
  </main>

  <!-- Whisper Footer with Centered Shuffling FREEDOM FOR ALL & Socials -->
  <footer class="reveal reveal-5 relative z-20 px-6 sm:px-12 pb-4 sm:pb-6 grid grid-cols-3 items-center font-mono-geo text-[9px] sm:text-[10px] tracking-[0.36em] uppercase text-[var(--text-muted)]">
    <div class="flex items-center justify-start">
      <a
        href="https://instagram.com/liris.world"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LIRIS on Instagram (@liris.world)"
        class="inline-flex items-center min-h-11 px-1 hover:text-[var(--accent-champagne)] transition-colors"
      >
        @LIRIS.WORLD
      </a>
    </div>

    <div class="flex items-center justify-center text-center">
      <FreedomScrambleText
        text={BRAND_IDENTITY.tagline}
        intervalMs={6200}
        durationMs={850}
        className="text-[var(--text-primary)]/85 tracking-[0.42em]"
      />
    </div>

    <div class="flex items-center justify-end">
      <span>© LIRIS</span>
    </div>
  </footer>
</div>
