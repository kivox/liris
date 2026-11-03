<script lang="ts">
  import {
    SILHOUETTE_PREFERENCES,
    VEILED_SILHOUETTE_ICONS,
    validateEarlyAccessInput,
    createEarlyAccessConfirmation,
    type SilhouettePreference,
    type EarlyAccessConfirmation,
  } from '../domain/lirisDropData';

  interface Props {
    open: boolean;
    initialPreference?: SilhouettePreference;
    selectedSilhouetteId?: string;
    onClose: () => void;
    onConfirmed?: (confirmation: EarlyAccessConfirmation) => void;
  }

  let {
    open = $bindable(false),
    initialPreference = 'All Editions',
    selectedSilhouetteId = VEILED_SILHOUETTE_ICONS[0].id,
    onClose,
    onConfirmed,
  }: Props = $props();

  let email = $state('');
  let preference = $state<SilhouettePreference>('All Editions');
  let city = $state('');
  let emailError = $state<string | undefined>(undefined);
  let isSubmitting = $state(false);
  let confirmation = $state<EarlyAccessConfirmation | null>(null);
  let sequenceCounter = $state(1);

  $effect(() => {
    if (initialPreference) {
      preference = initialPreference;
    }
  });

  let activeSilhouette = $derived(
    VEILED_SILHOUETTE_ICONS.find((s) => s.id === selectedSilhouetteId) ?? VEILED_SILHOUETTE_ICONS[0],
  );

  function handleKeydown(event: KeyboardEvent) {
    if (open && event.key === 'Escape') {
      onClose();
    }
  }

  async function handleDrawerSubmit(event: SubmitEvent) {
    event.preventDefault();
    emailError = undefined;

    const validation = validateEarlyAccessInput({ email, preference, city });
    if (!validation.valid) {
      emailError = validation.errors.email;
      return;
    }

    isSubmitting = true;
    try {
      const response = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, preference, city }),
      });

      if (response.ok) {
        const data = (await response.json()) as {
          ok?: boolean;
          confirmation?: EarlyAccessConfirmation;
        };
        if (data.ok && data.confirmation) {
          confirmation = data.confirmation;
          sequenceCounter += 1;
          isSubmitting = false;
          onConfirmed?.(data.confirmation);
          return;
        }
      }
    } catch {
      // Fall back to deterministic client confirmation
    }

    const fallbackConfirmation = createEarlyAccessConfirmation(
      { email, preference, city },
      sequenceCounter,
      new Date().toISOString(),
    );
    confirmation = fallbackConfirmation;
    sequenceCounter += 1;
    isSubmitting = false;
    onConfirmed?.(fallbackConfirmation);
  }

  function resetDrawerForm() {
    confirmation = null;
    email = '';
    emailError = undefined;
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Backdrop Scrim -->
{#if open}
  <div
    role="presentation"
    onclick={onClose}
    class="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs transition-opacity duration-200"
    data-testid="early-access-drawer-backdrop"
  ></div>
{/if}

<!-- Slide-In Side Panel Drawer -->
<aside
  aria-label="Private Early Access Request"
  aria-hidden={!open}
  data-testid="private-early-access-drawer"
  data-open={open ? 'true' : 'false'}
  class="fixed top-0 right-0 z-50 h-dvh w-full max-w-md bg-[var(--bg-chamber)] border-l border-[var(--line-strong)] text-[var(--text-primary)] shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] {open
    ? 'translate-x-0'
    : 'translate-x-full pointer-events-none'}"
>
  <!-- Top Drawer Header -->
  <div class="p-6 sm:p-8 border-b border-[var(--line-grid)] flex items-center justify-between">
    <div>
      <span class="block font-mono-geo text-[10px] tracking-[0.32em] uppercase text-[var(--accent-champagne)]">
        LIRIS.WORLD · DROP 001
      </span>
      <h2 class="font-display-geo text-xl sm:text-2xl font-bold tracking-[0.1em] uppercase mt-1">
        Private Early Access
      </h2>
    </div>
    <button
      type="button"
      onclick={onClose}
      aria-label="Close Private Early Access panel"
      data-testid="close-early-access-drawer"
      class="pressable min-w-11 w-11 min-h-11 h-11 shrink-0 border border-[var(--line-grid)] hover:border-[var(--accent-champagne)] flex items-center justify-center font-mono-geo text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
    >
      ✕
    </button>
  </div>

  <!-- Drawer Body -->
  <div class="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
    <p class="font-sans-geo text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
      Initiates receive encrypted entry to the Drop 001 atelier <span class="text-[var(--text-primary)]">24 hours prior</span> to public unveiling. Select your veiled couture silhouette allocation below.
    </p>

    <!-- Active Veiled Silhouette Preview Card -->
    <div class="p-4 border border-[var(--line-grid)] bg-[var(--bg-void)]/80 flex items-center justify-between gap-4">
      <div>
        <span class="block font-mono-geo text-[9px] tracking-[0.26em] uppercase text-[var(--accent-champagne)]">
          SELECTED STUDY · {activeSilhouette.code}
        </span>
        <span class="block font-display-geo text-sm font-bold tracking-[0.12em] uppercase mt-0.5">
          {activeSilhouette.title}
        </span>
        <span class="block font-mono-geo text-[10px] text-[var(--text-muted)] mt-0.5">
          {activeSilhouette.gsmSpec}
        </span>
      </div>
      <span class="font-mono-geo text-xs text-[var(--accent-champagne)] border border-[var(--line-strong)] px-2.5 py-1">
        {activeSilhouette.index}
      </span>
    </div>

    {#if !confirmation}
      <form onsubmit={handleDrawerSubmit} novalidate class="space-y-5" data-testid="drawer-early-access-form">
        <!-- Email Input -->
        <div class="space-y-2">
          <label
            for="drawer-early-access-email"
            class="block font-mono-geo text-[10px] tracking-[0.28em] uppercase text-[var(--text-secondary)]"
          >
            Initiate Email Address *
          </label>
          <input
            id="drawer-early-access-email"
            type="email"
            bind:value={email}
            placeholder="atelier@liris.world"
            autocomplete="email"
            aria-invalid={Boolean(emailError)}
            data-testid="drawer-email-input"
            class="w-full min-h-11 px-4 py-3.5 bg-[var(--bg-void)] border {emailError
              ? 'border-[var(--signal-crimson)]'
              : 'border-[var(--line-strong)] focus:border-[var(--accent-champagne)]'} font-mono-geo text-xs tracking-[0.18em] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors"
          />
          {#if emailError}
            <p
              role="alert"
              data-testid="drawer-email-error"
              class="font-mono-geo text-[11px] tracking-[0.12em] text-[var(--signal-crimson)]"
            >
              {emailError}
            </p>
          {/if}
        </div>

        <!-- Silhouette Allocation Preference -->
        <div class="space-y-2">
          <span class="block font-mono-geo text-[10px] tracking-[0.28em] uppercase text-[var(--text-secondary)]">
            Silhouette Allocation Preference
          </span>
          <div class="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Silhouette Allocation Preference">
            {#each SILHOUETTE_PREFERENCES as option (option)}
              <button
                type="button"
                role="radio"
                aria-checked={preference === option}
                onclick={() => (preference = option)}
                class="pressable px-3 py-3 min-h-11 border text-left font-mono-geo text-[10px] tracking-[0.16em] uppercase transition-colors cursor-pointer truncate {preference ===
                option
                  ? 'border-[var(--accent-champagne)] bg-[var(--bg-elevated)] text-[var(--accent-champagne)] font-semibold'
                  : 'border-[var(--line-grid)] bg-[var(--bg-void)] text-[var(--text-secondary)] hover:border-[var(--line-strong)]'}"
              >
                {option}
              </button>
            {/each}
          </div>
        </div>

        <!-- Optional Atelier City Dispatch -->
        <div class="space-y-2">
          <label
            for="drawer-early-access-city"
            class="block font-mono-geo text-[10px] tracking-[0.28em] uppercase text-[var(--text-secondary)]"
          >
            City / Dispatch Node (Optional)
          </label>
          <input
            id="drawer-early-access-city"
            type="text"
            bind:value={city}
            placeholder="PARIS / TOKYO / LONDON"
            class="w-full min-h-11 px-4 py-3 bg-[var(--bg-void)] border border-[var(--line-grid)] focus:border-[var(--accent-champagne)] font-mono-geo text-xs tracking-[0.18em] uppercase text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          data-testid="drawer-submit-button"
          class="w-full py-4 px-6 bg-[var(--text-primary)] text-[var(--bg-void)] font-mono-geo text-xs tracking-[0.28em] uppercase font-semibold hover:bg-[var(--accent-champagne)] hover:text-[#050508] transition-colors cursor-pointer"
        >
          {isSubmitting ? 'SEALING KEY...' : 'REQUEST PRIVATE ACCESS →'}
        </button>
      </form>
    {:else}
      <!-- Sealed Initiate Confirmation Pass -->
      <div
        data-testid="drawer-confirmation-card"
        class="border border-[var(--accent-champagne)] bg-[var(--bg-void)] p-6 space-y-4"
      >
        <div class="flex items-center justify-between border-b border-[var(--line-grid)] pb-3">
          <span class="font-mono-geo text-[10px] tracking-[0.28em] uppercase text-[var(--accent-champagne)]">
            {confirmation.priorityWindow}
          </span>
          <span class="font-mono-geo text-[10px] tracking-[0.2em] text-[var(--text-muted)]">
            QUEUE #{confirmation.queuePosition}
          </span>
        </div>

        <div>
          <p class="font-display-geo text-lg font-bold tracking-[0.18em] uppercase text-[var(--text-primary)]">
            {confirmation.confirmationHeadline}
          </p>
          <p class="font-mono-geo text-sm tracking-[0.22em] text-[var(--accent-champagne)] mt-1">
            {confirmation.accessKey}
          </p>
        </div>

        <p class="font-sans-geo text-xs text-[var(--text-secondary)] leading-relaxed">
          {confirmation.confirmationBody}
        </p>

        <div class="pt-2 border-t border-[var(--line-grid)] flex items-center justify-between font-mono-geo text-[10px] text-[var(--text-muted)] uppercase">
          <span>EDITION: {confirmation.preference}</span>
          <button
            type="button"
            onclick={resetDrawerForm}
            class="text-[var(--accent-champagne)] hover:underline cursor-pointer"
          >
            REGISTER ANOTHER
          </button>
        </div>
      </div>
    {/if}
  </div>

  <!-- Drawer Footer -->
  <div class="p-6 sm:p-8 border-t border-[var(--line-grid)] flex items-center justify-between font-mono-geo text-[10px] tracking-[0.26em] uppercase text-[var(--text-muted)]">
    <span>FREEDOM FOR ALL</span>
    <span>LIRIS.WORLD</span>
  </div>
</aside>
