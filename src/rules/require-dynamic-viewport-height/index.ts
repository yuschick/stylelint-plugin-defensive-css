import stylelint from 'stylelint';
import * as meta from './meta';
import { requireDynamicViewportHeight } from './rule';

export default stylelint.createPlugin(meta.name, requireDynamicViewportHeight);
