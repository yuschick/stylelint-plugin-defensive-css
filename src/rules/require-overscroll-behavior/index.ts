import stylelint, { RuleMeta } from 'stylelint';
import { requireOverscrollBehavior } from './rule';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-overscroll-behavior';
export const messages = ruleMessages(name, {
  rejected: (selector: string) =>
    `Expected overscroll-behavior property when using scrollable overflow at selector "${selector}". Learn more: https://defensivecss.dev/tip/scroll-chain`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};

export default stylelint.createPlugin(name, requireOverscrollBehavior);
