// Register now: corner pop-up on laptop, bottom sheet on mobile.
// The Tally iframe is mounted on page load (hidden) so it's ready the moment someone clicks.

const ROLES = ["Software Developer", "Data Science Professional", "Designer", "Startup Founder", "Management Professional", "Product Manager", "Marketing Professional", "Student", "Others"];
const BANDS = ["<1 years", "1-2 years", "2-4 years", "4-8 years", "8+ years"];

function trackLead() {
  if (window.fbq) window.fbq("track", "Lead");
  if (window.gtag) window.gtag("event", "generate_lead", { form: "masterclass" });
}

// Loads the form directly (not through Tally's embed.js, which skips hidden iframes)
// so it's ready before anyone clicks. Height and submit come from the iframe's messages.
function TallyEmbed({ formId, landingPage, onSubmit }) {
  const [src] = React.useState(() => {
    const params = window.hxTrackingParams ? window.hxTrackingParams(landingPage) : new URLSearchParams();
    ["alignLeft", "hideTitle", "transparentBackground", "dynamicHeight"].forEach((k) => params.set(k, "1"));
    return `https://tally.so/embed/${formId}?${params.toString()}`;
  });
  const [height, setHeight] = React.useState(360);

  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.origin !== "https://tally.so" || typeof e.data !== "string") return;
      // iframe-resizer format: "[iFrameSizer]<id>:<height>:<width>:<type>"
      if (e.data.startsWith("[iFrameSizer]")) {
        const h = parseFloat(e.data.split(":")[1]);
        if (h > 0) setHeight(Math.ceil(h));
      } else if (e.data.includes("Tally.FormSubmitted")) {
        onSubmit();
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  // The form only reports its height after this iframe-resizer handshake (what embed.js would send).
  const handshake = (e) =>
    e.currentTarget.contentWindow.postMessage("[iFrameSizer]iFrameResizer0:8:false:false:32:true:true:null:bodyOffset:null:null:0:false:parent:scroll:true", "https://tally.so");

  return <iframe src={src} onLoad={handshake} width="100%" height={height} frameBorder="0" scrolling="no" title="Register" style={{ transition: "height 0.2s" }} />;
}

// Stand-in with the same fields and c09 logic, shown only while tallyFormId is null.
function StandInForm({ onSubmit, note }) {
  const [step, setStep] = React.useState(1);
  const [v, setV] = React.useState({ first: "", last: "", email: "", phone: "", other: "", college: "" });
  const [role, setRole] = React.useState("");
  const [yoe, setYoe] = React.useState("");
  const [err, setErr] = React.useState("");
  const set = (k) => (e) => { setV({ ...v, [k]: e.target.value }); setErr(""); };
  const pickRole = (r) => {
    setRole(r); setErr("");
    if (r === "Student" ? yoe !== "Student" : yoe === "Student") setYoe("");
  };

  const next = () => {
    if (!v.first || !v.last || !v.email || !v.phone) return setErr("Fill in all four fields");
    if (!/^\S+@\S+\.\S+$/.test(v.email)) return setErr("That email doesn't look right");
    setStep(2);
  };
  const submit = () => {
    if (!role) return setErr("Pick your current role");
    if (role === "Others" && !v.other) return setErr("Tell us your role");
    if (role === "Student" && !v.college) return setErr("Add your college name");
    if (!yoe) return setErr("Pick your years of experience");
    onSubmit();
  };

  return (
    <div className="sf">
      <p className="reg-note">{note}</p>
      <div className="sf-steps"><div className="on" /><div className={step === 2 ? "on" : ""} /></div>
      {step === 1 ? (
        <>
          <div className="sf-row">
            <div><label>First name</label><input value={v.first} onChange={set("first")} autoComplete="given-name" /></div>
            <div><label>Last name</label><input value={v.last} onChange={set("last")} autoComplete="family-name" /></div>
          </div>
          <label>Email address</label>
          <input type="email" value={v.email} onChange={set("email")} placeholder="Your Zoom link goes here" autoComplete="email" />
          <label>Phone number</label>
          <input type="tel" value={v.phone} onChange={set("phone")} placeholder="For reminders" autoComplete="tel" />
          <p className="err">{err}</p>
          <button className="btn" style={{ width: "100%" }} onClick={next}>Next →</button>
        </>
      ) : (
        <>
          <label>Current role</label>
          <div className="opts">{ROLES.map((r) => <button key={r} className={"opt" + (r === role ? " on" : "")} onClick={() => pickRole(r)}>{r}</button>)}</div>
          {role === "Others" && <><label>If others, please specify</label><input value={v.other} onChange={set("other")} /></>}
          {role === "Student" && <><label>College name</label><input value={v.college} onChange={set("college")} /></>}
          {role && (
            <>
              <label>Years of experience</label>
              <div className="opts">{(role === "Student" ? ["Student"] : BANDS).map((b) => <button key={b} className={"opt" + (b === yoe ? " on" : "")} onClick={() => { setYoe(b); setErr(""); }}>{b}</button>)}</div>
            </>
          )}
          <p className="err">{err}</p>
          <div className="row-btns">
            <button className="btn btn-ghost" style={{ flex: "none" }} onClick={() => setStep(1)}>Back</button>
            <button className="btn" onClick={submit}>Reserve my spot</button>
          </div>
        </>
      )}
    </div>
  );
}

function RegisterWidget({ formId, fallbackNote, button, buttonDone, panelTitle, panelSub, mobileBarLine }) {
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  // Fallback for landing_page when the URL has none (someone opened /masterclass directly).
  const [from, setFrom] = React.useState("masterclass_page");

  React.useEffect(() => {
    const onOpen = (e) => { setFrom((e.detail && e.detail.from) || "register_button"); setOpen(true); };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("hx:open-register", onOpen);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("hx:open-register", onOpen); window.removeEventListener("keydown", onKey); };
  }, []);

  const panelRef = React.useRef(null);

  // Lock page scroll only for the mobile sheet; on laptop the page keeps scrolling.
  // The closed panel stays rendered (so Tally can preload) but inert, so it can't be tabbed into.
  React.useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    document.body.classList.toggle("sheet-open", open && mobile);
    if (panelRef.current) panelRef.current.inert = !open;
  }, [open]);

  const handleDone = () => { setDone(true); trackLead(); };

  return (
    <>
      <div className={"reg-launch" + (open ? " hide" : "")}>
        <span className="line">{mobileBarLine}</span>
        <button className="btn" onClick={() => { setFrom("register_button"); setOpen(true); }}>{done ? buttonDone : button}</button>
      </div>
      <div className={"reg-backdrop" + (open ? " open" : "")} onClick={() => setOpen(false)} />
      <div ref={panelRef} className={"reg-panel" + (open ? " open" : "")} role="dialog" aria-label={panelTitle} aria-hidden={!open}>
        <div className="reg-handle" />
        <div className="reg-head">
          <h3>{panelTitle}</h3>
          <button className="reg-x" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        </div>
        <p className="reg-sub">{panelSub}</p>
        {done ? (
          <div className="reg-done">
            <div className="tick">✓</div>
            <h3>You're in!</h3>
            <p style={{ color: "var(--muted)", margin: "8px 0 16px" }}>Check your email for the Zoom link.</p>
            <button className="btn btn-ghost" onClick={() => setOpen(false)}>Back to the page</button>
          </div>
        ) : formId ? (
          <TallyEmbed formId={formId} landingPage={from} onSubmit={handleDone} />
        ) : (
          <StandInForm onSubmit={handleDone} note={fallbackNote} />
        )}
      </div>
    </>
  );
}

window.RegisterWidget = RegisterWidget;
