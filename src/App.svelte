<script lang="ts">
  import { onMount } from 'svelte';
  import ReleasePage from './routes/+page.svelte';
  import BrandPage from './routes/brand/+page.svelte';
  import { resolveRouteView, type RouteView } from './domain/lirisDropData';

  let theme = $state<'carbon' | 'paper'>('carbon');
  let routeView = $state<RouteView>(
    typeof window !== 'undefined'
      ? resolveRouteView(window.location.pathname, window.location.hash, window.location.search)
      : 'release',
  );

  function syncThemeDOM(nextTheme: 'carbon' | 'paper') {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', nextTheme);
      document.body.setAttribute('data-theme', nextTheme);
    }
  }

  function toggleTheme() {
    theme = theme === 'carbon' ? 'paper' : 'carbon';
    syncThemeDOM(theme);
  }

  function syncRoute() {
    if (typeof window === 'undefined') return;
    routeView = resolveRouteView(window.location.pathname, window.location.hash, window.location.search);
  }

  function navigateToRelease() {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      syncRoute();
    }
  }

  onMount(() => {
    syncThemeDOM(theme);
    syncRoute();
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  });
</script>

{#if routeView === 'brand'}
  <BrandPage {theme} onToggleTheme={toggleTheme} onNavigateRelease={navigateToRelease} />
{:else}
  <ReleasePage {theme} onToggleTheme={toggleTheme} />
{/if}
