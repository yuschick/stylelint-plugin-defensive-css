import noAccidentalHover from './rules/no-accidental-hover';
import noMixedVendorPrefixes from './rules/no-mixed-vendor-prefixes';
import noListStyleNone from './rules/no-list-style-none';
import requireBackgroundRepeat from './rules/require-background-repeat';
import requireCustomPropertyFallback from './rules/require-custom-property-fallback';
import requireFlexWrap from './rules/require-flex-wrap';
import requireFocusVisible from './rules/require-focus-visible';
import requireNamedGridLines from './rules/require-named-grid-lines';
import requirePrefersReducedMotion from './rules/require-prefers-reduced-motion';
import requireOverscrollBehavior from './rules/require-overscroll-behavior';
import requireScrollbarGutter from './rules/require-scrollbar-gutter';

export default [
  noAccidentalHover,
  noListStyleNone,
  noMixedVendorPrefixes,
  requireBackgroundRepeat,
  requireCustomPropertyFallback,
  requireFlexWrap,
  requireFocusVisible,
  requireNamedGridLines,
  requirePrefersReducedMotion,
  requireOverscrollBehavior,
  requireScrollbarGutter,
];
