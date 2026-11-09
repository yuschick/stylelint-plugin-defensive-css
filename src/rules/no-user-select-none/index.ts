import stylelint from 'stylelint';

import * as meta from './meta';
import { noUserSelectNone } from './rule';

export const noUserSelectNonePlugin = stylelint.createPlugin(
  meta.name,
  noUserSelectNone,
);
