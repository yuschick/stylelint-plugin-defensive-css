/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require overscroll-behavior property when using scrollable overflow to prevent accidental scroll chaining.
 * @license MIT
 */

import stylelint, { Rule, Severity } from 'stylelint';
import { messages, meta, name } from './meta';
import {
  getOverflowAxis,
  getOverscrollBehaviorAxis,
  isScrollableOverflow,
} from './utils';
import { severityOption, SeverityProps } from '../../utils/types';
import { validateBasicOption } from '../../utils/validation';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  x?: boolean | [boolean, SeverityProps];
  y?: boolean | [boolean, SeverityProps];
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
          ...severityOption,
          x: [(value: unknown) => validateBasicOption(value)],
          y: [(value: unknown) => validateBasicOption(value)],
        },
      },
    );

    if (!validOptions) return;

    // Default both to true
    const checkX = secondaryOptions.x !== false;
    const checkY = secondaryOptions.y !== false;

    // If both are disabled, nothing to check
    if (!checkX && !checkY) return;

    const { severity } = secondaryOptions;
    const xSeverity: Severity | undefined = Array.isArray(secondaryOptions.x)
      ? secondaryOptions.x[1].severity
      : severity;
    const ySeverity: Severity | undefined = Array.isArray(secondaryOptions.y)
      ? secondaryOptions.y[1].severity
      : severity;

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

      if (checkX && hasScrollableOverflowX && !hasOverscrollBehaviorX && overflowNode) {
        report({
          message: messages.rejected(ruleNode.selector),
          node: overflowNode,
          result,
          ruleName: name,
          severity: xSeverity,
          word: ruleNode.selector,
        });

        return;
      }

      if (checkY && hasScrollableOverflowY && !hasOverscrollBehaviorY && overflowNode) {
        report({
          message: messages.rejected(ruleNode.selector),
          node: overflowNode,
          result,
          ruleName: name,
          severity: ySeverity,
          word: ruleNode.selector,
        });

        return;
      }
    });
  };
};

requireOverscrollBehavior.ruleName = name;
requireOverscrollBehavior.messages = messages;
requireOverscrollBehavior.meta = meta;
