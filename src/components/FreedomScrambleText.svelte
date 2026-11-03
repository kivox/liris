<script lang="ts">
  import { onMount } from 'svelte';
  import { computeScrambleFrame } from '../domain/lirisDropData';

  interface Props {
    text?: string;
    intervalMs?: number;
    durationMs?: number;
    className?: string;
    onCycleTrigger?: () => void;
  }

  let {
    text = 'FREEDOM FOR ALL',
    intervalMs = 5600,
    durationMs = 950,
    className = '',
    onCycleTrigger,
  }: Props = $props();

  let displayString = $state('FREEDOM FOR ALL');
  let isScrambling = $state(false);
  let scrambleTick = $state(0);

  $effect(() => {
    displayString = text;
  });

  export function triggerScramble() {
    if (isScrambling) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      displayString = text;
      return;
    }

    isScrambling = true;
    onCycleTrigger?.();

    const totalSteps = 16;
    const stepTime = Math.max(30, Math.floor(durationMs / totalSteps));
    let currentStep = 0;

    const stepInterval = window.setInterval(() => {
      currentStep += 1;
      scrambleTick += 1;
      const progress = currentStep / totalSteps;
      displayString = computeScrambleFrame(text, progress, scrambleTick);

      if (currentStep >= totalSteps) {
        window.clearInterval(stepInterval);
        displayString = text;
        isScrambling = false;
      }
    }, stepTime);
  }

  onMount(() => {
    // Initial subtle scramble shortly after mount
    const initialTimeout = window.setTimeout(() => {
      triggerScramble();
    }, 900);

    const periodicTimer = window.setInterval(() => {
      triggerScramble();
    }, intervalMs);

    return () => {
      window.clearTimeout(initialTimeout);
      window.clearInterval(periodicTimer);
    };
  });
</script>

<button
  type="button"
  onclick={triggerScramble}
  onmouseenter={triggerScramble}
  aria-label={text}
  data-testid="freedom-scramble-branding"
  data-scrambling={isScrambling ? 'true' : 'false'}
  class="inline-flex items-center justify-center min-h-11 font-mono-geo tracking-[0.38em] uppercase transition-colors cursor-pointer bg-transparent border-0 px-1 py-2 text-inherit hover:text-[var(--accent-champagne)] focus-visible:outline-1 focus-visible:outline-[var(--accent-champagne)] {className}"
>
  <span aria-hidden="true" class="tabular-nums select-none">{displayString}</span>
  <span class="sr-only">{text}</span>
</button>
