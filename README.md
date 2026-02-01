![Stylelint Plugin - Defensive CSS Logo](./assets/logo--dark.jpg#gh-dark-mode-only)
![Stylelint Plugin - Defensive CSS Logo](./assets/logo--dark.jpg#gh-light-mode-only)

![Stylelint Plugin Defensive CSS License](https://img.shields.io/github/license/yuschick/stylelint-plugin-defensive-css?style=for-the-badge)
![Stylelint PLugin Defensive CSS Latest NPM Version](https://img.shields.io/npm/v/stylelint-plugin-defensive-css?style=for-the-badge)
![Stylelint PLugin Defensive CSS Main Workflow Status](https://img.shields.io/github/actions/workflow/status/yuschick/stylelint-plugin-defensive-css/main.yaml?style=for-the-badge)

A Stylelint plugin to enforce [Defensive CSS](https://defensivecss.dev/) best practices.

> [!IMPORTANT]
> [V1 documentation can be found here](./V1-DOCUMENTATION.md)

## Getting Started

> [!NOTE]
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

## Defensive CSS Rules

The plugin provides multiple rules that can be toggled on and off as needed.

1. [No Accidental Hover](#no-accidental-hover)
2. [No Mixed Vendor Prefixes](#no-mixed-vendor-prefixes)
3. [Require Background Repeat](#require-background-repeat)
4. [Require Custom Property Fallback](#require-custom-property-fallback)
5. [Require Flex Wrap](#require-flex-wrap)
6. [Require Named Grid Lines](#require-named-grid-lines)
7. [Require Overscroll Behavior](#require-overscroll-behavior)
8. [Require Scrollbar Gutter](#require-scrollbar-gutter)

---

### No Accidental Hover

> [!TIP]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/hover-media/)

We use hover effects to provide an indication to the user that an element is
interactive or active. That is fine for devices that have a mouse or a trackpad.
However, for mobile browsing, hover effects can become confusing or challenging.

Enable this rule in order to prevent unintentional hover effects in unsupported environments.

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

### No Mixed Vendor Prefixes

> [!TIP]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/grouping-selectors)

It's not recommended to group selectors that are meant to work with different
browsers. For example, styling an input's placeholder needs multiple selectors
per the browser. If we group the selectors, the entire rule will be invalid,
according to [w3c](https://www.w3.org/TR/selectors/#grouping).

Enable this rule in order to require all vendor-prefixed selectors to be split
into their own rules.

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

### Require Background Repeat

> [!TIP]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/bg-repeat)

Oftentimes, when using a large image as a background or a mask, we tend to forget to
account for the case when the design is viewed on a large screen. That
background or mask will repeat by default.

Enable this rule in order to prevent unintentional repeating backgrounds and masks.

```json
{
  "rules": {
    "defensive-css/require-background-repeat": true,
  }
}
```

#### Require Background Repeat Options

The `require-background-repeat` rule applies to all background images and mask images. This functionality can be controlled by passing options to the rule.

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

### Require Custom Property Fallback

> [!TIP]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/css-variable-fallback)

CSS variables are gaining more and more usage in web design. There is a method
that we can apply to use them in a way that doesn’t break the experience, in
case the CSS variable value was empty for some reason.

Enable this rule in order to require fallbacks values for custom properties.

```json
{
  "rules": {
    "defensive-css/require-custom-property-fallback": true,
  }
}
```

#### Require Custom Property Fallback Options

The `require-custom-property-fallback` rule applies to all custom properties by default. This can be adjusted by using the `ignore` option and excluding specific custom property patterns from the rule. This is useful when using global design tokens, or specific component-scoped custom properties.

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

### Require Flex Wrap

> [!TIP]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/flex-wrap)

CSS flexbox is one of the most useful CSS layout features nowadays. It’s
tempting to add `display: flex` to a wrapper and have the child items ordered
next to each other. The thing is when there is not enough space, those child
items won’t wrap into a new line by default. We need to either change that
behavior with `flex-wrap: wrap` or explicitly define `nowrap` on the container.

Enable this rule in order to require all flex rows to have a flex-wrap value.

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

### Require Named Grid Lines

Require explicit named grid lines for tracks. When `grid-line-names` is enabled
the plugin validates `grid-template-columns`, `grid-template-rows`, and the
`grid` shorthand (the portion before/after the `/`) to ensure each track is
associated with a named line using the `[name]` syntax.

This rule helps avoid ambiguous layouts by rejecting unnamed tracks like
`1fr 1fr` and numeric `repeat(3, 1fr)` while allowing patterns that explicitly
name lines, e.g. `repeat(auto-fit, [name] 300px)` or bracketed names such as
`[a b] 1fr`.

```json
{
  "rules": {
    "defensive-css/require-named-grid-lines": true,
  }
}
```

#### Require Named Grid Lines Options

The `require-named-grid-lines` rule applies to both row and column lines by default. This functionality can be controlled by passing options to the rule.

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

### Require Overscroll Behavior

> [!TIP]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/scroll-chain)

Have you ever opened a modal and started scrolling, and then when you reach the
end and keep scrolling, the content underneath the modal (the body element) will
scroll? This is called scroll chaining.

Enable this rule in order to require all scrollable overflow properties to have
an overscroll-behavior value.

```json
{
  "rules": {
    "defensive-css/require-overscroll-behavior": true,
  }
}
```

#### Require Overscroll Behavior Options

The `require-overscroll-behavior` rule applies to both x and y axis by default. This functionality can be controlled by passing options to the rule.

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

### Require Scrollbar Gutter

> [!TIP]
> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/scrollbar-gutter)

Imagine a container with only a small amount of content with no need to scroll.
The content would be aligned evenly within the boundaries of its container. Now,
if that container has more content added, and a scrollbar appears, that
scrollbar will cause a layout shift, forcing the content to reflow and jump.
This behavior can be jarring.

To avoid layout shifting with variable content, enforce that a
`scrollbar-gutter` property is defined for any scrollable container.

```json
{
  "rules": {
    "defensive-css/require-scrollbar-gutter": true,
  }
}
```

#### Require Scrollbar Gutter Options

The `require-scrollbar-gutter` rule applies to both x and y axis by default. This functionality can be controlled by passing options to the rule.

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

---

[![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/yuschick)
