import stylelint from 'stylelint';
import * as meta from './meta';
import { noAccidentalHover } from './rule';

export default stylelint.createPlugin(meta.name, noAccidentalHover);
