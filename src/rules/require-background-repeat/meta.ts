import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-background-repeat';

export const messages = ruleMessages(name, {
  rejectedBackground: (selector: string) =>
    `Expected background-repeat when using background-image with selector "${selector}". Learn more: https://defensivecss.dev/tip/background-repeat/`,
  rejectedMask: (selector: string) =>
    `Expected mask-repeat when using mask-image with selector "${selector}". Learn more: https://defensivecss.dev/tip/background-repeat/`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
