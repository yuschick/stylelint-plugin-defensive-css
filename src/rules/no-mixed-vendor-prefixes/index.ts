import stylelint from 'stylelint';

import * as meta from './meta';
import { noMixedVendorPrefixes } from './rule';

export const noMixedVendorPrefixesPlugin = stylelint.createPlugin(
  meta.name,
  noMixedVendorPrefixes,
);
