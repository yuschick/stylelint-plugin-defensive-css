/**
 * @author Daniel Yuschick
 * @fileoverview Rule to disallow grouping multiple vendor prefixes in a single selector.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from '.';
import { findVendorPrefixes } from './utils';

const { report, validateOptions } = stylelint.utils;

export const noGroupedVendorPrefixes: Rule = (primaryOption) => {
  return (root, result) => {
    const validOptions = validateOptions(result, name, {
      actual: primaryOption,
      possible: [true, false],
    });

    if (!validOptions) return;

    root.walkRules((ruleNode) => {
      const { selector } = ruleNode;
      const hasMultiplePrefixes = findVendorPrefixes(selector);

      if (hasMultiplePrefixes) {
        report({
          message: messages.rejected(selector),
          node: ruleNode,
          result,
          ruleName: name,
          word: selector,
        });
      }
    });
  };
};

noGroupedVendorPrefixes.ruleName = name;
noGroupedVendorPrefixes.messages = messages;
noGroupedVendorPrefixes.meta = meta;
