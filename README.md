# Job Kuriakose George — Portfolio

A React + Vite personal portfolio. Dark-first "obsidian and gold" editorial styling,
with a full light-theme re-skin, custom cursor, scroll-reveal choreography and a
preloader curtain.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/
npm run preview  # serve the production build
```

## Structure

Every component is a `.jsx` file with its own dedicated `.css` file in `src/styles/`.
No CSS-in-JS, no utility framework — plain stylesheets over a custom-property design
system.

```
index.html               Fonts, meta, no-flash theme script
src/
  main.jsx               Entry — mounts App, imports the global stylesheets
  App.jsx                Composition root
  data/content.js        ALL copy, sourced from the CV. Edit here, never in JSX.
  hooks/
    useReveal.js         IntersectionObserver -> [data-revealed] scroll reveals
    useScroll.js         rAF scroll progress + active-section tracking
    useTheme.js          Dark/light, persisted to localStorage
    useCountUp.js        Eased number counters that fire on first view
    useMagnetic.js       Magnetic hover + card spotlight (fine pointers only)
  components/            Preloader, Cursor, Atmosphere, Navbar, Hero, Marquee,
                         About, Experience, Skills, Education,
                         Contact, Footer
  styles/
    tokens.css           Design tokens + both theme palettes — start here
    base.css             Reset, typography, layout primitives, buttons, chips
    animations.css       Keyframes + the scroll-reveal contract
    <Component>.css      One stylesheet per component
  assets/profile.jpg     Portrait


```

## Changing things

- **Any text, project, role or skill** → `src/data/content.js`. Nothing is hardcoded
  in the components.
- **Colours, type scale, spacing, motion curves** → `src/styles/tokens.css`. Both
  themes are defined purely as token values, so a palette change needs no component
  edits.
- **The accent colour** is `--accent` (plus `--accent-bright` / `--accent-deep` /
  `--accent-soft` / `--accent-line`). Change those five in each theme block to
  re-brand the whole site.

## Notes

- Fully responsive from 360px up; fluid type via `clamp()` throughout.
- `prefers-reduced-motion` is honoured — the preloader, cursor, marquee, parallax
  and reveals all switch off, and content renders immediately.
- Keyboard accessible: skip link, focus-visible rings, `aria-expanded` accordions,
  `aria-hidden` overlay with managed tab order.
- Deploys as static files — `dist/` works on Netlify, Vercel, GitHub Pages or any
  static host. `base: './'` in `vite.config.js` means it also works from a
  subdirectory or the local filesystem.
