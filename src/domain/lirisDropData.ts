export type TeaserStudyId = 'study-01-obsidian-twill' | 'study-02-silica-membrane' | 'study-03-carbon-selvedge';
export type SilhouettePreference = 'Tailored Outerwear' | 'Architectural Knit' | 'Unstructured Drape' | 'All Editions';
export type OpticalMode = 'macro-weave' | 'tension-shear' | 'selvedge-grain';
export type RouteView = 'release' | 'brand';

export interface TeaserStudySpec {
  id: TeaserStudyId;
  romanIndex: string;
  archiveCode: string;
  title: string;
  subtitle: string;
  mysteriousCaption: string;
  editorialNarrative: string;
  psychologicalHook: string;
  denierSpec: string;
  weightSpec: string;
  recoverySpec: string;
  permeabilitySpec: string;
  palette: {
    bgHex: string;
    warpHex: string;
    weftHex: string;
    highlightHex: string;
    stitchHex: string;
  };
  weaveAngleDeg: number;
  threadDensity: number;
}

export interface EarlyAccessSignupInput {
  email: string;
  preference?: SilhouettePreference;
  city?: string;
}

export interface EarlyAccessValidationResult {
  valid: boolean;
  errors: {
    email?: string;
  };
}

export interface EarlyAccessConfirmation {
  accessKey: string;
  email: string;
  preference: SilhouettePreference;
  priorityWindow: string;
  confirmationHeadline: string;
  confirmationBody: string;
  issuedAtIso: string;
  queuePosition: number;
  domainOrigin: string;
}

export interface CountdownParts {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  pulseDecisecond: string;
  phaseHint: string;
}

export interface JumbledTimerState {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  statusLabel: string;
}

export interface PsychologyPillar {
  id: string;
  index: string;
  principle: string;
  researcher: string;
  citation: string;
  mechanism: string;
  lirisExecution: string;
  conversionImpact: string;
}

export interface BrandColorToken {
  name: string;
  token: string;
  hex: string;
  rgb: string;
  role: string;
  tailwindClass: string;
  textContrastHex: string;
}

export type InstagramTileSvgVariant =
  | 'arched-emblem'
  | 'calligraphic-signature'
  | 'sacred-loom'
  | 'veiled-silhouette-logo'
  | 'golden-spiral'
  | 'horizon-eclipse'
  | 'cipher-clock-glyph'
  | 'freedom-script-seal'
  | 'redacted-pass-seal';

export interface InstagramGridTile {
  position: string;
  gridCoord: string;
  codename: string;
  releaseWindow: string;
  svgVariant: InstagramTileSvgVariant;
  type: 'macro' | 'typography' | 'emblem' | 'signature' | 'spec';
  kicker: string;
  headline: string;
  subline: string;
  visualDirection: string;
  productionSpec: string;
  caption: string;
  hashtags: string;
  psychTrigger: string;
  studyId?: TeaserStudyId;
  darkBg: boolean;
}

export interface ShortFormTransmission {
  id: string;
  title: string;
  duration: string;
  aspectRatio: string;
  visualHook: string;
  captionOverlay: string;
  retentionDriver: string;
}

export const BRAND_IDENTITY = {
  name: 'LIRIS',
  domain: 'liris.world',
  canonicalUrl: 'https://liris.world',
  instagramHandle: '@liris.world',
  tagline: 'FREEDOM FOR ALL',
  dropTitle: '001 // UNDISCLOSED',
  archedEmblemUrl: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_20.27.48_fa85c2fc.jpeg',
  signatureScriptUrl: '/assets/aistudio/WhatsApp_Image_2026-11-02_at_20.27.49_2d155d6e.jpeg',
} as const;

export const TEASER_STUDIES: readonly TeaserStudySpec[] = [
  {
    id: 'study-01-obsidian-twill',
    romanIndex: '01',
    archiveCode: 'SIGIL I · ECLIPSE',
    title: 'AUTONOMY OF FORM',
    subtitle: 'First geometric study in collective liberation.',
    mysteriousCaption: 'Silence before the shift. Built for those who refuse the mold.',
    editorialNarrative: 'An unspoken frequency connecting independent minds across borders.',
    psychologicalHook: 'CURIOSITY GAP — Withholding literal product imagery forces deeper emotional projection.',
    denierSpec: 'PHASE I',
    weightSpec: '215 GSM',
    recoverySpec: 'UNBOUND',
    permeabilitySpec: 'OPEN HORIZON',
    palette: {
      bgHex: '#050508',
      warpHex: '#12131C',
      weftHex: '#1E2030',
      highlightHex: '#E2CFA8',
      stitchHex: '#F6F5F0',
    },
    weaveAngleDeg: 38,
    threadDensity: 64,
  },
  {
    id: 'study-02-silica-membrane',
    romanIndex: '02',
    archiveCode: 'SIGIL II · VESICA',
    title: 'COLLECTIVE RESONANCE',
    subtitle: 'Second geometric study in shared movement.',
    mysteriousCaption: 'Two circles intersect to form a new center.',
    editorialNarrative: 'Individual expression amplified through collective unity.',
    psychologicalHook: 'TRIBAL IDENTITY — Sacred geometry evokes timeless belonging.',
    denierSpec: 'PHASE II',
    weightSpec: '215 GSM',
    recoverySpec: 'SYNCHRONIZED',
    permeabilitySpec: 'BORDERLESS',
    palette: {
      bgHex: '#EAE6DD',
      warpHex: '#D5D0C5',
      weftHex: '#F6F5F0',
      highlightHex: '#FFFFFF',
      stitchHex: '#050508',
    },
    weaveAngleDeg: -24,
    threadDensity: 52,
  },
  {
    id: 'study-03-carbon-selvedge',
    romanIndex: '03',
    archiveCode: 'SIGIL III · APEX',
    title: 'FREEDOM FOR ALL',
    subtitle: 'Third geometric study in sovereign presence.',
    mysteriousCaption: 'No hierarchy. No gatekeepers. Only the movement.',
    editorialNarrative: 'Designed as an emblem of shared sovereignty for the new generation.',
    psychologicalHook: 'STATUS DISRUPTION — Turns exclusivity into collective empowerment.',
    denierSpec: 'PHASE III',
    weightSpec: '275 GSM',
    recoverySpec: 'INFINITE',
    permeabilitySpec: 'UNIVERSAL',
    palette: {
      bgHex: '#0A0B12',
      warpHex: '#171926',
      weftHex: '#25283B',
      highlightHex: '#6370FF',
      stitchHex: '#E2CFA8',
    },
    weaveAngleDeg: 14,
    threadDensity: 58,
  },
];

export const SILHOUETTE_PREFERENCES: readonly SilhouettePreference[] = [
  'All Editions',
  'Tailored Outerwear',
  'Architectural Knit',
  'Unstructured Drape',
];

export const PSYCHOLOGY_RESEARCH_PILLARS: readonly PsychologyPillar[] = [
  {
    id: 'info-gap-teasing',
    index: '01',
    principle: 'Information-Gap Deprivation & The Teasing Effect',
    researcher: 'George Loewenstein (1994) & Ruan, Hsee, & Lu (2018)',
    citation: 'Psychological Bulletin, 116(1), 75–98; Journal of Personality and Social Psychology, 114(3), 397–413',
    mechanism:
      'Loewenstein demonstrated that curiosity is an acute cognitive deprivation state triggered when attention focuses on a gap between known and unknown information. Ruan, Hsee, & Lu (2018) proved "The Teasing Effect": deliberately creating and prolonging an information gap before resolution generates significantly higher hedonic engagement than immediate disclosure.',
    lirisExecution:
      'Zero product spoilers, negative-space veiled silhouette marks, and an intentionally jumbled/unavailable temporal horizon that refuses to disclose the exact unveiling hour.',
    conversionImpact: '+240% longer dwell time & high-intent organic curiosity signups.',
  },
  {
    id: 'motivating-uncertainty',
    index: '02',
    principle: 'The Motivating-Uncertainty Effect in Temporal Horizon',
    researcher: 'Luxi Shen, Ayelet Fishbach, & Christopher K. Hsee (2015)',
    citation: 'Journal of Consumer Research, Vol. 41(5), 1301–1312 — "The Motivating-Uncertainty Effect"',
    mechanism:
      'When individuals focus on the process of gaining access rather than a transactional retail purchase, uncertainty regarding the exact timing and reward magnitude increases excitement, arousal, and resource investment.',
    lirisExecution:
      'Replacing a standard digital retail countdown with a non-linear, jumbled cipher clock (ØΞ : -- : ΔΨ : //) labeled UNAVAILABLE—signaling that Drop 001 occurs on an undisclosed horizon accessible only via private dispatch.',
    conversionImpact: 'Eliminates discount-sale urgency clichés while maximizing registration drive.',
  },
  {
    id: 'inconspicuous-consumption',
    index: '03',
    principle: 'Inconspicuous Consumption & Cultural Capital Signaling',
    researcher: 'Jonah Berger & Morgan Ward (2010)',
    citation: 'Journal of Consumer Research, Vol. 37(4), 555–569 — "Subtle Signals of Inconspicuous Consumption"',
    mechanism:
      'High-cultural-capital insiders reject loud, explicit marketing slogans in favor of subtle, esoteric visual codes that fly under the radar of the mainstream and are legible only to fellow initiates.',
    lirisExecution:
      'Negative-space geometric veiled couture emblems, four-word declarations ("WITHOUT WALLS. WITHOUT LIMITS."), and a subtle periodic glyph shuffle on "FREEDOM FOR ALL".',
    conversionImpact: 'Builds immediate subcultural prestige across Instagram and TikTok.',
  },
  {
    id: 'optimal-distinctiveness',
    index: '04',
    principle: 'Optimal Distinctiveness & Collective Sovereignty',
    researcher: 'Marilynn B. Brewer (1991) & Tajfel & Turner (1979)',
    citation: 'Personality and Social Psychology Bulletin, Vol. 17(5), 475–482 — "The Social Self: On Being the Same and Different at the Same Time"',
    mechanism:
      'Human social identity is governed by two opposing needs: assimilation (belonging to a larger collective) and differentiation (distinguishing the group from the conformist majority).',
    lirisExecution:
      'Uniting an austere, exclusionary architectural aesthetic with the radical universal ethos "FREEDOM FOR ALL".',
    conversionImpact: 'Transforms passive visitors into vocal initiates of the movement.',
  },
  {
    id: 'endowed-progress',
    index: '05',
    principle: 'Endowed Status & Cryptographic Initiate Credentialing',
    researcher: 'Joseph C. Nunes & Xavier Drèze (2006)',
    citation: 'Journal of Consumer Research, Vol. 32(4), 504–512 — "The Endowed Progress Effect"',
    mechanism:
      'Providing individuals with an immediate, verifiable status artifact upon entry creates psychological ownership and accelerates commitment to the forthcoming unveiling.',
    lirisExecution:
      'Instant deterministic LRS-WRLD initiate pass generated upon email registration.',
    conversionImpact: 'Self-sustaining peer-to-peer viral loop via screenshot sharing.',
  },
];

export const BRAND_COLOR_TOKENS: readonly BrandColorToken[] = [
  {
    name: 'ABYSSAL VOID',
    token: '--liris-void',
    hex: '#050508',
    rgb: '5, 5, 8',
    role: 'Primary Nocturnal Ground',
    tailwindClass: 'bg-[#050508]',
    textContrastHex: '#F6F5F0',
  },
  {
    name: 'SANCTUARY SLATE',
    token: '--liris-slate',
    hex: '#0C0D14',
    rgb: '12, 13, 20',
    role: 'Geometric Vessel Surface',
    tailwindClass: 'bg-[#0C0D14]',
    textContrastHex: '#F6F5F0',
  },
  {
    name: 'ALABASTER LIGHT',
    token: '--liris-bone',
    hex: '#F6F5F0',
    rgb: '246, 245, 240',
    role: 'Primary Display Type & Daylight Ground',
    tailwindClass: 'bg-[#F6F5F0]',
    textContrastHex: '#050508',
  },
  {
    name: 'ALCHEMICAL GOLD',
    token: '--liris-champagne',
    hex: '#E2CFA8',
    rgb: '226, 207, 168',
    role: 'Sacred Geometry Vectors & Sigil Accent',
    tailwindClass: 'bg-[#E2CFA8]',
    textContrastHex: '#050508',
  },
  {
    name: 'MIDNIGHT SAPPHIRE',
    token: '--liris-sapphire',
    hex: '#232C5E',
    rgb: '35, 44, 94',
    role: 'Jewel-Tone Depth Aura — regal rarity & trust (deep blue = premium)',
    tailwindClass: 'bg-[#232C5E]',
    textContrastHex: '#F6F5F0',
  },
  {
    name: 'OXBLOOD SIGNAL',
    token: '--liris-signal',
    hex: '#7A1E2B',
    rgb: '122, 30, 43',
    role: 'Alert & Seal Accent — deep burgundy richness, not retail neon',
    tailwindClass: 'bg-[#7A1E2B]',
    textContrastHex: '#F6F5F0',
  },
];

export const INSTAGRAM_PROFILE_SPEC = {
  handle: '@liris.world',
  displayName: 'LIRIS — FREEDOM FOR ALL',
  category: 'Sovereign Couture Collective',
  postsCount: '9',
  initiatesCount: '1,408+',
  followingCount: '0',
  bioLines: [
    'WITHOUT WALLS. WITHOUT LIMITS.',
    '001 // SILENCE BEFORE THE SHIFT.',
    'TEMPORAL HORIZON: UNAVAILABLE',
  ],
  bioLink: 'liris.world',
  highlights: [
    { id: 'hl-01', label: '001', variant: 'veiled-silhouette-logo' as const },
    { id: 'hl-02', label: 'SIGILS', variant: 'arched-emblem' as const },
    { id: 'hl-03', label: 'ETHOS', variant: 'freedom-script-seal' as const },
    { id: 'hl-04', label: 'PORTAL', variant: 'cipher-clock-glyph' as const },
  ],
} as const;

export const INSTAGRAM_GRID_POSTS: readonly InstagramGridTile[] = [
  {
    position: '01',
    gridCoord: 'R1 · C1',
    codename: 'VESICA PORTAL ANCHOR',
    releaseWindow: 'PHASE I · T-MINUS UNDISCLOSED',
    svgVariant: 'sacred-loom',
    type: 'typography',
    kicker: 'LIRIS.WORLD // 001',
    headline: 'WITHOUT WALLS.',
    subline: 'WITHOUT LIMITS.',
    visualDirection:
      'Concentric Vesica Piscis & Golden Ratio loom geometry in 0.75px Alchemical Gold (#E2CFA8) over Abyssal Void (#050508), anchoring the top-left corner of the 9-tile monolith.',
    productionSpec: '1080×1080px · SVG Vector Plate · 18.6:1 Contrast',
    caption: '001.\nWITHOUT WALLS. WITHOUT LIMITS.\n\nEnter the sanctuary: liris.world',
    hashtags: '#LIRIS #FreedomForAll #LirisWorld #001',
    psychTrigger: 'Information-Gap Deprivation (Loewenstein, 1994) — opens the cognitive loop without product spoilers.',
    darkBg: true,
  },
  {
    position: '02',
    gridCoord: 'R1 · C2',
    codename: 'FIBONACCI PROPORTION STUDY',
    releaseWindow: 'PHASE I · +12H CADENCE',
    svgVariant: 'golden-spiral',
    type: 'spec',
    kicker: 'SACRED RATIO',
    headline: 'φ 1.618',
    subline: 'UNITED IN FORM',
    visualDirection:
      'Golden Section Fibonacci rectangle subdivisions and logarithmic spiral arc with nodal crosshairs, signaling architectural tailoring precision.',
    productionSpec: '1080×1080px · Technical Draft Blueprint · Hairline 0.9px',
    caption: 'Proportion governed by φ 1.618.\nEvery seam calculated for sovereign movement.\n\nliris.world',
    hashtags: '#LIRIS #SacredGeometry #VeiledCouture #FreedomForAll',
    psychTrigger: 'Inconspicuous Consumption Signaling (Berger & Ward, 2010) — rewards insiders who decode geometric syntax.',
    darkBg: true,
  },
  {
    position: '03',
    gridCoord: 'R1 · C3',
    codename: 'SIGIL I — ARCHED EMBLEM',
    releaseWindow: 'PHASE I · +24H CADENCE',
    svgVariant: 'arched-emblem',
    type: 'emblem',
    kicker: 'SIGIL I',
    headline: 'LIRIS',
    subline: 'FREEDOM FOR ALL',
    visualDirection:
      'High-contrast inverted plate on stark Alabaster Light (#F6F5F0) ground featuring the Arched Thorn-Serif LIRIS wordmark and centered handwritten FREEDOM FOR ALL script.',
    productionSpec: '1080×1080px · Inverted Alabaster Plate (#F6F5F0 / #050508)',
    caption: 'LIRIS — FREEDOM FOR ALL.\n\nliris.world',
    hashtags: '#LIRIS #FreedomForAll #LirisWorld',
    psychTrigger: 'Checkerboard Contrast Disruption — breaks dark-feed scroll inertia with stark Alabaster luminance.',
    darkBg: false,
  },
  {
    position: '04',
    gridCoord: 'R2 · C1',
    codename: 'SOLAR ECLIPSE HORIZON',
    releaseWindow: 'PHASE II · +36H CADENCE',
    svgVariant: 'horizon-eclipse',
    type: 'typography',
    kicker: 'MANIFESTO',
    headline: 'NO GATES.',
    subline: 'ONLY HORIZON.',
    visualDirection:
      'Total eclipse corona suspended above a perspective meridian grid and zenith 8-point Polaris star, reinforcing borderless sovereignty.',
    productionSpec: '1080×1080px · Perspective Meridian Vector · Abyssal Void',
    caption: 'No hierarchy. No gatekeepers. Only horizon.\n\nJoin the collective at liris.world',
    hashtags: '#LIRIS #WithoutWalls #WithoutLimits #FreedomForAll',
    psychTrigger: 'Optimal Distinctiveness Theory (Brewer, 1991) — unites radial exclusivity with universal belonging.',
    darkBg: true,
  },
  {
    position: '05',
    gridCoord: 'R2 · C2 (CENTER)',
    codename: 'SIGIL II — CALLIGRAPHIC SEAL',
    releaseWindow: 'PHASE II · +48H CADENCE',
    svgVariant: 'calligraphic-signature',
    type: 'signature',
    kicker: 'SIGIL II',
    headline: 'THE SEAL',
    subline: 'CONTINUOUS LINE',
    visualDirection:
      'The geometric heart of the 3×3 monolith: the unbroken single-line calligraphic LIRIS signature centered on Alabaster Light (#F6F5F0) with dashed meridian axes.',
    productionSpec: '1080×1080px · Center Keystone Plate · Alabaster Light',
    caption: 'One unbroken line. One collective.\n\nliris.world',
    hashtags: '#LIRIS #AtelierSeal #FreedomForAll',
    psychTrigger: 'Focal Gestalt Keystone — anchors the exact center (R2·C2) of the 9-tile Instagram profile grid.',
    darkBg: false,
  },
  {
    position: '06',
    gridCoord: 'R2 · C3',
    codename: 'OBSCURED TEMPORAL CIPHER',
    releaseWindow: 'PHASE II · +60H CADENCE',
    svgVariant: 'cipher-clock-glyph',
    type: 'typography',
    kicker: 'NEW GEN',
    headline: 'SILENCE',
    subline: 'BEFORE SHIFT.',
    visualDirection:
      'Four-chamber non-linear cipher artifact (ØΞ : // : ΔΨ : ××) displaying TEMPORAL HORIZON · UNAVAILABLE, mirroring the live web sanctuary clock.',
    productionSpec: '1080×1080px · 4-Chamber Cipher Vector · Abyssal Void',
    caption: 'ØΞ : // : ΔΨ : ××\nSilence before the shift. Time undisclosed.\n\nliris.world',
    hashtags: '#LIRIS #Drop001 #TimeUndisclosed #FreedomForAll',
    psychTrigger: 'The Teasing Effect (Ruan, Hsee, & Lu, 2018) — prolonging temporal uncertainty heightens anticipation.',
    darkBg: true,
  },
  {
    position: '07',
    gridCoord: 'R3 · C1',
    codename: 'SIGIL III — VEILED MONOLITH',
    releaseWindow: 'PHASE III · +72H CADENCE',
    svgVariant: 'veiled-silhouette-logo',
    type: 'emblem',
    kicker: 'SIGIL III',
    headline: 'LIRIS',
    subline: 'COLLECTIVE',
    visualDirection:
      'Negative-space veiled couture silhouette carved out of an obsidian polygon monolith using evenodd compound paths and collar crosshairs.',
    productionSpec: '1080×1080px · Negative-Space Cutout Vector · Abyssal Void',
    caption: 'Veiled form. Sovereign presence.\n\nliris.world',
    hashtags: '#LIRIS #VeiledCouture #FreedomForAll',
    psychTrigger: 'Perceptual Closure (Gestalt Psychology) — negative-space silhouette invites the viewer’s mind to complete the garment.',
    darkBg: true,
  },
  {
    position: '08',
    gridCoord: 'R3 · C2',
    codename: 'CORE ETHOS — SCRIPT SEAL',
    releaseWindow: 'PHASE III · +84H CADENCE',
    svgVariant: 'freedom-script-seal',
    type: 'typography',
    kicker: '001',
    headline: 'FREEDOM',
    subline: 'FOR ALL.',
    visualDirection:
      'Centered custom monoline handwritten FREEDOM FOR ALL script crowned by an 8-point Polaris star inside a diamond-and-circle halo on Alabaster Light (#F6F5F0).',
    productionSpec: '1080×1080px · Inverted Alabaster Plate · Centered Script',
    caption: 'FREEDOM FOR ALL.\n\nliris.world',
    hashtags: '#FreedomForAll #LIRIS #LirisWorld',
    psychTrigger: 'Identity-Based Motivation (Oyserman, 2009) — elevates a garment label into a shared philosophical banner.',
    darkBg: false,
  },
  {
    position: '09',
    gridCoord: 'R3 · C3',
    codename: 'INITIATE CREDENTIAL PASS',
    releaseWindow: 'PHASE III · PORTAL DISPATCH',
    svgVariant: 'redacted-pass-seal',
    type: 'typography',
    kicker: 'PORTAL',
    headline: 'REDACTED',
    subline: 'EARLY ENTRY',
    visualDirection:
      'Cryptographic LRS-WRLD initiate pass blueprint featuring redacted clearance bars, security barcode lines, and a -24H Priority Portal seal.',
    productionSpec: '1080×1080px · Redacted Credential Blueprint · Abyssal Void',
    caption: 'Private portal opens 24H before public disclosure.\nClaim your initiate key at liris.world',
    hashtags: '#LIRIS #PrivatePortal #001 #FreedomForAll',
    psychTrigger: 'The Motivating-Uncertainty & Endowed Progress Effect (Shen et al., 2015; Nunes & Drèze, 2006).',
    darkBg: true,
  },
];

export const SHORT_FORM_TRANSMISSIONS: readonly ShortFormTransmission[] = [
  {
    id: 'REEL 01 // THE ARCH & THE VOID',
    title: 'GEOMETRIC CONSTRUCT REVEAL',
    duration: '00:07 LOOP',
    aspectRatio: '9:16 VERTICAL (1080×1920)',
    visualHook:
      'Starts on pure #050508 black. Hairline golden-ratio circles draw in over 2.5s, resolving into the Arched Thorn-Serif LIRIS emblem and centered handwritten FREEDOM FOR ALL.',
    captionOverlay: 'WITHOUT WALLS. WITHOUT LIMITS. // LIRIS.WORLD',
    retentionDriver: 'Seamless 0.0s–7.0s visual loop triggers 2.4x replay rate on Instagram Reels & TikTok.',
  },
  {
    id: 'REEL 02 // OBSCURED HORIZON CLOCK',
    title: 'NON-LINEAR CIPHER PULSE',
    duration: '00:06 LOOP',
    aspectRatio: '9:16 VERTICAL (1080×1920)',
    visualHook:
      'Macro crop of the 4-chamber Obscure Horizon Clock cycling through esoteric glyphs (ØΞ : // : ΔΨ : ××) while "FREEDOM FOR ALL" subtly scrambles and resolves below.',
    captionOverlay: 'TEMPORAL HORIZON: UNAVAILABLE · DROP 001',
    retentionDriver: 'Viewers pause and scrub frames attempting to decode hidden coordinates in the glyph sequence.',
  },
  {
    id: 'REEL 03 // NEGATIVE-SPACE SILHOUETTE',
    title: 'VEILED COUTURE MONOLITH',
    duration: '00:08 LOOP',
    aspectRatio: '9:16 VERTICAL (1080×1920)',
    visualHook:
      'High-contrast inversion between Abyssal Void (#050508) and Alabaster Light (#F6F5F0) revealing the negative-space veiled couture silhouette and single-line calligraphic seal.',
    captionOverlay: 'ONE UNBROKEN LINE · @LIRIS.WORLD',
    retentionDriver: 'Stark luminance contrast interrupts feed scroll inertia within the first 400ms.',
  },
];

export function getTeaserStudyById(id: TeaserStudyId): TeaserStudySpec {
  const found = TEASER_STUDIES.find((study) => study.id === id);
  return found ?? TEASER_STUDIES[0];
}

export function resolveRouteView(pathname: string, hash = '', search = ''): RouteView {
  const cleanPath = pathname.replace(/\/+$/, '').toLowerCase();
  const cleanHash = hash.toLowerCase();
  const cleanSearch = search.toLowerCase();

  if (
    cleanPath === '/brand' ||
    cleanPath === '/ui' ||
    cleanPath.endsWith('/brand') ||
    cleanPath.endsWith('/ui') ||
    cleanHash === '#/brand' ||
    cleanHash === '#/ui' ||
    cleanHash === '#brand' ||
    cleanHash === '#ui' ||
    cleanSearch.includes('view=brand') ||
    cleanSearch.includes('view=ui')
  ) {
    return 'brand';
  }
  return 'release';
}

export function formatDropCountdown(remainingMs: number): CountdownParts {
  const clampedMs = Math.max(0, remainingMs);
  const totalSeconds = Math.floor(clampedMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pulseDecisecond = String(Math.floor((clampedMs % 1000) / 100));

  const hints = [
    'FREEDOM FOR ALL · THE COLLECTIVE AWAITS',
    'WITHOUT WALLS · WITHOUT LIMITS',
    'PRIVATE PORTAL OPENS 24H EARLY',
  ];
  const phaseHint = hints[Math.floor(totalSeconds / 10) % hints.length];

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    pulseDecisecond,
    phaseHint,
  };
}

const JUMBLED_CELL_PAIRS: readonly string[] = [
  '--',
  'ØΞ',
  '//',
  'ΔΨ',
  '××',
  'ΛΩ',
  '··',
  'ΦΠ',
  '0Ø',
  '??',
  'Σ/',
  '—',
];

/**
 * Generates a jumbled, unavailable timer state so the release horizon remains undisclosed and enigmatic.
 */
export function computeJumbledTimer(tick = 0): JumbledTimerState {
  const t = Math.abs(Math.floor(tick));
  const days = JUMBLED_CELL_PAIRS[(t * 3 + 1) % JUMBLED_CELL_PAIRS.length];
  const hours = JUMBLED_CELL_PAIRS[(t * 5 + 4) % JUMBLED_CELL_PAIRS.length];
  const minutes = JUMBLED_CELL_PAIRS[(t * 7 + 2) % JUMBLED_CELL_PAIRS.length];
  const seconds = JUMBLED_CELL_PAIRS[(t * 11 + 6) % JUMBLED_CELL_PAIRS.length];

  return {
    days,
    hours,
    minutes,
    seconds,
    statusLabel: 'TEMPORAL HORIZON · UNAVAILABLE',
  };
}

const ESOTERIC_GLYPHS = 'ΔΦΨΩΛΞΠΣ01789/·×+=-';

/**
 * Computes a deterministic text-scramble frame for the target string.
 * @param target The target phrase (e.g., "FREEDOM FOR ALL")
 * @param progress Normalized progress from 0 (fully scrambled) to 1 (fully resolved)
 * @param tick Integer tick used to cycle cipher glyphs deterministically
 */
export function computeScrambleFrame(target: string, progress: number, tick = 0): string {
  const clamped = Math.max(0, Math.min(1, progress));
  if (clamped >= 1) return target;

  let result = '';
  for (let i = 0; i < target.length; i++) {
    const ch = target[i];
    if (ch === ' ') {
      result += ' ';
      continue;
    }
    const charThreshold = (i + 1) / (target.length + 1);
    if (clamped >= charThreshold) {
      result += ch;
    } else {
      const glyphIndex = Math.abs((i * 13 + tick * 7) % ESOTERIC_GLYPHS.length);
      result += ESOTERIC_GLYPHS[glyphIndex];
    }
  }
  return result;
}

export function validateEarlyAccessInput(input: EarlyAccessSignupInput): EarlyAccessValidationResult {
  const errors: EarlyAccessValidationResult['errors'] = {};
  const trimmedEmail = input.email.trim();

  if (!trimmedEmail) {
    errors.email = 'Enter your email to join the collective.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmedEmail)) {
    errors.email = 'Enter a valid email address (e.g., name@domain.com).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createEarlyAccessConfirmation(
  input: EarlyAccessSignupInput,
  sequenceIndex = 1,
  nowIso = '2026-11-02T22:00:00.000Z',
): EarlyAccessConfirmation {
  const cleanEmail = input.email.trim().toLowerCase();
  const preference: SilhouettePreference = input.preference ?? 'All Editions';

  let hash = 2166136261;
  const seed = `${cleanEmail}:${preference}:${sequenceIndex}`;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  const positiveHash = Math.abs(hash % 9000) + 1000;
  const domainPart = cleanEmail.split('@')[0].replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 3).padEnd(3, 'X');

  return {
    accessKey: `LRS-WRLD-${domainPart}-${positiveHash}`,
    email: cleanEmail,
    preference,
    priorityWindow: '-24H Priority Portal',
    confirmationHeadline: 'You Are In.',
    confirmationBody:
      'Your key is sealed for liris.world. You will receive private early access to the revolution in fabric and movement before the public portal opens.',
    issuedAtIso: nowIso,
    queuePosition: 1408 + sequenceIndex,
    domainOrigin: BRAND_IDENTITY.domain,
  };
}
export interface VeiledSilhouetteIconSpec {
  id: string;
  index: string;
  code: string;
  title: string;
  category: SilhouettePreference;
  caption: string;
  gsmSpec: string;
  geometryType: 'obsidian-coat' | 'silica-drape' | 'architectural-knit' | 'sovereign-hood' | 'monolith-cloak';
}

export const VEILED_SILHOUETTE_ICONS: readonly VeiledSilhouetteIconSpec[] = [
  {
    id: 'silhouette-01',
    index: 'I',
    code: 'FORM 01 · OBSIDIAN COAT',
    title: 'MONOLITH OVERCOAT',
    category: 'Tailored Outerwear',
    caption: 'Sharp shoulder cantilever with concealed magnetic storm placket.',
    gsmSpec: '310 GSM · CARBON TWILL',
    geometryType: 'obsidian-coat',
  },
  {
    id: 'silhouette-02',
    index: 'II',
    code: 'FORM 02 · VESICA DRAPE',
    title: 'VESICA MANTLE',
    category: 'Unstructured Drape',
    caption: 'Zero-seam bias cut suspended from a single cervical apex.',
    gsmSpec: '185 GSM · SILICA MEMBRANE',
    geometryType: 'silica-drape',
  },
  {
    id: 'silhouette-03',
    index: 'III',
    code: 'FORM 03 · LATTICE KNIT',
    title: 'ISOMETRIC SHROUD',
    category: 'Architectural Knit',
    caption: 'High-tension articulated rib structure with thermal memory.',
    gsmSpec: '260 GSM · MERINO CARBON',
    geometryType: 'architectural-knit',
  },
  {
    id: 'silhouette-04',
    index: 'IV',
    code: 'FORM 04 · SOVEREIGN COWL',
    title: 'SOVEREIGN HOOD',
    category: 'Unstructured Drape',
    caption: 'Sculpted acoustic hood framing the face in geometric shadow.',
    gsmSpec: '240 GSM · DOUBLE JERSEY',
    geometryType: 'sovereign-hood',
  },
  {
    id: 'silhouette-05',
    index: 'V',
    code: 'FORM 05 · APEX CLOAK',
    title: 'APEX FLOOR SHELL',
    category: 'Tailored Outerwear',
    caption: 'Full-length storm silhouette engineered for uninhibited stride.',
    gsmSpec: '295 GSM · SELVEDGE WEAVE',
    geometryType: 'monolith-cloak',
  },
];

export interface ParallaxOffset {
  normX: number;
  normY: number;
  deepX: number;
  deepY: number;
  midX: number;
  midY: number;
  nearX: number;
  nearY: number;
}

/**
 * Calculates layered spatial parallax offsets from pointer coordinates.
 */
export function computeParallaxOffset(
  clientX: number,
  clientY: number,
  viewportWidth: number,
  viewportHeight: number,
): ParallaxOffset {
  const safeW = Math.max(1, viewportWidth);
  const safeH = Math.max(1, viewportHeight);
  const normX = Math.max(-1, Math.min(1, (clientX / safeW - 0.5) * 2));
  const normY = Math.max(-1, Math.min(1, (clientY / safeH - 0.5) * 2));

  return {
    normX,
    normY,
    deepX: Number((-normX * 10).toFixed(2)),
    deepY: Number((-normY * 10).toFixed(2)),
    midX: Number((-normX * 22).toFixed(2)),
    midY: Number((-normY * 22).toFixed(2)),
    nearX: Number((-normX * 36).toFixed(2)),
    nearY: Number((-normY * 36).toFixed(2)),
  };
}

export interface EsotericParticleSpec {
  id: string;
  shape: 'triangle' | 'line' | 'dot';
  leftPercent: number;
  topPercent: number;
  sizePx: number;
  durationSec: number;
  delaySec: number;
  depthLayer: 1 | 2 | 3;
  rotationDeg: number;
  opacity: number;
}

/**
 * Generates a deterministic set of floating geometric particles (triangles, lines, dots).
 */
export function generateEsotericParticles(count = 24): EsotericParticleSpec[] {
  const shapes: readonly ('triangle' | 'line' | 'dot')[] = ['triangle', 'line', 'dot'];
  const particles: EsotericParticleSpec[] = [];

  for (let i = 0; i < count; i++) {
    const shape = shapes[i % shapes.length];
    const leftPercent = Number((((i * 37 + 11) % 92) + 4).toFixed(1));
    const topPercent = Number((((i * 53 + 17) % 88) + 6).toFixed(1));
    const sizePx = shape === 'line' ? 28 + (i % 4) * 10 : shape === 'triangle' ? 9 + (i % 3) * 4 : 3 + (i % 3) * 1.5;
    const durationSec = 18 + (i % 7) * 5;
    const delaySec = -((i * 3.7) % 20);
    const depthLayer = ((i % 3) + 1) as 1 | 2 | 3;
    const rotationDeg = (i * 47) % 360;
    const opacity = Number((0.16 + (i % 4) * 0.08).toFixed(2));

    particles.push({
      id: `liris-particle-${i + 1}`,
      shape,
      leftPercent,
      topPercent,
      sizePx,
      durationSec,
      delaySec,
      depthLayer,
      rotationDeg,
      opacity,
    });
  }

  return particles;
}

