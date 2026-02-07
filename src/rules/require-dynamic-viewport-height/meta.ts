import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-dynamic-viewport-height';

export const messages = ruleMessages(name, {
  error: (prop: string) =>
    `Avoid using static viewport units on "${prop}". Use dynamic viewport units (100dvh, 100dvb) instead to prevent unexpected behavior on mobile browsers where the address bar, keyboard and other utilities can collapse.`,
  warning: (prop: string) =>
    `AAvoid using static viewport units on "${prop}". Use dynamic viewport units (100dvh, 100dvb) instead to prevent unexpected behavior on mobile browsers where the address bar, keyboard and other utilities can collapse.`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: true,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
