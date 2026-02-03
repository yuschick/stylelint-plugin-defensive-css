import stylelint from 'stylelint';
import * as meta from './meta';
import { requireFocusVisible } from './rule';

export default stylelint.createPlugin(meta.name, requireFocusVisible);
