# Design Tokens & CSS Variables

All Ripple 2.0 design tokens are defined as CSS custom properties in `src/styles.css`. These are the foundation for all component styling.

## Colour Tokens

**File:** `src/styles.css`, `:root` selector

```css
:root {
  /* Primary & Neutrals */
  --rpl-primary: #201547;                    /* Ripple 2.0/Primary/Primary */
  --rpl-neutral-00: #ffffff;                 /* Ripple 2.0/Neutral/00 */
  --rpl-neutral-100: #f5f5f5;                /* Ripple 2.0/Neutral/100 */
  --rpl-neutral-600: #666666;                /* Ripple 2.0/Neutral/600 */
  --rpl-neutral-800: #1a1a1a;                /* Ripple 2.0/Neutral/800 */
  
  /* Type */
  --rpl-type-default: #1a1a1a;               /* Ripple 2.0/Type/Default */
  --rpl-type-link: #004c97;                  /* Ripple 2.0/Type/Link/Link */
  
  /* Accent & Semantic */
  --rpl-accent: #88dbdf;                     /* Ripple 2.0/Accent/Accent */
  --rpl-accent-alt: #e7f8f9;                 /* Ripple 2.0/Accent/Accent Alt */
  --rpl-error: #aa0028;                      /* Ripple 2.0/Semantic/Error/Error */
  
  /* Dividers & Rules */
  --rpl-divider: #e6e6e6;
  --rpl-footer-rule: #003174;
  --rpl-footer-core-rule: #0052c2;
  --rpl-border: #cccccc;
  
  /* Icon & UI */
  --rpl-icon-blue: #0052c2;
  --rpl-outline-border: rgba(85, 80, 124, 0.2);
  
  /* Progress Indicator */
  --step-active: #066afe;
  --step-idle: #c9c9c9;
  --step-label: #2e2e2e;
  --hstep-active: #1589ee;
  --hstep-idle: #dddbda;
  --hstep-label: #080707;
}
```

### Usage Examples

Use CSS custom properties in any style rule:

```css
.button {
  background: var(--rpl-primary);    /* #201547 */
  color: var(--rpl-neutral-00);      /* #ffffff */
  border: 2px solid var(--rpl-outline-border);
}

.link {
  color: var(--rpl-type-link);       /* #004c97 */
}

.error-text {
  color: var(--rpl-error);           /* #aa0028 */
}
```

## Typography Tokens

### Font Stack

```css
--rpl-font: "VIC", "Helvetica Neue", Helvetica, Arial, sans-serif;
--step-font: "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

### Typographic Scales

All type is built from these base combinations (font-weight/size/line-height/letter-spacing):

**H2 Page Title (Medium 32/40)**
```css
font: 500 32px/40px var(--rpl-font);
letter-spacing: 0.014em;
color: var(--rpl-primary);
```

**H3 Section Heading (Medium 24/32)**
```css
font: 500 24px/32px var(--rpl-font);
letter-spacing: 0.016em;
color: var(--rpl-primary);
```

**Body Copy (Regular 16/24)**
```css
font: 400 16px/24px var(--rpl-font);
letter-spacing: 0.0192em;
color: var(--rpl-type-default);
```

**Metadata / Topic Label (Regular 14/14)**
```css
font: 400 14px/14px var(--rpl-font);
letter-spacing: 0.0168em;
color: var(--rpl-neutral-600);
```

**Form Label (Medium 16/24)**
```css
font: 500 16px/24px var(--rpl-font);
letter-spacing: 0.0192em;
color: var(--rpl-type-default);
```

**Button Text (Bold 16/16)**
```css
font: 700 16px/16px var(--rpl-font);
letter-spacing: 0.0192em;
```

## Spacing Tokens

All spacing uses a base unit of 4px. Common spacings:

```css
/* Gaps between layout sections */
gap: 40px;          /* Section to section */
gap: 28px;          /* Card grid gap */
gap: 24px;          /* Component spacing */
gap: 20px;          /* Item spacing */
gap: 16px;          /* Fine spacing */
gap: 12px;          /* Micro spacing */

/* Padding */
padding: 60px 80px;   /* Section padding (desktop) */
padding: 40px 16px;   /* Section padding (mobile) */
padding: 20px;        /* Card content padding */
padding: 16px;        /* Button padding */
```

## Layout Tokens

**Container Max-Width:**
```css
--content-max: 1200px;
```

All page content is centered and capped at 1200px, except:
- Email body is fixed at 1040px
- Progress rail expands on ultra-wide screens (1600+, 1920+)

**Form Width:**
```css
--form-max: 770px;
```

The form (with progress rail) is 770px wide at 1200px+ viewports.

**Progress Indicator (Privacy/Consent/Form/Review Pages):**
```css
--progress-inset: 42px;      /* Left offset from content edge */
--progress-gap: 101px;       /* Gap between progress and form */
--panel-inset: 272px;        /* Grey panel width inside content */
```

At 1600px+, the panel and progress expand:

```css
@media (min-width: 1600px) {
  :root {
    --panel-inset: 524px;
    --progress-inset: 94px;
    --progress-gap: 96px;
  }
}
```

## Component-Specific Tokens

Defined in `src/components.css`:

```css
:root {
  --rpl-accent: #88dbdf;              /* Hero title background */
  --rpl-neutral-600: #666666;         /* Card topic labels, hints */
  --rpl-border: #cccccc;              /* Card borders, input borders */
  --rpl-error: #aa0028;               /* Form validation, required marker */
}
```

## How to Apply

1. **In HTML:** Use `var()` in inline styles (rarely needed):
   ```html
   <div style="color: var(--rpl-type-default);">Text</div>
   ```

2. **In CSS:** Reference in any rule:
   ```css
   .my-component {
     background: var(--rpl-primary);
     color: var(--rpl-neutral-00);
     border-color: var(--rpl-border);
   }
   ```

3. **Responsive Tokens:** Some tokens change at breakpoints:
   ```css
   @media (min-width: 992px) {
     :root {
       --rpl-accent: #88dbdf;  /* Different value, but same variable */
     }
   }
   ```

## Font Files

Four weights of VIC are included as WOFF2:

```css
@font-face {
  font-family: "VIC";
  src: url("./fonts/VIC-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "VIC";
  src: url("./fonts/VIC-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "VIC";
  src: url("./fonts/VIC-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "VIC";
  src: url("./fonts/VIC-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

Use by specifying `font-weight`:

```css
.title {
  font: 700 32px var(--rpl-font);  /* Uses VIC-Bold (weight 700) */
}

.subtitle {
  font: 500 24px var(--rpl-font);  /* Uses VIC-Medium (weight 500) */
}

.body {
  font: 400 16px var(--rpl-font);  /* Uses VIC-Regular (weight 400) */
}
```

## Breakpoint-Specific Values

**Mobile (320–991px):**
```css
/* Single column, no progress rail, compact spacing */
padding: 0 12px;
gap: 20px;
max-width: none;
```

**Tablet/Small Desktop (992–1199px):**
```css
/* Progress rail visible, reduced panel width */
padding: 0 0 60px 42px;
gap: 101px;
--panel-inset: 272px;
```

**Desktop (1200–1599px):**
```css
/* Standard form width, normal footer */
max-width: 770px;
padding: 0 80px 60px;
gap: 28px;
```

**Wide Desktop (1600–1919px):**
```css
/* Expanded panel, increased insets */
--panel-inset: 524px;
--progress-inset: 94px;
```

**Ultra-Wide (1920px+):**
```css
/* Maximized panel width */
--panel-inset: 684px;
--progress-inset: 454px;
```

## Modifying Tokens

To change a token globally:

1. **Edit `src/styles.css`** in the `:root` selector
2. All pages using that token automatically update
3. For responsive tokens, update the relevant `@media` block

Example: To change primary color from purple (#201547) to blue (#0052c2):

```css
:root {
  --rpl-primary: #0052c2;  /* Changed from #201547 */
}
```

All buttons, headings, and primary UI now use the new colour.
