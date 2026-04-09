import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-forced-colors-focus';
export const messages = ruleMessages(name, {
  rejected: (selector: string) =>
    `Expected "${selector}" to include a Forced Colors Mode-safe focus indicator. Box-shadow is removed in Forced Colors Mode. Consider using "outline: 2px solid transparent".`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
