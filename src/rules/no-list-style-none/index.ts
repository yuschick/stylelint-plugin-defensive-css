import stylelint from 'stylelint';
import * as meta from './meta';
import { noListStyleNone } from './rule';

export default stylelint.createPlugin(meta.name, noListStyleNone);
