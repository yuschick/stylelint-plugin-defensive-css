import type { Plugin } from 'stylelint';

import { noAccidentalHoverPlugin } from './rules/no-accidental-hover';
import { noFixedSizesPlugin } from './rules/no-fixed-sizes';
import { noListStyleNonePlugin } from './rules/no-list-style-none';
import { noMixedVendorPrefixesPlugin } from './rules/no-mixed-vendor-prefixes';
import { noUnsafeClampFontSizePlugin } from './rules/no-unsafe-clamp-font-size';
import { noUnsafeWillChangePlugin } from './rules/no-unsafe-will-change';
import { noUserSelectNonePlugin } from './rules/no-user-select-none';
import { requireAtLayerPlugin } from './rules/require-at-layer';
import { requireBackgroundRepeatPlugin } from './rules/require-background-repeat';
import { requireCustomPropertyFallbackPlugin } from './rules/require-custom-property-fallback';
import { requireDynamicViewportHeightPlugin } from './rules/require-dynamic-viewport-height';
import { requireFlexWrapPlugin } from './rules/require-flex-wrap';
import { requireFocusVisiblePlugin } from './rules/require-focus-visible';
import { requireForcedColorsFocusPlugin } from './rules/require-forced-colors-focus';
import { requireGridMinmaxPlugin } from './rules/require-grid-minmax';
import { requireNamedGridLinesPlugin } from './rules/require-named-grid-lines';
import { requireOverscrollBehaviorPlugin } from './rules/require-overscroll-behavior';
import { requirePrefersReducedMotionPlugin } from './rules/require-prefers-reduced-motion';
import { requirePureSelectorsPlugin } from './rules/require-pure-selectors';
import { requireScrollbarGutterPlugin } from './rules/require-scrollbar-gutter';
import { requireSystemFontFallbackPlugin } from './rules/require-system-font-fallback';

const plugins: Plugin[] = [
  noAccidentalHoverPlugin,
  noFixedSizesPlugin,
  noListStyleNonePlugin,
  noMixedVendorPrefixesPlugin,
  noUnsafeClampFontSizePlugin,
  noUnsafeWillChangePlugin,
  noUserSelectNonePlugin,
  requireAtLayerPlugin,
  requireBackgroundRepeatPlugin,
  requireCustomPropertyFallbackPlugin,
  requireDynamicViewportHeightPlugin,
  requireFlexWrapPlugin,
  requireFocusVisiblePlugin,
  requireForcedColorsFocusPlugin,
  requireGridMinmaxPlugin,
  requireNamedGridLinesPlugin,
  requirePrefersReducedMotionPlugin,
  requireOverscrollBehaviorPlugin,
  requirePureSelectorsPlugin,
  requireScrollbarGutterPlugin,
  requireSystemFontFallbackPlugin,
];

export default plugins;
