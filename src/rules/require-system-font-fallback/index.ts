import stylelint from 'stylelint';
import * as meta from './meta';
import { requireSystemFontFallback } from './rule';

export default stylelint.createPlugin(meta.name, requireSystemFontFallback);
