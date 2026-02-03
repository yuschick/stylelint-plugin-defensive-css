import stylelint from 'stylelint';
import * as meta from './meta';
import { requireCustomPropertyFallback } from './rule';

export default stylelint.createPlugin(meta.name, requireCustomPropertyFallback);
