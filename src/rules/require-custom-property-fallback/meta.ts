import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-custom-property-fallback';
export const messages = ruleMessages(name, {
  rejected: (selector: string) =>
    `Expected custom property fallback when using custom property with selector "${selector}". Learn more: https://defensivecss.dev/tip/css-variable-fallback`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
