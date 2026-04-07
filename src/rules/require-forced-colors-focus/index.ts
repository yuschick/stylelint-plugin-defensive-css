import stylelint from 'stylelint';
import * as meta from './meta';
import { requireForcedColorsFocus } from './rule';

export default stylelint.createPlugin(meta.name, requireForcedColorsFocus);
