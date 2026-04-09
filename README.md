![Stylelint Plugin - Defensive CSS Logo](./assets/logo--dark.webp#gh-dark-mode-only)
![Stylelint Plugin - Defensive CSS Logo](./assets/logo--light.webp#gh-light-mode-only)

![Stylelint Plugin Defensive CSS License](https://img.shields.io/github/license/yuschick/stylelint-plugin-defensive-css?style=for-the-badge)
![Stylelint PLugin Defensive CSS Latest NPM Version](https://img.shields.io/npm/v/stylelint-plugin-defensive-css?style=for-the-badge)
![Stylelint PLugin Defensive CSS Main Workflow Status](https://img.shields.io/github/actions/workflow/status/yuschick/stylelint-plugin-defensive-css/pull-request--checks.yaml?style=for-the-badge)
![Stylelint PLugin Defensive CSS NPM Downloads](https://img.shields.io/npm/dw/stylelint-plugin-defensive-css?style=for-the-badge)

A Stylelint plugin to help you write more defensive, accessible, and maintainable CSS. Catch layout and accessibility bugs before they ship, enforce team-wide best practices, and guard against the subtle CSS pitfalls that break real-world experiences.

> [!TIP]
> [V1 documentation can be found here](./V1-DOCUMENTATION.md)

## Table of Contents

[Getting Started](#getting-started) | [Quickstart](#quickstart) | [Plugin Configs](#defensive-css-configs) | [Plugin Rules](#defensive-css-rules) | [Troubleshooting](#troubleshooting)

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
  "plugins": ["stylelint-plugin-defensive-css"]
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
    "defensive-css/no-accidental-hover": [true, { "severity": "error" }],
    "defensive-css/no-list-style-none": [true, { "fix": true, "severity": "error" }],
    "defensive-css/no-mixed-vendor-prefixes": [true, { "severity": "error" }],
    "defensive-css/no-unsafe-clamp-font-size": [
      true,
      { "reportUnresolvable": [true, { "severity": "warning" }], "severity": "error" }
    ],
    "defensive-css/no-unsafe-will-change": [true, { "severity": "error" }],
    "defensive-css/no-user-select-none": [true, { "severity": "error" }],
    "defensive-css/require-background-repeat": [true, { "severity": "error" }],
    "defensive-css/require-dynamic-viewport-height": [true, { "severity": "warning" }],
    "defensive-css/require-flex-wrap": [true, { "severity": "error" }],
    "defensive-css/require-focus-visible": [true, { "severity": "error" }],
    "defensive-css/require-forced-colors-focus": [true, { "severity": "error" }],
    "defensive-css/require-named-grid-lines": [
      true,
      {
        "columns": [true, { "severity": "error" }],
        "rows": [true, { "severity": "warning" }]
      }
    ],
    "defensive-css/require-prefers-reduced-motion": [true, { "severity": "error" }],
    "defensive-css/require-pure-selectors": [
      true,
      { "ignoreElements": ["*"], "severity": "error" }
    ],
    "defensive-css/require-system-font-fallback": [true, { "severity": "error" }]
  }
}
```

### Accessibility

The `accessibility` preset enables accessibility-focused rules to catch common issues that impact keyboard navigation, screen readers, and user preferences.

**Usage:**

```json
{
  "extends": ["stylelint-plugin-defensive-css/configs/accessibility"]
}
```

**Equivalent to:**

```json
{
  "plugins": ["stylelint-plugin-defensive-css"],
  "rules": {
    "defensive-css/no-accidental-hover": [true, { "severity": "error" }],
    "defensive-css/no-list-style-none": [true, { "fix": true, "severity": "error" }],
    "defensive-css/no-unsafe-clamp-font-size": [
      true,
      { "reportUnresolvable": [true, { "severity": "warning" }], "severity": "error" }
    ],
    "defensive-css/no-user-select-none": [true, { "severity": "error" }],
    "defensive-css/require-focus-visible": [true, { "severity": "error" }],
    "defensive-css/require-forced-colors-focus": [true, { "severity": "error" }],
    "defensive-css/require-prefers-reduced-motion": [true, { "severity": "error" }]
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
5. [No Unsafe Clamp Font Size](#no-unsafe-clamp-font-size)
6. [No Unsafe Will-Change](#no-unsafe-will-change)
7. [No User Select None](#no-user-select-none)
8. [Require At Layer](#require-at-layer)
9. [Require Background Repeat](#require-background-repeat)
10. [Require Custom Property Fallback](#require-custom-property-fallback)
11. [Require Dynamic Viewport Height](#require-dynamic-viewport-height)
12. [Require Flex Wrap](#require-flex-wrap)
13. [Require Focus Visible](#require-focus-visible)
14. [Require Forced Colors Focus](#require-forced-colors-focus)
15. [Require Named Grid Lines](#require-named-grid-lines)
16. [Require Overscroll Behavior](#require-overscroll-behavior)
17. [Require Prefers Reduced Motion](#require-prefers-reduced-motion)
18. [Require Pure Selectors](#require-pure-selectors)
19. [Require Scrollbar Gutter](#require-scrollbar-gutter)
20. [Require System Font Fallback](#require-system-font-fallback)

---

### No Accidental Hover

> [!NOTE]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/hover-media/)

Hover effects indicate interactivity on devices with mouse or trackpad input. However, on touch devices, hover states can cause confusing user experiences where elements become stuck in a hovered state after being tapped, or trigger unintended actions.

**Enable this rule to:** Require all `:hover` selectors to be wrapped in `@media (hover: hover)` queries, ensuring hover effects only apply in supported contexts.

```json
{
  "rules": {
    "defensive-css/no-accidental-hover": true
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
type Severity = 'error' | 'warning';

interface SecondaryOptions {
  'at-rules'?: Partial<
    Record<CSSType.AtRules, boolean | [boolean, { severity?: Severity }]>
  >;
  properties?: Partial<
    Record<keyof CSSType.PropertiesHyphen, boolean | [boolean, { severity?: Severity }]>
  >;
  severity?: Severity;
}
```

```json
{
  "rules": {
    "defensive-css/no-fixed-sizes": [
      true,
      {
        "at-rules": [{ "@container": false }],
        "properties": [
          { "transform": true, "scroll-margin": [true, { "severity": "warning" }] }
        ],
        "severity": "error"
      }
    ]
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
    "defensive-css/no-list-style-none": [true, { "fix": true }]
  }
}
```

#### No List Style None Examples

<details>
<summary>✅ Passing Examples</summary>

```css
/* Recommended: Preserves semantics */
ul {
  list-style-type: '';
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
    "defensive-css/no-mixed-vendor-prefixes": true
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

### Require At Layer

CSS cascade layers (`@layer`) provide explicit control over specificity ordering, preventing unexpected style overrides in large codebases or design systems. Without layers, the cascade relies solely on source order and specificity, making it fragile and difficult to manage as styles scale. Scoping component styles to a top-level `@layer` ensures predictable cascade behavior and clearer style boundaries.

**Enable this rule to:** Require all style rules to be wrapped in a top-level `@layer` rule, optionally restricting to a set of supported layer names.

```json
{
  "rules": {
    "defensive-css/require-at-layer": true
  }
}
```

#### Require At Layer Options

**Configuration:** By default, this rule requires all styles to be inside any `@layer`. Use the `supportedLayerNames` option to restrict which layer names are allowed.

```ts
interface SecondaryOptions {
  severity?: Severity;
  supportedLayerNames?: string[];
}
```

```json
{
  "rules": {
    "defensive-css/require-at-layer": [
      true,
      {
        "supportedLayerNames": ["ds.components", "ds.utilities"],
        "severity": "error"
      }
    ]
  }
}
```

#### Require At Layer Examples

<details>
<summary>✅ Passing Examples</summary>

```css
/* Any layer name (without supportedLayerNames) */
@layer components {
  div {
    color: red;
  }
}

/* Supported layer name (with supportedLayerNames: ['ds.components']) */
@layer ds.components {
  div {
    color: red;
  }
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
/* Not wrapped in any @layer */
div {
  color: red;
}

/* Unsupported layer name (with supportedLayerNames: ['ds.components']) */
@layer components {
  div {
    color: red;
  }
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
    "defensive-css/require-background-repeat": true
  }
}
```

#### Require Background Repeat Options

**Configuration:** By default, this rule validates both background and mask images. Use the `background-repeat` and `mask-repeat` options to control which properties are checked.

```ts
interface SecondaryOptions {
  'background-repeat'?: boolean | [boolean, { severity?: Severity }];
  'mask-repeat'?: boolean | [boolean, { severity?: Severity }];
}
```

```json
{
  "rules": {
    "defensive-css/require-background-repeat": [
      true,
      {
        "background-repeat": [true, { "severity": "error" }],
        "mask-repeat": false
      }
    ]
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

### No Unsafe Clamp Font Size

> [!NOTE]
> [Read the research behind this rule](https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/)

Using `clamp()` with viewport units for fluid font sizing can prevent text from scaling to 200% of its original size when users zoom to 500%, violating [WCAG Success Criterion 1.4.4 (Resize Text)](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html). The issue occurs because viewport units don't scale with browser zoom, the viewport stays the same size while everything else grows.

This rule enforces that the ratio between the min and max values in a `clamp()` font-size does not exceed 2.5. This threshold is mathematically derived: at 500% zoom, the browser scales the min by 5×, and WCAG requires at least 2× the original size. For the zoomed floor (5 × min) to always meet the target (2 × max), the ratio must satisfy max/min ≤ 2.5.

**Enable this rule to:** Guard against the most common WCAG 1.4.4 failure when using viewport-based fluid type.

```json
{
  "rules": {
    "defensive-css/no-unsafe-clamp-font-size": true
  }
}
```

#### No Unsafe Clamp Font Size Options

| Option               | Type                                  | Default | Description                                                                                                  |
| -------------------- | ------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `maxRatio`           | `number`                              | `2.5`   | The maximum allowed ratio between clamp max and min values.                                                  |
| `reportUnresolvable` | `boolean \| [boolean, SeverityProps]` | `true`  | Report when the min/max ratio cannot be determined due to mixed units. `var()` functions are given the benefit of the doubt. Can specify custom severity. |

```json
{
  "rules": {
    "defensive-css/no-unsafe-clamp-font-size": [
      true,
      { "maxRatio": 2.5, "reportUnresolvable": true, "severity": "error" }
    ]
  }
}
```

**Report unresolvable cases as warnings:**

```json
{
  "rules": {
    "defensive-css/no-unsafe-clamp-font-size": [
      true,
      { "reportUnresolvable": [true, { "severity": "warning" }] }
    ]
  }
}
```

#### No Unsafe Clamp Font Size Examples

<details>
<summary>✅ Passing Examples</summary>

```css
/* Safe ratio of 2.5 */
.title {
  font-size: clamp(10px, 5vw, 25px);
}

/* Safe ratio using rem */
.title {
  font-size: clamp(1rem, 2vw, 2.5rem);
}

/* calc-style preferred with viewport unit — safe ratio */
.title {
  font-size: clamp(1rem, 0.5rem + 2vw, 2.5rem);
}

/* var() functions — cannot verify ratio, benefit of the doubt */
.title {
  font-size: clamp(var(--min), 5vw, 25px);
}

/* No viewport unit in preferred — no risk */
.title {
  font-size: clamp(1rem, 50%, 3rem);
}

/* font shorthand with safe ratio */
.title {
  font:
    clamp(10px, 5vw, 25px) / 1.5 'Helvetica',
    sans-serif;
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
/* Ratio of 5.0 — exceeds safe limit */
.title {
  font-size: clamp(10px, 5vw, 50px);
}

/* Ratio of 3.0 — the article's original failing example */
.title {
  font-size: clamp(16px, 4vw, 48px);
}

/* Ratio of 3.0 using rem */
.title {
  font-size: clamp(1rem, 2vw, 3rem);
}

/* Mixed units — cannot verify ratio */
.title {
  font-size: clamp(1rem, 5vw, 40px);
}

/* font shorthand with unsafe ratio */
.title {
  font:
    clamp(10px, 5vw, 50px) / 1.5 'Helvetica',
    sans-serif;
}
```

</details>

---

### No Unsafe Will-Change

> [!WARNING]
> "`will-change` is intended to be used as a last resort, in order to try to deal with existing performance problems. It should not be used to anticipate performance problems." ~ [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/will-change)

The `will-change` CSS property hints to browsers about expected changes to an element, allowing them to optimize rendering ahead of time. However, misuse can cause serious performance issues: applying it to too many properties consumes excessive GPU memory, using it on non-composite properties provides no benefit, and applying it via the universal selector (`*`) forces GPU layers on every element, causing catastrophic performance degradation.

**Enable this rule to:** Prevent common `will-change` anti-patterns that harm performance rather than improve it.

```json
{
  "rules": {
    "defensive-css/no-unsafe-will-change": true
  }
}
```

#### No Unsafe Will-Change Options

**Configuration:** By default, this rule allows up to 2 properties and errors on violations. Use the options below to customize validation.

```ts
type Severity = 'error' | 'warning';

interface SecondaryOptions {
  ignore?: (keyof PropertiesHyphen)[];
  maxProperties?: number;
  severity?: Severity;
}
```

```json
{
  "rules": {
    "defensive-css/no-unsafe-will-change": [
      true,
      {
        "maxProperties": 3,
        "ignore": ["width"],
        "severity": "error"
      }
    ]
  }
}
```

#### No Unsafe Will-Change Examples

<details>
<summary>✅ Passing Examples</summary>

```css
/* Single composite property */
.card:hover {
  will-change: transform;
}

/* Two composite properties (at default limit) */
.modal {
  will-change: transform, opacity;
}

/* Composite property in pseudo-class */
.button:focus-visible {
  will-change: opacity;
}

/* With ignore option for filter */
.element {
  will-change: transform, opacity, filter;
  /* Passes if maxProperties: 3 and ignore: ['filter'] */
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
/* Universal selector - forces GPU layers on all elements */
* {
  will-change: transform;
}

/* Exceeds default maxProperties limit (3 > 2) */
.element {
  will-change: transform, opacity, filter;
}

/* Non-composite properties (trigger layout/paint) */
.box {
  will-change: width, height;
}

.positioned {
  will-change: top, left;
}

.spaced {
  will-change: margin, padding;
}

/* Mixed: exceeds limit AND contains non-composite property */
.card {
  will-change: transform, opacity, width, height;
}

/* Universal selector in descendant */
.container > * {
  will-change: opacity;
}
```

</details>

---

### No User Select None

Disabling text selection with `user-select: none` prevents users from copying content, interferes with screen reader text navigation, and breaks expected browser behavior. While there are legitimate use cases (e.g., drag handles, icon-only buttons), applying it broadly to text content harms usability and accessibility.

**Enable this rule to:** Disallow `user-select: none` usage

```json
{
  "rules": {
    "defensive-css/no-user-select-none": true
  }
}
```

#### No User Select None Options

**`ignore`:** An array of string or regex patterns for selectors that should be excluded from this rule. The rule checks all ancestor selectors, so nested children of ignored selectors are also excluded.

```json
{
  "rules": {
    "defensive-css/no-user-select-none": [
      true,
      {
        "ignore": [".drag-handle", "/^\\.icon-/"]
      }
    ]
  }
}
```

#### No User Select None Examples

<details>
<summary>✅ Passing Examples</summary>

```css
.class {
  user-select: auto;
}

.class {
  user-select: text;
}

.class {
  user-select: all;
}

.class {
  user-select: contain;
}

/* With ignore option: [".drag-handle"] */
.drag-handle {
  user-select: none;
}

/* Nested child of ignored selector is also excluded */
.drag-handle .icon {
  user-select: none;
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
.class {
  user-select: none;
}

.class {
  -webkit-user-select: none;
}

.class {
  -moz-user-select: none;
}

/* Nested CSS is also flagged */
.parent {
  .child {
    user-select: none;
  }
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
    "defensive-css/require-custom-property-fallback": true
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
        "ignore": ["var\\(--exact-match\\)", /var\(--ds-color-.*\)/],
        "severity": "warning"
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

### Require Dynamic Viewport Height

On mobile browsers, the viewport height can change as the address bar and other UI elements collapse or expand during scrolling. Using static viewport units (`100vh` or `100vb`) can cause content to be cut off or create unexpected layout shifts, particularly on iOS Safari and Chrome mobile.

Dynamic viewport units (`100dvh`, `100dvb`) automatically adjust to the current viewport size, accounting for browser UI changes and providing a more reliable layout on mobile devices.

**Enable this rule to:** Flag usage of `100vh` and `100vb` on height-related properties and automatically fix them to use dynamic viewport units.

```json
{
  "rules": {
    "defensive-css/require-dynamic-viewport-height": true
  }
}
```

#### Require Dynamic Viewport Height Options

> [!TIP]
> This rule is fixable by passing the `{ fix: true }` option.

**Configuration:** By default, this rule validates `height`, `block-size`, `max-height`, and `max-block-size` properties. Use the `properties` option to customize which properties are checked and their severity level.

```ts
interface SecondaryOptions {
  fix?: boolean;
  properties?: {
    'block-size'?: boolean | [boolean, SeverityProps];
    height?: boolean | [boolean, SeverityProps];
    'max-block-size'?: boolean | [boolean, SeverityProps];
    'max-height'?: boolean | [boolean, SeverityProps];
    'min-block-size'?: boolean | [boolean, SeverityProps];
    'min-height'?: boolean | [boolean, SeverityProps];
  };
}
```

```json
{
  "rules": {
    "defensive-css/require-dynamic-viewport-height": [
      true,
      {
        "fix": true,
        "properties": {
          "height": [true, { "severity": "error" }],
          "min-block-size": false
        },
        "severity": "warning"
      }
    ]
  }
}
```

#### Require Dynamic Viewport Height Examples

<details>
<summary>✅ Passing Examples</summary>

```css
.hero {
  height: 100dvh;
}

.container {
  block-size: 100dvb;
}

.modal {
  max-height: 100dvh;
}

/* Small and large viewport units are also valid */
.element {
  height: 100svh;
  max-height: 100lvh;
}

/* Non-100 viewport units are allowed */
.partial {
  height: 50vh;
  max-height: 75vb;
}

/* min-height is not validated */
.flexible {
  min-height: 100vh;
}

/* Width properties are not affected */
.wide {
  width: 100vw;
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
.hero {
  height: 100vh;
}

.container {
  block-size: 100vb;
}

.modal {
  max-height: 100vh;
}

.overlay {
  max-block-size: 100vb;
}

/* Also flags usage in functions */
.calculated {
  height: calc(100vh - 20px);
}

.clamped {
  block-size: clamp(100vb, 50vb, 100vb);
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
    "defensive-css/require-flex-wrap": true
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
    "defensive-css/require-focus-visible": true
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

### Require Forced Colors Focus

In [Forced Colors Mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) (e.g., Windows High Contrast Mode), the browser overrides many CSS properties to ensure readability. Notably, `box-shadow` is completely removed. This means focus indicators that rely solely on `box-shadow`, a common pattern when `outline` has been set to `none` or `0` and translating designs from Figma, become invisible, breaking keyboard accessibility.

**Enable this rule to:** Detect when `:focus` or `:focus-visible` selectors remove the outline and use `box-shadow` as the only focus indicator, which is unsafe in Forced Colors Mode. A common fix is to use `outline: 2px solid transparent` which remains invisible by default but becomes visible in Forced Colors Mode.

```json
{
  "rules": {
    "defensive-css/require-forced-colors-focus": true
  }
}
```

#### Require Forced Colors Focus Detection Logic

This rule reports when **all** of the following are true:

1. The selector targets a focused element (`:focus`, `:focus-visible`)
2. The `outline` has been removed (`none`, `0`, `0px`, etc.)
3. A `box-shadow` is present as the apparent focus indicator
4. No visible `border` is present as a fallback (borders survive Forced Colors Mode)
5. The rule is **not** wrapped in `@media (forced-colors: none)` or `@media not (forced-colors: active)`

The rule gives the benefit of the doubt to `var()`, `inherit`, `revert`, and other values it cannot resolve statically.

#### Require Forced Colors Focus Examples

<details>
<summary>✅ Passing Examples</summary>

```css
/* Transparent outline becomes visible in Forced Colors Mode */
.btn:focus-visible {
  outline: 2px solid transparent;
  box-shadow: 0 0 0 2px blue;
}

/* Visible outline alongside decorative box-shadow */
.btn:focus-visible {
  outline: 2px solid blue;
  box-shadow: 0 0 0 4px rgba(0, 0, 255, 0.3);
}

/* box-shadow without outline removal — default browser outline remains */
.btn:focus-visible {
  box-shadow: 0 0 0 2px blue;
}

/* outline removed but visible border present — borders survive FCM */
.btn:focus-visible {
  outline: none;
  border: 2px solid blue;
  box-shadow: 0 0 0 2px blue;
}

/* Inside forced-colors: none — outside FCM context */
@media (forced-colors: none) {
  .btn:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px blue;
  }
}

/* Nested CSS — parent removes outline, child restores it */
.btn {
  outline: none;

  &:focus-visible {
    outline: 2px solid transparent;
    box-shadow: 0 0 0 2px blue;
  }
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
/* outline: none with box-shadow as only focus indicator */
.btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px blue;
}

/* outline-width: 0 with box-shadow */
.btn:focus-visible {
  outline-width: 0;
  box-shadow: 0 0 0 2px blue;
}

/* Shorthand with 0 width — invisible even with style and color */
.btn:focus-visible {
  outline: 0 solid red;
  box-shadow: 0 0 0 2px blue;
}

/* Nested CSS — parent removes outline, focus uses only box-shadow */
.btn {
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px blue;
  }
}

/* transparent border does not count as a visible FCM-safe indicator */
.btn:focus-visible {
  outline: none;
  border: 2px solid transparent;
  box-shadow: 0 0 0 2px blue;
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
    "defensive-css/require-named-grid-lines": true
  }
}
```

#### Require Named Grid Lines Options

**Configuration:** By default, this rule validates both row and column lines. Use the `columns` and `rows` options to control which axes are checked.

```ts
interface SecondaryOptions {
  columns?: boolean | [boolean, { severity?: Severity }];
  rows?: boolean | [boolean, { severity?: Severity }];
}
```

```json
{
  "rules": {
    "defensive-css/require-named-grid-lines": [
      true,
      {
        "columns": [true, { "severity": "error" }],
        "rows": [true, { "severity": "warning" }]
      }
    ]
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
    "defensive-css/require-overscroll-behavior": true
  }
}
```

#### Require Overscroll Behavior Options

**Configuration:** By default, this rule validates both horizontal and vertical overflow. Use the `x` and `y` options to control which axes are checked.

```ts
interface SecondaryOptions {
  x?: boolean | [boolean, { severity?: Severity }];
  y?: boolean | [boolean, { severity?: Severity }];
}
```

```json
{
  "rules": {
    "defensive-css/require-overscroll-behavior": [
      true,
      {
        "x": [true, { "severity": "warning" }],
        "y": [true, { "severity": "error" }]
      }
    ]
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

### Require Pure Selectors

Element selectors (e.g., `div`, `input`, `section`) couple styles directly to HTML structure, making stylesheets fragile when markup changes. Pure selectors — classes, IDs, and pseudo-classes — keep styles decoupled from the DOM, resulting in more maintainable and portable CSS.

**Enable this rule to:** Require selectors to target classes or IDs rather than HTML element tags, preventing structural coupling between styles and markup.

```json
{
  "rules": {
    "defensive-css/require-pure-selectors": true
  }
}
```

#### Require Pure Selectors Options

**Configuration:** By default (`strict: false`), this rule rejects selectors that are entirely element-based and requires at least one class or ID when element tags are present. Set `strict: true` to reject any non-ignored element tag in a selector (even when a class or ID is also present, e.g., `.card button`). Use `ignoreElements` to allowlist specific tags (e.g., `*`, `html`, `body`) and `ignoreAttributeModifiers` (_or deprecated `ignoreAttributeSelectors`_) to permit element tags that have an attached attribute selector (e.g., `input[type="text"]`).

```ts
interface SecondaryOptions {
  ignoreAttributeModifiers?: boolean;
  ignoreAttributeSelectors?: boolean;
  ignoreElements?: (keyof HTMLElementTagNameMap)[];
  severity?: Severity;
  strict?: boolean;
}
```

```json
{
  "rules": {
    "defensive-css/require-pure-selectors": [
      true,
      {
        "ignoreElements": ["html", "*"],
        "ignoreAttributeModifiers": true,
        "severity": "error",
        "strict": true
      }
    ]
  }
}
```

#### Require Pure Selectors Examples

<details>
<summary>✅ Passing Examples</summary>

```css
/* Standard class selector */
.card {
  color: red;
}

/* Class-to-class relationship (flat specificity) */
.nav-item .link {
  color: red;
}

/* Default mode (strict: false): mixed class + tag selector is allowed */
.card button {
  color: red;
}

/* ID selector */
#header {
  color: red;
}

/* Attribute on a class (no tag dependency) */
.button[disabled] {
  opacity: 0.5;
}

/* Class with pseudo-class */
.btn:hover {
  color: blue;
}

/* Class with pseudo-element */
.card::before {
  content: '';
}

/* Pseudo-class only */
:root {
  --color: red;
}

/* Child combinator with pure selectors */
.input-group > .input-field {
  width: 100%;
}

/* Nested class selectors */
.card {
  .btn {
    background: yellow;
  }
}

/* With ignoreElements: ['html', 'body'] */
html {
  font-size: 16px;
}
body {
  margin: 0;
}

/* With ignoreAttributeModifiers: true */
input[type='text'] {
  border: 1px solid;
}
button[disabled] {
  opacity: 0.5;
}
```

</details>

<details>
<summary>❌ Failing Examples</summary>

```css
/* Standalone element selector (global pollution) */
div {
  color: red;
}

/* Direct child element selector (markup fragility) */
ul > li {
  margin: 0;
}

/* Base element */
input {
  border: 1px solid;
}

/* Universal selector */
* {
  box-sizing: border-box;
}

/* Element with pseudo-class */
button:active {
  color: red;
}

/* Mixed pure and impure in selector list */
.btn,
button {
  color: red;
}

/* Deeply nested tag selectors */
header nav ul li a {
  text-decoration: none;
}

/* Nested tag inside class */
.card {
  span {
    color: red;
  }
}

/* With strict: true, mixed class + tag selectors are also rejected */
.table td {
  display: none;
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
    "defensive-css/require-scrollbar-gutter": true
  }
}
```

#### Require Scrollbar Gutter Options

**Configuration:** By default, this rule validates both horizontal and vertical overflow. Use the `x` and `y` options to control which axes are checked.

```ts
interface SecondaryOptions {
  x?: boolean | [boolean, { severity?: Severity }];
  y?: boolean | [boolean, { severity?: Severity }];
}
```

```json
{
  "rules": {
    "defensive-css/require-scrollbar-gutter": [
      true,
      {
        "x": [true, { "severity": "warning" }],
        "y": [true, { "severity": "error" }]
      }
    ]
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

---

### Require System Font Fallback

Custom or non-standard fonts can fail to load due to network issues, font licensing, or missing system installations. Without a proper fallback, users may see invisible text (FOIT) or a jarring font swap (FOUT). Including a web-safe or CSS system font fallback ensures text remains readable under all conditions.

**Enable this rule to:** Require `font` and `font-family` declarations to include a web-safe and/or CSS system font fallback.

```json
{
  "rules": {
    "defensive-css/require-system-font-fallback": true
  }
}
```

#### Require System Font Fallback Options

**Configuration:** By default (loose mode), this rule accepts either a web-safe font (e.g., `Arial`, `Georgia`) or a CSS system font generic (e.g., `sans-serif`, `monospace`) as a valid fallback. Enable `strict` mode to require a CSS system font generic specifically. Use the `ignore` option to exclude patterns such as CSS variables or design tokens.

> [!NOTE]
> **Web-safe fonts** (e.g., `Arial`, `Georgia`, `Verdana`) are pre-installed on most operating systems and are accepted in **loose mode only**.
>
> **CSS system font generics** (e.g., `sans-serif`, `serif`, `monospace`, `system-ui`) are resolved by the browser itself and are accepted in **both loose and strict modes**.
>
> CSS global keywords (`inherit`, `initial`, `unset`, `revert`, `revert-layer`) are always accepted since they delegate font resolution to the cascade.

```ts
interface SecondaryOptions {
  ignore?: (string | RegExp)[];
  strict?: boolean;
}
```

**Loose mode (default):** Accepts web-safe fonts or CSS system font generics as fallbacks.

```json
{
  "rules": {
    "defensive-css/require-system-font-fallback": [
      true,
      {
        "severity": "warning"
      }
    ]
  }
}
```

**Strict mode:** Requires a CSS system font generic — web-safe fonts alone are not enough.

```json
{
  "rules": {
    "defensive-css/require-system-font-fallback": [
      true,
      {
        "strict": true,
        "severity": "error"
      }
    ]
  }
}
```

**Ignore patterns:** Exclude specific fonts or CSS variable patterns from being flagged.

```json
{
  "rules": {
    "defensive-css/require-system-font-fallback": [
      true,
      {
        "ignore": ["var\\(--ds-font-family.*\\)", "Exact Font"]
      }
    ]
  }
}
```

#### Require System Font Fallback Examples

<details>
<summary>✅ Passing Examples (Loose Mode)</summary>

```css
/* Web-safe font alone — accepted in loose mode */
.heading {
  font-family: Arial;
}

/* CSS system font generic as fallback */
.heading {
  font-family: 'Fira Sans', sans-serif;
}

/* System font keyword in font shorthand */
.heading {
  font: caption;
}

/* Newer generic families */
.heading {
  font-family: 'Custom Font', ui-sans-serif;
}

/* CSS global keywords are always accepted */
.heading {
  font-family: inherit;
}
```

</details>

<details>
<summary>❌ Failing Examples (Loose Mode)</summary>

```css
/* No fallback at all */
.heading {
  font-family: 'Fira Sans';
}

/* Quoted generic names are treated as custom families */
.heading {
  font-family: 'sans-serif';
}

/* Multiple custom fonts with no fallback */
.heading {
  font-family: 'Custom Font', 'Another Font';
}
```

</details>

<details>
<summary>✅ Passing Examples (Strict Mode)</summary>

```css
/* CSS system font generic as fallback */
.heading {
  font-family: 'Fira Sans', sans-serif;
}

/* Web-safe font with a system font generic */
.heading {
  font-family: Arial, sans-serif;
}

/* Standalone system font generic */
.heading {
  font-family: system-ui;
}

/* Newer CSS system font generics */
.heading {
  font-family: 'Custom Font', ui-serif;
}
```

</details>

<details>
<summary>❌ Failing Examples (Strict Mode)</summary>

```css
/* Web-safe font alone — not enough in strict mode */
.heading {
  font-family: Arial;
}

/* Web-safe fallback without a system font generic */
.heading {
  font-family: 'Custom Font', Helvetica;
}

/* Two web-safe fonts, no system font generic */
.heading {
  font-family: Verdana, Georgia;
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
