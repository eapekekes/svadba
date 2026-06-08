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
   WAX SEAL — clean champagne disc + fine laurel wreath emboss
   --------------------------------------------------------------- */
function waxEdge(r, wobble) {
  const N = 24;
  const pts = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2;
    const rr = r + Math.sin(i * 3.7) * wobble;
    pts.push([Math.cos(a) * rr, Math.sin(a) * rr]);
  }
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)} `;
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)} `;
  }
  return d + "Z";
}
const WAX_DISC = waxEdge(42, 1.1);

function LaurelSeal({ className = "" }) {
  const pairs = [
    [-20, 14, -72], [-12, 4, -54], [-4, -8, -36], [4, -18, -18],
    [12, -24, -2], [18, -22, 14], [22, -12, 30],
  ];
  const Leaf = ({ x, y, r }) => (
    <path
      transform={`translate(${x} ${y}) rotate(${r})`}
      d="M0 0 C3.5 -1 6 -5 5.5 -11 C2 -9 0 -4 0 0 Z"
      fill="currentColor" stroke="none"
    />
  );
  const Branch = () => (
    <g fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
      <path d="M-2 18 C 2 8, 8 -6, 6 -28" />
      {pairs.map(([x, y, r], i) => <Leaf key={i} x={x} y={y} r={r} />)}
    </g>
  );
  const Wreath = () => (
    <g>
      <Branch />
      <g transform="scale(-1,1)"><Branch /></g>
    </g>
  );
  return (
    <svg className={`laurel-seal ${className}`} viewBox="-50 -50 100 100" aria-hidden="true">
      <defs>
        <radialGradient id="waxChampagne" cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#faf7f0" />
          <stop offset="35%" stopColor="#e9deca" />
          <stop offset="70%" stopColor="#d2c0a0" />
          <stop offset="100%" stopColor="#b9a684" />
        </radialGradient>
        <radialGradient id="waxBasin" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#e6dac4" />
          <stop offset="100%" stopColor="#c8b696" />
        </radialGradient>
        <radialGradient id="waxSheen" cx="32%" cy="26%" r="35%">
          <stop offset="0%" stopColor="#fffdf8" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fffdf8" stopOpacity="0" />
        </radialGradient>
        <filter id="waxDrop" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.8" stdDeviation="1.8" floodColor="#8a7858" floodOpacity="0.35" />
        </filter>
        <clipPath id="waxClip"><path d={WAX_DISC} /></clipPath>
      </defs>

      <path d={WAX_DISC} fill="url(#waxChampagne)" filter="url(#waxDrop)" />
      <path d={WAX_DISC} fill="none" stroke="#b0a080" strokeWidth="0.7" opacity="0.45" />

      <circle r="32" fill="url(#waxBasin)" />
      <circle r="32" fill="none" stroke="#a89878" strokeWidth="0.5" opacity="0.35" />

      <g className="seal-wreath-hi" style={{ transform: "translate(-0.4px, -0.5px)" }}><Wreath /></g>
      <g className="seal-wreath"><Wreath /></g>

      <g clipPath="url(#waxClip)">
        <ellipse cx="-8" cy="-10" rx="16" ry="11" fill="url(#waxSheen)" />
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
   TIMELINE ICONS — luxe engraving markers for program day
   --------------------------------------------------------------- */
function TimelineRings({ className = "" }) {
  return (
    <svg className={`tl-icon ${className}`} viewBox="0 0 56 56"
      fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* ribbon bow crown */}
      <path d="M28 6 C 22 2 14 2 12 8 C 10 12 18 14 28 12" />
      <path d="M28 6 C 34 2 42 2 44 8 C 46 12 38 14 28 12" />
      <path d="M24 10 q4 -3 8 0 q2 3 0 6 q-4 3 -8 0 q-2 -3 0 -6 Z" strokeWidth="0.95" />
      <path d="M26 16 C 24 20 22 23 20 26 M30 16 C 32 20 34 23 36 26" strokeWidth="0.75" opacity="0.55" />
      {/* interlocked bands */}
      <ellipse cx="20" cy="30" rx="13" ry="13" transform="rotate(-24 20 30)" />
      <ellipse cx="36" cy="28" rx="13" ry="13" transform="rotate(28 36 28)" />
      <ellipse cx="20" cy="30" rx="10" ry="10" transform="rotate(-24 20 30)" strokeWidth="0.65" opacity="0.45" />
      <ellipse cx="36" cy="28" rx="10" ry="10" transform="rotate(28 36 28)" strokeWidth="0.65" opacity="0.45" />
      {/* band engraving */}
      <path d="M12 28 C 14 24 18 22 22 23" strokeWidth="0.6" opacity="0.5" transform="rotate(-24 20 30)" />
      <path d="M28 22 C 32 21 36 23 38 27" strokeWidth="0.6" opacity="0.5" transform="rotate(28 36 28)" />
      {/* solitaire + prongs */}
      <path d="M28 14 L28 18 M25 16 L31 16" strokeWidth="0.85" />
      <path d="M28 12 L26 16 L28 18 L30 16 Z" fill="currentColor" stroke="none" />
      <circle cx="28" cy="11" r="1.1" fill="currentColor" stroke="none" />
      {/* pearls */}
      <circle cx="10" cy="18" r="1.2" fill="currentColor" stroke="none" opacity="0.85" />
      <circle cx="46" cy="16" r="1.1" fill="currentColor" stroke="none" opacity="0.75" />
      <circle cx="8" cy="24" r="0.7" fill="currentColor" stroke="none" opacity="0.45" />
      {/* lower flourish */}
      <path d="M18 44 C 22 48 28 49 34 47 C 38 45 40 42 38 40" strokeWidth="0.8" opacity="0.55" />
      <path d="M22 46 C 24 44 26 44 28 45 C 30 46 32 45 34 44" strokeWidth="0.65" opacity="0.4" />
    </svg>
  );
}

function TimelineGlasses({ className = "" }) {
  return (
    <svg className={`tl-icon ${className}`} viewBox="0 0 56 56"
      fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* champagne bubbles */}
      <circle cx="18" cy="10" r="0.9" fill="currentColor" stroke="none" opacity="0.55" />
      <circle cx="24" cy="6" r="1.1" fill="currentColor" stroke="none" opacity="0.7" />
      <circle cx="32" cy="8" r="0.8" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="38" cy="12" r="0.65" fill="currentColor" stroke="none" opacity="0.4" />
      <circle cx="28" cy="14" r="0.55" fill="currentColor" stroke="none" opacity="0.35" />
      {/* left flute */}
      <path d="M10 22 C10 34 14 38 19 38 C24 38 28 34 28 22 C28 18 10 18 10 22 Z" />
      <path d="M14 24 C16 30 18 33 19 33" strokeWidth="0.65" opacity="0.45" />
      <path d="M19 38 L19 44 L14 46 L24 46 L19 44" />
      <path d="M19 44 L19 50" strokeWidth="0.9" />
      <ellipse cx="19" cy="51" rx="3.5" ry="1.2" strokeWidth="0.75" opacity="0.55" />
      {/* right flute */}
      <path d="M28 22 C28 34 32 38 37 38 C42 38 46 34 46 22 C46 18 28 18 28 22 Z" />
      <path d="M32 24 C34 30 36 33 37 33" strokeWidth="0.65" opacity="0.45" />
      <path d="M37 38 L37 44 L32 46 L42 46 L37 44" />
      <path d="M37 44 L37 50" strokeWidth="0.9" />
      <ellipse cx="37" cy="51" rx="3.5" ry="1.2" strokeWidth="0.75" opacity="0.55" />
      {/* toast clink + sparkle */}
      <path d="M26 20 L30 16" strokeWidth="1.2" />
      <path d="M30 14 L33 11 M30 16 L34 14" strokeWidth="0.75" opacity="0.6" />
      {/* ribbon tie at stems */}
      <path d="M22 48 C 26 46 30 46 34 48" strokeWidth="0.85" />
      <path d="M24 48 C 23 50 23 52 24 53 M32 48 C 33 50 33 52 32 53" strokeWidth="0.7" opacity="0.55" />
      {/* base flourish */}
      <path d="M14 53 C 20 55 28 55 36 53 C 42 51 44 48 42 46" strokeWidth="0.75" opacity="0.45" />
    </svg>
  );
}

function TimelinePiano({ className = "" }) {
  const whites = [8, 12, 16, 20, 24, 28, 32, 36, 40, 44];
  const blacks = [14, 22, 30, 38];
  return (
    <svg className={`tl-icon ${className}`} viewBox="0 0 56 56"
      fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* open lid */}
      <path d="M6 22 L50 22 L48 38 C 42 41 14 41 8 38 Z" />
      <path d="M6 22 C 10 16 18 13 28 13 C 38 13 46 16 50 22" />
      <path d="M8 18 L48 18" strokeWidth="0.7" opacity="0.45" />
      {/* lid prop + music stand hint */}
      <path d="M44 16 L48 10 L52 12" strokeWidth="0.85" opacity="0.65" />
      <path d="M46 8 C 48 6 50 6 52 8" strokeWidth="0.7" opacity="0.5" />
      {/* white keys */}
      {whites.map((x) => <path key={"w" + x} d={`M${x} 22 L${x} 37`} strokeWidth="0.65" opacity="0.4" />)}
      {blacks.map((x) => <rect key={"b" + x} x={x - 1.5} y="22" width="3" height="10" fill="currentColor" stroke="none" />)}
      {/* fallboard curve */}
      <path d="M10 38 C 18 40 28 40 38 38" strokeWidth="0.75" opacity="0.5" />
      {/* lyre pedal assembly */}
      <path d="M22 41 C 24 44 26 46 28 46 C 30 46 32 44 34 41" strokeWidth="0.85" />
      <path d="M28 46 L28 50" strokeWidth="0.9" />
      <ellipse cx="28" cy="51" rx="4" ry="1.4" strokeWidth="0.75" opacity="0.55" />
      {/* legs */}
      <path d="M12 41 L10 48 M44 41 L46 48" strokeWidth="0.85" opacity="0.6" />
      {/* floating notes */}
      <g strokeWidth="0.85" opacity="0.7">
        <ellipse cx="46" cy="8" rx="2.2" ry="1.6" fill="currentColor" stroke="none" />
        <path d="M48 8 L48 14" />
        <path d="M48 14 C 50 15 52 14 52 12" />
      </g>
      <g strokeWidth="0.75" opacity="0.55">
        <ellipse cx="40" cy="5" rx="1.6" ry="1.2" fill="currentColor" stroke="none" />
        <path d="M42 5 L42 10" />
      </g>
      {/* side scroll ornament */}
      <path d="M6 28 C 4 30 3 33 4 35" strokeWidth="0.65" opacity="0.45" />
    </svg>
  );
}

function TimelineMoon({ className = "" }) {
  return (
    <svg className={`tl-icon ${className}`} viewBox="0 0 56 56"
      fill="none" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* crescent moon */}
      <path d="M38 10 C 28 10 20 18 20 28 C20 38 28 46 38 46 C 32 42 28 36 28 28 C28 20 32 14 38 10 Z"
        fill="currentColor" stroke="none" opacity="0.1" />
      <path d="M38 10 C 28 10 20 18 20 28 C20 38 28 46 38 46 C 32 42 28 36 28 28 C28 20 32 14 38 10 Z" />
      <path d="M32 14 C 30 18 29 23 29 28 C29 33 30 38 32 42" strokeWidth="0.65" opacity="0.4" />
      {/* stars */}
      <path d="M12 10 L12 14 M10 12 L14 12" strokeWidth="0.75" opacity="0.55" />
      <circle cx="16" cy="6" r="0.9" fill="currentColor" stroke="none" opacity="0.5" />
      <circle cx="8" cy="18" r="0.65" fill="currentColor" stroke="none" opacity="0.35" />
      <circle cx="14" cy="22" r="0.5" fill="currentColor" stroke="none" opacity="0.3" />
      {/* ornate candle */}
      <path className="ch-flame" style={{ transformOrigin: "14px 36px" }}
        d="M14 28 C17 23 17 18 14 14 C11 18 11 23 14 28 Z" fill="currentColor" stroke="none" />
      <path d="M14 28 L14 34" strokeWidth="0.9" />
      <path d="M10 34 L18 34 L17 48 L11 48 Z" />
      <path d="M10 37 L18 37 M10 41 L18 41 M10 45 L18 45" strokeWidth="0.6" opacity="0.45" />
      {/* candle holder base */}
      <path d="M8 48 C 10 50 12 51 14 51 C16 51 18 50 20 48" strokeWidth="0.8" opacity="0.55" />
      <ellipse cx="14" cy="51" rx="5" ry="1.5" strokeWidth="0.75" opacity="0.45" />
      {/* night curtain flourish */}
      <path d="M24 50 C 28 52 34 52 40 50 C 44 48 46 44 44 42" strokeWidth="0.75" opacity="0.45" />
      <path d="M26 51 C 28 49 30 49 32 50 C34 51 36 50 38 49" strokeWidth="0.6" opacity="0.35" />
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
