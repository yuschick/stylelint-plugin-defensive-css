import stylelint from 'stylelint';
import * as meta from './meta';
import { requireOverscrollBehavior } from './rule';

export default stylelint.createPlugin(meta.name, requireOverscrollBehavior);
