# Setup & Installation

## Prerequisites

- Node.js 16+ and npm
- C:\dep\fonts directory containing the VIC typeface (OTF files)
- The original Figma file: `Ripple 2.0 Extended.fig`

## Quick Start

```bash
cd C:\dep\ripple-privacy-page
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Build for Production

```bash
npm run build
```

Output is in `dist/` — all nine HTML pages plus CSS, JS, fonts, and images.

## Key Dependencies

- **Vite 7.3** — build tool and dev server
- **VIC fonts** — WOFF2 format, 96 KB total (four weights)
- **No JavaScript framework** — vanilla JS only

## Environment

The project has **zero external dependencies** beyond build tools:
- No React, Vue, Svelte, or other framework
- No CSS framework or Tailwind
- No component libraries
- All CSS is hand-written and organized into two files: `src/styles.css` and `src/components.css`
- All interactivity (accordion, tabs, banner menu, word count) is vanilla JavaScript in `src/main.js`

## Fonts

The VIC typeface (four weights: Regular 400, Medium 500, SemiBold 600, Bold 700) is required. These must be in `src/fonts/` as WOFF2 files:
- VIC-Regular.woff2 (21.3 KB)
- VIC-Medium.woff2 (21.7 KB)
- VIC-SemiBold.woff2 (20.4 KB)
- VIC-Bold.woff2 (21.6 KB)

**The font is licensed.** It is included in the bundle for local development and testing. Do not redistribute with a public deploy without licensing confirmation.

## Images

Two placeholder images (extracted from the Figma file):
- `src/img/ripple-hero.webp` (40 KB) — hero background
- `src/img/card-media.webp` (22 KB) — card imagery

Both are part of the design system's own reference imagery.

## Project Structure

See ARCHITECTURE.md for detailed structure and how the include plugin works.
