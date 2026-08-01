# Developer tips overlay

A hover-activated panel that documents whatever component the pointer is over: type,
colour, box metrics, and how the component changes between breakpoints. It exists so a
developer can browse these example pages and read the spec off the component itself,
rather than cross-referencing the Figma file.

It appears fixed in the top right, below the banner, and disappears the moment nothing
is hovered.

| | |
| --- | --- |
| Files | `src/devtips.js`, `src/devtips.css` |
| Wired in | one `initDevTips()` call in `src/main.js`, one `@import` in `src/styles.css` |
| Toggle | press <kbd>D</kbd> — the choice is stored in `localStorage` under `ripple-devtips` |

<kbd>D</kbd> toggles both ways and works immediately, with no reload. The listener is
registered unconditionally, *before* the enabled check — an earlier version returned early
when tips were off, which took the toggle with it and left no way back short of clearing
`localStorage`. The keystroke is ignored while a form field has focus and when any modifier
is held, so typing the letter "d" never trips it.

## The badge

A pill in the same corner as the panel, and a real `<button>` — so the keyboard shortcut is
never the only way in or out.

**Exactly one of the badge and the panel is on screen at any moment.** The badge shows
whenever the panel does not: while tips are off, and while tips are on but nothing is
hovered. It hides the instant a component is hovered and the panel takes its place. That
keeps the control permanently discoverable without the two ever overlapping.

Its label reports the current state — `Dev tips on — hover any component · D`, or
`Dev tips off — press D or click here`.

## How components are matched

Tips map **CSS selectors** to guidance. They do not use `data-` attributes on the markup.

That decision matters. Tagging every component across nine pages would have meant several
hundred attributes to add, and every one of them would drift the moment a page changed. A
selector registry covers all pages at once, picks up new pages for free, and keeps the
example markup exactly as a developer would copy it.

The cost is that the selectors in `devtips.js` have to track the class names in the CSS.
If a component is renamed, its tip goes quiet — it fails silently rather than loudly.

**The deepest match wins.** Hovering an input inside a field reports the input, not the
field, because the registry is scanned for every ancestor match and the one furthest down
the tree is chosen.

## Adding a tip

```js
{
  sel: '.my-component',
  name: 'My component',
  role: 'One line on what it is for, and any trap worth knowing.',
  type: [['Heading', 'VIC SemiBold 20/28 · 0.018em · Primary #201547']],
  box:  [['Padding', '20px 28px']],
  responsive: [
    ['≥992', 'What it does on desktop'],
    ['<992', 'What it does on mobile'],
  ],
}
```

Every section is optional except `sel` and `name`. Values should come from the Figma node
data — what the component is *specified* as — not from inspecting the rendered page. The
one live number is the box size in the header, which is measured from the hovered element
so you can compare intent against reality.

## Behaviour worth knowing

- **`pointer-events: none`** on the panel. It can never intercept the hover it is
  reporting on, and it never blocks a link underneath it.
- **Keyboard.** `focusin` shows the tip for the focused element, so tabbing through a form
  surfaces the same guidance.
- **Phones — not shown at all.** Below 768px both the panel and the badge are hidden.
  Hover does not exist on touch, so the panel could only ever be triggered by focus there,
  and at that width it covers the very component it is describing. The *content* still
  documents mobile behaviour — resize a desktop window down to read it.
- **Tablet (768–991px).** Kept, but docked to the bottom of the viewport rather than the
  top right, where it would crowd the content.
- **The header shows the current breakpoint** (`≥1200`, `992–1199`, `768–991`, `576–767`,
  `<576`) alongside the hovered element's measured width and height, so resizing the window
  and re-hovering shows the responsive rules taking effect.

## Coverage

Banner and menu panel · hero · introduction banner · journey links · campaign banner ·
card and card grid · vertical and horizontal progress rails · form container, title,
section heading, body copy and actions · field block · text input, select and textarea ·
radio and checkbox group · accordion and accordion row · review question/answer ·
edit-details link · filled, outline and text buttons · tabs · footer, acknowledgement and
core band · login card · brand wedge.
