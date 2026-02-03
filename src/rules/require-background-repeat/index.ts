import stylelint from 'stylelint';
import * as meta from './meta';
import { requireBackgroundRepeat } from './rule';

export default stylelint.createPlugin(meta.name, requireBackgroundRepeat);
