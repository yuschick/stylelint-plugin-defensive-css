import stylelint from 'stylelint';
import * as meta from './meta';
import { noUnsafeWillChange } from './rule';

export default stylelint.createPlugin(meta.name, noUnsafeWillChange);
