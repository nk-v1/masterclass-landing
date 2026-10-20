// All copy and settings for one masterclass. A new masterclass = edit this file only.
// In Framer these become the property controls on each component.
window.MASTERCLASS = {
  slug: "tokenmaxxing",
  tallyFormId: null, // set to the new fields-only form ID when the Tally session reports it
  tallyFallbackNote: "Tally form ID not set yet. This is a stand-in so you can see the pop-up.",

  hero: {
    tag: "Free live masterclass",
    title: "Tokenmaxxing on Claude",
    hook: "85% of what a Claude session costs goes to re-reading your chat, not answering you. Learn the 7 habits draining your limit and the fixes that make it last all week.",
    chips: ["Sun 25 Oct", "3:00 PM IST", "90 mins", "Live on Zoom", "Free"],
    cta: "Save your spot",
    bar: { readPct: 85, readLabel: "Re-reading your chat", writePct: 15, writeLabel: "Answering you" },
  },

  learn: {
    label: "What you'll learn",
    items: [
      { n: "01", title: "See where your tokens actually go", body: "How Claude reads a chat, and why re-reading context, not the length of its answers, uses up most of your limit." },
      { n: "02", title: "Spot the 7 hidden leaks", body: "Raw PDFs, full-size screenshots, noisy tool output, connectors you never use: the everyday habits that drain your usage without you noticing." },
      { n: "03", title: "Apply 7 fixes that actually hold up", body: "Each comes with a real example, the exact setup steps and a measured saving, so you know which ones are worth your time." },
    ],
  },

  why: {
    label: "Why this matters",
    lines: [
      "Most tips for stretching your Claude limit focus on making Claude answer shorter. That barely moves the needle, because what Claude writes is a small slice of what you pay for.",
      "The real cost sits in what it reads.",
      "Fix that, and the same plan goes a lot further, whether you're on Pro, Max or paying per token through the API.",
    ],
    plans: ["Pro", "Max", "API"],
  },

  instructor: {
    label: "Meet your instructor",
    name: "Siddhant Goswami",
    role: "Co-founder and CTO, 100xEngineers",
    photo: null, // instructor photo URL
    points: [
      "10+ years building AI products and training 50,000+ professionals in applied AI",
      "Partnered with OpenAI and Meta to build official courses for OpenAI Academy and Meta Blueprint",
      "Exited two companies to Unacademy, scaling products to $10M+ valuation and 1M+ users",
    ],
  },

  faq: {
    label: "Questions",
    items: [
      { q: "Is it really free?", a: "Yes. Register and you'll get the Zoom link by email." },
      { q: "When and where?", a: "Sunday 25 October 2026, 3:00 PM IST, live on Zoom. It runs for 90 minutes." },
      { q: "Which Claude plan is this for?", a: "All of them. The fixes work on Pro, Max and pay-per-token API use." },
      { q: "Will there be a recording?", a: "[Confirm with the team before publishing]" },
      { q: "Do I need to know how to code?", a: "[Confirm with the team before publishing]" },
    ],
  },

  register: {
    button: "Register now",
    buttonDone: "You're registered",
    panelTitle: "Save your spot",
    panelSub: "Free · Sun 25 Oct · 3:00 PM IST · Zoom",
    mobileBarLine: "Free · Sun 25 Oct, 3 PM IST",
  },
};
