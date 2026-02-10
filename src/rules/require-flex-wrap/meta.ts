import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-flex-wrap';
export const messages = ruleMessages(name, {
  rejected: (selector: string) =>
    `Expected flex-wrap or flex-flow with wrap value when using display: flex at selector "${selector}". Learn more: https://defensivecss.dev/tip/flexbox-wrapping`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
