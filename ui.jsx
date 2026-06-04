/* ============================================================
   ui.jsx — shared helpers & primitives
   Exposed on window for sibling babel scripts.
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Reveal on scroll ---------- */
function Reveal({ children, variant = "up", delay = 0, className = "", as = "div", style = {}, ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { setSeen(true); io.unobserve(e.target); }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`rv ${variant} ${seen ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---------- Ornamental divider ---------- */
function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span className="ln"></span>
      <span className="dot"></span>
      <span className="ln r"></span>
    </div>
  );
}

/* ---------- Section heading ---------- */
function SecHead({ eyebrow, title }) {
  return (
    <Reveal className="sec-head" variant="up">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="display">{title}</h2>
      <Ornament />
    </Reveal>
  );
}

/* ---------- Image placeholder (striped, user drops photos later) ---------- */
function Placeholder({ label, className = "", style = {} }) {
  return (
    <div className={`ph ${className}`} style={style}>
      <span className="ph-label">{label}</span>
    </div>
  );
}

/* ---------- Smart image: shows real photo if it loads, else striped placeholder ---------- */
function Photo({ src, label, className = "", style = {} }) {
  const [ok, setOk] = useState(true);
  if (!src || !ok) return <Placeholder label={label} className={className} style={style} />;
  return (
    <div className={`ph ph--loaded ${className}`} style={style}>
      <img src={src} alt={label} loading="lazy"
        onError={() => setOk(false)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
}

/* ---------- Countdown hook ---------- */
function useCountdown(targetISO) {
  const target = new Date(targetISO).getTime();
  const calc = () => {
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s, done: diff === 0 };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

/* ---------- Petals / gold-dust canvas ---------- */
function Petals({ active }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!active) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let w, h, raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const COLORS = ["rgba(201,162,107,", "rgba(227,200,150,", "rgba(138,154,123,"];
    const N = Math.max(14, Math.min(34, Math.floor(window.innerWidth / 26)));
    const parts = [];

    function resize() {
      w = canvas.width = window.innerWidth * DPR;
      h = canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    }
    function mk(initial) {
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : -20 * DPR,
        r: (3 + Math.random() * 7) * DPR,
        spd: (0.25 + Math.random() * 0.7) * DPR,
        drift: (Math.random() - 0.5) * 0.5 * DPR,
        ang: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.02,
        sway: 0.6 + Math.random() * 1.4,
        phase: Math.random() * Math.PI * 2,
        op: 0.25 + Math.random() * 0.4,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        petal: Math.random() > 0.4,
      };
    }
    resize();
    for (let i = 0; i < N; i++) parts.push(mk(true));

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.ang);
      ctx.fillStyle = p.c + p.op + ")";
      if (p.petal) {
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.r * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
    let tms = 0;
    function loop() {
      tms += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.spd;
        p.x += p.drift + Math.sin(tms * p.sway + p.phase) * 0.4 * DPR;
        p.ang += p.spin;
        drawPetal(p);
        if (p.y > h + 30 * DPR) Object.assign(p, mk(false));
      }
      raf = requestAnimationFrame(loop);
    }
    loop();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [active]);
  return <canvas id="petals" ref={ref} aria-hidden="true"></canvas>;
}

/* ---------- Parallax hook (translateY by scroll) ---------- */
function useParallax(speed = 0.2) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);
  return ref;
}

Object.assign(window, {
  Reveal, Ornament, SecHead, Placeholder, Photo, useCountdown, Petals, useParallax,
});
