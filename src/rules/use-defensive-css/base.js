'use strict';

const stylelint = require('stylelint');

const ruleName = 'plugin/use-defensive-css';

const ruleMessages = stylelint.utils.ruleMessages(ruleName, {
  backgroundRepeat() {
    return 'Ensure a background-repeat property is defined when using a background image.';
  },
  customPropertyFallbacks() {
    return 'Ensure that any custom properties have a fallback value.';
  },
  flexWrapping() {
    return 'Flex rows must have a `flex-wrap: wrap;` or `flex-wrap: wrap-reverse` declaration.';
  },
  vendorPrefixWGrouping() {
    return `It's not recommended to group selectors that are meant to work with different browsers. Instead, split them to separate rules.`;
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
