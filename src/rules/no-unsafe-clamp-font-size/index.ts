import stylelint from 'stylelint';
import * as meta from './meta';
import { noUnsafeClampFontSize } from './rule';

export default stylelint.createPlugin(meta.name, noUnsafeClampFontSize);
