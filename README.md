# 🦖 Stylelint Plugin Defensive CSS

![License](https://img.shields.io/github/license/yuschick/stylelint-plugin-defensive-css?style=for-the-badge)
![NPM Version](https://img.shields.io/npm/v/stylelint-plugin-defensive-css?style=for-the-badge)
![Main Workflow Status](https://img.shields.io/github/actions/workflow/status/yuschick/stylelint-plugin-defensive-css/pull-request--checks.yaml?style=for-the-badge)

A Stylelint plugin to enforce defensive CSS best practices.

> [Read more about Defensive CSS](https://defensivecss.dev/)

## 🚀 Version 1.1.0

With the release of version 1.1.0 of the plugin, we now support Stylelint 17.

---

## Getting Started

> Before getting started with the plugin, you must first have
> [Stylelint](https://stylelint.io/) version 14.0.0 or greater installed

To get started using the plugin, it must first be installed.

```bash
npm i stylelint-plugin-defensive-css --save-dev
```

```bash
yarn add stylelint-plugin-defensive-css --dev
```

With the plugin installed, the rule(s) can be added to the project's Stylelint
configuration.

```json
{
  "plugins": ["stylelint-plugin-defensive-css"],
  "rules": {
    "plugin/use-defensive-css": [true, { "severity": "warning" }]
  }
}
```

## Rules / Options

The plugin provides multiple rules that can be toggled on and off as needed.

1. [Accidental Hover](#accidental-hover)
2. [Background-Repeat](#background-repeat)
3. [Custom Property Fallbacks](#custom-property-fallbacks)
4. [Flex Wrapping](#flex-wrapping)
5. [Grid Line Names](#grid-line-names)
6. [Scroll Chaining](#scroll-chaining)
7. [Scrollbar Gutter](#scrollbar-gutter)
8. [Vendor Prefix Grouping](#vendor-prefix-grouping)

---

### Accidental Hover

> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/hover-media/)

We use hover effects to provide an indication to the user that an element is
clickable or active. That is fine for devices that have a mouse or a trackpad.
However, for mobile browsing hover effects can get confusing.

Enable this rule in order to prevent unintentional hover effects on mobile
devices.

```json
{
  "rules": {
    "plugin/use-defensive-css": [true, { "accidental-hover": true }]
  }
}
```

#### ✅ Passing Examples

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

#### ❌ Failing Examples

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

### Background Repeat

> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/bg-repeat/)

Oftentimes, when using a large image as a background, we tend to forget to
account for the case when the design is viewed on a large screen. That
background will repeat by default.

Enable this rule in order to prevent unintentional repeating background.

```json
{
  "rules": {
    "plugin/use-defensive-css": [true, { "background-repeat": true }]
  }
}
```

#### ✅ Passing Examples

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

#### ❌ Failing Examples

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

### Custom Property Fallbacks

> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/css-variable-fallback/)

CSS variables are gaining more and more usage in web design. There is a method
that we can apply to use them in a way that doesn’t break the experience, in
case the CSS variable value was empty for some reason.

Enable this rule in order to require fallbacks values for custom properties.

```json
{
  "rules": {
    "plugin/use-defensive-css": [true, { "custom-property-fallbacks": true }]
  }
}
```

#### ✅ Passing Examples

```css
div {
  color: var(--color-primary, #000);
}
```

#### ❌ Failing Examples

```css
div {
  color: var(--color-primary);
}
```

| Option | Description                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------- |
| ignore | Pass an array of regular expressions and/or strings to ignore linting specific custom properties. |

```json
{
  "rules": {
    "plugin/use-defensive-css": [
      true,
      { "custom-property-fallbacks": [true, { "ignore": [/hel-/, "theme-"] }] }
    ]
  }
}
```

The `ignore` array can support regular expressions and strings. If a string is
provided, it will be translated into a RegExp like `new RegExp(string)` before
testing the custom property name.

#### ✅ Passing Examples

```css
div {
  /* properties with theme- are ignored */
  color: var(--theme-color-primary);

  /* properties with hel- are ignored */
  padding: var(--hel-spacing-200);
}
```

### Flex Wrapping

> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/flexbox-wrapping/)

CSS flexbox is one of the most useful CSS layout features nowadays. It’s
tempting to add `display: flex` to a wrapper and have the child items ordered
next to each other. The thing is when there is not enough space, those child
items won’t wrap into a new line by default. We need to either change that
behavior with `flex-wrap: wrap` or explicitly define `nowrap` on the container.

Enable this rule in order to require all flex rows to have a flex-wrap value.

```json
{
  "rules": {
    "plugin/use-defensive-css": [true, { "flex-wrapping": true }]
  }
}
```

#### ✅ Passing Examples

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

#### ❌ Failing Examples

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

### Grid Line Names

Require explicit named grid lines for tracks. When `grid-line-names` is enabled
the plugin validates `grid-template-columns`, `grid-template-rows`, and the
`grid` shorthand (the portion before/after the `/`) to ensure each track is
associated with a named line using the `[name]` syntax.

The rule supports configuring whether to validate columns and/or rows:

```json
{
  "rules": {
    "plugin/use-defensive-css": [true, { "grid-line-names": true }]
  }
}
```

Or with explicit options:

```json
{
  "rules": {
    "plugin/use-defensive-css": [
      true,
      { "grid-line-names": { "columns": true, "rows": false } }
    ]
  }
}
```

- If `true` the rule validates both columns and rows.
- Pass an object with `columns` and/or `rows` set to `false` to disable one
  side.

This rule helps avoid ambiguous layouts by rejecting unnamed tracks like
`1fr 1fr` and numeric `repeat(3, 1fr)` while allowing patterns that explicitly
name lines, e.g. `repeat(auto-fit, [name] 300px)` or bracketed names such as
`[a b] 1fr`.

#### ✅ Passing Examples

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

#### ❌ Failing Examples

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

### Scroll Chaining

> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/scroll-chain/)

Have you ever opened a modal and started scrolling, and then when you reach the
end and keep scrolling, the content underneath the modal (the body element) will
scroll? This is called scroll chaining.

Enable this rule in order to require all scrollable overflow properties to have
an overscroll-behavior value.

```json
{
  "rules": {
    "plugin/use-defensive-css": [true, { "scroll-chaining": true }]
  }
}
```

#### ✅ Passing Examples

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

#### ❌ Failing Examples

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

### Scrollbar Gutter

> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/scrollbar-gutter/)

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
    "plugin/use-defensive-css": [true, { "scrollbar-gutter": true }]
  }
}
```

#### ✅ Passing Examples

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

#### ❌ Failing Examples

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

### Vendor Prefix Grouping

> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/grouping-selectors/)

It's not recommended to group selectors that are meant to work with different
browsers. For example, styling an input's placeholder needs multiple selectors
per the browser. If we group the selectors, the entire rule will be invalid,
according to [w3c](https://www.w3.org/TR/selectors/#grouping).

Enable this rule in order to require all vendor-prefixed selectors to be split
into their own rules.

```json
{
  "rules": {
    "plugin/use-defensive-css": [true, { "vendor-prefix-grouping": true }]
  }
}
```

#### ✅ Passing Examples

```css
input::-webkit-input-placeholder {
  color: #222;
}
input::-moz-placeholder {
  color: #222;
```

#### ❌ Failing Examples

```css
input::-webkit-input-placeholder,
input::-moz-placeholder {
  color: #222;
}
```
