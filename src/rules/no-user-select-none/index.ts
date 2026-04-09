import stylelint from 'stylelint';
import * as meta from './meta';
import { noUserSelectNone } from './rule';

export default stylelint.createPlugin(meta.name, noUserSelectNone);
