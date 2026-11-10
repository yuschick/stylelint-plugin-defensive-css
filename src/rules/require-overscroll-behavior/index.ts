import stylelint from 'stylelint';

import * as meta from './meta';
import { requireOverscrollBehavior } from './rule';

export const requireOverscrollBehaviorPlugin = stylelint.createPlugin(
  meta.name,
  requireOverscrollBehavior,
);
