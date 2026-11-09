import stylelint from 'stylelint';

import * as meta from './meta';
import { requirePrefersReducedMotion } from './rule';

export const requirePrefersReducedMotionPlugin = stylelint.createPlugin(
  meta.name,
  requirePrefersReducedMotion,
);
