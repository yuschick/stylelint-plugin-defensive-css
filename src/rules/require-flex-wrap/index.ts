import stylelint from 'stylelint';
import * as meta from './meta';
import { requireFlexWrap } from './rule';

export default stylelint.createPlugin(meta.name, requireFlexWrap);
