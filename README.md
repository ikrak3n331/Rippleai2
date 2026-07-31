# Salesforce page examples — Ripple 2.0 Extended

Working implementations of the pages in the **☁️ Salesforce** section of the Ripple 2.0
Extended design system (Victorian Government SDP), plus a homepage dashboard linking
them together.

```bash
npm install && npm run dev
```

Then open http://localhost:5173.

## Pages

| Route | Figma page | Notes |
| --- | --- | --- |
| `/` | — | Homepage dashboard. Hero, introduction banner, card grid linking to every page below. |
| `/pages/welcome.html` | Welcome Page | Landing template — hero, intro banner with journey links, campaign banner, card row. |
| `/pages/privacy.html` | Privacy Page | Progress rail + form container with accordion. Five responsive templates. |
| `/pages/consent.html` | Consent Page | Long-form consent copy, closing on a Yes/No radio group. |
| `/pages/form.html` | Form Page | Text input, prefix/suffix affixes, select, textarea with live word count, checkbox. |
| `/pages/review.html` | Form Completion | The "Review and Submit" frame — collapsed sections with edit links, compact footer. |
| `/pages/dashboard.html` | (WIP) Dashboard | Logged-in view, tabbed current/historical applications, empty state. |
| `/pages/email.html` | Email Notification | Fixed 1040px email body — a template, not a responsive page. |
| `/pages/components.html` | Components | Live component gallery (see the note under *Deliberate deviations*). |

Shared markup lives in `partials/` and is injected at both dev and build time by a small
`transformIndexHtml` plugin in `vite.config.js`, so the banner, footer and icon sprite
exist once rather than nine times.

## Where the values came from

Nothing here was eyeballed from a screenshot. The `Ripple 2.0 Extended.fig` export was
decoded directly — it is a ZIP containing a Zstandard-compressed, Kiwi-encoded
`canvas.fig` — and every number below was read out of the node data for the
`Privacy Page` section (`27439:27151`) and its five templates:

| Template | Frame |
| --- | --- |
| 1920px | `27439:27192` |
| 1600px | `27439:27152` |
| 1200px | `27439:27231` |
| 992px  | `27439:27271` |
| 320px  | `27439:27311` |

Colours are resolved through the library's shared styles rather than the raw node
fills, so they carry their Ripple token names (see the top of `src/styles.css`).
The icons and the Victoria State Government logo are the real vector geometry from
the file, decoded from Figma's path blobs into the SVG sprite in `partials/sprite.html`.
The hero and card imagery is the design system's own placeholder image, pulled out of the
`.fig` archive and re-encoded to WebP (1.8 MB PNG → 40 KB).

## Verified against the design

Measured in the browser with the scrollbar suppressed, versus the Figma frames:

| Viewport | Banner | Grey panel | Progress x/y | Form x/y/w | Footer |
| --- | --- | --- | --- | --- | --- |
| 992  | 70 ✓ | 272 ✓ | 42 / 116 ✓ | 332 / 130 / 600 ✓ | 674 ✓ |
| 1200 | 84 ✓ | 272 ✓ | 42 / 116 ✓ | 332 / 130 / 770 ✓ | 512 ✓ |
| 1600 | 84 ✓ | 524 ✓ | 294 / 116 ✓ | 579 / 125 / 770 ✓ | 512 ✓ |
| 1920 | 84 ✓ | 684 ✓ | 454 / 116 ✓ | 739 / 125 / 770 △ | 512 ✓ |

Component-level: accordion rows 68px each with a 36px "Open all" toggle (308 total),
buttons 132×48, footer nav block 312 / acknowledgement 96 / core 104 at 1200+, and
456 / 120 / 98 in the 992–1199 variant.

## Fonts

The real **VIC** typeface is bundled. The four upright weights the page uses are
converted from the OTFs in `C:\dep\fonts` to WOFF2 (~45% smaller) and live in
`src/fonts`:

| Weight | File | Used for |
| --- | --- | --- |
| 400 Regular | `VIC-Regular.woff2` | body copy, footer links, accordion headings 2–4 |
| 500 Medium | `VIC-Medium.woff2` | H2/H3, `{System Name}`, mobile step label |
| 600 SemiBold | `VIC-SemiBold.woff2` | Cancel / Save text buttons |
| 700 Bold | `VIC-Bold.woff2` | banner nav, buttons, "Open all", footer section titles, lead accordion heading |

Light/ExtraLight and all the italics exist in the source but this page doesn't use
them. **The font is licensed — don't redistribute it with a public deploy.**

With VIC in place, rendered text advances match the Figma text boxes to sub-pixel:

| String | Rendered | Figma | Δ |
| --- | --- | --- | --- |
| H2 Page title (Medium 32) | 204.2 | 204 | +0.2 |
| {System Name} (Medium 18) | 137.1 | 138 | −0.9 |
| Menu (Bold 14) | 38.0 | 38 | 0.0 |
| Login (Bold 14) | 39.5 | 40 | −0.5 |
| Search (Bold 14) | 50.3 | 50 | +0.3 |
| Open all (Bold 16) | 67.3 | 67 | +0.3 |
| Cancel (SemiBold 16) | 56.2 | 56 | +0.2 |
| Save (SemiBold 16) | 39.9 | 40 | −0.1 |

That also confirms Figma's `PERCENT` letter-spacing maps straight to `em`.

The one font still unresolved is **SF Pro**, which the design uses for the vertical
progress labels (13/18) to match Salesforce Lightning. It isn't in `C:\dep\fonts`,
so those ten labels fall back to the system UI stack.

## Deliberate deviations

Five, all flagged rather than silently encoded:

1. **Form width at 1920.** The Privacy Page's 1920 frame makes the form 700px while its
   own 1200 and 1600 frames both use 770px at the same left offset, so 770px is applied
   at every width ≥1200. Building the Consent Page later confirmed this: *its* 1920
   template uses 770px, so the Privacy 1920 frame was a hand-resize. Its y offset is
   likewise 125 (the 1600 value) rather than 121.
2. **Accordion items start collapsed.** In the 1920 frame the first accordion
   instance is stretched to 272px tall but its symbol only contains the 68px header —
   there is no panel content in the file. Reproducing that would render a 204px empty
   white gap, so the accordions are collapsed by default and expand on click.
3. **`Components` is a gallery, not a reproduction.** That Figma page is a specification
   board — breakpoint frames labelled `XS <576`, `S 576-767`, `M 768-991`, `L 992-1199`,
   `XL 1200+` showing the same component at each size. There is no page to build, so
   `/pages/components.html` is a live gallery of every component these pages use instead.
4. **`Email Notification` is an email, not a web page.** Its Figma page holds ~40 example
   frames, header variants and building blocks at a fixed 1040–1199px width. The build is
   one representative template at the 1040px body width, previewed inside the site shell.
5. **`Form Completion` is mostly flow diagrams.** The page is largely journey maps
   annotated with action indicators; the one reusable artefact is the 1200px
   "Review and Submit" frame, which is what `/pages/review.html` builds.

## Things worth raising with the design team

Faithfully reproduced, but they look like defects in the source file:

- **Accordion rows have no borders or dividers** and sit on white, over a white page.
  Four collapsed rows are separated only by whitespace, and the boundary between them
  is invisible. The heading typography is also inconsistent — item 1 is Bold 24, item 2
  Regular 16 in `Primary`, items 3–4 Regular 16 in `Type/Default`.
- **The vertical progress indicator's connector breaks.** The last three rows use the
  "Step end" variant, which has a top connector but no bottom one, so the rail shows
  gaps between rows 8, 9 and 10. The first of those rows is also 64px instead of 44px.
- **Every progress label reads "Text label"** and the accordion headings read
  "Accordion heading" — placeholders were left in the desktop templates, though the
  320px template does use a real "Welcome" label.

All page copy is reproduced verbatim from the file, placeholders included
(`{System Name}`, `H2 Page title`, `Link item`, `Section title`, `Button text`).

## Structure

```
index.html         homepage dashboard
pages/             the eight page examples
partials/          banner, footer and icon sprite, injected at build time
vite.config.js     include plugin + multi-page rollup inputs
src/styles.css     @font-face, tokens, banner, page shell, progress rail, footer
src/components.css hero, cards, form controls, tabs, email, gallery
src/main.js        accordion, tabs, banner menu, word count
src/fonts/         VIC Regular / Medium / SemiBold / Bold as WOFF2
src/img/           placeholder imagery extracted from the .fig archive
```
