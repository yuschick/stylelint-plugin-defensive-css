import stylelint from 'stylelint';

import * as meta from './meta';
import { requireNamedGridLines } from './rule';

export const requireNamedGridLinesPlugin = stylelint.createPlugin(
  meta.name,
  requireNamedGridLines,
);
