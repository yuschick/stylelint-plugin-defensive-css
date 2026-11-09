import stylelint from 'stylelint';

import * as meta from './meta';
import { requireScrollbarGutter } from './rule';

export const requireScrollbarGutterPlugin = stylelint.createPlugin(
  meta.name,
  requireScrollbarGutter,
);
