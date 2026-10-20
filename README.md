# /masterclass landing page (prototype)

Static prototype of the 100xEngineers masterclass landing page, built as separate components so they can move into Framer as code components later.

- `content.js`: all copy and settings for one masterclass. A new masterclass means editing this file only.
- `tracking.js`: saves UTMs on the first visit and passes them, plus `landing_page` and `first_page`, into the Tally embed.
- `components/*.jsx`: page sections and the Register now widget (corner pop-up on laptop, bottom sheet on mobile).
- `dist/`: compiled components. Rebuild after editing a `.jsx` file:

```bash
npx esbuild components/Sections.jsx components/RegisterWidget.jsx components/App.jsx --outdir=dist --jsx=transform --target=es2019
```

The pop-up embeds Tally form `PRd1ZV` (fields only, c09 logic). Set `tallyFormId` to `null` in `content.js` to show the local stand-in form instead.
