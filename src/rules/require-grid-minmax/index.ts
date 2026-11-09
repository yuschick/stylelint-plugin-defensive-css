import stylelint from 'stylelint';

import * as meta from './meta';
import { requireGridMinmax } from './rule';

export const requireGridMinmaxPlugin = stylelint.createPlugin(
  meta.name,
  requireGridMinmax,
);
