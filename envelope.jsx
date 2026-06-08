/* ============================================================
   envelope.jsx — InvitationCover + premium white EnvelopeIntro
   ============================================================ */
const { useState: eS } = React;
const { LaurelSeal, Dove, RibbonBow, BotanicalCorner } = window;

const InvitationCover = React.forwardRef(function InvitationCover(
  { className = "", play = false, mini = false },
  ref
) {
  const cls = [
    "invitation-cover",
    className,
    mini ? "invitation-cover--mini" : "",
    play ? "play" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={cls} ref={ref}>
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
  );
});

function EnvelopeIntro({ onOpen }) {
  const [phase, setPhase] = eS("idle");

  const open = () => {
    if (phase !== "idle") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("opening");
    setTimeout(() => {
      setPhase("gone");
      onOpen();
    }, reduce ? 450 : 5800);
  };

  const cls = [
    "intro",
    phase === "opening" ? "is-opening" : "",
    phase === "gone" ? "is-gone" : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={cls}>
      <div className="env env--premium">
        <div className="env__stage">
          <div className="env__shadow" aria-hidden="true" />
          <div className="env__cavity" aria-hidden="true">
            <div className="env__inner-shadow" aria-hidden="true" />
            <div className="env__card-wrap">
              <InvitationCover mini />
            </div>
          </div>

          <div className="env__back" aria-hidden="true" />
          <div className="env__side env__side--l" aria-hidden="true" />
          <div className="env__side env__side--r" aria-hidden="true" />

          <div className="env__body">
            <span className="env__hint">нажмите на печать</span>
          </div>
          <div className="env__lip" aria-hidden="true" />

          <div className="env__flap" aria-hidden="true" />

          <svg className="env__folds" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line className="env__fold env__fold--shadow" x1="0" y1="0" x2="50" y2="44" />
            <line className="env__fold env__fold--shadow env__fold--right" x1="100" y1="0" x2="50" y2="44" />
            <line className="env__fold env__fold--hi" x1="0" y1="0" x2="50" y2="44" />
            <line className="env__fold env__fold--hi env__fold--right" x1="100" y1="0" x2="50" y2="44" />
          </svg>

          <div className="env__texture" aria-hidden="true" />

          <button className="env__seal" onClick={open} aria-label="Открыть приглашение">
            <LaurelSeal />
          </button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { InvitationCover, EnvelopeIntro });
