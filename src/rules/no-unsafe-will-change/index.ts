import stylelint from 'stylelint';

import * as meta from './meta';
import { noUnsafeWillChange } from './rule';

export const noUnsafeWillChangePlugin = stylelint.createPlugin(
  meta.name,
  noUnsafeWillChange,
);
