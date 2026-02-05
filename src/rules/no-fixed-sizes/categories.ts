import type * as CSS from 'csstype';
import { Severity } from 'stylelint';

export type Properties = Partial<Record<keyof CSS.PropertiesHyphen, false | Severity>>;

export type AtRules = Partial<Record<CSS.AtRules, false | Severity>>;

export const groups = ['critical', 'decorative', 'positioning', 'spacing', 'typography'];
export type Group = (typeof groups)[number];

export type PropertyGroup = Record<
  Group,
  { properties: (keyof CSS.PropertiesHyphen)[]; severity: false | Severity }
>;

export const recommendedPropertyGroups: PropertyGroup = {
  critical: {
    properties: [
      'block-size',
      'font-size',
      'height',
      'inline-size',
      'grid',
      'grid-template-columns',
      'grid-template-rows',
      'max-block-size',
      'max-height',
      'max-inline-size',
      'max-width',
      'width',
    ],
    severity: 'error',
  },
  spacing: {
    properties: [
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'padding-inline',
      'padding-block',
      'padding-inline-start',
      'padding-inline-end',
      'padding-block-start',
      'padding-block-end',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-inline',
      'margin-block',
      'margin-inline-start',
      'margin-inline-end',
      'margin-block-start',
      'margin-block-end',
      'gap',
      'row-gap',
      'column-gap',
      'scroll-margin',
      'scroll-margin-top',
      'scroll-margin-right',
      'scroll-margin-bottom',
      'scroll-margin-left',
      'scroll-padding',
      'scroll-padding-top',
      'scroll-padding-right',
      'scroll-padding-bottom',
      'scroll-padding-left',
    ],
    severity: 'warning',
  },
  typography: {
    properties: ['line-height', 'letter-spacing', 'word-spacing'],
    severity: 'warning',
  },
};

export const strictPropertyGroups: PropertyGroup = {
  decorative: {
    properties: [
      'border',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-inline-width',
      'border-block-width',
      'border-inline-start-width',
      'border-inline-end-width',
      'border-block-start-width',
      'border-block-end-width',
      'border-radius',
      'border-top-left-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-start-start-radius',
      'border-start-end-radius',
      'border-end-start-radius',
      'border-end-end-radius',
      'box-shadow',
      'column-rule-width',
      'outline',
      'outline-width',
      'outline-offset',
      'text-shadow',
      'text-decoration-thickness',
      'text-underline-offset',
    ],
    severity: 'warning',
  },
  positioning: {
    properties: [
      'top',
      'right',
      'bottom',
      'left',
      'inset',
      'inset-inline',
      'inset-block',
      'inset-inline-start',
      'inset-inline-end',
      'inset-block-start',
      'inset-block-end',
      'translate',
      'transform',
    ],
    severity: 'warning',
  },
};

export const recommendedOptions: Properties = Object.values(
  recommendedPropertyGroups,
).reduce<Properties>((acc, group) => {
  const { properties, severity } = group;

  for (const property of properties) {
    acc[property] = severity;
  }

  return acc;
}, {});

export const strictOptions: Properties = {
  ...recommendedOptions,
  ...Object.values(strictPropertyGroups).reduce<Properties>((acc, group) => {
    const { properties, severity } = group;

    for (const property of properties) {
      acc[property] = severity;
    }

    return acc;
  }, {}),
};

export const defaultAtRules: Partial<Record<CSS.AtRules, false | Severity>> = {
  '@container': 'error',
  '@media': 'error',
};

export const nonDimensionalAtRules: CSS.AtRules[] = [
  '@charset',
  '@counter-style',
  '@document',
  '@font-face',
  '@font-feature-values',
  '@font-palette-values',
  '@import',
  '@keyframes',
  '@layer',
  '@namespace',
  '@page',
  '@position-try',
  '@scope',
  '@starting-style',
  '@supports',
  '@view-transition',
];
