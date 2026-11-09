import stylelint from 'stylelint';

import * as meta from './meta';
import { requireCustomPropertyFallback } from './rule';

export const requireCustomPropertyFallbackPlugin = stylelint.createPlugin(
  meta.name,
  requireCustomPropertyFallback,
);
