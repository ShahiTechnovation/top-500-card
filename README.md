# Hack in Hills ’26 · Summit Pass

A personal pass generator for participants in the Top 500 of 10,000 teams at Hack in Hills ’26 (20–21 November, Manali, Himachal Pradesh).
Each person uploads a photo and enters their name, role / college (optional), up to 3 domains (shown as pills) and a quote (optional). They pick one of four styles (Snow, Dusk, Topo, Sunrise), download a 1080×1350 PNG and copy a ready-made LinkedIn caption.

- Static `index.html` + `bg/` (style photos) + `logos/`. No build step and no backend.
- Photos never leave the device. Everything is drawn on a `<canvas>`.
- Fonts come from Google Fonts: Montserrat, Manrope, Fraunces, DM Mono and Caveat.
- If the quote is left empty, a random default is used. "↻ Another" picks a different one.
- The sponsor bar on the pass has three parts: **Powered by** TinyFish (title sponsor), **Sponsored by** Google Developers (`logos/google-dev.png`, cropped from `google-developers-logo.png`), and **Organised by** with the combined organiser logo (`logos/oc-b.svg`).
- The page fits on one screen with no scrolling, on phones and desktops. Its styling follows `design.md`: hairlines, pill inputs and a single black button. Behind the page, the selected style's photo is blurred and drifts slowly, with particles that change per style (snow, stars, dust, sun motes). Both stop if the visitor has reduced motion turned on.

## Deploy (Vercel)
```bash
cd manali-pass
npx vercel --prod
```
`.vercelignore` keeps the original `BG Images/` out of the deploy. The page loads the compressed copies in `bg/`.
Serve it over http(s). If you open `index.html` straight from disk, the images don't load and the browser blocks the download.
To test locally, run `python -m http.server 5173` inside this folder and open http://localhost:5173.

## Changing a background photo
Replace `bg/<style>.jpg` (ice, dusk, topo, sunrise). Landscape works, and the photo is cropped to portrait. To change which part shows, set `fx` for that style in `const THEMES=`: 0 = left edge, 0.5 = centre, 1 = right edge.

## Where to edit things (search inside index.html)
| What | Search for |
|---|---|
| Style colours (title, card, accent) | `const THEMES=` |
| Default quotes | `const QUOTES=` |
| Caption text | `function caption()` |
| Title, coordinates, pill, handwritten note | `function title(` |
| Polaroid size / tilt / "Manali bound!" | `PO=` and `function polaroid(` |
| Top 500 stamp | `function stamp(` |
| Info card (ridge shape, dates, base camp) | `const RIDGE=` and `function card(` |
| Sponsor rail | `function rail(` |
| Page background animation | `const FX=` (particles) and `.bgfx` / `[data-bg=` in the CSS |
| Domain pills (max 3) | `function renderTags(` and `// domain pills` |
| Download filename | `HackInHills26-` |
