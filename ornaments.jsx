/* ============================================================
   ornaments.jsx — black & white engraving line-art
   Crystal chandelier, laurel wax seal, doves + ribbon,
   botanical corners, candles, dandelion, closing scene.
   ============================================================ */

/* ---------------------------------------------------------------
   CRYSTAL CHANDELIER — two tiers + oval ceiling ring + cascade
   Built generatively for delicate, ornate engraving look.
   --------------------------------------------------------------- */
function Chandelier({ className = "", style = {}, animate = true }) {
  const cx = 200;

  // a single candle arm: hub -> tip, with cup, candle, flame, drop
  const Arm = ({ hx, hy, tx, ty, flip, idx }) => {
    const dip = hy + 26;
    const c1x = hx + (tx - hx) * 0.28;
    const c2x = tx;
    return (
      <g>
        <path d={`M${hx} ${hy} C ${c1x} ${dip}, ${c2x} ${ty + 26}, ${tx} ${ty}`} />
        {/* cup */}
        <path d={`M${tx - 6} ${ty} q6 4 12 0`} />
        {/* candle */}
        <path d={`M${tx} ${ty - 1} L${tx} ${ty - 15}`} strokeWidth="2.6" />
        {/* flame */}
        <path className={animate ? "ch-flame" : ""} style={{ transformOrigin: `${tx}px ${ty - 17}px` }}
          d={`M${tx} ${ty - 17} q4 5 0 9 q-4 -4 0 -9 z`} fill="currentColor" stroke="none" />
        {/* small crystal pendant on the arm */}
        <path d={`M${(hx + tx) / 2} ${(hy + dip) / 2 + 6} l0 8`} strokeWidth="0.8" opacity="0.7" />
        <path d={`M${(hx + tx) / 2} ${(hy + dip) / 2 + 14} l-2 3 2 4 2 -4 z`} fill="currentColor" stroke="none" opacity="0.8" />
      </g>
    );
  };

  // crystal cascade strands forming a bell
  const strands = [];
  const maxX = 150, maxLen = 150;
  for (let x = -maxX; x <= maxX; x += 11) {
    const t = x / maxX;
    const len = maxLen * Math.pow(1 - t * t, 0.62) + 18;
    const sx = cx + x;
    const top = 268 + Math.abs(t) * 14;
    strands.push(
      <g key={x}>
        <path d={`M${sx} ${top} L${sx} ${top + len}`} strokeWidth="0.7" strokeDasharray="0.6 4.2" opacity="0.8" />
        <path className={animate ? "ch-crystal" : ""} style={{ animationDelay: `${(Math.abs(x) % 5) * 0.4}s` }}
          d={`M${sx} ${top + len} l-2 3 2 5 2 -5 z`} fill="currentColor" stroke="none" opacity="0.85" />
      </g>
    );
  }

  // arm tip layouts
  const upperTips = [
    { x: -92, y: 178 }, { x: -55, y: 168 }, { x: -20, y: 174 },
    { x: 20, y: 174 }, { x: 55, y: 168 }, { x: 92, y: 178 },
  ];
  const lowerTips = [
    { x: -150, y: 256 }, { x: -112, y: 246 }, { x: -74, y: 252 }, { x: -36, y: 258 },
    { x: 36, y: 258 }, { x: 74, y: 252 }, { x: 112, y: 246 }, { x: 150, y: 256 },
  ];

  return (
    <svg className={`chandelier ${className}`} viewBox="0 0 400 540" style={style}
      fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* oval ceiling ring */}
      <g transform="rotate(-2.5 200 86)">
        <ellipse cx="200" cy="86" rx="168" ry="40" strokeWidth="1.5" />
        <ellipse cx="200" cy="86" rx="160" ry="34" strokeWidth="0.9" opacity="0.85" />
      </g>
      {/* chain */}
      <path d="M200 118 l-5 8 10 8 -10 8 10 8 -5 6" strokeWidth="0.9" />
      {/* crown finial */}
      <path d="M200 150 C 188 140 188 132 200 126 C 212 132 212 140 200 150 Z" />
      <path d="M200 150 l-10 -6 M200 150 l10 -6 M200 126 l0 -8" strokeWidth="0.9" />
      {/* upper hub + balusters */}
      <ellipse cx="200" cy="188" rx="13" ry="9" />
      <path d="M200 158 L200 178" strokeWidth="2" />
      {upperTips.map((t, i) => (
        <Arm key={"u" + i} hx={cx} hy={190} tx={cx + t.x} ty={t.y} idx={i} />
      ))}
      {/* central stem */}
      <path d="M200 197 L200 262" strokeWidth="2" />
      <ellipse cx="200" cy="228" rx="9" ry="13" />
      {/* lower hub */}
      <ellipse cx="200" cy="262" rx="18" ry="10" />
      {lowerTips.map((t, i) => (
        <Arm key={"l" + i} hx={cx} hy={262} tx={cx + t.x} ty={t.y} idx={i} />
      ))}
      {/* swag chains between arm tips (lower tier) */}
      {lowerTips.slice(0, -1).map((t, i) => {
        const a = lowerTips[i], b = lowerTips[i + 1];
        return <path key={"sw" + i} d={`M${cx + a.x} ${a.y} Q ${cx + (a.x + b.x) / 2} ${Math.max(a.y, b.y) + 22} ${cx + b.x} ${b.y}`}
          strokeWidth="0.7" strokeDasharray="0.6 4" opacity="0.7" />;
      })}
      {/* crystal cascade */}
      {strands}
      {/* bottom finial */}
      <path d="M200 262 l0 200" strokeWidth="0.8" opacity="0.5" />
      <path d="M200 458 q-7 8 0 24 q7 -16 0 -24 z" fill="currentColor" stroke="none" opacity="0.9" />
      <circle cx="200" cy="490" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   WAX SEAL — scalloped gold medallion, baroque frame, monogram
   Palette only: #fff4cc #fbeebd #e8c46a #c99a3d #9a7424 #6b4a14
   --------------------------------------------------------------- */
function scallopPath(r, lobes, depth) {
  const steps = lobes * 2;
  const pts = [];
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2 - Math.PI / 2;
    const rr = i % 2 === 0 ? r : r - depth;
    pts.push([Math.cos(a) * rr, Math.sin(a) * rr]);
  }
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i < steps; i++) d += ` L ${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}`;
  return d + " Z";
}
const WAX_OUTER = scallopPath(50, 10, 7);
const WAX_INNER = scallopPath(44, 10, 5);

function LaurelSeal({ className = "" }) {
  const Flourish = ({ rot }) => (
    <g transform={`rotate(${rot})`}>
      <path className="seal-imprint" d="M-30 -4 C -22 -14 -10 -18 0 -18 C 10 -18 22 -14 30 -4 C 22 2 10 4 0 4 C -10 4 -22 2 -30 -4 Z" />
      <path className="seal-imprint-hi" d="M-18 -8 C -10 -12 -4 -12 0 -12 C 4 -12 10 -12 18 -8" fill="none" stroke="#fbeebd" strokeWidth="1" opacity="0.5" />
    </g>
  );
  return (
    <svg className={`laurel-seal ${className}`} viewBox="-62 -62 124 124" aria-hidden="true">
      <defs>
        <radialGradient id="waxGold" cx="38%" cy="30%" r="78%">
          <stop offset="0%" stopColor="#fff4cc" />
          <stop offset="22%" stopColor="#fbeebd" />
          <stop offset="50%" stopColor="#e8c46a" />
          <stop offset="74%" stopColor="#c99a3d" />
          <stop offset="92%" stopColor="#9a7424" />
          <stop offset="100%" stopColor="#6b4a14" />
        </radialGradient>
        <radialGradient id="waxBasin" cx="46%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#e8c46a" />
          <stop offset="60%" stopColor="#c99a3d" />
          <stop offset="100%" stopColor="#9a7424" />
        </radialGradient>
        <radialGradient id="waxSheen" cx="30%" cy="22%" r="38%">
          <stop offset="0%" stopColor="#fff4cc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff4cc" stopOpacity="0" />
        </radialGradient>
        <filter id="waxDrop" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="2.4" stdDeviation="2.6" floodColor="#6b4a14" floodOpacity="0.5" />
        </filter>
        <filter id="waxGrain" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" result="n" />
          <feColorMatrix in="n" type="saturate" values="0" />
          <feComponentTransfer><feFuncA type="linear" slope="0.18" /></feComponentTransfer>
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
        <clipPath id="waxClip"><path d={WAX_OUTER} /></clipPath>
      </defs>

      {/* wax drips */}
      <ellipse cx="-16" cy="48" rx="6" ry="8" fill="url(#waxGold)" filter="url(#waxDrop)" />
      <ellipse cx="22" cy="46" rx="4" ry="6" fill="url(#waxGold)" filter="url(#waxDrop)" opacity="0.92" />

      {/* scalloped wax body */}
      <path d={WAX_OUTER} fill="url(#waxGold)" filter="url(#waxDrop)" />
      <path d={WAX_OUTER} fill="none" stroke="#9a7424" strokeWidth="1.4" opacity="0.35" />

      {/* pressed medallion */}
      <path d={WAX_INNER} fill="url(#waxBasin)" opacity="0.95" />
      <circle r="34" fill="none" stroke="#c99a3d" strokeWidth="1.2" opacity="0.55" />
      <circle r="31" fill="none" stroke="#fbeebd" strokeWidth="0.8" opacity="0.35" />

      {/* baroque corner flourishes */}
      <Flourish rot={0} />
      <Flourish rot={90} />
      <Flourish rot={180} />
      <Flourish rot={270} />

      {/* interlocking rings */}
      <g fill="none" stroke="#9a7424" strokeWidth="1.5" opacity="0.85">
        <ellipse cx="-7" cy="-10" rx="9" ry="9" transform="rotate(-22 -7 -10)" />
        <ellipse cx="7" cy="-10" rx="9" ry="9" transform="rotate(22 7 -10)" />
      </g>

      {/* monogram */}
      <text x="0" y="14" textAnchor="middle" className="seal-mono">Е&amp;А</text>

      {/* wax texture + highlight */}
      <g clipPath="url(#waxClip)">
        <rect x="-62" y="-62" width="124" height="124" fill="#6b4a14" filter="url(#waxGrain)" style={{ mixBlendMode: "multiply" }} />
        <ellipse cx="-12" cy="-14" rx="24" ry="17" fill="url(#waxSheen)" />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------
   DOVE — stylized engraving dove (faces right); mirror for left
   --------------------------------------------------------------- */
function Dove({ className = "", flip = false }) {
  return (
    <svg className={`dove ${className}`} viewBox="0 0 96 64"
      fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
      style={flip ? { transform: "scaleX(-1)" } : {}} aria-hidden="true">
      {/* body */}
      <path d="M14 44 C 24 52 46 52 60 42 C 70 35 78 30 88 30" />
      <path d="M14 44 C 18 36 30 30 46 31 C 58 32 66 28 72 22" />
      {/* head + beak */}
      <path d="M72 22 C 76 18 82 18 85 21 C 83 24 79 25 76 24" />
      <path d="M85 21 l7 -2" />
      <circle cx="79" cy="21.5" r="0.9" fill="currentColor" stroke="none" />
      {/* wing (raised) */}
      <path d="M40 36 C 44 22 52 12 64 8 C 60 18 58 28 54 36" />
      <path d="M44 35 C 49 26 55 19 63 15" strokeWidth="0.8" opacity="0.8" />
      <path d="M40 38 C 46 32 53 28 61 27" strokeWidth="0.8" opacity="0.7" />
      {/* tail feathers */}
      <path d="M14 44 C 6 44 2 40 0 34 M14 45 C 7 47 3 46 0 42 M14 46 C 8 50 4 51 1 50" strokeWidth="0.9" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   RIBBON BOW — line-art bow with tails
   --------------------------------------------------------------- */
function RibbonBow({ className = "" }) {
  return (
    <svg className={`ribbon-bow ${className}`} viewBox="0 0 120 70"
      fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* loops */}
      <path d="M60 26 C 42 8 16 8 14 24 C 12 36 34 36 60 30" />
      <path d="M60 26 C 78 8 104 8 106 24 C 108 36 86 36 60 30" />
      {/* inner loop creases */}
      <path d="M60 28 C 46 20 30 20 22 27" strokeWidth="0.8" opacity="0.8" />
      <path d="M60 28 C 74 20 90 20 98 27" strokeWidth="0.8" opacity="0.8" />
      {/* knot */}
      <path d="M54 24 q6 -6 12 0 q3 6 0 12 q-6 5 -12 0 q-3 -6 0 -12 Z" />
      {/* tails */}
      <path d="M56 36 C 50 50 46 60 40 68 L52 64 56 70" />
      <path d="M64 36 C 70 50 74 60 80 68 L68 64 64 70" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   BOTANICAL CORNER — leafy spray for frame corners (top-left base)
   --------------------------------------------------------------- */
function BotanicalCorner({ className = "" }) {
  const Leaf = ({ x, y, r, s = 1 }) => (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C 10 -3 17 -11 15 -22 C 6 -19 1 -10 0 0 Z" fill="currentColor" stroke="none" opacity="0.9" />
      <path d="M2 -2 C 7 -8 11 -14 13 -19" strokeWidth="0.6" stroke="var(--paper)" opacity="0.6" />
    </g>
  );
  return (
    <svg className={`botanical ${className}`} viewBox="0 0 150 190"
      fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" aria-hidden="true">
      {/* main stem sweeping down the side */}
      <path d="M18 6 C 26 50 30 100 22 175" />
      {/* branch */}
      <path d="M22 40 C 40 50 58 56 92 50" />
      <path d="M24 96 C 44 104 64 108 96 100" />
      {/* leaves along stems */}
      <Leaf x={30} y={44} r={20} s={0.9} />
      <Leaf x={52} y={50} r={-10} s={1} />
      <Leaf x={74} y={52} r={5} s={0.95} />
      <Leaf x={92} y={50} r={-20} s={0.85} />
      <Leaf x={30} y={100} r={20} s={0.9} />
      <Leaf x={56} y={106} r={-8} s={1} />
      <Leaf x={80} y={104} r={6} s={0.9} />
      <Leaf x={18} y={70} r={150} s={0.8} />
      <Leaf x={20} y={130} r={150} s={0.8} />
      <Leaf x={22} y={160} r={150} s={0.7} />
      {/* a small bud flower */}
      <g transform="translate(100 48)">
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} transform={`rotate(${a})`} d="M0 0 C 3 -5 3 -10 0 -13 C -3 -10 -3 -5 0 0 Z" fill="currentColor" stroke="none" opacity="0.8" />
        ))}
        <circle r="2" fill="var(--paper)" stroke="currentColor" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------
   Small sketches: Candle, Dandelion, Sprig
   --------------------------------------------------------------- */
function Candle({ className = "" }) {
  return (
    <svg className={`sketch candle ${className}`} viewBox="0 0 40 120"
      fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path className="ch-flame" style={{ transformOrigin: "20px 18px" }} d="M20 6 C 26 14 26 22 20 28 C 14 22 14 14 20 6 Z" />
      <path d="M20 28 L20 34" />
      <path d="M12 36 L28 36 L27 112 L13 112 Z" />
      <path d="M12 40 L28 40" strokeWidth="0.7" opacity="0.6" />
      <path d="M15 36 C 15 30 25 30 25 36" strokeWidth="0.7" opacity="0.7" />
    </svg>
  );
}

function Dandelion({ className = "" }) {
  const seeds = [];
  for (let a = -90; a <= 90; a += 18) {
    const rad = (a * Math.PI) / 180;
    const r = 26;
    const ex = 30 + Math.cos(rad - Math.PI / 2) * r;
    const ey = 34 + Math.sin(rad - Math.PI / 2) * r;
    seeds.push(<g key={a}><path d={`M30 34 L${ex} ${ey}`} strokeWidth="0.7" /><circle cx={ex} cy={ey} r="1.2" fill="currentColor" stroke="none" /></g>);
  }
  return (
    <svg className={`sketch dandelion ${className}`} viewBox="0 0 60 120"
      fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" aria-hidden="true">
      {seeds}
      <path d="M30 34 C 31 60 30 90 28 116" />
      <path d="M30 70 C 22 74 18 80 18 88" strokeWidth="0.8" opacity="0.7" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   CLOSING SCENE — line-art candles, glasses & sprigs (footer)
   --------------------------------------------------------------- */
function ClosingScene({ className = "" }) {
  return (
    <svg className={`closing-scene ${className}`} viewBox="0 0 520 220"
      fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* table line */}
      <path d="M10 188 C 180 168 360 172 510 196" strokeWidth="0.9" opacity="0.7" />
      <path d="M30 206 C 200 188 370 192 500 210" strokeWidth="0.7" opacity="0.45" />
      {/* tall candle left */}
      <g transform="translate(70 60)">
        <path className="ch-flame" style={{ transformOrigin: "0px -6px" }} d="M0 -16 C 6 -8 6 0 0 6 C -6 0 -6 -8 0 -16 Z" />
        <path d="M0 6 L0 12" />
        <path d="M-7 14 L7 14 L6 120 L-6 120 Z" />
      </g>
      {/* wine glasses */}
      <g transform="translate(170 96)">
        <path d="M-14 0 C -14 22 14 22 14 0 C 14 -2 -14 -2 -14 0 Z" />
        <path d="M0 22 L0 70 M-12 74 L12 74" />
      </g>
      <g transform="translate(214 86)">
        <path d="M-13 0 C -13 20 13 20 13 0 C 13 -2 -13 -2 -13 0 Z" />
        <path d="M0 20 L0 66 M-11 70 L11 70" />
      </g>
      {/* vase with sprigs (center) */}
      <g transform="translate(300 92)">
        <path d="M-12 26 C -16 50 16 50 12 26 C 8 22 -8 22 -12 26 Z" />
        <path d="M0 26 C 0 6 -8 -8 -14 -18 M0 26 C 0 2 6 -10 14 -22 M0 26 C 0 8 0 -10 0 -26" strokeWidth="0.9" />
        {[-14, 0, 14].map((dx, i) => (
          <g key={i} transform={`translate(${dx} ${-18 - Math.abs(dx) * 0.3}) rotate(${dx})`}>
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <path key={a} transform={`rotate(${a})`} d="M0 0 C 2 -4 2 -8 0 -11 C -2 -8 -2 -4 0 0 Z" fill="currentColor" stroke="none" opacity="0.8" />
            ))}
          </g>
        ))}
      </g>
      {/* tall candle right */}
      <g transform="translate(430 50)">
        <path className="ch-flame" style={{ transformOrigin: "0px -6px" }} d="M0 -16 C 6 -8 6 0 0 6 C -6 0 -6 -8 0 -16 Z" />
        <path d="M0 6 L0 12" />
        <path d="M-7 14 L7 14 L6 130 L-6 130 Z" />
      </g>
      {/* plate + cutlery hint */}
      <g transform="translate(360 168)">
        <ellipse cx="0" cy="0" rx="46" ry="12" />
        <ellipse cx="0" cy="0" rx="34" ry="8" strokeWidth="0.7" opacity="0.6" />
        <path d="M64 -14 L70 14 M58 -14 L60 0 M52 -14 L54 0" strokeWidth="0.8" opacity="0.7" />
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------
   TIMELINE ICONS — expressive engraving markers for program day
   --------------------------------------------------------------- */
function TimelineRings({ className = "" }) {
  return (
    <svg className={`tl-icon ${className}`} viewBox="0 0 48 48"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="17" cy="27" rx="12" ry="12" transform="rotate(-22 17 27)" />
      <ellipse cx="31" cy="25" rx="12" ry="12" transform="rotate(26 31 25)" />
      <path d="M14 19 L10 10 M34 17 L38 8" strokeWidth="1.3" />
      <circle cx="9" cy="9" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="39" cy="7" r="1.6" fill="currentColor" stroke="none" />
      <path d="M22 8 C24 6 28 6 30 8" strokeWidth="1" opacity="0.45" />
      <path d="M24 36 C24 39 24 41 24 43" strokeWidth="1.1" opacity="0.4" />
    </svg>
  );
}

function TimelineGlasses({ className = "" }) {
  return (
    <svg className={`tl-icon ${className}`} viewBox="0 0 48 48"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 20 C8 30 12 33 16 33 C20 33 24 30 24 20 C24 17 8 17 8 20 Z" />
      <path d="M16 33 L16 38 L12 40 L20 40 L16 38" />
      <path d="M24 20 C24 30 28 33 32 33 C36 33 40 30 40 20 C40 17 24 17 24 20 Z" />
      <path d="M32 33 L32 38 L28 40 L36 40 L32 38" />
      <path d="M22 14 L24 8 L26 14" strokeWidth="1.3" />
      <circle cx="24" cy="6" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="20" cy="12" r="1" fill="currentColor" stroke="none" opacity="0.55" />
      <circle cx="28" cy="11" r="0.9" fill="currentColor" stroke="none" opacity="0.45" />
      <path d="M14 10 C16 7 20 6 24 6 C28 6 32 7 34 10" strokeWidth="1.1" opacity="0.5" />
    </svg>
  );
}

function TimelinePiano({ className = "" }) {
  const keys = [10, 14, 18, 22, 26, 30, 34, 38];
  return (
    <svg className={`tl-icon ${className}`} viewBox="0 0 48 48"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 16 L42 16 L40 36 C36 38 12 38 8 36 Z" />
      <path d="M6 16 C8 12 14 10 24 10 C34 10 40 12 42 16" />
      {keys.map((x) => <path key={x} d={`M${x} 16 L${x} 34`} strokeWidth="1" opacity="0.45" />)}
      <rect x="12" y="16" width="4" height="12" fill="currentColor" stroke="none" />
      <rect x="20" y="16" width="4" height="12" fill="currentColor" stroke="none" />
      <rect x="28" y="16" width="4" height="12" fill="currentColor" stroke="none" />
      <rect x="36" y="16" width="4" height="12" fill="currentColor" stroke="none" />
      <path d="M10 40 C18 42 30 42 38 40" strokeWidth="1.1" opacity="0.55" />
      <path d="M34 8 L38 5 M38 10 L42 7" strokeWidth="1.2" opacity="0.65" />
      <ellipse cx="38" cy="6" rx="2.5" ry="2" strokeWidth="1.1" />
    </svg>
  );
}

function TimelineMoon({ className = "" }) {
  return (
    <svg className={`tl-icon ${className}`} viewBox="0 0 48 48"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M32 10 C24 10 18 16 18 25 C18 34 24 40 32 40 C28 37 25 32 25 25 C25 18 28 13 32 10 Z"
        fill="currentColor" stroke="none" opacity="0.12" />
      <path d="M32 10 C24 10 18 16 18 25 C18 34 24 40 32 40 C28 37 25 32 25 25 C25 18 28 13 32 10 Z" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="16" cy="8" r="0.8" fill="currentColor" stroke="none" opacity="0.4" />
      <circle cx="8" cy="18" r="0.7" fill="currentColor" stroke="none" opacity="0.35" />
      <path className="ch-flame" style={{ transformOrigin: "12px 30px" }}
        d="M12 24 C15 19 15 14 12 11 C9 14 9 19 12 24 Z" fill="currentColor" stroke="none" />
      <path d="M12 24 L12 29" />
      <path d="M8 30 L16 30 L16 40 L8 40 Z" />
      <path d="M8 33 L16 33" strokeWidth="1" opacity="0.45" />
    </svg>
  );
}

/* ---------------------------------------------------------------
   FLEURON — small vintage stucco rosette for timeline markers
   --------------------------------------------------------------- */
function Fleuron({ className = "" }) {
  return (
    <svg className={`fleuron ${className}`} viewBox="0 0 40 40"
      fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* four acanthus petals */}
      {[0, 90, 180, 270].map((a) => (
        <path key={a} transform={`rotate(${a} 20 20)`}
          d="M20 20 C 20 12 16 6 20 1 C 24 6 20 12 20 20 Z" fill="currentColor" stroke="none" opacity="0.9" />
      ))}
      {/* diagonal smaller leaves */}
      {[45, 135, 225, 315].map((a) => (
        <path key={a} transform={`rotate(${a} 20 20)`}
          d="M20 20 C 21 15 24 12 27 11 C 26 15 23 18 20 20 Z" fill="currentColor" stroke="none" opacity="0.55" />
      ))}
      <circle cx="20" cy="20" r="3.4" fill="var(--paper)" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="20" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

Object.assign(window, {
  Chandelier, LaurelSeal, Dove, RibbonBow, BotanicalCorner, Candle, Dandelion, ClosingScene, Fleuron,
  TimelineRings, TimelineGlasses, TimelinePiano, TimelineMoon,
});
