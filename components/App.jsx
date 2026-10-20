// Assembles the page from content.js. In Framer, this file goes away: the page
// is laid out on the canvas and each section is dropped in as a component.
function App() {
  const m = window.MASTERCLASS;
  return (
    <>
      <Hero {...m.hero} />
      <Learn {...m.learn} />
      <Why {...m.why} />
      <Instructor {...m.instructor} />
      <Faq {...m.faq} />
      <Closing title="See you Sunday" cta={m.hero.cta} chips={m.hero.chips} />
      <RegisterWidget formId={m.tallyFormId} fallbackNote={m.tallyFallbackNote} {...m.register} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
