import stylelint, { RuleMeta } from 'stylelint';
import { requireScrollbarGutter } from './rule';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-scrollbar-gutter';
export const messages = ruleMessages(name, {
  rejected: (selector) =>
    `Expected scrollbar-gutter property when using scrollable overflow at selector "${selector}". Learn more: https://defensivecss.dev/tip/scrollbar-gutter`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};

export default stylelint.createPlugin(name, requireScrollbarGutter);
