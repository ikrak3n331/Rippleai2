/* ==========================================================================
   Developer tips overlay
   --------------------------------------------------------------------------
   A fixed panel, top right below the banner, that describes whatever component
   the pointer is over: type, colour, box metrics and how the component changes
   between breakpoints. It hides itself the moment nothing is hovered.

   Components are matched by CSS selector rather than by a data- attribute on
   the markup. That keeps the pages themselves untouched, means a new page picks
   the tips up for free, and avoids several hundred attributes drifting out of
   sync with the CSS. The trade-off is that the selectors below have to track
   the class names -- they are checked against the built pages.

   Values come from the Figma node data, not from inspecting the rendered page,
   so they describe what the component is *specified* as.
   ========================================================================== */

const TIPS = [
  /* ---------------------------------------------------------------- banner */
  {
    sel: '.banner__panel',
    name: 'Banner menu panel',
    role: 'Dropdown under the Menu button. Click-outside and Escape both dismiss it.',
    type: [['Item', 'VIC SemiBold 14/14 · 0.0168em · Neutral 00 #ffffff']],
    box: [
      ['Background', 'Primary #201547 — same as the banner, so it reads as attached'],
      ['Item padding', '12px 24px'],
      ['Min width', '220px'],
      ['Anchor', 'position:absolute inside .banner__nav, top:100% left:0'],
    ],
    responsive: [['All', 'Anchored to the Menu button, not the banner edge']],
  },
  {
    sel: '.banner',
    name: 'Banner',
    role: 'Salesforce banner. Logo, system name, menu, login and search.',
    type: [
      ['System name', 'VIC Medium 18/1.2 · Neutral 00 #ffffff'],
      ['Nav item', 'VIC SemiBold 14/14 · 0.0168em · Neutral 00'],
    ],
    box: [
      ['Background', 'Primary #201547'],
      ['Nav item height', '60px'],
      ['Logo', '74×42, fill currentColor'],
    ],
    responsive: [
      ['≥1200', '70px tall · padding 5px 40px'],
      ['992–1199', '70px tall · padding 5px 20px 5px 40px'],
      ['<992', '76px tall · padding 8px 16px · system name, rule, login and search label all hidden'],
    ],
  },

  /* ------------------------------------------------------------------ hero */
  {
    sel: '.hero',
    name: 'Hero header',
    role: 'Full-bleed page header. Title and intro sit on solid colour blocks for contrast over the photograph.',
    type: [
      ['Title', 'VIC SemiBold 56/80 desktop, 32/48 mobile · 0.008em · Primary #201547 on Accent #88dbdf'],
      ['Intro', 'VIC Regular 24/32 desktop, 18/28 mobile · 0.016em · Type/Default on Accent Alt #e7f8f9'],
    ],
    box: [
      ['Column', 'Capped at --content-inner 1040px, centred'],
      ['Gutters', 'On the band, not the column, so edges align with cards and footer'],
      ['Height', 'min-height holds the band; the copy centres in it, so a two-line title grows evenly top and bottom'],
    ],
    responsive: [
      ['≥992', 'min-height 424px · padding 40px 80px · title 56/80'],
      ['<992', 'min-height 200px · padding 40px 16px · title 32/48'],
    ],
  },

  /* ------------------------------------------------------- dashboard greeting */
  {
    sel: '.greeting',
    name: 'Dashboard greeting',
    role: 'Opens the logged-in view in place of the hero and introduction banner: salutation, one line of copy, one action.',
    type: [
      ['Title', 'VIC Medium 56/60 desktop, 32/40 mobile · 0.008em · Primary #201547'],
      ['Copy', 'VIC Regular 20/32 desktop, 18/28 mobile · 0.018em · Type/Default'],
      ['Action', 'Button/Filled — Primary fill, 48px, full lozenge'],
    ],
    box: [
      ['Column', 'Capped at --content-inner 1040px, centred — same x as the tabs below'],
      ['Stack', '16px between items, 12 more above the button'],
      ['Measure', 'Copy held to 600px'],
    ],
    responsive: [
      ['≥992', 'padding 58px 80px 70px · title 56/60'],
      ['<992', 'padding 50px 16px 38px · title 32/40'],
    ],
  },

  /* -------------------------------------------------------- intro + journey */
  {
    sel: '.journey',
    name: 'Journey links',
    role: 'Secondary navigation beside the introduction copy.',
    type: [
      ['Heading', 'VIC SemiBold 20/28 · 0.018em · Type/Default'],
      ['Link', 'VIC Regular 20/28 · 0.018em · Type/Default, underlined, clears on hover'],
    ],
    box: [['Arrow', '16px, fill Type/Link #004c97'], ['Gap', '16px between rows']],
    responsive: [['≥992', 'Fixed 328px column beside the copy'], ['<992', 'Stacks below the copy']],
  },
  {
    sel: '.intro-banner',
    name: 'Introduction banner',
    role: 'Sits under the hero. Explains the page, with journey links alongside.',
    type: [
      ['Title', 'VIC SemiBold 32/40 desktop, 24/32 mobile · 0.014em · Type/Default'],
      ['Text', 'VIC Regular 20/28 desktop, 18/26 mobile · 0.018em'],
    ],
    box: [
      ['Background', 'Neutral 00 #ffffff, 1px #cccccc bottom border'],
      ['Icon slot', '32px, Type/Link — currently commented out in the markup, kept for reuse'],
    ],
    responsive: [
      ['≥992', 'Row: copy and journey side by side, 116px gap · padding 48px 80px 56px'],
      ['<992', 'Column, 32px gap · padding 32px 16px 40px'],
    ],
  },

  /* -------------------------------------------------------------- campaign */
  {
    sel: '.campaign',
    name: 'Campaign banner',
    role: 'Promotional band. Copy in the content column, photograph bleeding off the right edge behind a diagonal.',
    type: [
      ['Title', 'VIC SemiBold 32/40 desktop, 24/32 mobile · 0.014em'],
      ['Text', 'VIC Regular 20/28 desktop, 18/26 mobile · 0.018em'],
    ],
    box: [
      ['Media width', '614px — 6 of 12 columns of the 1200px container plus the bleed'],
      ['Media offset', 'top -12px, right 0 — overhangs the band'],
      ['Clip', 'polygon(15% 44%, 100% 0, 100% 100%, 0 100%)'],
      ['Note', 'First vertex is 44% DOWN the left edge, not on the top edge — that is what makes the slant cut across the top rather than leaving a wedge'],
    ],
    responsive: [
      ['≥992', 'Photo absolute, clipped, bleeding right · copy capped at 50%'],
      ['<992', 'Photo static, unclipped, 200px tall, stacked under the copy'],
    ],
  },

  /* ------------------------------------------------------------------ card */
  {
    sel: '.card',
    name: 'Card',
    role: 'Actionable teaser. The whole card is the link.',
    type: [
      ['Topic', 'VIC Regular 14/14 · 0.0168em · Neutral 600 #666666'],
      ['Heading', 'VIC SemiBold 20/28 · 0.018em · Type/Default'],
      ['Body', 'VIC Regular 16/24 · 0.0192em · Type/Default'],
    ],
    box: [
      ['Border', '1px #cccccc · radius 4px'],
      ['Media', '16:9, object-fit cover'],
      ['Text padding', '20px, 12px gap'],
      ['Hover', 'box-shadow 0 2px 8px #1a1a1a29 and heading underline — no lift'],
    ],
    responsive: [['≥992', '3 columns'], ['768–991', '2 columns'], ['<768', '1 column']],
  },
  {
    sel: '.card-grid',
    name: 'Card grid',
    role: 'Lays cards out across the shared content column.',
    box: [['Max width', '--content-inner 1040px'], ['Gap', '28px']],
    responsive: [['≥992', '3 columns'], ['768–991', '2 columns'], ['<768', '1 column']],
  },

  /* -------------------------------------------------------------- progress */
  {
    sel: '.progress--vertical',
    name: 'Progress rail (desktop)',
    role: 'Vertical step indicator beside the form. THIS BECOMES THE HORIZONTAL BAR ON MOBILE.',
    type: [['Label', 'VIC Regular 13/18 · Step label #2e2e2e']],
    box: [
      ['Row height', '44px, uniform'],
      ['Dot', '12px · current #004c97 with white centre · done #004c97 with white tick · idle #c9c9c9'],
      ['Connector', '2px, drawn on every row; only the last row closes off'],
      ['Width', '189px'],
    ],
    responsive: [
      ['≥992', 'Visible, vertical, left of the form'],
      ['<992', 'HIDDEN — replaced by .progress--horizontal above the form'],
    ],
  },
  {
    sel: '.progress--horizontal',
    name: 'Progress rail (mobile)',
    role: 'The mobile form of the step indicator. Replaces the vertical rail below 992px.',
    type: [['Label', 'VIC Medium 14/17 · 0.0192em']],
    box: [
      ['Dot', '16px, 2px connector between'],
      ['Active', '#004c97 with a 3px white ring'],
      ['Padding', '34px 32px 32px'],
    ],
    responsive: [
      ['<992', 'Visible, horizontal, above the form'],
      ['≥992', 'HIDDEN — the vertical rail takes over'],
    ],
  },

  /* ------------------------------------------------------------ form shell */
  {
    sel: '.form__title',
    name: 'Page title (H2)',
    type: [['Style', 'VIC Medium 32/40 · 0.014em · Primary #201547']],
  },
  {
    sel: '.form__section-heading',
    name: 'Section heading (H3)',
    type: [['Style', 'VIC Medium 24/32 · 0.016em · Primary #201547']],
  },
  {
    sel: '.form__body, .form__intro',
    name: 'Body copy',
    type: [
      ['Style', 'VIC Regular 16/24 · 0.0192em · Type/Default #1a1a1a'],
      ['Inline link', 'Type/Link #004c97, underlined; underline removed on hover'],
    ],
  },
  {
    sel: '.form__actions',
    name: 'Form actions',
    role: 'Cancel and Save as text buttons, Previous and Next as buttons.',
    box: [['Gap', '40px between the groups']],
    responsive: [
      ['≥992', 'Row: text links left, buttons right'],
      ['<992', 'Column reversed — Figma order is Next, Previous, Save, Cancel'],
    ],
  },
  {
    sel: '.form',
    name: 'Form container',
    role: 'The column the form content sits in, beside the progress rail.',
    box: [['Max width', '770px at ≥1200 · 600px at 992–1199'], ['Form set gap', '32px between field blocks']],
    responsive: [
      ['≥1200', '770px wide, 46px top margin'],
      ['992–1199', '600px wide'],
      ['<992', 'Full width under the horizontal rail'],
    ],
  },

  /* ---------------------------------------------------------- form controls */
  {
    sel: '.input, .select, .textarea',
    name: 'Text input / select / textarea',
    role: 'The .Input symbol. Stroke is drawn INSIDE the 48px in Figma.',
    type: [
      ['Value', 'VIC Regular 16/24 · 0.0192em · Type/Default'],
      ['Placeholder', 'Neutral 600 #666666'],
    ],
    box: [
      ['Height', '48px (textarea 144px)'],
      ['Fill', 'Neutral 100 #f5f5f5'],
      ['Border', '1px #666666 · radius 4px'],
      ['Padding', '11px 20px — trimmed from 12px so the two 1px borders fit inside 48px'],
      ['Select chevron', '16px, Icon blue #0052c2, 20px from the right'],
    ],
    responsive: [['All', 'Full width of its column']],
  },
  {
    sel: '.field',
    name: 'Field block',
    role: 'Label, optional hint, then the control.',
    type: [
      ['Label', 'VIC Medium 16/24 · 0.0192em · Type/Default'],
      ['Required', 'VIC Regular 14/14 · Error #aa0028'],
      ['Hint', 'VIC Regular 14/20 · 0.0192em'],
    ],
    box: [
      ['Label → hint', '4px'],
      ['→ control', '16px total (12px margin plus the 4px flex gap)'],
      ['Between fields', '32px'],
    ],
  },
  {
    sel: '.choice-group',
    name: 'Radio / checkbox group',
    type: [['Label', 'VIC Regular 16/24 · 0.0192em']],
    box: [
      ['Control', '24px, Neutral 100 fill, 1px #666666'],
      ['Gap to label', '12px'],
      ['Between rows', '20px'],
    ],
  },

  /* ------------------------------------------------------------- accordion */
  {
    sel: '.accordion__item',
    name: 'Accordion row',
    role: 'Collapsible section. Only the open row carries the accent rule.',
    type: [['Heading', 'VIC SemiBold 20/28 · 0.018em · Primary #201547']],
    box: [
      ['Header height', '68px — 28px row plus 20px top and bottom'],
      ['Padding', '20px 28px'],
      ['Divider', '1px #e6e6e6 along the bottom when closed'],
      ['Open state', '4px left rule in Accent #88dbdf, bottom divider removed'],
      ['Chevron', '16px, Icon blue, rotates 180° when open'],
    ],
  },
  {
    sel: '.accordion',
    name: 'Accordion',
    role: '"Open all" toggles every row at once and switches its own label to "Close all".',
    type: [['Toggle', 'VIC SemiBold 16/16 · Type/Link #004c97, underlined']],
    box: [['Toggle', 'Right aligned, 36px above the first row']],
  },

  /* ------------------------------------------------------------- summary/QA */
  {
    sel: '.qa',
    name: 'Review question / answer',
    role: 'Definition list of submitted answers.',
    type: [
      ['Question', 'VIC SemiBold 16/24 · 0.0192em · Type/Default'],
      ['Answer', 'VIC Regular 16/24 · 0.0192em'],
    ],
    box: [['Row gap', '16px']],
    responsive: [
      ['≥768', 'Two columns — 273px question, answer fills the rest, 24px gap'],
      ['<768', 'Stacked, 4px gap'],
    ],
  },
  {
    sel: '.summary__edit',
    name: 'Edit details link',
    role: 'Sits on the accordion header row. Cannot live inside the header button — that would nest a link in a button — so it is positioned over the row.',
    type: [['Style', 'VIC Medium 16/24 · Type/Link #004c97, underlined']],
    box: [['Position', 'absolute, right 68px = 28px padding + 16px chevron + 24px gap'], ['Visibility', 'Only while that section is open']],
  },

  /* --------------------------------------------------------------- buttons */
  {
    sel: '.btn--filled',
    name: 'Button — filled',
    type: [['Label', 'VIC SemiBold 16/16 · 0.0192em · Neutral 00']],
    box: [['Fill', 'Primary #201547'], ['Height', '48px min'], ['Padding', '16px 20px'], ['Radius', '1000px (pill)']],
  },
  {
    sel: '.btn--outline',
    name: 'Button — outline',
    type: [['Label', 'VIC SemiBold 16/16 · Primary #201547']],
    box: [
      ['Border', '2px rgba(85,80,124,0.2)'],
      ['Padding', '14px 20px — 2px less than filled so both land on 48px'],
      ['Radius', '1000px'],
    ],
  },
  {
    sel: '.text-button',
    name: 'Text button',
    type: [['Style', 'VIC SemiBold 16/16 · Type/Link #004c97, underlined']],
  },

  /* ------------------------------------------------------------------ tabs */
  {
    sel: '.tabs',
    name: 'Tabs',
    role: 'Arrow keys move between tabs per the WAI-ARIA pattern (Left/Right/Home/End).',
    type: [['Label', 'VIC Regular 16/24 · 0.0192em · selected in Type/Link']],
    box: [
      ['Tab height', '56px min, 16px padding'],
      ['Underline', '4px Type/Link #004c97 when selected; transparent otherwise so nothing shifts'],
      ['Rule', '1px #cccccc along the bottom'],
    ],
    responsive: [['<992', 'Scrolls horizontally rather than wrapping']],
  },

  /* ---------------------------------------------------------------- footer */
  {
    sel: '.footer__acknowledgement',
    name: 'Footer acknowledgement',
    type: [['Text', 'VIC SemiBold 16/24 · 0.0192em']],
    box: [['Flags', '57×40 each, 8px apart'], ['Padding', '24px 0']],
  },
  {
    sel: '.footer__core',
    name: 'Footer core',
    role: 'Required links, copyright and the state logo.',
    type: [['Link', 'VIC Regular 14/20, underlined'], ['Copyright', 'VIC Regular 14/14']],
    box: [['Top rule', '1px #e6e6e6 as an inset box-shadow, so it adds no height']],
  },
  {
    sel: '.footer',
    name: 'Footer',
    role: 'Navigation, acknowledgement and core band.',
    type: [
      ['Section title', 'VIC SemiBold 16/16 · 0.0192em'],
      ['Link', 'VIC Regular 14/20 · underlined by default, underline REMOVED on hover'],
    ],
    box: [
      ['Column', '--content-inner 1040px, matching the cards above'],
      ['Rules', 'Drawn as inset box-shadows so they never affect layout height'],
    ],
    responsive: [
      ['≥1200', '4 columns · 80px gutters'],
      ['992–1199', '3 columns · 64px gutters'],
      ['<992', '1 column · 16px gutters'],
      ['compact-footer', 'Nav block hidden entirely — used on review and dashboard'],
    ],
  },

  /* ----------------------------------------------------------- login page */
  {
    sel: '.login__container',
    name: 'Login card',
    type: [
      ['System title', 'VIC Medium 24/32 · 0.016em · Primary'],
      ['Heading', 'VIC Medium 20/28 · 0.018em · Primary'],
    ],
    box: [['Width', '434px'], ['Padding', '30px'], ['Radius', '12px'], ['Stack gap', '20px']],
    responsive: [['All', 'Centred in the viewport; the page has no banner or footer']],
  },
  {
    sel: '.login__flourish',
    name: 'Brand wedge',
    role: 'BrandDE-Triangle. Only the leftmost 207px of the 413px wedge is ever on screen — identical at every breakpoint.',
    box: [
      ['Size', '207×887, never scaled'],
      ['Anchor', 'top 0, right 0'],
      ['Why fixed', 'Scaling to viewport height cropped the left edge and blunted the apex'],
    ],
  },
];

/* -------------------------------------------------------------------------- */

const STORAGE_KEY = 'ripple-devtips';

export function initDevTips() {
  /* Everything below is always wired up, and the enabled flag gates the display.
     Returning early when tips are off would take the toggle listener with it,
     leaving no way to switch them back on short of clearing localStorage. */
  let enabled = localStorage.getItem(STORAGE_KEY) !== 'off';

  const panel = document.createElement('aside');
  panel.className = 'devtip';
  panel.setAttribute('aria-hidden', 'true');
  document.body.appendChild(panel);

  let current = null;

  const render = (tip, el) => {
    const w = innerWidth;
    const bp = w >= 1200 ? '≥1200' : w >= 992 ? '992–1199' : w >= 768 ? '768–991' : w >= 576 ? '576–767' : '<576';
    const rect = el.getBoundingClientRect();

    const rows = (items) =>
      items.map(([k, v]) => `<div class="devtip__row"><dt>${k}</dt><dd>${v}</dd></div>`).join('');

    panel.innerHTML = `
      <header class="devtip__head">
        <h2>${tip.name}</h2>
        <span class="devtip__bp">${bp} · ${Math.round(rect.width)}×${Math.round(rect.height)}</span>
      </header>
      ${tip.role ? `<p class="devtip__role">${tip.role}</p>` : ''}
      ${tip.type ? `<section><h3>Type</h3><dl>${rows(tip.type)}</dl></section>` : ''}
      ${tip.box ? `<section><h3>Box</h3><dl>${rows(tip.box)}</dl></section>` : ''}
      ${tip.responsive ? `<section><h3>Responsive</h3><dl>${rows(tip.responsive)}</dl></section>` : ''}
      <footer class="devtip__foot">press <kbd>D</kbd> to turn tips off</footer>`;
  };

  /* The badge and the panel occupy the same corner, so exactly one of them is on
     screen at any moment: the panel while a component is hovered, the badge the
     rest of the time. That keeps the control permanently discoverable without
     ever letting the two overlap. */
  const syncBadge = () => {
    const panelOpen = panel.classList.contains('is-open');
    badge.classList.toggle('is-open', !panelOpen);
    badge.setAttribute('aria-hidden', String(panelOpen));
    badge.innerHTML = enabled
      ? 'Dev tips on — hover any component · <kbd>D</kbd>'
      : 'Dev tips off — press <kbd>D</kbd> or click here';
  };

  const show = (tip, el) => {
    if (current !== tip) {
      current = tip;
      render(tip, el);
      panel.classList.add('is-open');
      panel.setAttribute('aria-hidden', 'false');
    }
    syncBadge();
  };

  const hide = () => {
    if (current) {
      current = null;
      panel.classList.remove('is-open');
      panel.setAttribute('aria-hidden', 'true');
    }
    syncBadge();
  };

  /* The deepest match wins, so hovering an input reports the input rather than
     the form wrapping it. */
  const findTip = (target) => {
    let best = null;
    let bestDepth = -1;
    for (const tip of TIPS) {
      const el = target.closest(tip.sel);
      if (!el) continue;
      let depth = 0;
      for (let n = el; n; n = n.parentElement) depth++;
      if (depth > bestDepth) { bestDepth = depth; best = { tip, el }; }
    }
    return best;
  };

  addEventListener('pointermove', (e) => {
    if (!enabled) return;
    const t = e.target;
    if (!(t instanceof Element) || panel.contains(t)) return;
    const hit = findTip(t);
    hit ? show(hit.tip, hit.el) : hide();
  }, { passive: true });

  // Keyboard users get the same information on focus.
  addEventListener('focusin', (e) => {
    if (!enabled) return;
    const hit = e.target instanceof Element && findTip(e.target);
    if (hit) show(hit.tip, hit.el);
  });

  addEventListener('pointerleave', hide);
  addEventListener('blur', hide);

  /* While tips are off the panel never appears, so without this there is nothing
     on screen to say the feature exists. The badge is the permanent way back --
     it states the shortcut and is clickable in its own right. */
  const badge = document.createElement('button');
  badge.type = 'button';
  badge.className = 'devtip-badge';
  badge.innerHTML = 'Dev tips off — press <kbd>D</kbd> or click here';
  document.body.appendChild(badge);

  const setEnabled = (value) => {
    enabled = value;
    localStorage.setItem(STORAGE_KEY, enabled ? 'on' : 'off');
    if (!enabled) hide();
    // syncBadge owns the badge's visibility and label -- it keys off whether the
    // panel is open, not off `enabled`, so the badge shows whenever the panel does not.
    syncBadge();
  };

  badge.addEventListener('click', () => setEnabled(true));
  setEnabled(enabled);

  addEventListener('keydown', (e) => {
    if (e.key !== 'd' && e.key !== 'D') return;
    // Never steal the keystroke from a form field or a browser shortcut.
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t instanceof Element && t.closest('input, textarea, select, [contenteditable]')) return;

    setEnabled(!enabled);
  });
}
