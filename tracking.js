// Site-wide UTM capture. In Framer this goes in Site Settings > Custom Code (end of <head>),
// so it runs on every page, not just /masterclass.
(function () {
  var KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var params = new URLSearchParams(location.search);

  function read(key) {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch (e) { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  var utms = {};
  KEYS.forEach(function (k) { if (params.get(k)) utms[k] = params.get(k); });
  var hasUtms = Object.keys(utms).length > 0;

  // First touch is kept forever; last touch updates whenever a tagged link brings them back.
  if (!read("hx_first")) write("hx_first", Object.assign({ first_page: location.pathname }, utms));
  if (hasUtms) write("hx_last", utms);

  // Query string for the Tally embed: first-touch UTMs win, then the button that was clicked.
  window.hxTrackingParams = function (fallbackLandingPage) {
    var first = read("hx_first") || {};
    var out = new URLSearchParams();
    KEYS.forEach(function (k) { if (first[k]) out.set(k, first[k]); });
    out.set("landing_page", params.get("landing_page") || fallbackLandingPage || "direct");
    out.set("first_page", first.first_page || location.pathname);
    return out;
  };
})();
