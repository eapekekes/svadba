/* ============================================================
   app.jsx — intro envelope, chrome, assembly
   ============================================================ */
const { Petals } = window;
const { useState: aS, useEffect: aE, useRef: aR } = React;

/* ---------- Intro envelope with wax seal ---------- */
function Intro({ onOpen }) {
  const [phase, setPhase] = aS("idle"); // idle -> opening -> gone
  const open = () => {
    if (phase !== "idle") return;
    setPhase("opening");
    setTimeout(() => { setPhase("gone"); onOpen(); }, 950);
  };
  return (
    <div className={`intro bg-marble ${phase === "opening" ? "opening" : ""} ${phase === "gone" ? "gone" : ""}`}>
      <div className="envelope" onClick={open} role="button" tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(); }}>
        <div className="seal">
          <span className="mono">Е&amp;А</span>
          <span className="yr">11.10.2026</span>
        </div>
        <p className="eyebrow intro-eyebrow">Вы приглашены</p>
        <div className="intro-names display">Егор &amp; Анастасия</div>
        <div className="intro-hint">
          <span>нажмите, чтобы открыть</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Top chrome: progress bar, topbar, rsvp pill ---------- */
function Chrome({ ready }) {
  const [show, setShow] = aS(false);
  const [prog, setProg] = aS(0);
  aE(() => {
    if (!ready) return;
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.body.scrollHeight - window.innerHeight;
        setProg(max > 0 ? (y / max) * 100 : 0);
        setShow(y > window.innerHeight * 0.7);
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ready]);

  const toRsvp = () => {
    const el = document.getElementById("rsvp");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 10, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <div className="progress" style={{ width: prog + "%" }}></div>
      <div className={`topbar ${show ? "show" : ""}`}>
        <a href="#top" className="tb-mono" aria-label="Наверх">Е&amp;А</a>
        <button className="tb-date" onClick={toRsvp}>Подтвердить · RSVP</button>
      </div>
      <div className={`rsvp-pill ${show ? "show" : ""}`}>
        <button className="btn btn-gold" onClick={toRsvp}>Подтвердить визит</button>
      </div>
    </React.Fragment>
  );
}

/* ---------- App ---------- */
function App() {
  const [ready, setReady] = aS(false);

  aE(() => {
    document.body.classList.add("locked");
  }, []);

  const onOpen = () => {
    document.body.classList.remove("locked");
    setReady(true);
    window.scrollTo(0, 0);
  };

  const { Hero, Countdown, Story, Program, Venue, DressCode, Rsvp, Gifts, Footer } = window;

  return (
    <React.Fragment>
      <Petals active={ready} />
      <Chrome ready={ready} />
      <main style={{ position: "relative", zIndex: 3 }}>
        <Hero />
        <Countdown />
        <Story />
        <Program />
        <Venue />
        <DressCode />
        <Rsvp />
        <Gifts />
        <Footer />
      </main>
      <Intro onOpen={onOpen} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
