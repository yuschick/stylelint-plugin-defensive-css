import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/no-unsafe-clamp-font-size';

export const messages = ruleMessages(name, {
  exceedsRatio: (min, max, ratio) =>
    `The clamp() max (${max}) is more than ${ratio}x the min (${min}). This may prevent text from scaling to 200% on zoom, violating WCAG SC 1.4.4. Learn more at https://www.smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/`,
  unresolvable: (value: string) =>
    `Could not verify clamp() min/max ratio for "${value}". Use comparable units (e.g. px-to-px or rem-to-rem) to enforce WCAG SC 1.4.4 guardrails.`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
