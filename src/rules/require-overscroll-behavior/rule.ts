/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require overscroll-behavior property when using scrollable overflow to prevent accidental scroll chaining.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from '.';
import {
  getOverflowAxis,
  getOverscrollBehaviorAxis,
  isScrollableOverflow,
} from './utils';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions {
  x?: boolean;
  y?: boolean;
}

export const requireOverscrollBehavior: Rule = (
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
      let hasOverscrollBehaviorX = false;
      let hasOverscrollBehaviorY = false;
      let overflowNode = null;

      // Collect all declarations in this rule
      ruleNode.walkDecls((decl) => {
        const { prop, value } = decl;

        const overflowAxis = getOverflowAxis(prop);

        // Check for scrollable overflow properties
        if (overflowAxis && isScrollableOverflow(value)) {
          overflowNode = decl;

          if (overflowAxis === 'x') {
            hasScrollableOverflowX = true;
          } else if (overflowAxis === 'y') {
            hasScrollableOverflowY = true;
          } else if (overflowAxis === 'both') {
            hasScrollableOverflowX = true;
            hasScrollableOverflowY = true;
          }
        }

        // Check for overscroll-behavior properties
        const overscrollAxis = getOverscrollBehaviorAxis(prop);

        if (overscrollAxis) {
          if (overscrollAxis === 'x') {
            hasOverscrollBehaviorX = true;
          } else if (overscrollAxis === 'y') {
            hasOverscrollBehaviorY = true;
          } else if (overscrollAxis === 'both') {
            hasOverscrollBehaviorX = true;
            hasOverscrollBehaviorY = true;
          }
        }
      });

      // Determine if we should report
      let shouldReport = false;

      if (checkX && hasScrollableOverflowX && !hasOverscrollBehaviorX) {
        shouldReport = true;
      }

      if (checkY && hasScrollableOverflowY && !hasOverscrollBehaviorY) {
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

requireOverscrollBehavior.ruleName = name;
requireOverscrollBehavior.messages = messages;
requireOverscrollBehavior.meta = meta;
