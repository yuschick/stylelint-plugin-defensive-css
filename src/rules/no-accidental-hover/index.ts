import stylelint from 'stylelint';

import * as meta from './meta';
import { noAccidentalHover } from './rule';

export const noAccidentalHoverPlugin = stylelint.createPlugin(
  meta.name,
  noAccidentalHover,
);
