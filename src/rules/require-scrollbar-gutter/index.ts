import stylelint from 'stylelint';
import * as meta from './meta';
import { requireScrollbarGutter } from './rule';

export default stylelint.createPlugin(meta.name, requireScrollbarGutter);
