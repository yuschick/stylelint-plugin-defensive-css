import stylelint from 'stylelint';

import * as meta from './meta';
import { noFixedSizes } from './rule';

export const noFixedSizesPlugin = stylelint.createPlugin(
  meta.name,
  noFixedSizes,
);
