import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/no-list-style-none';

export const messages = ruleMessages(name, {
  rejected: (selector: string) =>
    `Use 'list-style-type: ""' instead of 'list-style: none' in selector "${selector}" to preserve list semantics in Safari.`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: true,
  url: 'https://github.com/yuschick/stylelint-plugins',
};
