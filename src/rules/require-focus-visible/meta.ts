import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-focus-visible';

export const messages = ruleMessages(name, {
  rejected: (selector: string) =>
    `Expected ":focus-visible" instead of ":focus" in selector "${selector}" for better keyboard navigation UX`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugins',
};
