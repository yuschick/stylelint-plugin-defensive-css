import stylelint from 'stylelint';

import * as meta from './meta';
import { noUnsafeClampFontSize } from './rule';

export const noUnsafeClampFontSizePlugin = stylelint.createPlugin(
  meta.name,
  noUnsafeClampFontSize,
);
