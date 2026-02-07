import { strictOptions } from '../rules/no-fixed-sizes/categories';

export default {
  plugins: ['stylelint-plugin-defensive-css'],
  rules: {
    'defensive-css/no-accidental-hover': [true, { severity: 'error' }],
    'defensive-css/no-fixed-sizes': [
      true,
      { properties: strictOptions, severity: 'error' },
    ],
    'defensive-css/no-list-style-none': [true, { fix: true, severity: 'error' }],
    'defensive-css/no-mixed-vendor-prefixes': [true, { severity: 'error' }],
    'defensive-css/require-background-repeat': [true, { severity: 'error' }],
    'defensive-css/require-custom-property-fallback': [true, { severity: 'error' }],
    'defensive-css/require-flex-wrap': [true, { severity: 'error' }],
    'defensive-css/require-focus-visible': [true, { severity: 'error' }],
    'defensive-css/require-named-grid-lines': [true, { severity: 'error' }],
    'defensive-css/require-overscroll-behavior': [true, { severity: 'error' }],
    'defensive-css/require-prefers-reduced-motion': [true, { severity: 'error' }],
    'defensive-css/require-scrollbar-gutter': [true, { severity: 'error' }],
  },
};
