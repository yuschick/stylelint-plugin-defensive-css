import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-system-font-fallback';
export const messages = ruleMessages(name, {
  looseReject: (value: string) =>
    `Expected font family definition to include a web safe and/or CSS system font fallback. Found ${value}`,
  strictReject: (value: string) =>
    `Expected font family definition to include a CSS system font fallback. Found ${value}`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
