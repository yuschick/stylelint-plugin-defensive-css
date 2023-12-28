import stylelint from 'stylelint';

export const ruleName = 'plugin/use-defensive-css';

export const ruleMessages = stylelint.utils.ruleMessages(ruleName, {
  accidentalHover() {
    return 'To prevent accidental hover states on mobile devices, wrap `:hover` selectors inside a `@media (hover: hover) { ...your styles }` query. Learn more: https://defensivecss.dev/tip/hover-media/';
  },
  backgroundRepeat() {
    return 'Whenever setting a background image, be sure to explicitly define a `background-repeat` value. Learn more: https://defensivecss.dev/tip/bg-repeat/';
  },
  customPropertyFallbacks() {
    return 'Provide a fallback value for a custom property like `var(--your-custom-property, #000000)` to prevent issues in the event the custom property is not defined. Learn more: https://defensivecss.dev/tip/css-variable-fallback/';
  },
  flexWrapping() {
    return 'Whenever setting an element to `display: flex` a `flex-wrap` value must be defined. Set `flex-wrap: nowrap` for the default behavior. Learn more: https://defensivecss.dev/tip/flexbox-wrapping/';
  },
  scrollChaining() {
    return 'To prevent scroll chaining between contexts, any container with a scrollable overflow must have a `overscroll-behavior` value defined. Learn more: https://defensivecss.dev/tip/scroll-chain/';
  },
  scrollbarGutter() {
    return 'To prevent potential layout shifts, any container with a scrollable overflow must have a `scrollbar-gutter` value defined. Learn more: https://defensivecss.dev/tip/scrollbar-gutter/';
  },
  vendorPrefixWGrouping() {
    return `To prevent invalid rules in unsupported environments, split each vendor prefix into its own, individual rule. Learn more: https://defensivecss.dev/tip/grouping-selectors/`;
  },
});

export const ruleMeta = {
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
