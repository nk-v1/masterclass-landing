const ROLES = ["Software Developer", "Data Science Professional", "Designer", "Startup Founder", "Management Professional", "Product Manager", "Marketing Professional", "Student", "Others"];
const BANDS = ["<1 years", "1-2 years", "2-4 years", "4-8 years", "8+ years"];
function trackLead() {
  if (window.fbq) window.fbq("track", "Lead");
  if (window.gtag) window.gtag("event", "generate_lead", { form: "masterclass" });
}
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
  const handshake = (e) => e.currentTarget.contentWindow.postMessage("[iFrameSizer]iFrameResizer0:8:false:false:32:true:true:null:bodyOffset:null:null:0:false:parent:scroll:true", "https://tally.so");
  return /* @__PURE__ */ React.createElement("iframe", { src, onLoad: handshake, width: "100%", height, frameBorder: "0", scrolling: "no", title: "Register", style: { transition: "height 0.2s" } });
}
function StandInForm({ onSubmit, note }) {
  const [step, setStep] = React.useState(1);
  const [v, setV] = React.useState({ first: "", last: "", email: "", phone: "", other: "", college: "" });
  const [role, setRole] = React.useState("");
  const [yoe, setYoe] = React.useState("");
  const [err, setErr] = React.useState("");
  const set = (k) => (e) => {
    setV({ ...v, [k]: e.target.value });
    setErr("");
  };
  const pickRole = (r) => {
    setRole(r);
    setErr("");
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
  return /* @__PURE__ */ React.createElement("div", { className: "sf" }, /* @__PURE__ */ React.createElement("p", { className: "reg-note" }, note), /* @__PURE__ */ React.createElement("div", { className: "sf-steps" }, /* @__PURE__ */ React.createElement("div", { className: "on" }), /* @__PURE__ */ React.createElement("div", { className: step === 2 ? "on" : "" })), step === 1 ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "sf-row" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", null, "First name"), /* @__PURE__ */ React.createElement("input", { value: v.first, onChange: set("first"), autoComplete: "given-name" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("label", null, "Last name"), /* @__PURE__ */ React.createElement("input", { value: v.last, onChange: set("last"), autoComplete: "family-name" }))), /* @__PURE__ */ React.createElement("label", null, "Email address"), /* @__PURE__ */ React.createElement("input", { type: "email", value: v.email, onChange: set("email"), placeholder: "Your Zoom link goes here", autoComplete: "email" }), /* @__PURE__ */ React.createElement("label", null, "Phone number"), /* @__PURE__ */ React.createElement("input", { type: "tel", value: v.phone, onChange: set("phone"), placeholder: "For reminders", autoComplete: "tel" }), /* @__PURE__ */ React.createElement("p", { className: "err" }, err), /* @__PURE__ */ React.createElement("button", { className: "btn", style: { width: "100%" }, onClick: next }, "Next \u2192")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", null, "Current role"), /* @__PURE__ */ React.createElement("div", { className: "opts" }, ROLES.map((r) => /* @__PURE__ */ React.createElement("button", { key: r, className: "opt" + (r === role ? " on" : ""), onClick: () => pickRole(r) }, r))), role === "Others" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", null, "If others, please specify"), /* @__PURE__ */ React.createElement("input", { value: v.other, onChange: set("other") })), role === "Student" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", null, "College name"), /* @__PURE__ */ React.createElement("input", { value: v.college, onChange: set("college") })), role && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", null, "Years of experience"), /* @__PURE__ */ React.createElement("div", { className: "opts" }, (role === "Student" ? ["Student"] : BANDS).map((b) => /* @__PURE__ */ React.createElement("button", { key: b, className: "opt" + (b === yoe ? " on" : ""), onClick: () => {
    setYoe(b);
    setErr("");
  } }, b)))), /* @__PURE__ */ React.createElement("p", { className: "err" }, err), /* @__PURE__ */ React.createElement("div", { className: "row-btns" }, /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", style: { flex: "none" }, onClick: () => setStep(1) }, "Back"), /* @__PURE__ */ React.createElement("button", { className: "btn", onClick: submit }, "Reserve my spot"))));
}
function RegisterWidget({ formId, fallbackNote, button, buttonDone, panelTitle, panelSub, mobileBarLine }) {
  const [open, setOpen] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [from, setFrom] = React.useState("masterclass_page");
  React.useEffect(() => {
    const onOpen = (e) => {
      setFrom(e.detail && e.detail.from || "register_button");
      setOpen(true);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("hx:open-register", onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("hx:open-register", onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);
  const panelRef = React.useRef(null);
  React.useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    document.body.classList.toggle("sheet-open", open && mobile);
    if (panelRef.current) panelRef.current.inert = !open;
  }, [open]);
  const handleDone = () => {
    setDone(true);
    trackLead();
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "reg-launch" + (open ? " hide" : "") }, /* @__PURE__ */ React.createElement("span", { className: "line" }, mobileBarLine), /* @__PURE__ */ React.createElement("button", { className: "btn", onClick: () => {
    setFrom("register_button");
    setOpen(true);
  } }, done ? buttonDone : button)), /* @__PURE__ */ React.createElement("div", { className: "reg-backdrop" + (open ? " open" : ""), onClick: () => setOpen(false) }), /* @__PURE__ */ React.createElement("div", { ref: panelRef, className: "reg-panel" + (open ? " open" : ""), role: "dialog", "aria-label": panelTitle, "aria-hidden": !open }, /* @__PURE__ */ React.createElement("div", { className: "reg-handle" }), /* @__PURE__ */ React.createElement("div", { className: "reg-head" }, /* @__PURE__ */ React.createElement("h3", null, panelTitle), /* @__PURE__ */ React.createElement("button", { className: "reg-x", "aria-label": "Close", onClick: () => setOpen(false) }, "\xD7")), /* @__PURE__ */ React.createElement("p", { className: "reg-sub" }, panelSub), done ? /* @__PURE__ */ React.createElement("div", { className: "reg-done" }, /* @__PURE__ */ React.createElement("div", { className: "tick" }, "\u2713"), /* @__PURE__ */ React.createElement("h3", null, "You're in!"), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--muted)", margin: "8px 0 16px" } }, "Check your email for the Zoom link."), /* @__PURE__ */ React.createElement("button", { className: "btn btn-ghost", onClick: () => setOpen(false) }, "Back to the page")) : formId ? /* @__PURE__ */ React.createElement(TallyEmbed, { formId, landingPage: from, onSubmit: handleDone }) : /* @__PURE__ */ React.createElement(StandInForm, { onSubmit: handleDone, note: fallbackNote })));
}
window.RegisterWidget = RegisterWidget;
