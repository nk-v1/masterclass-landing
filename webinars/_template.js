// Template for the next webinar. Copy this file to webinars/<slug>.js, fill in every field,
// add the slug to `webinars` in site.js, and add a <script> line for it in index.html.
// Open /<slug> to preview it; set `active` in site.js to make it the default page.
window.WEBINARS = window.WEBINARS || {};
window.WEBINARS["your-slug"] = {
  pageTitle: "Webinar title | 100xEngineers",
  tallyFormId: null, // fields-only Tally form ID (hideTitle embed); null shows the stand-in form

  hero: {
    tag: "Free live masterclass",
    title: "Webinar title here",
    highlightLastWords: 2,
    hook: "One or two sentences: the problem, and what they'll be able to do after.",
    chips: ["Sun 1 Nov", "3:00 PM IST", "90 mins", "Live on Zoom", "Free"],
    cta: "Save your spot",
    visual: {
      type: "list", // or "stat" (see tokenmaxxing.js)
      label: "Card label",
      title: "Card title",
      items: ["Point one", "Point two", "Point three"],
    },
  },

  learn: {
    label: "What you'll learn",
    heading: "3 things you'll leave with",
    items: [
      { n: "01", title: "First outcome", body: "One or two sentences." },
      { n: "02", title: "Second outcome", body: "One or two sentences." },
      { n: "03", title: "Third outcome", body: "One or two sentences." },
    ],
  },

  why: {
    label: "Why this matters",
    punch: "The short punchy line",
    punchHighlight: "ends in coral.",
    lines: ["Supporting paragraph one.", "Supporting paragraph two."],
    tags: [],
  },

  instructor: "siddhant",

  faq: {
    label: "Questions",
    heading: "Before you sign up",
    items: [
      { q: "Is it really free?", a: "Yes. Register and you'll get the Zoom link by email." },
      { q: "When and where?", a: "Day, date, time IST, live on Zoom." },
    ],
  },

  closing: { title: "See you Sunday" },

  register: {
    panelSub: "Free · Sun 1 Nov · 3:00 PM IST · Zoom",
    mobileBarLine: "Free · Sun 1 Nov, 3 PM IST",
  },
};
