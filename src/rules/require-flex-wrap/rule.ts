/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require explicit flex-wrap declaration for flex containers.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from '.';
import { hasWrapValue, isColumnDirection, isFlexDisplay } from './utils';

const { report, validateOptions } = stylelint.utils;

export const requireFlexWrap: Rule = (primaryOption) => {
  return (root, result) => {
    const validOptions = validateOptions(result, name, {
      actual: primaryOption,
      possible: [true, false],
    });

    if (!validOptions) return;

    root.walkRules((ruleNode) => {
      const { selector } = ruleNode;
      let isDisplayFlex = false;
      let hasFlexWrap = false;
      let isFlexColumn = false;
      let displayNode = null;

      // Collect all declarations in this rule
      ruleNode.walkDecls((decl) => {
        const { prop, value } = decl;

        // Check for display: flex
        if (prop === 'display' && isFlexDisplay(value)) {
          isDisplayFlex = true;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          displayNode = decl as any;
        }

        // Check for flex-direction: column
        if (prop === 'flex-direction' && isColumnDirection(value)) {
          isFlexColumn = true;
        }

        // Check for flex-flow (can set both direction and wrap)
        if (prop === 'flex-flow') {
          if (isColumnDirection(value)) {
            isFlexColumn = true;
          }
          if (hasWrapValue(value)) {
            hasFlexWrap = true;
          }
        }

        // Check for explicit flex-wrap
        if (prop === 'flex-wrap') {
          hasFlexWrap = true;
        }
      });

      if (isDisplayFlex && !hasFlexWrap && !isFlexColumn && displayNode) {
        report({
          message: messages.rejected(selector),
          node: displayNode,
          result,
          ruleName: name,
          word: selector,
        });
      }
    });
  };
};

requireFlexWrap.ruleName = name;
requireFlexWrap.messages = messages;
requireFlexWrap.meta = meta;
