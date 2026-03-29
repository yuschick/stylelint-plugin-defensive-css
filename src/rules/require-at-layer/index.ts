import stylelint from 'stylelint';
import * as meta from './meta';
import { requireAtLayer } from './rule';

export default stylelint.createPlugin(meta.name, requireAtLayer);
