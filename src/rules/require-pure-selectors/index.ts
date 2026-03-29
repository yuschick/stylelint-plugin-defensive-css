import stylelint from 'stylelint';
import * as meta from './meta';
import { requirePureSelectors } from './rule';

export default stylelint.createPlugin(meta.name, requirePureSelectors);
