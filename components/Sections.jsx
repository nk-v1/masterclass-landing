// Page sections. Each one takes its slice of content.js as props, so in Framer
// each becomes its own code component with matching property controls.

const openRegister = (from) =>
  window.dispatchEvent(new CustomEvent("hx:open-register", { detail: { from } }));

function Hero({ tag, title, hook, chips, cta, bar }) {
  const words = title.split(" ");
  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="label live-tag"><span className="live-dot" />{tag}</p>
          <h1>{words.slice(0, -2).join(" ")} <span>{words.slice(-2).join(" ")}</span></h1>
          <p className="hero-hook">{hook}</p>
          <div className="chips">
            {chips.map((c, i) => <span key={c} className={"chip" + (i === chips.length - 1 ? " hot" : "")}>{c}</span>)}
          </div>
          <div className="hero-cta">
            <button className="btn" onClick={() => openRegister("hero")}>{cta} →</button>
            <span className="hero-note">Zoom link sent by email</span>
          </div>
        </div>
        <div className="card bar-card">
          <p className="label">Where a Claude session's cost goes</p>
          <div className="big">{bar.readPct}%</div>
          <p>goes to {bar.readLabel.toLowerCase()}.</p>
          <div className="bar">
            <div className="read" style={{ width: bar.readPct + "%" }}>{bar.readPct}%</div>
            <div className="write" style={{ width: bar.writePct + "%" }}>{bar.writePct}%</div>
          </div>
          <div className="bar-legend"><span>{bar.readLabel}</span><span>{bar.writeLabel}</span></div>
        </div>
      </div>
    </header>
  );
}

function Learn({ label, items }) {
  return (
    <section className="section">
      <div className="wrap">
        <p className="label">{label}</p>
        <h2>3 things you'll leave with</h2>
        <div className="learn-grid">
          {items.map((it) => (
            <article key={it.n} className="card learn-card">
              <span className="n">{it.n}</span>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why({ label, lines, plans }) {
  const [before, punch, after] = lines;
  return (
    <section className="section why">
      <div className="wrap why-grid">
        <div>
          <p className="label">{label}</p>
          <p className="punch">The real cost sits in <span>what it reads.</span></p>
        </div>
        <div>
          <p>{before}</p>
          <p>{after}</p>
          <div className="plans">{plans.map((p) => <span key={p} className="chip">{p}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

function Instructor({ label, name, role, photo, points }) {
  const initials = name.split(" ").map((w) => w[0]).join("");
  return (
    <section className="section">
      <div className="wrap">
        <p className="label">{label}</p>
        <div className="card inst">
          <div className="inst-photo">{photo ? <img src={photo} alt={name} /> : initials}</div>
          <div>
            <h2>{name}</h2>
            <p className="inst-role">{role}</p>
            <ul>{points.map((p) => <li key={p}>{p}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq({ label, items }) {
  return (
    <section className="section">
      <div className="wrap">
        <p className="label">{label}</p>
        <h2>Before you sign up</h2>
        <div className="faq">
          {items.map((it) => (
            <details key={it.q} className="card">
              <summary>{it.q}</summary>
              <p className="a">{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Closing({ title, cta, chips }) {
  return (
    <section className="closing">
      <div className="wrap">
        <h2>{title}</h2>
        <p>{chips.join(" · ")}</p>
        <button className="btn" onClick={() => openRegister("closing")}>{cta} →</button>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Learn, Why, Instructor, Faq, Closing, openRegister });
