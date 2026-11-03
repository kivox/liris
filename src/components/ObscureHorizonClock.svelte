<script lang="ts">
  import { onMount } from 'svelte';
  import { computeJumbledTimer } from '../domain/lirisDropData';

  interface Props {
    intervalMs?: number;
    className?: string;
  }

  let { intervalMs = 420, className = '' }: Props = $props();

  let tick = $state(0);
  let timerState = $derived(computeJumbledTimer(tick));

  export function pulseShift() {
    tick += 1;
  }

  onMount(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      tick += 1;
    }, intervalMs);

    return () => window.clearInterval(interval);
  });
</script>

<!-- Non-linear, abstract jumbled time representation keeping Drop 001 intentionally obscure -->
<div class="w-full max-w-lg my-3 sm:my-5 {className}" data-testid="obscure-horizon-clock">
  <div
    class="w-full grid grid-cols-4 gap-px bg-[var(--line-grid)] border border-[var(--line-grid)]"
    role="timer"
    aria-label="Drop 001 Temporal Horizon Unavailable"
    data-timer-state="unavailable"
  >
    <button
      type="button"
      onclick={pulseShift}
      aria-label="Days unavailable"
      class="bg-[var(--bg-void)]/85 backdrop-blur-sm py-2.5 sm:py-3.5 px-2 text-center cursor-pointer hover:bg-[var(--bg-chamber)] transition-colors"
    >
      <span
        class="block font-mono-geo text-2xl sm:text-3xl font-light tracking-widest text-[var(--text-secondary)] select-none"
        data-testid="countdown-days"
      >
        {timerState.days}
      </span>
      <span class="block font-mono-geo text-[8px] tracking-[0.36em] uppercase text-[var(--text-muted)] mt-1">
        DAYS
      </span>
    </button>

    <button
      type="button"
      onclick={pulseShift}
      aria-label="Hours unavailable"
      class="bg-[var(--bg-void)]/85 backdrop-blur-sm py-2.5 sm:py-3.5 px-2 text-center cursor-pointer hover:bg-[var(--bg-chamber)] transition-colors"
    >
      <span
        class="block font-mono-geo text-2xl sm:text-3xl font-light tracking-widest text-[var(--text-secondary)] select-none"
        data-testid="countdown-hours"
      >
        {timerState.hours}
      </span>
      <span class="block font-mono-geo text-[8px] tracking-[0.36em] uppercase text-[var(--text-muted)] mt-1">
        HRS
      </span>
    </button>

    <button
      type="button"
      onclick={pulseShift}
      aria-label="Minutes unavailable"
      class="bg-[var(--bg-void)]/85 backdrop-blur-sm py-2.5 sm:py-3.5 px-2 text-center cursor-pointer hover:bg-[var(--bg-chamber)] transition-colors"
    >
      <span
        class="block font-mono-geo text-2xl sm:text-3xl font-light tracking-widest text-[var(--text-secondary)] select-none"
        data-testid="countdown-minutes"
      >
        {timerState.minutes}
      </span>
      <span class="block font-mono-geo text-[8px] tracking-[0.36em] uppercase text-[var(--text-muted)] mt-1">
        MIN
      </span>
    </button>

    <button
      type="button"
      onclick={pulseShift}
      aria-label="Seconds unavailable"
      class="bg-[var(--bg-void)]/85 backdrop-blur-sm py-2.5 sm:py-3.5 px-2 text-center cursor-pointer hover:bg-[var(--bg-chamber)] transition-colors"
    >
      <span
        class="block font-mono-geo text-2xl sm:text-3xl font-light tracking-widest text-[var(--accent-champagne)] select-none"
        data-testid="countdown-seconds"
      >
        {timerState.seconds}
      </span>
      <span class="block font-mono-geo text-[8px] tracking-[0.36em] uppercase text-[var(--accent-champagne)] mt-1">
        UNAVAILABLE
      </span>
    </button>
  </div>

  <div class="mt-2 flex items-center justify-between px-1 font-mono-geo text-[9px] tracking-[0.32em] uppercase text-[var(--text-muted)]">
    <span>{timerState.statusLabel}</span>
    <span class="text-[var(--accent-champagne)]">DROP 001 · UNDISCLOSED</span>
  </div>
</div>
