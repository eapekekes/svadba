/* ============================================================
   sections2.jsx — Venue, Dress code, RSVP, Gifts, Footer
   ============================================================ */
const { Reveal: Rv, SecHead: SH } = window;
const { useState: uS, useEffect: uE } = React;
const { Chandelier, ClosingScene } = window;

/* ============================================================
   VENUE — chandelier + address + maps
   ============================================================ */
const Q = encodeURIComponent("Новая Басманная улица 19 строение 1 Москва");
const YANDEX = `https://yandex.ru/maps/?text=${Q}`;
const GOOGLE = `https://www.google.com/maps/search/?api=1&query=${Q}`;

function Venue() {
  return (
    <section className="section venue" id="venue" data-screen-label="Место проведения">
      <div className="wrap">
        <SH eyebrow="Место проведения" title="Локация" />
        <div className="venue-grid">
          <Rv variant="left">
            <div className="venue-art">
              <Chandelier className="venue-chandelier" />
            </div>
          </Rv>
          <Rv variant="right" delay={100}>
            <div className="venue-info">
              <p className="eyebrow">11 октября · сбор гостей в 14:30</p>
              <h3 className="venue-name">Усадьба на Новой Басманной</h3>
              <p className="venue-addr">
                Наше торжество пройдёт в старинной усадьбе с тонкой лепниной,
                хрустальной люстрой и живым роялем, по адресу:<br />
                <strong>г. Москва, Новая Басманная ул., 19 стр. 1</strong>
              </p>
              <div className="venue-maps">
                <a className="btn btn-gold" href={YANDEX} target="_blank" rel="noopener">Яндекс.Карты</a>
                <a className="btn btn-ghost" href={GOOGLE} target="_blank" rel="noopener">Google Maps</a>
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
            Самый дорогой подарок для нас — это вы рядом в этот день. Дарить цветы и
            букеты, пожалуйста, не нужно.
          </p>
          <p className="gift-text" style={{ marginTop: 14, fontStyle: "italic" }}>
            Если же вам захочется нас порадовать, мы будем благодарны за вклад деньгами
            в наше общее будущее и свадебное путешествие.
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
        <ClosingScene />
        <div className="f-mono">Ждём вас, дорогие</div>
        <div className="f-date">11 · 10 · 2026 · Москва</div>
        <div className="f-sign">С любовью, Егор и Анастасия</div>
      </Rv>
    </footer>
  );
}

Object.assign(window, { Venue, DressCode, Rsvp, Gifts, Footer });
