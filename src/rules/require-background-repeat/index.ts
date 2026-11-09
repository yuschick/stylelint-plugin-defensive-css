import stylelint from 'stylelint';

import * as meta from './meta';
import { requireBackgroundRepeat } from './rule';

export const requireBackgroundRepeatPlugin = stylelint.createPlugin(
  meta.name,
  requireBackgroundRepeat,
);
