import stylelint from 'stylelint';
import { ruleMessages, ruleName } from '../base.js';
import { findVendorPrefixes } from './utils.js';

export function vendorPrefixGrouping({ decl, result }) {
  const hasMultiplePrefixes = findVendorPrefixes(decl.parent.selector);

  if (hasMultiplePrefixes) {
    stylelint.utils.report({
      message: ruleMessages.vendorPrefixWGrouping(),
      node: decl.parent,
      result,
      ruleName,
    });
  }
}
