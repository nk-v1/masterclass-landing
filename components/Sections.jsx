// Page sections. Each one takes its slice of the webinar file (or site.js) as props, so in
// Framer each becomes its own code component with matching property controls.

const openRegister = (from) =>
  window.dispatchEvent(new CustomEvent("hx:open-register", { detail: { from } }));

function Nav({ home, cta }) {
  return (
    <nav className="nav">
      <div className="wrap nav-row">
        <a className="logo" href={home} aria-label="100xEngineers home">100<span>x</span>Engineers</a>
        <a className="btn btn-sm" href={cta.href}>{cta.label}</a>
      </div>
    </nav>
  );
}

function HeroVisual({ visual }) {
  if (!visual) return null;
  if (visual.type === "stat") {
    return (
      <div className="card bar-card">
        <p className="label">{visual.label}</p>
        <div className="big">{visual.value}%</div>
        <p>{visual.caption}</p>
        <div className="bar">
          {visual.bar.map((b, i) => (
            <div key={b.label} className={i === 0 ? "read" : "write"} style={{ width: b.pct + "%" }}>{b.pct}%</div>
          ))}
        </div>
        <div className="bar-legend">{visual.bar.map((b) => <span key={b.label}>{b.label}</span>)}</div>
      </div>
    );
  }
  return (
    <div className="card bar-card">
      <p className="label">{visual.label}</p>
      <h3 className="list-title">{visual.title}</h3>
      <ul className="hero-list">{visual.items.map((it) => <li key={it}>{it}</li>)}</ul>
    </div>
  );
}

function Hero({ tag, title, highlightLastWords = 2, hook, chips, cta, visual }) {
  const words = title.split(" ");
  const cut = Math.max(0, words.length - highlightLastWords);
  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="label live-tag"><span className="live-dot" />{tag}</p>
          <h1>{words.slice(0, cut).join(" ")} <span>{words.slice(cut).join(" ")}</span></h1>
          <p className="hero-hook">{hook}</p>
          <div className="chips">
            {chips.map((c, i) => <span key={c} className={"chip" + (i === chips.length - 1 ? " hot" : "")}>{c}</span>)}
          </div>
          <div className="hero-cta">
            <button className="btn" data-open onClick={() => openRegister("hero")}>{cta} →</button>
            <span className="hero-note">Zoom link sent by email</span>
          </div>
        </div>
        <HeroVisual visual={visual} />
      </div>
    </header>
  );
}

function Learn({ label, heading, items }) {
  return (
    <section className="section">
      <div className="wrap">
        <p className="label">{label}</p>
        <h2>{heading}</h2>
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

function Why({ label, punch, punchHighlight, lines, tags = [] }) {
  return (
    <section className="section why">
      <div className="wrap why-grid">
        <div>
          <p className="label">{label}</p>
          <p className="punch">{punch} <span>{punchHighlight}</span></p>
        </div>
        <div>
          {lines.map((l) => <p key={l}>{l}</p>)}
          {tags.length > 0 && <div className="plans">{tags.map((p) => <span key={p} className="chip">{p}</span>)}</div>}
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

function Faq({ label, heading, items }) {
  return (
    <section className="section">
      <div className="wrap">
        <p className="label">{label}</p>
        <h2>{heading}</h2>
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
        <button className="btn" data-open onClick={() => openRegister("closing")}>{cta} →</button>
      </div>
    </section>
  );
}

function Footer({ links, contacts, socials, copyright }) {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div>
          <a className="logo logo-light" href="https://www.100xengineers.com/">100<span>x</span>Engineers</a>
          <div className="footer-socials">{socials.map((s) => <a key={s.label} href={s.href}>{s.label}</a>)}</div>
        </div>
        <ul className="footer-links">{links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
        <div className="footer-contacts">
          {contacts.map((c) => (
            <p key={c.value}><span>{c.label}</span><a href={c.href}>{c.value}</a></p>
          ))}
        </div>
      </div>
      <div className="wrap footer-copy">{copyright}</div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, Learn, Why, Instructor, Faq, Closing, Footer, openRegister });
