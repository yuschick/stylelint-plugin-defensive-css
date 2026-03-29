import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-pure-selectors';
export const messages = ruleMessages(name, {
  rejected: (selector: string) =>
    `Unexpected element tag in "${selector}". Pure selectors must only target classes or IDs to keep styles decoupled from the HTML structure.`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
