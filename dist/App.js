function App() {
  const m = window.MASTERCLASS;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Hero, { ...m.hero }), /* @__PURE__ */ React.createElement(Learn, { ...m.learn }), /* @__PURE__ */ React.createElement(Why, { ...m.why }), /* @__PURE__ */ React.createElement(Instructor, { ...m.instructor }), /* @__PURE__ */ React.createElement(Faq, { ...m.faq }), /* @__PURE__ */ React.createElement(Closing, { title: "See you Sunday", cta: m.hero.cta, chips: m.hero.chips }), /* @__PURE__ */ React.createElement(RegisterWidget, { formId: m.tallyFormId, fallbackNote: m.tallyFallbackNote, ...m.register }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
