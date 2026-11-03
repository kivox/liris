import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BRAND_IDENTITY,
  TEASER_STUDIES,
  PSYCHOLOGY_RESEARCH_PILLARS,
  BRAND_COLOR_TOKENS,
  INSTAGRAM_GRID_POSTS,
  getTeaserStudyById,
  resolveRouteView,
  formatDropCountdown,
  computeJumbledTimer,
  computeScrambleFrame,
  validateEarlyAccessInput,
  createEarlyAccessConfirmation,
  VEILED_SILHOUETTE_ICONS,
  computeParallaxOffset,
  generateEsotericParticles,
} from './lirisDropData.ts';

test('BRAND_IDENTITY, TEASER_STUDIES, and Brand Kit collections are complete with academic citations', () => {
  assert.equal(BRAND_IDENTITY.domain, 'liris.world');
  assert.equal(BRAND_IDENTITY.tagline, 'FREEDOM FOR ALL');
  assert.equal(TEASER_STUDIES.length, 3);
  assert.equal(PSYCHOLOGY_RESEARCH_PILLARS.length, 5);
  assert.equal(BRAND_COLOR_TOKENS.length, 6);
  assert.equal(INSTAGRAM_GRID_POSTS.length, 9);

  for (const pillar of PSYCHOLOGY_RESEARCH_PILLARS) {
    assert.ok(pillar.citation.length > 10);
    assert.ok(pillar.researcher.length > 5);
  }

  const study2 = getTeaserStudyById('study-02-silica-membrane');
  assert.equal(study2.romanIndex, '02');
  assert.equal(study2.weightSpec, '215 GSM');
});

test('resolveRouteView hides brandkit on / and activates on /brand or /ui', () => {
  assert.equal(resolveRouteView('/', '', ''), 'release');
  assert.equal(resolveRouteView('/brand', '', ''), 'brand');
  assert.equal(resolveRouteView('/ui', '', ''), 'brand');
  assert.equal(resolveRouteView('/', '#/brand', ''), 'brand');
  assert.equal(resolveRouteView('/', '#/ui', ''), 'brand');
});

test('computeJumbledTimer returns non-numeric unavailable cipher pairs for all four chambers', () => {
  const jumbled0 = computeJumbledTimer(0);
  const jumbled1 = computeJumbledTimer(1);
  assert.ok(jumbled0.days.length >= 1);
  assert.ok(jumbled0.hours.length >= 1);
  assert.ok(jumbled0.minutes.length >= 1);
  assert.ok(jumbled0.seconds.length >= 1);
  assert.equal(jumbled0.statusLabel, 'TEMPORAL HORIZON · UNAVAILABLE');
  assert.notDeepEqual(
    [jumbled0.days, jumbled0.hours, jumbled0.minutes, jumbled0.seconds],
    [jumbled1.days, jumbled1.hours, jumbled1.minutes, jumbled1.seconds],
  );
});

test('computeScrambleFrame preserves spaces, scrambles at progress 0, and resolves to FREEDOM FOR ALL at progress 1', () => {
  const target = 'FREEDOM FOR ALL';
  const scrambled = computeScrambleFrame(target, 0, 2);
  assert.equal(scrambled.length, target.length);
  assert.notEqual(scrambled, target);
  assert.equal(scrambled[7], ' ');
  assert.equal(scrambled[11], ' ');

  const resolved = computeScrambleFrame(target, 1, 5);
  assert.equal(resolved, target);
});

test('formatDropCountdown computes zero-padded days, hours, minutes, seconds and phase hint', () => {
  const remainingMs = (11 * 86400 + 6 * 3600 + 8 * 60 + 4) * 1000 + 700;
  const parts = formatDropCountdown(remainingMs);
  assert.equal(parts.days, '11');
  assert.equal(parts.hours, '06');
  assert.equal(parts.minutes, '08');
  assert.equal(parts.seconds, '04');
  assert.equal(parts.pulseDecisecond, '7');
  assert.ok(parts.phaseHint.length > 10);
});

test('validateEarlyAccessInput rejects empty and malformed emails and accepts valid emails', () => {
  const emptyResult = validateEarlyAccessInput({ email: '   ' });
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.email);

  const invalidResult = validateEarlyAccessInput({ email: 'invalid-email@' });
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.email);

  const validResult = validateEarlyAccessInput({
    email: 'atelier@liris.world',
    preference: 'Tailored Outerwear',
  });
  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('createEarlyAccessConfirmation generates deterministic access key and hints at the revolution in fabric', () => {
  const confirmation = createEarlyAccessConfirmation(
    {
      email: 'client@liris.world',
      preference: 'Architectural Knit',
    },
    3,
    '2026-11-02T22:00:00.000Z',
  );

  assert.match(confirmation.accessKey, /^LRS-WRLD-CLI-\d{4}$/);
  assert.equal(confirmation.email, 'client@liris.world');
  assert.equal(confirmation.preference, 'Architectural Knit');
  assert.equal(confirmation.domainOrigin, 'liris.world');
  assert.ok(confirmation.confirmationBody.includes('revolution in fabric'));
});

// ---------------------------------------------------------------
// Merged from the 23:00 remix — veiled silhouettes & parallax field
// ---------------------------------------------------------------

test('VEILED_SILHOUETTE_ICONS provides 5 distinct geometric veiled couture silhouettes', () => {
  assert.equal(VEILED_SILHOUETTE_ICONS.length, 5);
  const ids = new Set(VEILED_SILHOUETTE_ICONS.map((icon) => icon.id));
  assert.equal(ids.size, 5);
});

test('computeParallaxOffset calculates bounded multi-layer spatial offsets', () => {
  const center = computeParallaxOffset(720, 450, 1440, 900);
  assert.equal(center.normX, 0);
  assert.equal(center.normY, 0);
  assert.equal(center.deepX, 0);
  assert.equal(center.nearY, 0);

  const topLeft = computeParallaxOffset(0, 0, 1440, 900);
  assert.equal(topLeft.normX, -1);
  assert.equal(topLeft.normY, -1);
  assert.equal(topLeft.deepX, 10);
  assert.equal(topLeft.midX, 22);
  assert.equal(topLeft.nearX, 36);
});

test('generateEsotericParticles produces triangles, lines, and dots with valid CSS parameters', () => {
  const particles = generateEsotericParticles(18);
  assert.equal(particles.length, 18);
  const shapes = new Set(particles.map((p) => p.shape));
  assert.ok(shapes.has('triangle'));
  assert.ok(shapes.has('line'));
  assert.ok(shapes.has('dot'));
});
