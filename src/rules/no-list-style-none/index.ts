import stylelint from 'stylelint';

import * as meta from './meta';
import { noListStyleNone } from './rule';

export const noListStyleNonePlugin = stylelint.createPlugin(
  meta.name,
  noListStyleNone,
);
