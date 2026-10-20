// One webinar = one file like this. Copy _template.js, fill it in, and register it in site.js.
window.WEBINARS = window.WEBINARS || {};
window.WEBINARS.tokenmaxxing = {
  pageTitle: "Tokenmaxxing on Claude | 100xEngineers",
  tallyFormId: "PRd1ZV", // fields-only c09 form; null shows the stand-in form instead

  hero: {
    tag: "Free live masterclass",
    title: "Tokenmaxxing on Claude",
    highlightLastWords: 2, // how many words at the end of the title are coral
    hook: "85% of what a Claude session costs goes to re-reading your chat, not answering you. Learn the 7 habits draining your limit and the fixes that make it last all week.",
    chips: ["Sun 25 Oct", "3:00 PM IST", "90 mins", "Live on Zoom", "Free"],
    cta: "Save your spot",
    // Card on the right of the hero: "stat" (big number + bar) or "list" (title + items)
    visual: {
      type: "stat",
      label: "Where a Claude session's cost goes",
      value: 85,
      caption: "goes to re-reading your chat.",
      bar: [
        { pct: 85, label: "Re-reading your chat" },
        { pct: 15, label: "Answering you" },
      ],
    },
  },

  learn: {
    label: "What you'll learn",
    heading: "3 things you'll leave with",
    items: [
      { n: "01", title: "See where your tokens actually go", body: "How Claude reads a chat, and why re-reading context, not the length of its answers, uses up most of your limit." },
      { n: "02", title: "Spot the 7 hidden leaks", body: "Raw PDFs, full-size screenshots, noisy tool output, connectors you never use: the everyday habits that drain your usage without you noticing." },
      { n: "03", title: "Apply 7 fixes that actually hold up", body: "Each comes with a real example, the exact setup steps and a measured saving, so you know which ones are worth your time." },
    ],
  },

  why: {
    label: "Why this matters",
    punch: "The real cost sits in",
    punchHighlight: "what it reads.",
    lines: [
      "Most tips for stretching your Claude limit focus on making Claude answer shorter. That barely moves the needle, because what Claude writes is a small slice of what you pay for.",
      "Fix that, and the same plan goes a lot further, whether you're on Pro, Max or paying per token through the API.",
    ],
    tags: ["Pro", "Max", "API"],
  },

  instructor: "siddhant", // key in site.js instructors

  faq: {
    label: "Questions",
    heading: "Before you sign up",
    items: [
      { q: "Is it really free?", a: "Yes. Register and you'll get the Zoom link by email." },
      { q: "When and where?", a: "Sunday 25 October 2026, 3:00 PM IST, live on Zoom. It runs for 90 minutes." },
      { q: "Which Claude plan is this for?", a: "All of them. The fixes work on Pro, Max and pay-per-token API use." },
      { q: "Will there be a recording?", a: "[Confirm with the team before publishing]" },
      { q: "Do I need to know how to code?", a: "[Confirm with the team before publishing]" },
    ],
  },

  closing: { title: "See you Sunday" },

  register: {
    panelSub: "Free · Sun 25 Oct · 3:00 PM IST · Zoom",
    mobileBarLine: "Free · Sun 25 Oct, 3 PM IST",
  },
};
