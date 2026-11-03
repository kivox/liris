<script lang="ts">
  interface Props {
    variant:
      | 'arched-emblem'
      | 'calligraphic-signature'
      | 'sacred-loom'
      | 'veiled-silhouette-logo'
      | 'golden-spiral'
      | 'horizon-eclipse'
      | 'cipher-clock-glyph'
      | 'freedom-script-seal'
      | 'redacted-pass-seal';
    className?: string;
  }

  let { variant, className = '' }: Props = $props();
</script>

{#if variant === 'veiled-silhouette-logo'}
  <!--
    LIRIS Veiled Couture Silhouette Mark
    Utilizes negative space (an inverted obsidian monolith / veiled torso & cowl aperture carved inside a faceted architectural octagon)
    and razor-sharp geometric lines to reinforce the 'veiled couture' aesthetic.
  -->
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    role="img"
    aria-label="LIRIS Veiled Couture Negative-Space Silhouette Mark"
  >
    <!-- Outer architectural construction frame & golden-ratio hairlines -->
    <polygon
      points="60,4 104,22 116,60 98,106 60,116 22,106 4,60 16,22"
      stroke="currentColor"
      stroke-width="1"
      opacity="0.28"
    />
    <line x1="60" y1="0" x2="60" y2="120" stroke="#E2CFA8" stroke-width="0.6" opacity="0.25" />
    <line x1="0" y1="60" x2="120" y2="60" stroke="#E2CFA8" stroke-width="0.6" opacity="0.25" />

    <!--
      Compound fill-rule="evenodd" path:
      Outer polygon = sharp monolithic couture cape/hooded silhouette.
      Inner negative-space cutouts = veiled face/cowl void, central spinal slit, and pleated geometric drape channels.
    -->
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="
        M 60 10
        L 94 28
        L 84 106
        L 36 106
        L 26 28
        Z

        M 60 22
        L 73 36
        L 60 56
        L 47 36
        Z

        M 57.5 60
        L 62.5 60
        L 64 102
        L 56 102
        Z

        M 36 35
        L 45 42
        L 48 98
        L 41 98
        Z

        M 84 35
        L 75 42
        L 72 98
        L 79 98
        Z
      "
      fill="currentColor"
    />

    <!-- Sharp floating gold diamond suspended inside the negative-space cowl aperture -->
    <polygon points="60,32 64,38 60,44 56,38" fill="#E2CFA8" />
  </svg>
{:else if variant === 'arched-emblem'}
  <!--
    LIRIS "SIGNAL SLASH" v2 — luxury x gen-z. Research-backed: Didone serifs (Bodoni) are the
    consistent visual signal of luxury positioning (extreme stroke contrast, hairline serifs),
    while a single bold saturated slash + inverted slogan bar carries the youth energy.
    Bodoni Moda 900 wordmark over a cobalt diagonal slash; FREEDOM FOR ALL knocked out of a
    slanted bar. currentColor-driven (adapts to carbon/paper), accents from brand tokens.
  -->
  <svg
    viewBox="0 0 720 460"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    role="img"
    aria-label="LIRIS — FREEDOM FOR ALL Signal Slash Emblem"
  >
    <!-- Single bold diagonal slash — metallic champagne gradient (gold = opulence signal;
         subtle gradient simulates light reflection on metal) -->
    <defs>
      <linearGradient id="liris-gold-slash" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#F0DFC0" />
        <stop offset="0.5" stop-color="#E2CFA8" />
        <stop offset="1" stop-color="#B08D57" />
      </linearGradient>
    </defs>
    <polygon points="548,36 664,36 172,424 56,424" fill="url(#liris-gold-slash)" opacity="0.95" />
    <polygon points="606,14 617,27 606,40 595,27" fill="#E2CFA8" />

    <!-- Luxury Didone wordmark on top of the slash -->
    <text
      x="360"
      y="272"
      text-anchor="middle"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linejoin="miter"
      stroke-miterlimit="16"
      paint-order="stroke fill"
      font-family="'Bodoni Moda', 'Playfair Display', 'Didot', serif"
      font-weight="900"
      font-size="108"
      letter-spacing="0.1em"
    >
      LIRIS
    </text>

    <!-- Inverted slogan bar, slanted -->
    <g transform="rotate(-3 360 350)">
      <rect x="110" y="318" width="500" height="58" fill="currentColor" />
      <text
        x="360"
        y="357"
        text-anchor="middle"
        font-family="'Bungee', 'Anton', sans-serif"
        font-size="26"
        letter-spacing="0.18em"
        fill="var(--bg-void, #050508)"
      >
        FREEDOM FOR ALL
      </text>
    </g>

    <!-- Drop tag: top-left clear zone (top-right is covered by the gold slash) -->
    <polygon points="52,40 60,48 52,56 44,48" fill="#E2CFA8" />
    <text
      x="72"
      y="58"
      text-anchor="start"
      font-family="'JetBrains Mono', monospace"
      font-size="27"
      font-weight="500"
      letter-spacing="0.34em"
      fill="#E2CFA8"
    >
      001 //
    </text>
  </svg>
{:else if variant === 'calligraphic-signature'}
  <!--
    LIRIS Architectural Calligraphic Seal — v3 (sharp graffiti calligraphy)
    Pure font-set wordmark: "LIRIS" in Qwitcher Grypen 700 (sharp-nib calligraphic pen),
    bolded with a crisp 2px mitered stroke, dead-center and upright.
    No background geometry — the letterforms ARE the seal.
  -->
  <svg
    viewBox="0 0 480 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    role="img"
    aria-label="LIRIS Architectural Calligraphic Seal"
  >
    <text
      x="240"
      y="196"
      text-anchor="middle"
      fill="currentColor"
      stroke="currentColor"
      stroke-width="2"
      stroke-linejoin="miter"
      stroke-miterlimit="16"
      paint-order="stroke fill"
      font-family="'Qwitcher Grypen', 'Just Another Hand', 'Sedgwick Ave Display', cursive"
      font-weight="700"
      font-size="128"
      letter-spacing="0.12em"
    >
      LIRIS
    </text>

    <!-- Angular baseline: split hairline with centered diamond -->
    <g stroke="currentColor">
      <line x1="140" y1="222" x2="228" y2="222" stroke-width="1.25" opacity="0.9" />
      <line x1="252" y1="222" x2="340" y2="222" stroke-width="1.25" opacity="0.9" />
    </g>
    <polygon points="240,215 246,222 240,229 234,222" fill="#E2CFA8" />
  </svg>
{:else if variant === 'golden-spiral'}
  <!--
    Tile 02: Mathematically Exact Fibonacci Spiral & Golden Rectangle (34 : 21)
    Fibonacci Sequence: 1, 1, 2, 3, 5, 8, 13, 21
    Scale factor s = 6px -> Square sides: 6, 6, 12, 18, 30, 48, 78, 126
    Outer Golden Rectangle: width = 34 * 6 = 204 (x: 18..222), height = 21 * 6 = 126 (y: 57..183)
    Every subdivision is a true L x L square and every arc is an exact 90-degree circular arc (|dx| = |dy| = R).
  -->
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    role="img"
    aria-label="LIRIS Golden Ratio Sacred Proportion Diagram"
  >
    <g stroke="currentColor" stroke-width="0.85" opacity="0.85">
      <!-- Outer 34:21 Golden Rectangle (204 x 126), centered at (120, 120) -->
      <rect x="18" y="57" width="204" height="126" />

      <!-- Exact Fibonacci Square Subdivisions -->
      <!-- Square 21 (126x126): x=18..144, y=57..183 -->
      <line x1="144" y1="57" x2="144" y2="183" opacity="0.6" />
      <!-- Square 13 (78x78): x=144..222, y=57..135 -->
      <line x1="144" y1="135" x2="222" y2="135" opacity="0.6" />
      <!-- Square 8 (48x48): x=174..222, y=135..183 -->
      <line x1="174" y1="135" x2="174" y2="183" opacity="0.6" />
      <!-- Square 5 (30x30): x=144..174, y=153..183 -->
      <line x1="144" y1="153" x2="174" y2="153" opacity="0.6" />
      <!-- Square 3 (18x18): x=144..162, y=135..153 -->
      <line x1="162" y1="135" x2="162" y2="153" opacity="0.6" />
      <!-- Square 2 (12x12): x=162..174, y=135..147 -->
      <line x1="162" y1="147" x2="174" y2="147" opacity="0.6" />
      <!-- Square 1a & 1b (6x6 each): x=162..174, y=147..153 split at x=168 -->
      <line x1="168" y1="147" x2="168" y2="153" opacity="0.6" />

      <!-- Subtle Golden Diagonal Construction Chords -->
      <line x1="18" y1="183" x2="222" y2="57" stroke-dasharray="2 4" opacity="0.28" />
      <line x1="144" y1="183" x2="222" y2="57" stroke-dasharray="2 4" opacity="0.28" />

      <!--
        Mathematically Exact Quarter-Circle Fibonacci Spiral
        R = 126 -> 78 -> 48 -> 30 -> 18 -> 12 -> 6 -> 6
      -->
      <path
        d="M 18 183
           A 126 126 0 0 1 144 57
           A 78 78 0 0 1 222 135
           A 48 48 0 0 1 174 183
           A 30 30 0 0 1 144 153
           A 18 18 0 0 1 162 135
           A 12 12 0 0 1 174 147
           A 6 6 0 0 1 168 153
           A 6 6 0 0 1 162 147"
        stroke="#E2CFA8"
        stroke-width="1.75"
        stroke-linecap="round"
      />

      <!-- Exact Tangent & Eye Nodes -->
      <circle cx="144" cy="57" r="2" fill="#E2CFA8" />
      <circle cx="222" cy="135" r="2" fill="#E2CFA8" />
      <circle cx="174" cy="183" r="2" fill="#E2CFA8" />
      <circle cx="144" cy="153" r="1.8" fill="#E2CFA8" />
      <circle cx="168" cy="147" r="2.2" fill="#E2CFA8" />
    </g>
  </svg>
{:else if variant === 'horizon-eclipse'}
  <!-- Tile 04: Horizon Eclipse Construct -->
  <svg
    viewBox="0 0 240 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    role="img"
    aria-label="LIRIS Horizon Eclipse Construct"
  >
    <g stroke="currentColor" stroke-width="0.85">
      <!-- Upper dome & horizon bar -->
      <path d="M 36 144 A 84 84 0 0 1 204 144" opacity="0.45" />
      <line x1="20" y1="144" x2="220" y2="144" stroke="#E2CFA8" stroke-width="1.2" />
      <!-- Eclipse disc -->
      <circle cx="120" cy="112" r="34" fill="currentColor" fill-opacity="0.08" stroke="#E2CFA8" stroke-width="1.3" />
      <circle cx="120" cy="112" r="22" stroke="currentColor" stroke-width="0.7" opacity="0.6" />
      <!-- Perspective rays below horizon -->
      <line x1="120" y1="144" x2="44" y2="198" opacity="0.35" />
      <line x1="120" y1="144" x2="82" y2="198" opacity="0.35" />
      <line x1="120" y1="144" x2="120" y2="202" opacity="0.55" />
      <line x1="120" y1="144" x2="158" y2="198" opacity="0.35" />
      <line x1="120" y1="144" x2="196" y2="198" opacity="0.35" />
      <polygon points="120,66 124,72 120,78 116,72" fill="#E2CFA8" />
    </g>
  </svg>
{:else if variant === 'cipher-clock-glyph'}
  <!-- Tile 06: Temporal Cipher Unavailable Construct -->
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    role="img"
    aria-label="LIRIS Temporal Cipher Unavailable Construct"
  >
    <g stroke="currentColor" stroke-width="0.9">
      <rect x="14" y="42" width="252" height="96" opacity="0.7" />
      <line x1="77" y1="42" x2="77" y2="138" opacity="0.35" />
      <line x1="140" y1="42" x2="140" y2="138" opacity="0.35" />
      <line x1="203" y1="42" x2="203" y2="138" opacity="0.35" />

      <!-- Chamber 1: ØΞ -->
      <circle cx="38" cy="84" r="9" />
      <line x1="31" y1="91" x2="45" y2="77" />
      <line x1="52" y1="75" x2="64" y2="75" />
      <line x1="54" y1="84" x2="62" y2="84" />
      <line x1="52" y1="93" x2="64" y2="93" />

      <!-- Chamber 2: // -->
      <line x1="98" y1="96" x2="108" y2="72" />
      <line x1="112" y1="96" x2="122" y2="72" />

      <!-- Chamber 3: ΔΨ -->
      <polygon points="162,73 170,93 154,93" />
      <line x1="182" y1="73" x2="182" y2="95" />
      <path d="M 175 76 C 175 86, 189 86, 189 76" />

      <!-- Chamber 4: ×× in Gold -->
      <g stroke="#E2CFA8" stroke-width="1.3">
        <line x1="219" y1="76" x2="231" y2="90" />
        <line x1="231" y1="76" x2="219" y2="90" />
        <line x1="239" y1="76" x2="251" y2="90" />
        <line x1="251" y1="76" x2="239" y2="90" />
      </g>
    </g>
  </svg>
{:else if variant === 'freedom-script-seal'}
  <!-- Tile 08: Centered FREEDOM FOR ALL Script Seal -->
  <svg
    viewBox="0 0 360 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    role="img"
    aria-label="LIRIS — FREEDOM FOR ALL Centered Script Seal"
  >
    <g stroke="currentColor" opacity="0.22" stroke-width="0.75">
      <circle cx="180" cy="100" r="68" />
      <polygon points="180,24 256,100 180,176 104,100" />
      <line x1="24" y1="100" x2="94" y2="100" />
      <line x1="266" y1="100" x2="336" y2="100" />
    </g>
    <!-- Top star -->
    <path d="M 180 54 L 183 61 L 190 64 L 183 67 L 180 74 L 177 67 L 170 64 L 177 61 Z" fill="#E2CFA8" />

    <!-- Centered FREEDOM FOR ALL using actual font -->
    <text
      x="180"
      y="108"
      text-anchor="middle"
      fill="currentColor"
      font-family="'Sedgwick Ave Display', 'Permanent Marker', 'Syne', sans-serif"
      font-size="22"
      letter-spacing="0.14em"
    >
      FREEDOM FOR ALL
    </text>
  </svg>
{:else if variant === 'redacted-pass-seal'}
  <!-- Tile 09: Redacted Initiate Credential Pass Seal -->
  <svg
    viewBox="0 0 280 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    role="img"
    aria-label="LIRIS Redacted Initiate Credential Seal"
  >
    <g stroke="currentColor" stroke-width="0.9">
      <!-- Outer credential card -->
      <rect x="28" y="34" width="224" height="132" stroke="#E2CFA8" stroke-width="1.1" />
      <line x1="28" y1="64" x2="252" y2="64" opacity="0.4" />
      <!-- Redacted classification bars -->
      <rect x="46" y="80" width="118" height="10" fill="currentColor" opacity="0.85" />
      <rect x="46" y="100" width="84" height="8" fill="#E2CFA8" opacity="0.65" />
      <rect x="46" y="126" width="3" height="22" fill="currentColor" opacity="0.6" />
      <rect x="53" y="126" width="2" height="22" fill="currentColor" opacity="0.6" />
      <rect x="59" y="126" width="5" height="22" fill="currentColor" opacity="0.6" />
      <rect x="68" y="126" width="2" height="22" fill="currentColor" opacity="0.6" />
      <rect x="74" y="126" width="4" height="22" fill="currentColor" opacity="0.6" />
      <rect x="82" y="126" width="2" height="22" fill="currentColor" opacity="0.6" />
      <rect x="88" y="126" width="5" height="22" fill="currentColor" opacity="0.6" />

      <!-- Right-side geometric key seal -->
      <circle cx="206" cy="114" r="24" stroke="#E2CFA8" stroke-width="1" />
      <polygon points="206,96 220,114 206,132 192,114" stroke="currentColor" stroke-width="0.8" />
      <polygon points="206,106 212,114 206,122 200,114" fill="#E2CFA8" />

      <!-- Top header diamond -->
      <polygon points="48,44 53,49 48,54 43,49" fill="#E2CFA8" />
      <line x1="62" y1="49" x2="132" y2="49" stroke="currentColor" stroke-width="1.5" opacity="0.55" />
    </g>
  </svg>
{:else}
  <!--
    Sacred Architectural Loom — Concentric Vesica Piscis, Golden Ratio Circles,
    and Isometric Tailoring Projection Lines
  -->
  <svg
    viewBox="0 0 800 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class={className}
    aria-hidden="true"
  >
    <g stroke="currentColor" stroke-width="0.75" opacity="0.55">
      <!-- Outer & Phi Concentric Circles -->
      <circle cx="400" cy="400" r="340" />
      <circle cx="400" cy="400" r="260" stroke-dasharray="3 6" />
      <circle cx="400" cy="400" r="210" />
      <circle cx="400" cy="400" r="130" />
      <circle cx="400" cy="400" r="80" stroke-dasharray="2 4" />

      <!-- Vesica Piscis Twin Circles -->
      <circle cx="320" cy="400" r="160" opacity="0.45" />
      <circle cx="480" cy="400" r="160" opacity="0.45" />

      <!-- Rotated Inscribed Squares (Octagram of Proportion) -->
      <rect x="160" y="160" width="480" height="480" />
      <rect
        x="160"
        y="160"
        width="480"
        height="480"
        transform="rotate(45 400 400)"
      />

      <!-- Cardinal & Diagonal Axes -->
      <line x1="40" y1="400" x2="760" y2="400" />
      <line x1="400" y1="40" x2="400" y2="760" />
      <line x1="145" y1="145" x2="655" y2="655" opacity="0.35" />
      <line x1="655" y1="145" x2="145" y2="655" opacity="0.35" />

      <!-- Vertex Nodes -->
      <polygon points="400,54 405,60 400,66 395,60" fill="currentColor" />
      <polygon points="400,734 405,740 400,746 395,740" fill="currentColor" />
      <polygon points="54,400 60,405 66,400 60,395" fill="currentColor" />
      <polygon points="734,400 740,405 746,400 740,395" fill="currentColor" />
    </g>
  </svg>
{/if}
