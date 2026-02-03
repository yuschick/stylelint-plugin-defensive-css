export default {
  plugins: ['stylelint-plugin-defensive-css'],
  rules: {
    'defensive-css/no-accidental-hover': true,
    'defensive-css/no-list-style-none': [true, { fix: true }],
    'defensive-css/no-mixed-vendor-prefixes': true,
    'defensive-css/require-background-repeat': true,
    'defensive-css/require-custom-property-fallback': true,
    'defensive-css/require-flex-wrap': true,
    'defensive-css/require-focus-visible': true,
    'defensive-css/require-named-grid-lines': true,
    'defensive-css/require-overscroll-behavior': true,
    'defensive-css/require-prefers-reduced-motion': true,
    'defensive-css/require-scrollbar-gutter': true,
  },
};
