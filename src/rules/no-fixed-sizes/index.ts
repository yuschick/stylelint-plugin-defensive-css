import stylelint from 'stylelint';
import * as meta from './meta';
import { noFixedSizes } from './rule';

export default stylelint.createPlugin(meta.name, noFixedSizes);
