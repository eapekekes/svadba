/* ============================================================
   sections.jsx — page sections for the wedding landing
   ============================================================ */
const { Reveal, Ornament, SecHead, Placeholder, Photo, useCountdown, useParallax } = window;
const { useState: useS, useEffect: useE, useRef: useR } = React;

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  const ringA = useParallax(0.18);
  const ringB = useParallax(0.26);
  const inner = useParallax(-0.06);
  return (
    <header className="hero bg-marble" id="top" data-screen-label="Обложка">
      <div className="frame">
        <span className="corner tl"></span><span className="corner tr"></span>
        <span className="corner bl"></span><span className="corner br"></span>
      </div>
      <div className="deco ring a" ref={ringA}></div>
      <div className="deco ring b" ref={ringB}></div>

      <div className="hero-inner" ref={inner}>
        <Reveal className="kicker" variant="fade" delay={150}>
          <p className="eyebrow">Приглашение на свадьбу</p>
        </Reveal>
        <Reveal variant="up" delay={300}>
          <h1 className="names display">
            <span className="nm">Егор</span>
            <span className="amp">и</span>
            <span className="nm">Анастасия</span>
          </h1>
        </Reveal>
        <Reveal variant="up" delay={550}>
          <p className="meta">
            11 октября 2026
            <span className="city">Москва</span>
          </p>
        </Reveal>
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
   STORY + GALLERY
   ============================================================ */
const GALLERY = [
  { cls: "g-a", cap: "Как всё начиналось", src: "images/couple/photo-1.jpg", label: "фото пары · горизонт. 4:3" },
  { cls: "g-b", cap: "Первое свидание", src: "images/couple/photo-2.jpg", label: "фото · портрет 3:4" },
  { cls: "g-c", cap: "Наши путешествия", src: "images/couple/photo-3.jpg", label: "фото · портрет 3:4" },
  { cls: "g-d", cap: "Помолвка", src: "images/couple/photo-4.jpg", label: "фото · квадрат 1:1" },
  { cls: "g-e", cap: "Просто мы", src: "images/couple/photo-5.jpg", label: "фото · квадрат 1:1" },
];

function Story() {
  const [lb, setLb] = useS(-1);
  const open = lb >= 0;

  useE(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLb(-1);
      if (e.key === "ArrowRight") setLb((i) => (i + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setLb((i) => (i - 1 + GALLERY.length) % GALLERY.length);
    };
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
          <div className="gallery">
            {GALLERY.map((g, i) => (
              <div className={`g-item ${g.cls}`} key={i} onClick={() => setLb(i)}>
                <Photo src={g.src} label={g.label} />
                <span className="cap">{g.cap}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <div className={`lightbox ${open ? "open" : ""}`} onClick={() => setLb(-1)}>
        <button className="lb-close" aria-label="Закрыть" onClick={() => setLb(-1)}>×</button>
        <button className="lb-nav lb-prev" aria-label="Назад" onClick={(e) => { e.stopPropagation(); setLb((i) => (i - 1 + GALLERY.length) % GALLERY.length); }}>‹</button>
        <button className="lb-nav lb-next" aria-label="Вперёд" onClick={(e) => { e.stopPropagation(); setLb((i) => (i + 1) % GALLERY.length); }}>›</button>
        <div className="lb-stage" onClick={(e) => e.stopPropagation()}>
          {open && <Photo src={GALLERY[lb].src} label={GALLERY[lb].label} />}
          {open && <p className="lb-cap">{GALLERY[lb].cap}</p>}
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
      <div className="wrap">
        <SecHead eyebrow="Тайминг" title="Программа дня" />
        <div className="timeline">
          {PROGRAM.map((p, i) => (
            <Reveal className="tl-item" variant="left" delay={i * 80} key={i}>
              <span className="tl-dot"></span>
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
