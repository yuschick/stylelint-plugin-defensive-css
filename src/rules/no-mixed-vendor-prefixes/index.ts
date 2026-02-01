import stylelint, { RuleMeta } from 'stylelint';
import { noMixedVendorPrefixes } from './rule';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/no-mixed-vendor-prefixes';

export const messages = ruleMessages(name, {
  rejected: (selector) =>
    `Multiple vendor prefixes found in selector "${selector}". Split each vendor prefix into its own, individual rule. Learn more: https://defensivecss.dev/tip/grouping-selectors`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};

export default stylelint.createPlugin(name, noMixedVendorPrefixes);
