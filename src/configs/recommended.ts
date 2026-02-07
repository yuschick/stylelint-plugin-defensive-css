export default {
  plugins: ['stylelint-plugin-defensive-css'],
  rules: {
    'defensive-css/no-accidental-hover': [true, { severity: 'error' }],
    'defensive-css/no-list-style-none': [true, { fix: true, severity: 'error' }],
    'defensive-css/no-mixed-vendor-prefixes': [true, { severity: 'error' }],
    'defensive-css/require-background-repeat': [true, { severity: 'error' }],
    'defensive-css/require-dynamic-viewport-height': [true, { severity: 'warning' }],
    'defensive-css/require-flex-wrap': [true, { severity: 'error' }],
    'defensive-css/require-focus-visible': [true, { severity: 'error' }],
    'defensive-css/require-named-grid-lines': [
      true,
      { columns: [true, { severity: 'error' }], rows: [true, { severity: 'warning' }] },
    ],
    'defensive-css/require-prefers-reduced-motion': [true, { severity: 'error' }],
  },
};
