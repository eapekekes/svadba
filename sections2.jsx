/* ============================================================
   sections2.jsx — Venue, Dress code, RSVP, Gifts, Footer
   ============================================================ */
const { Reveal: Rv, SecHead: SH, Placeholder: PH, Photo: Img, useParallax: useP } = window;
const { useState: uS, useEffect: uE } = React;

/* ============================================================
   VENUE + MAP
   ============================================================ */
const ADDR = "Новая Басманная ул., 19стр1, Москва, 107078";
const Q = encodeURIComponent("Новая Басманная улица 19 строение 1 Москва");
const YANDEX = `https://yandex.ru/maps/?text=${Q}`;
const GOOGLE = `https://www.google.com/maps/search/?api=1&query=${Q}`;

function MapArt() {
  return (
    <svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="600" height="240" fill="#f3ede2" />
      {/* river / park hint */}
      <path d="M-20 60 C120 30 200 120 360 90 C460 70 540 110 620 80 L620 0 L-20 0 Z" fill="rgba(138,154,123,.10)" />
      {/* roads */}
      <g stroke="#e0d4be" strokeWidth="14" fill="none" strokeLinecap="round">
        <path d="M-10 150 L610 120" />
        <path d="M120 -10 L150 250" />
        <path d="M420 -10 L390 250" />
        <path d="M-10 200 L300 185 L610 210" />
      </g>
      <g stroke="#ece2cf" strokeWidth="5" fill="none">
        <path d="M-10 95 L610 70" />
        <path d="M260 -10 L280 250" />
      </g>
      {/* blocks */}
      <g fill="rgba(201,162,107,.10)">
        <rect x="170" y="135" width="70" height="40" rx="4" />
        <rect x="300" y="130" width="60" height="38" rx="4" />
        <rect x="180" y="55" width="55" height="30" rx="4" />
        <rect x="330" y="50" width="48" height="28" rx="4" />
      </g>
    </svg>
  );
}

function Venue() {
  const photos = useP(0.08);
  return (
    <section className="section venue" id="venue" data-screen-label="Место проведения">
      <div className="wrap">
        <SH eyebrow="Место проведения" title="Старинная усадьба" />
        <div className="venue-grid">
          <Rv variant="left">
            <div className="venue-photos" ref={photos}>
              <Img className="wide" src="images/venue/hall-main.jpg" label="зал · общий вид" />
              <Img src="images/venue/hall-ceiling.jpg" label="лепнина · потолок" />
              <Img src="images/venue/hall-piano.jpg" label="рояль · зеркала" />
            </div>
          </Rv>
          <Rv variant="right" delay={100}>
            <div className="venue-info">
              <p className="eyebrow">11 октября · 15:00</p>
              <h3 className="venue-name display">Усадьба на Новой Басманной</h3>
              <p className="venue-addr">{ADDR}</p>
              <p className="lead" style={{ marginTop: 18, fontSize: "clamp(18px,4.4vw,21px)" }}>
                Высокие потолки и тонкая лепнина, хрустальная люстра, старинные зеркала
                и живой рояль — атмосфера, в которой каждый момент станет особенным.
              </p>
              <ul className="venue-feats">
                <li>Лепнина и высокие потолки</li>
                <li>Хрустальная люстра</li>
                <li>Зеркальный зал</li>
                <li>Живой рояль</li>
              </ul>

              <div className="map-card">
                <div className="map-canvas">
                  <MapArt />
                  <svg className="map-pin" viewBox="0 0 34 34" aria-hidden="true">
                    <path d="M17 2C10.9 2 6 6.9 6 13c0 7.5 11 19 11 19s11-11.5 11-19C28 6.9 23.1 2 17 2z"
                      fill="#ac8748" stroke="#fff8ec" strokeWidth="1.5" />
                    <circle cx="17" cy="13" r="4.2" fill="#fff8ec" />
                  </svg>
                </div>
                <div className="map-actions">
                  <a className="btn btn-gold" href={YANDEX} target="_blank" rel="noopener">Яндекс.Карты</a>
                  <a className="btn btn-ghost" href={GOOGLE} target="_blank" rel="noopener">Google Maps</a>
                </div>
              </div>
            </div>
          </Rv>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DRESS CODE
   ============================================================ */
function DressCode() {
  return (
    <section className="section bg-marble dress" id="dress" data-screen-label="Дресс-код">
      <div className="wrap">
        <SH eyebrow="Дресс-код" title="Только одна просьба" />
        <Rv variant="up" className="narrow">
          <p className="lead">
            Строгой палитры у нас нет — выбирайте наряд, в котором вам красиво,
            удобно и празднично. Любые цвета, которые вы любите.
          </p>
        </Rv>

        <Rv variant="scale" delay={120}>
          <div className="nowhite" aria-hidden="true">
            <div className="nowhite-chip"><span className="bar"></span></div>
          </div>
        </Rv>

        <Rv variant="fade" delay={220}>
          <p className="dress-quote display">Белый оставим невесте</p>
        </Rv>
      </div>
    </section>
  );
}

/* ============================================================
   RSVP
   ============================================================ */
const RSVP_KEY = "svadba_rsvp_v1";

function Rsvp() {
  const [name, setName] = uS("");
  const [plus, setPlus] = uS(false);
  const [plusName, setPlusName] = uS("");
  const [attend, setAttend] = uS(null); // 'yes' | 'no'
  const [err, setErr] = uS({});
  const [saved, setSaved] = uS(null);

  uE(() => {
    try {
      const raw = localStorage.getItem(RSVP_KEY);
      if (raw) setSaved(JSON.parse(raw));
    } catch (e) {}
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!name.trim()) er.name = "Пожалуйста, укажите имя и фамилию";
    if (!attend) er.attend = "Выберите вариант";
    if (plus && attend === "yes" && !plusName.trim()) er.plusName = "Укажите имя спутника";
    setErr(er);
    if (Object.keys(er).length) return;
    const data = { name: name.trim(), plus: plus && attend === "yes", plusName: plusName.trim(), attend, at: Date.now() };
    try { localStorage.setItem(RSVP_KEY, JSON.stringify(data)); } catch (e) {}
    setSaved(data);
  };

  const reset = () => {
    setSaved(null);
    if (saved) { setName(saved.name); setPlus(saved.plus); setPlusName(saved.plusName); setAttend(saved.attend); }
  };

  return (
    <section className="section rsvp" id="rsvp" data-screen-label="RSVP">
      <div className="wrap">
        <SH eyebrow="Подтверждение" title="Будете с нами?" />
        {!saved && (
          <Rv variant="up" className="narrow" style={{ textAlign: "center" }}>
            <p className="lead">Пожалуйста, подтвердите своё присутствие до 1 сентября 2026 — нам важно знать, что вы будете рядом.</p>
          </Rv>
        )}

        {saved ? (
          <Rv variant="scale">
            <div className="rsvp-card">
              <div className="rsvp-done">
                <div className="stamp">{saved.attend === "yes" ? "Е&А" : "♥"}</div>
                {saved.attend === "yes" ? (
                  <React.Fragment>
                    <h3 className="display">Спасибо, {saved.name.split(" ")[0]}!</h3>
                    <p>Мы счастливы, что вы будете с нами{saved.plus && saved.plusName ? ` вместе с ${saved.plusName}` : ""}. До встречи 11 октября!</p>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <h3 className="display">Будем скучать</h3>
                    <p>Спасибо, что дали знать, {saved.name.split(" ")[0]}. Будем вспоминать вас в этот день.</p>
                  </React.Fragment>
                )}
                <button className="edit" onClick={reset}>Изменить ответ</button>
              </div>
            </div>
          </Rv>
        ) : (
          <Rv variant="up" delay={100}>
            <form className="rsvp-card" onSubmit={submit} noValidate>
              <div className={`field ${err.name ? "err" : ""}`}>
                <label>Имя и фамилия</label>
                <input type="text" value={name} placeholder="Например, Анна Иванова"
                  onChange={(e) => setName(e.target.value)} />
                {err.name && <div className="err-msg">{err.name}</div>}
              </div>

              <div className="field">
                <label>Сможете прийти?</label>
                <div className="choice">
                  <button type="button" className={`yes ${attend === "yes" ? "sel" : ""}`}
                    onClick={() => setAttend("yes")}>Да, приду</button>
                  <button type="button" className={`no ${attend === "no" ? "sel" : ""}`}
                    onClick={() => setAttend("no")}>К сожалению, нет</button>
                </div>
                {err.attend && <div className="err-msg">{err.attend}</div>}
              </div>

              {attend === "yes" && (
                <div className="field" style={{ marginBottom: 8 }}>
                  <div className="plus-row">
                    <span className="pl-txt">Буду со спутником (+1)</span>
                    <div className={`toggle ${plus ? "on" : ""}`} onClick={() => setPlus(!plus)} role="switch" aria-checked={plus}>
                      <span className="knob"></span>
                    </div>
                  </div>
                  <div className={`plus-field ${plus ? "open" : ""}`}>
                    <input type="text" value={plusName} placeholder="Имя и фамилия спутника"
                      onChange={(e) => setPlusName(e.target.value)} />
                    {err.plusName && <div className="err-msg">{err.plusName}</div>}
                  </div>
                </div>
              )}

              <button className="btn btn-gold" type="submit">Отправить ответ</button>
            </form>
          </Rv>
        )}
      </div>
    </section>
  );
}

/* ============================================================
   GIFTS
   ============================================================ */
function Gifts() {
  return (
    <section className="section bg-marble gifts" id="gifts" data-screen-label="Пожелания">
      <div className="wrap narrow">
        <SH eyebrow="Пожелания" title="О подарках" />
        <Rv variant="up">
          <div className="gift-icon">✣</div>
          <p className="gift-text">
            Самый дорогой подарок для нас — это вы рядом в этот день. Если же вам
            захочется нас порадовать, мы будем благодарны за вклад в наше общее будущее
            и маленькое свадебное путешествие.
          </p>
          <p className="gift-text" style={{ marginTop: 14, fontStyle: "italic" }}>
            А вместо большого букета будем рады одной любимой розе — её проще донести
            до конца вечера и легко увезти домой.
          </p>
        </Rv>
      </div>
    </section>
  );
}

/* ============================================================
   FOOTER
   ============================================================ */
function Footer() {
  return (
    <footer className="footer" data-screen-label="Подвал">
      <Rv variant="scale">
        <div className="f-mono">Е &amp; А</div>
        <div className="f-date">11 · 10 · 2026 · Москва</div>
        <div className="f-sign">С любовью ждём вас — Егор и Анастасия</div>
      </Rv>
    </footer>
  );
}

Object.assign(window, { Venue, DressCode, Rsvp, Gifts, Footer });
