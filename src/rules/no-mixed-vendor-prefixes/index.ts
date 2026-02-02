import stylelint from 'stylelint';
import * as meta from './meta';
import { noMixedVendorPrefixes } from './rule';

export default stylelint.createPlugin(meta.name, noMixedVendorPrefixes);
