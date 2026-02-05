![Stylelint Plugin - Defensive CSS Logo](./assets/logo--dark.webp#gh-dark-mode-only)
![Stylelint Plugin - Defensive CSS Logo](./assets/logo--light.webp#gh-light-mode-only)

![Stylelint Plugin Defensive CSS License](https://img.shields.io/github/license/yuschick/stylelint-plugin-defensive-css?style=for-the-badge)
![Stylelint PLugin Defensive CSS Latest NPM Version](https://img.shields.io/npm/v/stylelint-plugin-defensive-css?style=for-the-badge)
![Stylelint PLugin Defensive CSS Main Workflow Status](https://img.shields.io/github/actions/workflow/status/yuschick/stylelint-plugin-defensive-css/pull-request--checks.yaml?style=for-the-badge)
![Stylelint PLugin Defensive CSS NPM Downloads](https://img.shields.io/npm/dw/stylelint-plugin-defensive-css?style=for-the-badge)

A Stylelint plugin to enforce [Defensive CSS](https://defensivecss.dev/) best practices.

> [!TIP]
> [V1 documentation can be found here](./V1-DOCUMENTATION.md)

## Table of Contents

[Getting Started](#getting-started) | [Quickstart](#quickstart) | [Plugin Configs](#defensive-css-configs) |  [Plugin Rules](#defensive-css-rules) | [Troubleshooting](#troubleshooting)

## Getting Started

> [!IMPORTANT]
> The plugin requires [Stylelint](https://stylelint.io/) v14.0.0 or greater.

To get started using the plugin, it must first be installed.

```bash
npm i stylelint-plugin-defensive-css --save-dev
```

```bash
yarn add stylelint-plugin-defensive-css --dev
```

With the plugin installed, it must be added to the `plugins` array of your Stylelint config.

```json
{
  "plugins": ["stylelint-plugin-defensive-css"],
}
```

After adding the plugin to the configuration file, you now have access to the various rules and options it provides.

## Quickstart

After installation, add this to your `.stylelintrc.json`:

```json
{
  "plugins": ["stylelint-plugin-defensive-css"],
  "extends": ["stylelint-plugin-defensive-css/configs/recommended"]
}
```

## Defensive CSS Configs

For quick setup, the plugin provides preset configurations that enable commonly used rules.

### Recommended

The `recommended` preset enables core defensive CSS rules with sensible defaults, suitable for most projects.

**Usage:**

```json
{
  "extends": ["stylelint-plugin-defensive-css/configs/recommended"]
}
```

**Equivalent to:**

```json
{
  "plugins": ["stylelint-plugin-defensive-css"],
  "rules": {
    "defensive-css/no-accidental-hover": true,
    "defensive-css/no-list-style-none": [true, { fix: true }],
    "defensive-css/no-mixed-vendor-prefixes": true,
    "defensive-css/require-background-repeat": true,
    "defensive-css/require-flex-wrap": true,
    "defensive-css/require-focus-visible": true,
    "defensive-css/require-named-grid-lines": true,
    "defensive-css/require-prefers-reduced-motion": true,
  }
}
```

### Strict

The `strict` preset enables every rule for the most strict linting offered by the plugin.

**Usage:**

```json
{
  "extends": ["stylelint-plugin-defensive-css/configs/strict"]
}
```

## Defensive CSS Rules

The plugin provides multiple rules that can be toggled on and off as needed.

1. [No Accidental Hover](#no-accidental-hover)
2. [No Fixed Sizes](#no-fixed-sizes)
3. [No List Style None](#no-list-style-none)
4. [No Mixed Vendor Prefixes](#no-mixed-vendor-prefixes)
5. [Require Background Repeat](#require-background-repeat)
6. [Require Custom Property Fallback](#require-custom-property-fallback)
7. [Require Flex Wrap](#require-flex-wrap)
8. [Require Focus Visible](#require-focus-visible)
9. [Require Named Grid Lines](#require-named-grid-lines)
10. [Require Overscroll Behavior](#require-overscroll-behavior)
11. [Require Prefers Reduced Motion](#require-prefers-reduced-motion)
12. [Require Scrollbar Gutter](#require-scrollbar-gutter)

---

### No Accidental Hover

> [!NOTE]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/hover-media/)

Hover effects indicate interactivity on devices with mouse or trackpad input. However, on touch devices, hover states can cause confusing user experiences where elements become stuck in a hovered state after being tapped, or trigger unintended actions.

**Enable this rule to:** Require all `:hover` selectors to be wrapped in `@media (hover: hover)` queries, ensuring hover effects only apply in supported contexts.

```json
{
  "rules": {
    "defensive-css/no-accidental-hover": true,
  }
}
```

#### No Accidental Hover Examples

<details>
<summary>✅ Passing Examples</summary>

```css
@media (hover: hover) {
  .btn:hover {
    color: black;
  }
}

/* Will traverse nested media queries */
@media (hover: hover) {
  @media (min-width: 1px) {
    .btn:hover {
      color: black;
    }
  }
}

/* Will traverse nested media queries */
@media (min-width: 1px) {
  @media (hover: hover) {
    @media (min-width: 100px) {
      .btn:hover {
        color: black;
      }
    }
  }
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
.fail-btn:hover {
  color: black;
}

@media (min-width: 1px) {
  .fail-btn:hover {
    color: black;
  }
}
```

</details>

---

### No Fixed Sizes

> [!NOTE]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/fixed-sizes/)

Fixed pixel (px) values prevent layouts from adapting to different screen sizes, user preferences, and device contexts. When widths, heights, spacing, and breakpoints are defined with px, content can overflow on small screens, create excessive whitespace on large displays, or ignore user font-size preferences set for accessibility.

**Enable this rule to:** Require relative or flexible units (rem, em, %, vw, fr, etc.) for sizing properties and media queries, ensuring layouts adapt gracefully across all contexts.

```json
{
  "rules": {
    "defensive-css/no-fixed-sizes": true
  }
}
```

#### No Fixed Sizes Options

**Configuration:** By default, this rule validates critical sizing properties (width, height, font-size), spacing properties (margin, padding, gap), typography properties (line-height, letter-spacing), and responsive at-rules (@media, @container). Use the `at-rules` and `properties` options to customize which are checked or adjust their severity levels.

```ts
type SeverityLevel = false | 'error' | 'warn';

interface SecondaryOptions {
  'at-rules'?: Partial<Record<CSSType.AtRules, SeverityLevel>>;
  'properties'?: Partial<Record<keyof CSSType.PropertiesHyphen, SeverityLevel>>
}
```

```json
{
  "rules": {
    "defensive-css/no-fixed-sizes": [true, {
        "at-rules": [{ "@container": false }],
        "properties": [{ "transform": "warn", "scroll-margin": false }],
    }],
  }
}
```

#### No Fixed Sizes Examples

> [!NOTE]
> This rule does not resolve or validate the values of CSS custom properties. Values like `var(--width)` are treated as flexible since their actual values are not determined. Ensure your custom property definitions use relative units if they're used for sizing.

<details>
<summary>✅ Passing Examples</summary>

```css
/* Sizing with relative units */
.box {
  width: 50%;
  height: 100vh;
  font-size: 1.5rem;
}

/* Spacing with flexible units */
.card {
  margin: 2rem auto;
  padding: 1em 2em;
  gap: 1rem;
}

/* Grid with fractional units */
.grid {
  grid-template-columns: repeat(3, 1fr);
}

/* Functions with flexible units */
.responsive {
  width: clamp(200px, 50%, 800px);
  padding: calc(1rem + 2vw);
}

/* Media queries with relative units */
@media (min-width: 48rem) {
  .box {
    padding: 2rem;
  }
}

/* Zero values are allowed */
.reset {
  margin: 0;
  padding: 0px;
}

/* Custom properties */
.themed {
  width: var(--width);
  margin: var(--spacing, 1rem);
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
/* Fixed sizing */
.box {
  width: 500px;
  height: 300px;
  font-size: 16px;
}

/* Fixed spacing */
.card {
  margin: 20px;
  padding: 10px 15px;
  gap: 24px;
}

/* Grid with fixed values */
.grid {
  grid-template-columns: 100px 1fr 100px;
}

/* Functions with only px */
.fixed {
  width: clamp(200px, 400px, 800px);
  padding: calc(10px + 5px);
}

/* Media queries with px */
@media (min-width: 768px) {
  .box {
    padding: 2rem;
  }
}

/* Mixed units still fail if px is present */
.mixed {
  margin: 1rem 20px;
  line-height: 24px;
}
```

</details>

---

### No List Style None

> [!TIP]
> This rule is fixable by passing the `{ fix: true }` option.

In Safari, using `list-style: none` on `<ul>`, `<ol>`, or `<li>` elements removes list semantics from the accessibility tree, making the list invisible to VoiceOver users. Using `list-style-type: ""` (empty string) achieves the same visual result while preserving accessibility.

**Exception:** Lists inside `<nav>` elements maintain their semantics even with `list-style: none`, so this rule allows that pattern.

**Enable this rule to:** Prevent `list-style: none` on lists outside of navigation, requiring the accessible `list-style-type: ""` approach instead.

```json
{
  "rules": {
    "defensive-css/no-list-style-none": [true, { fix: true }]
  }
}
```

#### No List Style None Examples

<details>
<summary>✅ Passing Examples</summary>

```css
/* Recommended: Preserves semantics */
ul {
  list-style-type: "";
}

/* Exception: Lists inside nav elements retain semantics */
nav ul {
  list-style: none;
}

/* Other list-style values are fine */
ul {
  list-style: disc;
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
ul {
  list-style: none;
}

.menu ul {
  list-style: none;
}

ol.items {
  list-style: none;
}

:not(nav) ul {
  list-style: none;
}
```

</details>

---

### No Mixed Vendor Prefixes

> [!NOTE]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/grouping-selectors)

Grouping vendor-prefixed selectors in a single rule can cause the entire rule to be invalid according to the [W3C selector specification](https://www.w3.org/TR/selectors/#grouping). For example, combining `-webkit-` and `-moz-` placeholder selectors will prevent either from working correctly.

**Enable this rule to:** Require vendor-prefixed selectors to be separated into individual rules, ensuring browser-specific styles apply correctly.

```json
{
  "rules": {
    "defensive-css/no-mixed-vendor-prefixes": true,
  }
}
```

#### No Mixed Vendor Prefixes Examples

<details>
<summary>✅ Passing Examples</summary>

```css
input::-webkit-input-placeholder {
  color: #222;
}

input::-moz-placeholder {
  color: #222;
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
input::-webkit-input-placeholder,
input::-moz-placeholder {
  color: #222;
}
```

</details>

---

### Require Background Repeat

> [!NOTE]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/bg-repeat)

Background and mask images repeat by default when the container is larger than the image dimensions. On large screens, this can result in unintended tiling effects that break the design.

**Enable this rule to:** Require an explicit `background-repeat` or `mask-repeat` property whenever `background-image` or `mask-image` is used.

```json
{
  "rules": {
    "defensive-css/require-background-repeat": true,
  }
}
```

#### Require Background Repeat Options

**Configuration:** By default, this rule validates both background and mask images. Use the `background-repeat` and `mask-repeat` options to control which properties are checked.

```ts
interface SecondaryOptions {
  'background-repeat'?: boolean;
  'mask-repeat'?: boolean;
}
```

```json
{
  "rules": {
    "defensive-css/require-background-repeat": [true, {
        "background-repeat": true,
        "mask-repeat": true
    }],
  }
}
```

#### Require Background Repeat Examples

<details>
<summary>✅ Passing Examples</summary>

```css
div {
  background: url('some-image.jpg') repeat black top center;
}

div {
  background: url('some-image.jpg') black top center;
  background-repeat: no-repeat;
}

div {
  mask: url('some-image.jpg') repeat top center;
}

div {
  mask: url('some-image.jpg') top center;
  mask-repeat: no-repeat;
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
div {
  background: url('some-image.jpg') black top center;
}

div {
  background-image: url('some-image.jpg');
}

div {
  mask: url('some-image.jpg') top center;
}

div {
  mask-image: url('some-image.jpg');
}
```

</details>

---

### Require Custom Property Fallback

> [!NOTE]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/css-variable-fallback)

CSS custom properties (variables) can fail silently if undefined, potentially breaking layouts or causing visual issues. Providing fallback values ensures graceful degradation when variables are missing or invalid.

**Enable this rule to:** Require all `var()` functions to include a fallback value (e.g., `var(--color, #000)`).

```json
{
  "rules": {
    "defensive-css/require-custom-property-fallback": true,
  }
}
```

#### Require Custom Property Fallback Options

**Configuration:** By default, this rule validates all custom properties. Use the `ignore` option to exclude specific patterns, such as global design tokens or component-scoped variables.

```ts
interface SecondaryOptions {
  ignore?: (string | RegExp)[];
}
```

```json
{
  "rules": {
    "defensive-css/require-custom-property-fallback": [true, {
        "ignore": ["var\\(--exact-match\\)", /var\(--ds-color-.*\)/]
    }],
  }
}
```

#### Require Custom Property Fallback Examples

<details>
<summary>✅ Passing Examples</summary>

```css
div {
  color: var(--color-primary, #000);
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
div {
  color: var(--color-primary);
}
```

</details>

---

### Require Flex Wrap

> [!NOTE]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/flex-wrap)

Flex containers do not wrap their children by default. When there isn't enough horizontal space, flex items will overflow rather than wrapping to a new line, potentially breaking layouts on smaller screens.

**Enable this rule to:** Require an explicit `flex-wrap` property (or `flex-flow` shorthand) for all flex containers, ensuring predictable wrapping behavior is defined.

```json
{
  "rules": {
    "defensive-css/require-flex-wrap": true,
  }
}
```

#### Require Flex Wrap Examples

<details>
<summary>✅ Passing Examples</summary>

```css
div {
  display: flex;
  flex-wrap: wrap;
}

div {
  display: flex;
  flex-wrap: nowrap;
}

div {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap-reverse;
}

div {
  display: flex;
  flex-flow: row wrap;
}

div {
  display: flex;
  flex-flow: row-reverse nowrap;
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
div {
  display: flex;
}

div {
  display: flex;
  flex-direction: row;
}

div {
  display: flex;
  flex-flow: row;
}
```

</details>

---

### Require Focus Visible

The `:focus` pseudo-class shows focus indicators for both mouse clicks and keyboard navigation, which often leads developers to hide focus outlines entirely (creating accessibility issues). The `:focus-visible` pseudo-class only shows focus indicators when the user is navigating with a keyboard, providing a better user experience.

**Enable this rule to:** Require `:focus-visible` instead of `:focus` for better keyboard navigation UX.

```json
{
  "rules": {
    "defensive-css/require-focus-visible": true,
  }
}
```

#### Require Focus Visible Examples

<details>
<summary>✅ Passing Examples</summary>

```css
.btn:focus-visible {
  outline: 2px solid blue;
}

.modal:focus-within {
  border: 1px solid blue;
}

/* Intentional exclusion */
.input:not(:focus) {
  border: 1px solid gray;
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
.btn:focus {
  outline: 2px solid blue;
}

button:focus {
  outline: none;
}

.input:focus:hover {
  border-color: blue;
}
```

</details>

---

### Require Named Grid Lines

Unnamed grid lines make layouts harder to understand and maintain. Numeric positions like `grid-column: 1 / 3` are ambiguous and prone to errors when the grid structure changes. Named lines like `[sidebar-start]` provide clarity and self-documenting code.

**Enable this rule to:** Require all grid tracks to be associated with named lines using the `[name]` syntax in `grid-template-columns`, `grid-template-rows`, and the `grid` shorthand.

```json
{
  "rules": {
    "defensive-css/require-named-grid-lines": true,
  }
}
```

#### Require Named Grid Lines Options

**Configuration:** By default, this rule validates both row and column lines. Use the `columns` and `rows` options to control which axes are checked.

```ts
interface SecondaryOptions {
  columns?: boolean;
  rows?: boolean;
}
```

```json
{
  "rules": {
    "defensive-css/require-named-grid-lines": [true, {
        "columns": true,
        "rows": true
    }],
  }
}
```

#### Require Named Grid Lines Examples

<details>
<summary>✅ Passing Examples</summary>

```css
div {
  grid-template-columns: [c-a] 1fr [c-b] 1fr;
}

div {
  grid-template-rows: [r-a] 1fr [r-b] 2fr;
}

div {
  grid-template-columns: [a] [b] 1fr [c] 2fr;
}

div {
  grid-template-columns: repeat(auto-fit, [line-a line-b] 300px);
}

div {
  grid-template-rows: repeat(auto-fill, [r1 r2] 100px);
}

div {
  grid: [r-a] 1fr / [c-a] 1fr [c-b] 2fr;
}

div {
  grid-template-columns: repeat(auto-fit, [a]300px);
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
div {
  grid-template-columns: 1fr 1fr;
}

div {
  grid-template-rows: 1fr 1fr;
}

div {
  grid-template-columns: repeat(3, 1fr);
}

div {
  grid-template-rows: repeat(3, 1fr);
}

div {
  grid: auto / 1fr 1fr;
}

div {
  grid: repeat(3, 1fr) / auto;
}

div {
  grid-template-columns: 1fr [after] 1fr;
}

/* Reserved identifiers cannot be used as line names */
div {
  grid-template-columns: [auto] 1fr;
}

div {
  grid-template-rows: [span] 1fr;
}
```

</details>

---

### Require Overscroll Behavior

> [!NOTE]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/scroll-chain)

Scroll chaining occurs when a scrollable element reaches its scroll boundary and the scroll continues to the parent container. This commonly happens in modals where scrolling past the end causes the background content to scroll, creating a disorienting user experience.

**Enable this rule to:** Require an `overscroll-behavior` property for all scrollable containers (`overflow: auto` or `overflow: scroll`), preventing unintended scroll chaining.

```json
{
  "rules": {
    "defensive-css/require-overscroll-behavior": true,
  }
}
```

#### Require Overscroll Behavior Options

**Configuration:** By default, this rule validates both horizontal and vertical overflow. Use the `x` and `y` options to control which axes are checked.

```ts
interface SecondaryOptions {
  x?: boolean;
  y?: boolean;
}
```

```json
{
  "rules": {
    "defensive-css/require-overscroll-behavior": [true, {
        "x": true,
        "y": true
    }],
  }
}
```

#### Require Overscroll Behavior Examples

<details>
<summary>✅ Passing Examples</summary>

```css
div {
  overflow-x: auto;
  overscroll-behavior-x: contain;
}

div {
  overflow: hidden scroll;
  overscroll-behavior: contain;
}

div {
  overflow: hidden; /* No overscroll-behavior is needed in the case of hidden */
}

div {
  overflow-block: auto;
  overscroll-behavior: none;
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
div {
  overflow-x: auto;
}

div {
  overflow: hidden scroll;
}

div {
  overflow-block: auto;
}
```

</details>

---

### Require Prefers Reduced Motion

> [!TIP]
> [Read more about prefers-reduced-motion on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)

Some users experience motion sickness or vestibular disorders that make animations uncomfortable or even nauseating. The `prefers-reduced-motion` media query allows users to request minimal animation. Respecting this preference is crucial for accessibility.

**Enable this rule to:** Require all animations and transitions to be wrapped in a `@media (prefers-reduced-motion: no-preference)` or `@media not (prefers-reduced-motion: reduce)` query.

```json
{
  "rules": {
    "defensive-css/require-prefers-reduced-motion": true
  }
}
```

#### Require Prefers Reduced Motion Examples

<details>
<summary>✅ Passing Examples</summary>

```css
@media (prefers-reduced-motion: no-preference) {
  .box {
    transition: transform 0.3s;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .box {
    animation: slide 1s ease;
  }
}

/* Instant transitions are allowed */
.box {
  transition: transform 0s;
}

/* No animation is allowed */
.box {
  animation: none;
}

@media not (prefers-reduced-motion: reduce) {
  .box {
    transition: transform 0s;
  }
}

/* Nested media queries */
@media (prefers-reduced-motion: no-preference) {
  @media (min-width: 768px) {
    .box {
      transition: transform 0.3s;
    }
  }
}

```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
.box {
  transition: transform 0.3s;
}

.box {
  animation: slide 1s ease;
}

.box {
  animation-duration: 0.5s;
}

/* Media query without prefers-reduced-motion */
@media (min-width: 768px) {
  .box {
    transition: transform 0.3s;
  }
}
```

</details>

---

### Require Scrollbar Gutter

> [!NOTE]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/scrollbar-gutter)

When content grows and triggers a scrollbar, the sudden appearance of the scrollbar causes a layout shift as content reflows to accommodate it. This creates a jarring visual jump, especially in dynamic interfaces where content changes frequently.

**Enable this rule to:** Require a `scrollbar-gutter` property for all scrollable containers, reserving space for the scrollbar and preventing layout shifts.

```json
{
  "rules": {
    "defensive-css/require-scrollbar-gutter": true,
  }
}
```

#### Require Scrollbar Gutter Options

**Configuration:** By default, this rule validates both horizontal and vertical overflow. Use the `x` and `y` options to control which axes are checked.

```ts
interface SecondaryOptions {
  x?: boolean;
  y?: boolean;
}
```

```json
{
  "rules": {
    "defensive-css/require-scrollbar-gutter": [true, {
        "x": true,
        "y": true
    }],
  }
}
```

#### Require Scrollbar Gutter Examples

<details>
<summary>✅ Passing Examples</summary>

```css
div {
  overflow-x: auto;
  scrollbar-gutter: auto;
}

div {
  overflow: hidden scroll;
  scrollbar-gutter: stable;
}

div {
  overflow: hidden; /* No scrollbar-gutter is needed in the case of hidden */
}

div {
  overflow-block: auto;
  scrollbar-gutter: stable both-edges;
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
div {
  overflow-x: auto;
}

div {
  overflow: hidden scroll;
}

div {
  overflow-block: auto;
}
```

</details>

## Troubleshooting

### Third-Party False Positives

If you're getting warnings for properties you don't control (e.g., from third-party libraries), you can disable the rule for specific files in your Stylelint config file using the `overrides` property.

```json
{
  "overrides": [
    {
      "files": ["vendor/**/*.css"],
      "rules": {
        "defensive-css/no-mixed-vendor-prefixes": null
      }
    }
  ]
}
```

### Ignoring Specific Patterns

As an escape hatch, use Stylelint's built-in `disable` comments to bypass specific rules:

```css
div {
  /* stylelint-disable-next-line defensive-css/require-background-repeat */
  background: url(./some-image.jpg);
}
```
