![Stylelint Plugin - Defensive CSS Logo](./assets/logo--dark.jpg#gh-dark-mode-only)
![Stylelint Plugin - Defensive CSS Logo](./assets/logo--dark.jpg#gh-light-mode-only)

<div style="display: flex; justify-content: center;">
    <img src="https://img.shields.io/github/license/yuschick/stylelint-plugin-defensive-css?style=for-the-badge" alt="Stylelint Plugin Defensive CSS License" />
    <img src="https://img.shields.io/npm/v/stylelint-plugin-defensive-css?style=for-the-badge" alt="Stylelint PLugin Defensive CSS Latest NPM Version" />
    <img src="https://img.shields.io/github/actions/workflow/status/yuschick/stylelint-plugin-defensive-css/main.yaml?style=for-the-badge" alt="Stylelint PLugin Defensive CSS Main Workflow Status" />
</div>

<br />
<p style="text-align: center">A Stylelint plugin to enforce <a href="https://defensivecss.dev/">Defensive CSS</a> best practices.</p>

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
3. Require Background Repeat
4. Require Custom Property Fallback
5. Require Flex Wrap
6. Require Named Grid Lines
7. Require Overscroll Behavior
8. Require Scrollbar Gutter

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