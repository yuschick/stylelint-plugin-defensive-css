import stylelint, { RuleMeta } from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = 'defensive-css/require-at-layer';

export const messages = ruleMessages(name, {
  notWrapped: (layers: string[]) =>
    `All styles must be wrapped in a top-level @layer rule.${layers?.length ? ` Supported layers: ${layers.join(', ')}` : ''}`,
  unsupportedName: (found: string, supported: string[]) =>
    `Layer "${found}" is not a supported layer name. Supported layers: ${supported.join(', ')}`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: false,
  url: 'https://github.com/yuschick/stylelint-plugin-defensive-css',
};
