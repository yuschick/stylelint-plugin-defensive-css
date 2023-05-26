'use strict';

const stylelint = require('stylelint');

const ruleName = 'plugin/use-defensive-css';

const ruleMessages = stylelint.utils.ruleMessages(ruleName, {
  accidentalHover() {
    return 'To prevent accidental hover states on mobile devices, wrap :hover selectors inside a @media (hover: hover) { ...your styles } query.';
  },
  backgroundRepeat() {
    return 'Ensure a background-repeat property is defined when using a background image.';
  },
  customPropertyFallbacks() {
    return 'Ensure that any custom properties have a fallback value.';
  },
  flexWrapping() {
    return 'Flex rows must have a `flex-wrap` value defined.`';
  },
  scrollChaining() {
    return `Containers with an auto or scroll 'overflow' must also have an 'overscroll-behavior' property defined.`;
  },
  vendorPrefixWGrouping() {
    return `Separate different vendor prefixes into their own rules.`;
  },
});

const ruleMeta = {
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};

module.exports = {
  ruleName,
  ruleMessages,
  ruleMeta,
};
