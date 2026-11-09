import stylelint from 'stylelint';

import * as meta from './meta';
import { requireDynamicViewportHeight } from './rule';

export const requireDynamicViewportHeightPlugin = stylelint.createPlugin(
  meta.name,
  requireDynamicViewportHeight,
);
