/* ============================================================
   sections.jsx — page sections for the wedding landing
   ============================================================ */
const { Reveal, Ornament, SecHead, Placeholder, Photo, useCountdown } = window;
const { useState: useS, useEffect: useE, useRef: useR } = React;
const { Dove, RibbonBow, BotanicalCorner, Dandelion, Fleuron } = window;

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const ref = useR(null);
  const [go, setGo] = useS(false);
  useE(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <header className="hero bg-marble" id="top" data-screen-label="Обложка">
      <div className={`engraved ${go ? "play" : ""}`} ref={ref}>
        {/* drawn double border */}
        <svg className="eng-frame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <rect className="ef-outer" x="1" y="1" width="98" height="98" fill="none" vectorEffect="non-scaling-stroke" />
          <rect className="ef-inner" x="3.2" y="3.2" width="93.6" height="93.6" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        <BotanicalCorner className="eng-bot tl" />
        <BotanicalCorner className="eng-bot tr" />
        <BotanicalCorner className="eng-bot bl" />
        <BotanicalCorner className="eng-bot br" />

        <div className="eng-crown">
          <Dove className="anim-dove dl" />
          <RibbonBow className="anim-bow" />
          <Dove flip={true} className="anim-dove dr" />
        </div>

        <p className="eng-kicker anim-line">Мы женимся</p>
        <h1 className="eng-names anim-names">Егор <span className="amp">и</span> Анастасия</h1>
        <p className="eng-sub anim-line">Будем счастливы видеть вас рядом в этот особенный день</p>

        <div className="eng-when anim-line">
          <span className="w-side">Воскресенье</span>
          <span className="eng-oval"><span>11</span></span>
          <span className="w-side">Октября<br />2026</span>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span>листайте</span>
        <span className="line"></span>
      </div>
    </header>
  );
}

/* ============================================================
   COUNTDOWN
   ============================================================ */
function CountdownCell({ value, label }) {
  const [tick, setTick] = useS(false);
  const prev = useR(value);
  useE(() => {
    if (prev.current !== value) {
      setTick(true);
      const id = setTimeout(() => setTick(false), 500);
      prev.current = value;
      return () => clearTimeout(id);
    }
  }, [value]);
  return (
    <div className={`cd-cell ${tick ? "tick" : ""}`}>
      <div className="cd-num">{String(value).padStart(2, "0")}</div>
      <div className="cd-lbl">{label}</div>
    </div>
  );
}

function Countdown() {
  const t = useCountdown("2026-10-11T13:30:00");
  return (
    <section className="section countdown" id="countdown" data-screen-label="Обратный отсчёт">
      <div className="wrap">
        <SecHead eyebrow="Совсем скоро" title="До нашего дня" />
        <Reveal variant="up">
          <div className="cd-grid">
            <CountdownCell value={t.d} label="дней" />
            <CountdownCell value={t.h} label="часов" />
            <CountdownCell value={t.m} label="минут" />
            <CountdownCell value={t.s} label="секунд" />
          </div>
        </Reveal>
        <Reveal variant="fade" delay={200}>
          <p className="cd-note">…и мы скажем друг другу «да»</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================================================
   STORY — single featured photo
   ============================================================ */
function Story() {
  const [open, setOpen] = useS(false);
  const photo = { src: "images/couple/photo-1.jpg", cap: "Наша история", label: "ваше фото пары · 3:2" };

  useE(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section className="section bg-marble" id="story" data-screen-label="Наша история">
      <div className="wrap">
        <SecHead eyebrow="Наша история" title="Двое, ставшие одним" />
        <Reveal variant="up" className="narrow story-text">
          <p className="lead">
            Когда-то наши пути просто пересеклись — а теперь мы не представляем дня
            друг без друга. Было всё: долгие прогулки, любимые места, тысячи фотографий
            и одно очень важное «да». 11 октября мы хотим собрать рядом самых дорогих
            людей и разделить с вами начало нашей общей истории.
          </p>
        </Reveal>

        <Reveal variant="up" delay={120}>
          <div className="story-photo-wrap">
            <div className="story-photo" onClick={() => setOpen(true)}>
              <Photo src={photo.src} label={photo.label} />
              <span className="cap">{photo.cap}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className={`lightbox ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
        <button className="lb-close" aria-label="Закрыть" onClick={() => setOpen(false)}>×</button>
        <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
          {open && <Photo src={photo.src} label={photo.label} />}
          {open && <p className="lb-cap">{photo.cap}</p>}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROGRAM timeline
   ============================================================ */
const PROGRAM = [
  { time: "13:30", title: "Заключение брака", desc: "Грибоедовский ЗАГС №1 · Малый Харитоньевский пер., 10" },
  { time: "14:30", title: "Сбор гостей и фуршет", desc: "Welcome-напитки в усадьбе на Новой Басманной" },
  { time: "15:00", title: "Банкет", desc: "Праздничный ужин под живой рояль" },
  { time: "22:00", title: "Завершение вечера", desc: "Провожаем этот тёплый день вместе" },
];

function Program() {
  return (
    <section className="section bg-marble" id="program" data-screen-label="Программа дня">
      <Dandelion className="sec-sketch dandelion" style={{ top: "7%", right: "7%" }} />
      <div className="wrap">
        <SecHead eyebrow="Тайминг" title="Программа дня" />
        <div className="timeline">
          {PROGRAM.map((p, i) => (
            <Reveal className="tl-item" variant="left" delay={i * 80} key={i}>
              <span className="tl-dot"><Fleuron /></span>
              <div className="tl-time">{p.time}</div>
              <div className="tl-title">{p.title}</div>
              <div className="tl-desc">{p.desc}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
window.Countdown = Countdown;
window.Story = Story;
window.Program = Program;
