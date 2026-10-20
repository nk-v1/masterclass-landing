// Site-wide settings shared by every webinar page: which webinar is live, the instructors,
// the navbar and the footer. Each webinar's own copy lives in webinars/<slug>.js.
window.SITE = {
  active: "tokenmaxxing", // shown at "/"; any webinar is also reachable at /<slug>
  webinars: ["tokenmaxxing", "web10"],

  instructors: {
    siddhant: {
      label: "Meet your instructor",
      name: "Siddhant Goswami",
      role: "Co-founder and CTO, 100xEngineers",
      photo: "https://ltliczqfpnftqmooesyt.supabase.co/storage/v1/object/public/assets/siddhant_goswani_photo.png",
      points: [
        "10+ years building AI products and training 50,000+ professionals in applied AI",
        "Partnered with OpenAI and Meta to build official courses for OpenAI Academy and Meta Blueprint",
        "Exited two companies to Unacademy, scaling products to $10M+ valuation and 1M+ users",
      ],
    },
  },

  nav: {
    home: "https://www.100xengineers.com/",
    cta: { label: "Enroll Now", href: "https://www.100xengineers.com/pay-new" },
  },

  footer: {
    links: [
      { label: "Curriculum", href: "https://www.100xengineers.com/#curriculum" },
      { label: "Community", href: "https://www.100xengineers.com/#community" },
      { label: "Testimonials", href: "https://www.100xengineers.com/#testimonials" },
      { label: "Privacy", href: "https://www.100xengineers.com/privacy" },
      { label: "Refund policy", href: "https://www.100xengineers.com/refund" },
      { label: "Terms & conditions", href: "https://www.100xengineers.com/tnc" },
    ],
    contacts: [
      { label: "For program related enquiries", value: "info@100xengineers.com", href: "mailto:info@100xengineers.com" },
      { label: "For business related enquiries", value: "hello@100xengineers.com", href: "mailto:hello@100xengineers.com" },
    ],
    socials: [
      { label: "YouTube", href: "https://www.youtube.com/@100xEngineers" },
      { label: "X", href: "https://x.com/100xengineers" },
      { label: "Instagram", href: "https://www.instagram.com/100xengineers/" },
      { label: "LinkedIn", href: "https://in.linkedin.com/company/100xengineers" },
    ],
    copyright: "CODIBLE VENTURES @ 2025",
  },
};

// Pick the webinar from the URL (/<slug> or ?w=<slug>), else the active one.
(function () {
  var slug = location.pathname.replace(/^\/+|\/+$/g, "") || new URLSearchParams(location.search).get("w") || SITE.active;
  var w = window.WEBINARS[slug] || window.WEBINARS[SITE.active];
  window.MASTERCLASS = Object.assign({ slug: window.WEBINARS[slug] ? slug : SITE.active }, w, {
    instructor: SITE.instructors[w.instructor] || w.instructor,
  });
  document.title = w.pageTitle;
})();
