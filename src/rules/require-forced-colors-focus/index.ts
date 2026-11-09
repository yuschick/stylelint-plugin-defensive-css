import stylelint from 'stylelint';

import * as meta from './meta';
import { requireForcedColorsFocus } from './rule';

export const requireForcedColorsFocusPlugin = stylelint.createPlugin(
  meta.name,
  requireForcedColorsFocus,
);
