import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-grid-minmax';

export const messages = ruleMessages(name, {
  rejected: () =>
    `Unexpected column size of "1fr". To prevent potential grid content blowouts, use "minmax(0, 1fr)" instead.`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: true,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
