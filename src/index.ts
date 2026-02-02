import recommended from './configs/recommended';

import noAccidentalHover from './rules/no-accidental-hover';
import noMixedVendorPrefixes from './rules/no-mixed-vendor-prefixes';
import requireBackgroundRepeat from './rules/require-background-repeat';
import requireCustomPropertyFallback from './rules/require-custom-property-fallback';
import requireFlexWrap from './rules/require-flex-wrap';
import requireNamedGridLines from './rules/require-named-grid-lines';
import requireOverscrollBehavior from './rules/require-overscroll-behavior';
import requireScrollbarGutter from './rules/require-scrollbar-gutter';

export default [
  noAccidentalHover,
  noMixedVendorPrefixes,
  requireBackgroundRepeat,
  requireCustomPropertyFallback,
  requireFlexWrap,
  requireNamedGridLines,
  requireOverscrollBehavior,
  requireScrollbarGutter,
];

export const configs = {
  recommended,
};
