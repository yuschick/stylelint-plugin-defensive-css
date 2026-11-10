import stylelint from 'stylelint';

import * as meta from './meta';
import { requirePureSelectors } from './rule';

export const requirePureSelectorsPlugin = stylelint.createPlugin(
  meta.name,
  requirePureSelectors,
);
