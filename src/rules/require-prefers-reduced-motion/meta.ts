import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-prefers-reduced-motion';

export const messages = ruleMessages(name, {
  rejected: (property: string) =>
    `Animation property "${property}" should be wrapped in @media (prefers-reduced-motion: no-preference) for accessibility`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugins',
};
