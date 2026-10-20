// Assembles the page from site.js and the selected webinar file. In Framer, this file goes
// away: the page is laid out on the canvas and each section is dropped in as a component.
function App() {
  const s = window.SITE;
  const m = window.MASTERCLASS;
  return (
    <>
      <Nav {...s.nav} />
      <Hero {...m.hero} />
      <Learn {...m.learn} />
      <Why {...m.why} />
      <Instructor {...m.instructor} />
      <Faq {...m.faq} />
      <Closing title={m.closing.title} cta={m.hero.cta} chips={m.hero.chips} />
      <Footer {...s.footer} />
      <RegisterWidget formId={m.tallyFormId} {...m.register} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
