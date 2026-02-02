import stylelint from 'stylelint';
import * as meta from './meta';
import { requireNamedGridLines } from './rule';

export default stylelint.createPlugin(meta.name, requireNamedGridLines);
