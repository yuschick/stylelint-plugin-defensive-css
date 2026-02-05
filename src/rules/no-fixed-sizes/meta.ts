import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/no-fixed-sizes';

export const messages = ruleMessages(name, {
  error: (target: string) =>
    `Avoid fixed pixel values in "${target}" - use relative units (rem, em, %, vh, vw) for responsive design. Learn more: https://defensivecss.dev/tip/fixed-sizes`,
  warn: (target: string) =>
    `Consider using relative units instead of pixels in "${target}". Learn more: https://defensivecss.dev/tip/fixed-sizes`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
