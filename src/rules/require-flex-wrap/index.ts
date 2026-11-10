import stylelint from 'stylelint';

import * as meta from './meta';
import { requireFlexWrap } from './rule';

export const requireFlexWrapPlugin = stylelint.createPlugin(
  meta.name,
  requireFlexWrap,
);
