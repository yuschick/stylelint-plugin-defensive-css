import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/no-user-select-none';

export const messages = ruleMessages(name, {
  rejected: () =>
    `Expected "user-select: none" to be avoided because it can negatively impact accessibility.`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
