import stylelint from 'stylelint';
import * as meta from './meta';
import { requirePrefersReducedMotion } from './rule';

export default stylelint.createPlugin(meta.name, requirePrefersReducedMotion);
