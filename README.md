# 100xEngineers masterclass landing page

Static landing page template for 100xEngineers webinars, built as separate components so they can move into Framer as code components later.

Live: https://masterclass-landing-self.vercel.app (Vercel project `masterclass-landing`, team 100x RevOps). Every push to `main` redeploys it; other branches get their own preview link.

## Files

- `webinars/<slug>.js`: all copy for one webinar (hero, what you'll learn, why, FAQ, Tally form ID).
- `webinars/_template.js`: blank copy of the above for the next webinar.
- `site.js`: what's shared across webinars (active webinar, instructors, navbar, footer) and the code that picks the webinar from the URL.
- `tracking.js`: saves UTMs on the first visit and passes them, plus `landing_page` and `first_page`, into the Tally embed.
- `components/*.jsx`: page sections and the Register now widget (corner pop-up on laptop, bottom sheet on mobile).
- `dist/`: compiled components. Rebuild after editing a `.jsx` file:

```bash
npx esbuild components/Sections.jsx components/RegisterWidget.jsx components/App.jsx --outdir=dist --jsx=transform --target=es2019
```

## Adding the next webinar

1. Copy `webinars/_template.js` to `webinars/<slug>.js` and fill it in.
2. Add `<slug>` to `webinars` in `site.js`, and a `<script src="/webinars/<slug>.js">` line in `index.html`.
3. Preview it at `/<slug>` (locally: `/?w=<slug>`).
4. When it's the current one, set `active` in `site.js` so `/` shows it.

The Tally form must be fields only (no title or copy blocks), because the page carries the copy. Set `tallyFormId` to `null` to show the local stand-in form instead.
