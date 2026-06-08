/* ============================================================
   app.jsx — chrome, assembly
   ============================================================ */
const { useState: aS, useEffect: aE } = React;
const { EnvelopeIntro } = window;

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
        <Hero introDone={ready} />
        <Countdown />
        <Story />
        <Program />
        <Venue />
        <DressCode />
        <Rsvp />
        <Gifts />
        <Footer />
      </main>
      <EnvelopeIntro onOpen={onOpen} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
