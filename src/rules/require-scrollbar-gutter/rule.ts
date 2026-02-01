/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require scrollbar-gutter property when using scrollable overflow.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from '.';
import { getOverflowAxis, isScrollableOverflow } from './utils';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions {
  x?: boolean;
  y?: boolean;
}

export const requireScrollbarGutter: Rule = (
  primaryOption,
  secondaryOptions: SecondaryOptions = {},
) => {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      name,
      {
        actual: primaryOption,
        possible: [true, false],
      },
      {
        actual: secondaryOptions,
        optional: true,
        possible: {
          x: [(value: unknown) => typeof value === 'boolean'],
          y: [(value: unknown) => typeof value === 'boolean'],
        },
      },
    );

    if (!validOptions) return;

    // Default both to true
    const checkX = secondaryOptions.x !== false;
    const checkY = secondaryOptions.y !== false;

    // If both are disabled, nothing to check
    if (!checkX && !checkY) return;

    root.walkRules((ruleNode) => {
      let hasScrollableOverflowX = false;
      let hasScrollableOverflowY = false;
      let hasScrollbarGutter = false;
      let overflowNode = null;

      // Collect all declarations in this rule
      ruleNode.walkDecls((decl) => {
        const { prop, value } = decl;

        const axis = getOverflowAxis(prop);

        // Check for scrollable overflow properties
        if (axis && isScrollableOverflow(value)) {
          overflowNode = decl;

          if (axis === 'x') {
            hasScrollableOverflowX = true;
          } else if (axis === 'y') {
            hasScrollableOverflowY = true;
          } else if (axis === 'both') {
            // overflow shorthand affects both axes
            hasScrollableOverflowX = true;
            hasScrollableOverflowY = true;
          }
        }

        // Check for scrollbar-gutter property
        if (prop === 'scrollbar-gutter') {
          hasScrollbarGutter = true;
        }
      });

      // Determine if we should report
      let shouldReport = false;

      if (checkX && hasScrollableOverflowX && !hasScrollbarGutter) {
        shouldReport = true;
      }

      if (checkY && hasScrollableOverflowY && !hasScrollbarGutter) {
        shouldReport = true;
      }

      if (shouldReport && overflowNode) {
        report({
          message: messages.rejected(ruleNode.selector),
          node: overflowNode,
          result,
          ruleName: name,
          word: ruleNode.selector,
        });
      }
    });
  };
};

requireScrollbarGutter.ruleName = name;
requireScrollbarGutter.messages = messages;
requireScrollbarGutter.meta = meta;
