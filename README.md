![Stylelint Plugin - Defensive CSS Logo](./assets/logo--dark.webp#gh-dark-mode-only)
![Stylelint Plugin - Defensive CSS Logo](./assets/logo--dark.webp#gh-light-mode-only)

![Stylelint Plugin Defensive CSS License](https://img.shields.io/github/license/yuschick/stylelint-plugin-defensive-css?style=for-the-badge)
![Stylelint PLugin Defensive CSS Latest NPM Version](https://img.shields.io/npm/v/stylelint-plugin-defensive-css?style=for-the-badge)
![Stylelint PLugin Defensive CSS Main Workflow Status](https://img.shields.io/github/actions/workflow/status/yuschick/stylelint-plugin-defensive-css/main.yaml?style=for-the-badge)
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
    "defensive-css/no-mixed-vendor-prefixes": true,
    "defensive-css/require-background-repeat": true,
    "defensive-css/require-flex-wrap": true,
    "defensive-css/require-focus-visible": true,
    "defensive-css/require-named-grid-lines": true,
  }
}
```

## Defensive CSS Rules

The plugin provides multiple rules that can be toggled on and off as needed.

1. [No Accidental Hover](#no-accidental-hover)
2. [No Mixed Vendor Prefixes](#no-mixed-vendor-prefixes)
3. [Require Background Repeat](#require-background-repeat)
4. [Require Custom Property Fallback](#require-custom-property-fallback)
5. [Require Flex Wrap](#require-flex-wrap)
6. [Require Focus Visible](#require-focus-visible)
7. [Require Named Grid Lines](#require-named-grid-lines)
8. [Require Overscroll Behavior](#require-overscroll-behavior)
9. [Require Scrollbar Gutter](#require-scrollbar-gutter)

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
