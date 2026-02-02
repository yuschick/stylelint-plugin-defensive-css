/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require :focus-visible instead of :focus for better keyboard navigation.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from '.';
import {
  hasFocusPseudoClass,
  hasAcceptableFocusPseudoClass,
  isFocusInsideNot,
} from './utils';

const { report, validateOptions } = stylelint.utils;

export const requireFocusVisible: Rule = (primaryOption) => {
  return (root, result) => {
    const validOptions = validateOptions(result, name, {
      actual: primaryOption,
      possible: [true, false],
    });

    if (!validOptions) return;

    root.walkRules((ruleNode) => {
      const { selector } = ruleNode;

      // Skip if no :focus pseudo-class
      if (!hasFocusPseudoClass(selector)) {
        return;
      }

      // Skip if already using :focus-visible or :focus-within
      if (hasAcceptableFocusPseudoClass(selector)) {
        return;
      }

      // Skip if :focus is inside :not() - usually intentional
      if (isFocusInsideNot(selector)) {
        return;
      }

      // Report the violation
      report({
        message: messages.rejected(selector),
        node: ruleNode,
        result,
        ruleName: name,
        word: selector,
      });
    });
  };
};

requireFocusVisible.ruleName = name;
requireFocusVisible.messages = messages;
requireFocusVisible.meta = meta;
