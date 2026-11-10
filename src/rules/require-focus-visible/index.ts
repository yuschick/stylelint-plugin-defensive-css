import stylelint from 'stylelint';

import * as meta from './meta';
import { requireFocusVisible } from './rule';

export const requireFocusVisiblePlugin = stylelint.createPlugin(
  meta.name,
  requireFocusVisible,
);
