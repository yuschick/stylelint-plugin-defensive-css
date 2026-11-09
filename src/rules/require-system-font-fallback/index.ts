import stylelint from 'stylelint';

import * as meta from './meta';
import { requireSystemFontFallback } from './rule';

export const requireSystemFontFallbackPlugin = stylelint.createPlugin(
  meta.name,
  requireSystemFontFallback,
);
