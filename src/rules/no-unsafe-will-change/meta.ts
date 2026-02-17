import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/no-unsafe-will-change';

export const messages = ruleMessages(name, {
  exceedsLimit: (actual: number, max: number) =>
    `The will-change property should have ${max} or fewer properties (found ${actual}). Excessive properties consume GPU memory.`,
  invalidProperty: (properties: string) =>
    `The will-change property should only use composite properties. Found: ${properties}`,
  invalidSelector: (selector: string) =>
    `The will-change property should not be used on the universal selector "${selector}". This forces GPU layers on all elements.`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
