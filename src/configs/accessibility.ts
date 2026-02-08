export default {
  plugins: ['stylelint-plugin-defensive-css'],
  rules: {
    'defensive-css/no-accidental-hover': [true, { severity: 'error' }],
    'defensive-css/no-list-style-none': [true, { fix: true, severity: 'error' }],
    'defensive-css/require-focus-visible': [true, { severity: 'error' }],
    'defensive-css/require-prefers-reduced-motion': [true, { severity: 'error' }],
  },
};
