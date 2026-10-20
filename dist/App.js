function App() {
  const s = window.SITE;
  const m = window.MASTERCLASS;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Nav, { ...s.nav }), /* @__PURE__ */ React.createElement(Hero, { ...m.hero }), /* @__PURE__ */ React.createElement(Learn, { ...m.learn }), /* @__PURE__ */ React.createElement(Why, { ...m.why }), /* @__PURE__ */ React.createElement(Instructor, { ...m.instructor }), /* @__PURE__ */ React.createElement(Faq, { ...m.faq }), /* @__PURE__ */ React.createElement(Closing, { title: m.closing.title, cta: m.hero.cta, chips: m.hero.chips }), /* @__PURE__ */ React.createElement(Footer, { ...s.footer }), /* @__PURE__ */ React.createElement(RegisterWidget, { formId: m.tallyFormId, ...m.register }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
