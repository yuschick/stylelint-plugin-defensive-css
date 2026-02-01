![Stylelint Plugin - Defensive CSS Logo](./assets/logo--dark.jpg#gh-dark-mode-only)
![Stylelint Plugin - Defensive CSS Logo](./assets/logo--dark.jpg#gh-light-mode-only)

<div style="text-align: center;">
    <img src="https://img.shields.io/github/license/yuschick/stylelint-plugin-defensive-css?style=for-the-badge" alt="Stylelint Plugin Defensive CSS License" />
    <img src="https://img.shields.io/npm/v/stylelint-plugin-defensive-css?style=for-the-badge" alt="Stylelint PLugin Defensive CSS Latest NPM Version" />
    <img src="https://img.shields.io/github/actions/workflow/status/yuschick/stylelint-plugin-defensive-css/main.yaml?style=for-the-badge" alt="Stylelint PLugin Defensive CSS Main Workflow Status" />
</div>

<br />
<p style="text-align: center">A Stylelint plugin to enforce <a href="https://defensivecss.dev/">Defensive CSS</a> best practices.</p>

> [!IMPORTANT]
> Are you looking for documentation for version 1? [V1 documentation can be found here](./V1-DOCUMENTATION.md)

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

1. No Accidental Hover
2. Require Background Repeat
3. Require Custom Property Fallback
4. Require Flex Wrap
5. Require Named Grid Lines
6. Require Overscroll Behavior
7. Require Scrollbar Gutter

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
    "defensive-css/no-accidental-hover'": true,
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