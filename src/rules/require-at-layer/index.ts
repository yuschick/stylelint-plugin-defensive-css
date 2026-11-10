import stylelint from 'stylelint';

import * as meta from './meta';
import { requireAtLayer } from './rule';

export const requireAtLayerPlugin = stylelint.createPlugin(
  meta.name,
  requireAtLayer,
);
