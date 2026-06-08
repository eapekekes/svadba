/* ============================================================
   app.jsx — envelope intro, chrome, assembly
   ============================================================ */
const { LaurelSeal } = window;
const { useState: aS, useEffect: aE } = React;

/* ---------- Intro: portrait envelope, right flap; letter slides out ----------
   Click the seal → right flap opens, the invitation card emerges
   horizontally, then expands and fades into the site.                    */
function Intro({ onOpen }) {
  const [phase, setPhase] = aS("idle"); // idle -> opening -> gone
  const [slotOpen, setSlotOpen] = aS(false);

  const open = () => {
    if (phase !== "idle") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("opening");
    if (reduce) {
      setSlotOpen(true);
      setTimeout(() => { setPhase("gone"); onOpen(); }, 500);
      return;
    }
    setTimeout(() => setSlotOpen(true), 720);
    setTimeout(() => { setPhase("gone"); setSlotOpen(false); onOpen(); }, 2800);
  };

  return (
    <div className={`intro ${phase === "opening" ? "opening" : ""} ${phase === "gone" ? "gone" : ""}`}>
      <div className="env-stage">
        <div className="env-wrap env-wrap--portrait">
          <div className="env-back"></div>

          {/* letter lives inside a clipped slot — emerges only through the opening */}
          <div className={`env-letter-slot${slotOpen ? " open" : ""}`}>
            <div className="env-letter">
              <div className="letter-inner">
                <span className="lt-corner tl"></span><span className="lt-corner tr"></span>
                <span className="lt-corner bl"></span><span className="lt-corner br"></span>
                <p className="lt-kicker">Приглашение на свадьбу</p>
                <h2 className="lt-names">Егор <span className="amp">и</span> Анастасия</h2>
                <div className="lt-rule"><span></span><span className="dot"></span><span></span></div>
                <p className="lt-date">11 октября 2026 · Москва</p>
              </div>
            </div>
          </div>

          {/* front pocket — left side with V-seam */}
          <div className="env-front"></div>
          {/* right side flap that opens */}
          <div className="env-flap"></div>

          <button className="seal-btn" onClick={open} aria-label="Открыть приглашение">
            <LaurelSeal />
          </button>
        </div>
      </div>
      <span className="env-hint">нажмите на печать</span>
      <div className="env-paper-grain"></div>
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

  aE(() => { document.body.classList.add("locked"); }, []);

  const onOpen = () => {
    document.body.classList.remove("locked");
    setReady(true);
    window.scrollTo(0, 0);
  };

  const { Hero, Countdown, Story, Program, Venue, DressCode, Rsvp, Gifts, Footer } = window;

  return (
    <React.Fragment>
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
