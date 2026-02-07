/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require scrollbar-gutter property when using scrollable overflow.
 * @license MIT
 */

import stylelint, { Rule, Severity } from 'stylelint';
import { messages, meta, name } from './meta';
import { getOverflowAxis, isScrollableOverflow } from './utils';
import { severityOption, SeverityProps } from '../../utils/types';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  x?: boolean | [boolean, SeverityProps];
  y?: boolean | [boolean, SeverityProps];
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
          ...severityOption,
          x: [
            (value: unknown) => {
              return (
                typeof value === 'boolean' || (Array.isArray(value) && value.length === 2)
              );
            },
          ],
          y: [
            (value: unknown) => {
              return (
                typeof value === 'boolean' || (Array.isArray(value) && value.length === 2)
              );
            },
          ],
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

      if (checkX && hasScrollableOverflowX && !hasScrollbarGutter && overflowNode) {
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

      if (checkY && hasScrollableOverflowY && !hasScrollbarGutter && overflowNode) {
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

requireScrollbarGutter.ruleName = name;
requireScrollbarGutter.messages = messages;
requireScrollbarGutter.meta = meta;
