# Components — Detailed Styling Guide

This document provides exact HTML markup and CSS styling for every component in the project. Use these as templates when building new pages or modifying existing ones.

## 1. Banner (Salesforce Banner Menu)

**File:** `partials/banner.html`
**Styles:** `src/styles.css` — `.banner` rules (lines 114–187)
**Script:** `src/main.js` — Banner menu section

### HTML Structure

```html
<header class="banner">
  <div class="banner__branding">
    <a class="banner__logo" href="/" aria-label="Victoria State Government — home">
      <svg class="banner__logo-mark" role="img" aria-hidden="true">
        <use href="#i-vic-logo"></use>
      </svg>
    </a>
    <span class="banner__rule" aria-hidden="true"></span>
    <span class="banner__system">{System Name}</span>
  </div>

  <nav class="banner__nav" aria-label="Primary">
    <button type="button" class="banner__item banner__item--menu" 
            aria-expanded="false" aria-controls="banner-menu-panel">
      <span class="banner__item-text">Menu</span>
      <svg class="icon icon--12 banner__chevron" aria-hidden="true">
        <use href="#i-chevron-12"></use>
      </svg>
    </button>
    <a class="banner__item banner__item--login" href="#">
      <svg class="icon icon--16" aria-hidden="true"><use href="#i-user-circle"></use></svg>
      <span class="banner__item-text">Login</span>
    </a>
    <a class="banner__item banner__item--search" href="#">
      <span class="banner__item-text banner__item-text--search">Search</span>
      <svg class="icon icon--16" aria-hidden="true"><use href="#i-search"></use></svg>
    </a>
  </nav>

  <div class="banner__panel" id="banner-menu-panel" hidden>
    <a href="#">Menu item</a>
    <a href="#">Menu item</a>
    <a href="#">Menu item</a>
    <a href="#">Menu item</a>
  </div>
</header>
```

### CSS Styling

**Base (Mobile, 76px tall):**
```css
.banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--rpl-primary);
  padding: 8px 16px;
  min-height: 76px;
}

.banner__branding { display: flex; align-items: center; gap: 22px; }
.banner__logo { display: block; line-height: 0; }
.banner__logo-mark { width: 74px; height: 42px; fill: var(--rpl-neutral-00); }
.banner__rule { width: 2px; height: 30px; background: var(--rpl-neutral-00); display: none; }
.banner__system { font: 500 18px/1.2 var(--rpl-font); color: var(--rpl-neutral-00); display: none; }
```

**Navigation:**
```css
.banner__nav { display: flex; align-items: center; gap: 6px; }
.banner__item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 60px;
  padding: 0 10px;
  border: 0;
  background: none;
  color: var(--rpl-neutral-00);
  font: 700 14px/14px var(--rpl-font);
  letter-spacing: 0.0168em;
  text-decoration: none;
  cursor: pointer;
}

.banner__item:hover .banner__item-text { text-decoration: underline; }
.banner__item--login { display: none; }
.banner__item-text--search { display: none; }
.banner__chevron { transition: transform 150ms ease; }
.banner__item--menu[aria-expanded="true"] .banner__chevron { transform: rotate(180deg); }
```

**Dropdown Panel:**
```css
.banner__panel {
  position: absolute;
  z-index: 20;
  inset: 100% 0 auto auto;
  min-width: 220px;
  display: flex;
  flex-direction: column;
  background: var(--rpl-primary);
  padding: 8px 0 16px;
}

.banner__panel[hidden] { display: none; }
.banner__panel a {
  padding: 12px 24px;
  color: var(--rpl-neutral-00);
  font: 700 14px/14px var(--rpl-font);
  letter-spacing: 0.0168em;
  text-decoration: none;
}

.banner__panel a:hover { text-decoration: underline; }
```

**Responsive (992px+):**
```css
@media (min-width: 992px) {
  .banner { min-height: 70px; padding: 5px 20px 5px 40px; }
  .banner__rule { display: block; }
  .banner__system { display: block; }
  .banner__item--login { display: flex; }
  .banner__item-text--search { display: block; }
}

@media (min-width: 1200px) {
  .banner { min-height: 84px; padding: 12px 40px; }
}
```

### Behaviour (JavaScript)

Menu button toggles `aria-expanded` and `hidden` on the panel. Click-outside and Escape dismiss.

---

## 2. Form Controls

### 2.1 Text Input

**HTML:**
```html
<div class="field">
  <label class="field__label" for="f-text">
    Form label 
    <span class="field__required" aria-hidden="true">*</span>
  </label>
  <span class="field__hint">Hint text</span>
  <span class="field__control">
    <input class="input" id="f-text" type="text" placeholder="Placeholder text">
  </span>
</div>
```

**CSS:**
```css
.field { display: flex; flex-direction: column; gap: 4px; }
.field__label {
  display: flex;
  align-items: baseline;
  gap: 4px;
  flex-wrap: wrap;
  font: 500 16px/24px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
}

.field__required {
  font: 400 14px/14px var(--rpl-font);
  letter-spacing: 0.0168em;
  color: var(--rpl-error);
}

.field__hint {
  font: 400 14px/20px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
}

.field__control { margin-top: 16px; }

.input {
  width: 100%;
  padding: 11px 16px;
  background: var(--rpl-neutral-00);
  border: 1px solid var(--rpl-neutral-600);
  border-radius: 4px;
  font: 400 16px/24px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
}

.input::placeholder { color: var(--rpl-neutral-600); }
```

### 2.2 Select Dropdown

**HTML:**
```html
<div class="field">
  <label class="field__label" for="f-select">Form label</label>
  <span class="field__control select-wrap">
    <select class="select" id="f-select">
      <option>Select</option>
      <option>Text label</option>
    </select>
    <svg aria-hidden="true"><use href="#i-chevron-16"></use></svg>
  </span>
</div>
```

**CSS:**
```css
.select {
  width: 100%;
  padding: 11px 16px;
  background: var(--rpl-neutral-00);
  border: 1px solid var(--rpl-neutral-600);
  border-radius: 4px;
  font: 400 16px/24px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
  appearance: none;
  padding-right: 48px;
}

.select-wrap { position: relative; }
.select-wrap svg {
  position: absolute;
  right: 16px;
  top: 50%;
  width: 16px;
  height: 16px;
  margin-top: -8px;
  pointer-events: none;
  fill: var(--rpl-icon-blue);
}
```

### 2.3 Textarea with Word Count

**HTML:**
```html
<div class="field">
  <label class="field__label" for="f-area">Form label</label>
  <span class="field__control">
    <textarea class="textarea" id="f-area" placeholder="Placeholder text" 
              data-word-count="f-area-count"></textarea>
  </span>
  <span class="field__count" id="f-area-count" aria-live="polite">You have 0 words</span>
</div>
```

**CSS:**
```css
.textarea {
  width: 100%;
  padding: 11px 16px;
  background: var(--rpl-neutral-00);
  border: 1px solid var(--rpl-neutral-600);
  border-radius: 4px;
  font: 400 16px/24px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
  min-height: 144px;
  resize: vertical;
}

.textarea::placeholder { color: var(--rpl-neutral-600); }

.field__count {
  font: 400 14px/20px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
}
```

**Script:** Input event updates word count dynamically.

### 2.4 Radio & Checkbox

**HTML:**
```html
<fieldset class="field" style="border:0;margin:0;padding:0">
  <legend class="field__label">Radio Button</legend>
  <div class="field__control choice-group">
    <label class="choice">
      <input type="radio" name="g-radio"> Yes
    </label>
    <label class="choice">
      <input type="radio" name="g-radio"> No
    </label>
  </div>
</fieldset>

<fieldset class="field" style="border:0;margin:0;padding:0">
  <legend class="field__label">Checkbox</legend>
  <div class="field__control choice-group">
    <label class="choice">
      <input type="checkbox"> Text label
    </label>
  </div>
</fieldset>
```

**CSS:**
```css
.choice-group { display: flex; flex-direction: column; gap: 20px; }
.choice {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font: 400 16px/24px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
  cursor: pointer;
}

.choice input {
  appearance: none;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  margin: 0;
  background: var(--rpl-neutral-100);
  border: 1px solid var(--rpl-neutral-600);
  cursor: pointer;
}

.choice input[type="radio"] { border-radius: 50%; }
.choice input[type="checkbox"] { border-radius: 2px; }

.choice input:checked::after {
  content: "";
  display: block;
  position: relative;
  inset: 3px;
  width: 16px;
  height: 16px;
  background: var(--rpl-neutral-800);
}

.choice input[type="radio"]:checked::after { border-radius: 50%; }
.choice input[type="checkbox"]:checked::after {
  inset: 0;
  width: 22px;
  height: 22px;
  background: none;
  border-left: 3px solid var(--rpl-type-default);
  border-bottom: 3px solid var(--rpl-type-default);
  transform: rotate(-45deg) scale(0.55) translate(2px, -4px);
}
```

---

## 3. Buttons

### 3.1 Filled Button

**HTML:**
```html
<button type="button" class="btn btn--filled">Button text</button>
```

**CSS:**
```css
.btn {
  display: inline-block;
  min-height: 48px;
  padding: 16px 20px;
  border: 0;
  border-radius: 1000px;
  font: 700 16px/16px var(--rpl-font);
  letter-spacing: 0.0192em;
  text-decoration: none;
  cursor: pointer;
  transition: box-shadow 150ms ease;
}

.btn--filled {
  background: var(--rpl-primary);
  color: var(--rpl-neutral-00);
}

.btn--filled:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); }
```

### 3.2 Outline Button

**HTML:**
```html
<button type="button" class="btn btn--outline">Button text</button>
```

**CSS:**
```css
.btn--outline {
  background: var(--rpl-neutral-00);
  color: var(--rpl-primary);
  border: 2px solid var(--rpl-outline-border);
  padding: 14px 20px;  /* Adjusted for 2px border */
}

.btn--outline:hover { box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); }
```

### 3.3 Text Button

**HTML:**
```html
<a class="text-button" href="#">Cancel</a>
<a class="text-button" href="#">Save</a>
```

**CSS:**
```css
.text-button {
  font: 700 16px/16px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-link);
  text-decoration: underline;
}

.text-button:hover { text-decoration-thickness: 2px; }
```

---

## 4. Accordion

**File:** `src/main.js` — Accordion section
**Styles:** `src/styles.css` — `.accordion` rules (lines 325–360)

### HTML Structure

```html
<div class="accordion" data-accordion>
  <button type="button" class="accordion__toggle" data-accordion-toggle 
          aria-expanded="false">
    Open all
  </button>

  <div class="accordion__item">
    <h2 class="accordion__heading accordion__heading--lead">
      <button type="button" class="accordion__button" 
              aria-expanded="false" aria-controls="acc-1" id="acc-btn-1">
        <span class="accordion__label">Accordion heading</span>
        <span class="accordion__icon">
          <svg class="icon icon--16" aria-hidden="true">
            <use href="#i-chevron-16"></use>
          </svg>
        </span>
      </button>
    </h2>
    <div class="accordion__panel" id="acc-1" role="region" 
         aria-labelledby="acc-btn-1" hidden>
      <p>Panel content here.</p>
    </div>
  </div>
</div>
```

### CSS Styling

```css
.accordion { display: flex; flex-direction: column; gap: 0; }

.accordion__toggle {
  align-self: flex-end;
  padding: 0;
  border: 0;
  background: none;
  font: 700 16px/16px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-link);
  text-decoration: underline;
  cursor: pointer;
  margin-bottom: 36px;
}

.accordion__item { display: flex; flex-direction: column; }

.accordion__heading { margin: 0; }
.accordion__heading--lead .accordion__button { font-weight: 700; }

.accordion__button {
  width: 100%;
  height: 68px;
  padding: 24px 20px;
  border: 0;
  background: none;
  font: 700 16px/20px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.accordion__button:hover { background: var(--rpl-neutral-100); }

.accordion__label { margin: 0; }
.accordion__icon { flex: 0 0 16px; }
.accordion__icon svg { transition: transform 150ms ease; }
.accordion__button[aria-expanded="true"] .accordion__icon svg { transform: rotate(180deg); }

.accordion__panel {
  padding: 0 20px 20px;
  font: 400 16px/24px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
}

.accordion__panel[hidden] { display: none; }
```

### Behaviour

- Click accordion button to toggle that item's panel
- Click "Open all" to expand all items (button text changes to "Close all")
- Panel visibility managed by `hidden` attribute

---

## 5. Tabs

**File:** `src/main.js` — Tabs section
**Styles:** `src/components.css` — `.tabs` rules

### HTML Structure

```html
<div data-tabs>
  <div class="tabs" role="tablist" aria-label="Applications">
    <button class="tabs__tab" role="tab" id="tab-current" 
            aria-controls="panel-current" aria-selected="true">
      Current applications
    </button>
    <button class="tabs__tab" role="tab" id="tab-historical" 
            aria-controls="panel-historical" aria-selected="false" tabindex="-1">
      Historical applications
    </button>
  </div>

  <div class="tabpanel" role="tabpanel" id="panel-current" 
       aria-labelledby="tab-current">
    <h2 class="tabpanel__title">Panel content heading</h2>
    <p class="tabpanel__text">Panel content here.</p>
  </div>

  <div class="tabpanel" role="tabpanel" id="panel-historical" 
       aria-labelledby="tab-historical" hidden>
    <h2 class="tabpanel__title">Historical content</h2>
    <p class="tabpanel__text">Historical panel content.</p>
  </div>
</div>
```

### CSS Styling

```css
.tabs {
  display: flex;
  border-bottom: 1px solid var(--rpl-border);
  overflow-x: auto;
}

.tabs__tab {
  flex: 0 0 auto;
  padding: 16px;
  min-height: 56px;
  border: 0;
  border-bottom: 4px solid transparent;
  background: none;
  font: 400 16px/24px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
  cursor: pointer;
}

.tabs__tab[aria-selected="true"] {
  color: var(--rpl-type-link);
  border-bottom-color: #000000;
}

.tabpanel { padding-top: 30px; }
.tabpanel[hidden] { display: none; }

.tabpanel__title {
  margin: 0 0 16px;
  font: 400 24px/32px var(--rpl-font);
  letter-spacing: 0.016em;
  color: var(--rpl-type-default);
}

.tabpanel__text {
  margin: 0;
  font: 400 16px/24px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
}
```

### Behaviour

- Click tab to select it (Left/Right/Home/End arrow keys also work)
- Selected tab gets `aria-selected="true"` and blue underline
- Panels shown/hidden by `hidden` attribute

---

## 6. Cards

**File:** `src/components.css` — `.card` rules
**Styles:** Uses placeholders from `src/img/card-media.webp`

### HTML Structure

```html
<a class="card" href="#">
  <img class="card__media" src="/src/img/card-media.webp" alt="">
  <div class="card__text">
    <p class="card__topic">Topic</p>
    <h2 class="card__heading">Heading line 1</h2>
    <p class="card__body">Paragraph default. Cards contain actionable content...</p>
  </div>
</a>
```

### CSS Styling

```css
.card {
  display: flex;
  flex-direction: column;
  background: var(--rpl-neutral-00);
  border: 1px solid var(--rpl-border);
  border-radius: 4px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 150ms ease, transform 150ms ease;
}

a.card:hover {
  box-shadow: 0 2px 8px #1a1a1a29;
  transform: translateY(-2px);
}

a.card:hover .card__heading { text-decoration: underline; }

.card__media {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.card__text {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
}

.card__topic {
  margin: 0;
  font: 400 14px/14px var(--rpl-font);
  letter-spacing: 0.0168em;
  color: var(--rpl-neutral-600);
}

.card__heading {
  margin: 0;
  font: 700 20px/28px var(--rpl-font);
  letter-spacing: 0.018em;
  color: var(--rpl-type-default);
}

.card__body {
  margin: 0;
  font: 400 16px/24px var(--rpl-font);
  letter-spacing: 0.0192em;
  color: var(--rpl-type-default);
}
```

---

## 7. Hero Section

**File:** `src/components.css` — `.hero` rules

### HTML Structure

```html
<div class="hero">
  <div class="hero__inner">
    <h1 class="hero__title">
      <span>Page title</span>
    </h1>
    <p class="hero__intro">
      <span>Introduction text</span>
    </p>
  </div>
</div>
```

### CSS Styling

```css
.hero {
  background: url("./img/ripple-hero.webp") center / cover no-repeat;
  padding: 64px 0 40px;
  border-bottom: 1px solid var(--rpl-divider);
}

.hero__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 16px;
}

.hero__title {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.hero__title span {
  background: var(--rpl-accent);
  color: var(--rpl-primary);
  padding: 0 16px;
  font: 700 32px/48px var(--rpl-font);
  letter-spacing: 0.008em;
}

.hero__intro {
  margin: 20px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero__intro span {
  background: var(--rpl-accent-alt);
  color: var(--rpl-type-default);
  padding: 0 8px;
  font: 400 18px/28px var(--rpl-font);
  letter-spacing: 0.016em;
}

@media (min-width: 992px) {
  .hero { min-height: 424px; padding: 40px 80px; }
  .hero__title span { font-size: 56px; line-height: 80px; }
  .hero__intro span { font-size: 24px; line-height: 32px; }
}
```

---

## 8. Progress Indicators

### 8.1 Vertical Progress Rail

**File:** Embedded in form pages
**Styles:** `src/styles.css` — `.progress--vertical` and `.step` rules (lines 211–328)

### HTML Structure

```html
<nav class="progress progress--vertical" aria-label="Form progress">
  <ol class="progress__list">
    <li class="step step--active" aria-current="step">
      <span class="step__rail">
        <span class="step__bar step__bar--top step__bar--empty"></span>
        <span class="step__dot"></span>
        <span class="step__bar step__bar--bottom"></span>
      </span>
      <span class="step__label">Text label</span>
    </li>
    <li class="step">
      <span class="step__rail">
        <span class="step__bar step__bar--top"></span>
        <span class="step__dot"></span>
        <span class="step__bar step__bar--bottom"></span>
      </span>
      <span class="step__label">Text label</span>
    </li>
  </ol>
</nav>
```

### CSS Styling

```css
.progress--vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.step {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 44px;
}

.step__rail {
  position: relative;
  flex: 0 0 24px;
  height: 44px;
}

.step__dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--step-idle);
  transform: translate(-50%, -50%);
}

.step--active .step__dot { background: var(--step-active); }

.step__bar {
  position: absolute;
  left: 50%;
  width: 2px;
  background: var(--step-idle);
  transform: translateX(-50%);
}

.step__bar--top { top: 0; height: 50%; }
.step__bar--bottom { bottom: 0; height: 50%; }
.step__bar--empty { background: transparent; }

.step__label {
  font: 400 13px/18px var(--step-font);
  letter-spacing: 0;
  color: var(--step-label);
}
```

### 8.2 Horizontal Progress (Mobile)

```html
<nav class="progress progress--horizontal" aria-label="Form progress">
  <ol class="hprogress">
    <li class="hstep hstep--active" aria-current="step">
      <span class="hstep__dot"></span>
    </li>
    <li class="hstep">
      <span class="hstep__dot"></span>
    </li>
  </ol>
  <p class="hprogress__label">Welcome</p>
</nav>
```

```css
.hprogress {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.hstep { position: relative; display: flex; align-items: center; flex: 1 1 auto; }
.hstep:last-child { flex: 0 0 auto; }
.hstep:not(:last-child)::after {
  content: "";
  flex: 1 1 auto;
  height: 2px;
  background: var(--hstep-idle);
}

.hstep__dot {
  position: relative;
  flex: 0 0 16px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--rpl-neutral-00);
}

.hstep__dot::before {
  content: "";
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: var(--hstep-idle);
}

.hstep--active .hstep__dot {
  background: var(--hstep-active);
  box-shadow: 0 0 0 3px var(--rpl-neutral-00);
}

.hprogress__label {
  margin: 8px 0 0;
  font: 400 14px/20px var(--rpl-font);
  color: var(--step-label);
}
```

---

## Icon Symbols (SVG Sprite)

**File:** `partials/sprite.html`

All icons are defined once and referenced with `<use href="#i-ICONNAME">`:

```html
<svg class="icon icon--16" aria-hidden="true">
  <use href="#i-chevron-16"></use>
</svg>
```

Available icons:
- `#i-vic-logo` — Victoria State Government logo
- `#i-chevron-12` — Chevron 12px
- `#i-chevron-16` — Chevron 16px
- `#i-user-circle` — User circle
- `#i-search` — Search
- `#i-flag-aboriginal` — Aboriginal flag
- `#i-flag-torres-strait` — Torres Strait Islander flag
- `#i-exclamation-circle` — Exclamation circle (for info banners)
- `#i-arrow-right` — Arrow right (for journey links)

---

## Complete Example Page

See any file in `pages/` for a working, complete example combining all these components.

Each page follows this structure:
1. `<!doctype html>` with lang="en-AU"
2. `<head>` with meta charset, viewport, title, and CSS link
3. Inline `<svg class="sprite">` (injected by build)
4. Skip link
5. Banner (injected by build)
6. Main content using components above
7. Footer (injected by build)
8. Module script for main.js

To create a new page, copy the template structure and compose components from this guide.
