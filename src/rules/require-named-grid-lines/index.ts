import stylelint, { RuleMeta } from 'stylelint';
import { requireNamedGridLines } from './rule';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-named-grid-lines';
export const messages = ruleMessages(name, {
  rejected: (selector: string) =>
    `Expected named grid lines for grid container at selector "${selector}". Learn more: https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};

export default stylelint.createPlugin(name, requireNamedGridLines);
