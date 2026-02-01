import stylelint, { RuleMeta } from 'stylelint';
import { noAccidentalHover } from './accidental-hover';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/no-accidental-hover';

export const messages = ruleMessages(name, {
  rejected: (selector) =>
    `Unexpected :hover selector "${selector}" not wrapped in a "(hover: hover)" media query. Learn more: https://defensivecss.dev/tip/hover-media/`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugins',
};

export default stylelint.createPlugin(name, noAccidentalHover);
