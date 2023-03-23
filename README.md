# 🦖 Stylelint Plugin Defensive CSS

![License](https://img.shields.io/github/license/yuschick/stylelint-plugin-defensive-css?style=for-the-badge)
![NPM Version](https://img.shields.io/npm/v/stylelint-plugin-defensive-css?style=for-the-badge)
![Main Workflow Status](https://img.shields.io/github/actions/workflow/status/yuschick/stylelint-plugin-defensive-css/main.yaml?style=for-the-badge)

A Stylelint plugin to enforce defensive CSS best practices.

> [Read more about Defensive CSS](https://defensivecss.dev/)

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
    "plugin/use-defensive-css": [
      true,
      { "severity": "warning" }
    ]
  }
}
```

## Rules / Options

The plugin provides multiple rules that can be toggled on and off as needed.

### Background Repeat

> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/bg-repeat/)

Oftentimes, when using a large image as a background, we tend to forget to account for the case when the design is viewed on a large screen. That background will repeat by default.

Enable this rule in order to prevent unintentional repeating background.

```json
{
  "rules": {
    "plugin/use-defensive-css": [
      true,
      { "background-repeat": true }
    ]
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
````

#### ❌ Failing Examples

```css
div {
    background: url('some-image.jpg') black top center;
}
div { 
    background-image: url('some-image.jpg');
}
```


### Custom Property Fallbacks

> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/css-variable-fallback/)

CSS variables are gaining more and more usage in web design. There is a method that we can apply to use them in a way that doesn’t break the experience, in case the CSS variable value was empty for some reason.

Enable this rule in order to require fallbacks values for custom properties.

```json
{
  "rules": {
    "plugin/use-defensive-css": [
      true,
      { "custom-property-fallbacks": true }
    ]
  }
}
```

#### ✅ Passing Examples

```css
div {
    color: var(--color-primary, #000);
}
````

#### ❌ Failing Examples

```css
div {
    color: var(--color-primary);
}
```

### Flex Wrapping

> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/flexbox-wrapping/)

CSS flexbox is one of the most useful CSS layout features nowadays. It’s tempting to add `display: flex` to a wrapper and have the child items ordered next to each other. The thing is when there is not enough space, those child items won’t wrap into a new line by default. We need to change that behavior with `flex-wrap: wrap`.

Enable this rule in order to require all flex rows to have a flex-wrap value.

```json
{
  "rules": {
    "plugin/use-defensive-css": [
      true,
      { "flex-wrapping": true }
    ]
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
    flex-direction: row-reverse;
    flex-wrap: wrap-reverse;
}
````

#### ❌ Failing Examples

```css
div {
    display: flex;
}
div {
    display: flex;
    flex-direction: row;
}
```

### Vendor Prefix Grouping

> [Read more about this pattern in Defensive CSS](https://defensivecss.dev/tip/grouping-selectors/)

It's not recommended to group selectors that are meant to work with different browsers. For example, styling an input's placeholder needs multiple selectors per the browser. If we group the selectors, the entire rule will be invalid, according to [w3c](https://www.w3.org/TR/selectors/#grouping).

Enable this rule in order to require all vendor-prefixed selectors to be split into their own rules.

```json
{
  "rules": {
    "plugin/use-defensive-css": [
      true,
      { "vendor-prefix-grouping": true }
    ]
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
}
````

#### ❌ Failing Examples

```css
input::-webkit-input-placeholder,
input::-moz-placeholder {
    color: #222;
}
```