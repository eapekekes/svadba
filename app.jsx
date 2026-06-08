/* ============================================================
   app.jsx — envelope intro, chrome, assembly
   ============================================================ */
const { LaurelSeal } = window;
const { useState: aS, useEffect: aE } = React;

/* ---------- Intro: full-screen envelope back (lovellink reference) ----------
   z-order: cavity → body+hint → flap → grain → seal.                        */
function Intro({ onOpen }) {
  const [phase, setPhase] = aS("idle");

  const open = () => {
    if (phase !== "idle") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("opening");
    setTimeout(() => { setPhase("gone"); onOpen(); }, reduce ? 450 : 2700);
  };

  return (
    <div className={`intro ${phase === "opening" ? "opening" : ""} ${phase === "gone" ? "gone" : ""}`}>
      <div className="env">
        <div className="env__cavity" aria-hidden="true">
          <div className="env__card">
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

        <div className="env__body">
          <span className="env__hint">нажмите на печать</span>
        </div>

        <div className="env__flap" aria-hidden="true" />

        <div className="env__grain" aria-hidden="true" />

        <button className="env__seal" onClick={open} aria-label="Открыть приглашение">
          <LaurelSeal />
        </button>
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
