import stylelint from 'stylelint';
import * as meta from './meta';
import { requireGridMinmax } from './rule';

export default stylelint.createPlugin(meta.name, requireGridMinmax);
