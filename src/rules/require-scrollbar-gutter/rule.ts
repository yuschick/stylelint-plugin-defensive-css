/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require scrollbar-gutter property when using scrollable overflow.
 * @license MIT
 */

import type { Declaration } from 'postcss';
import type { Rule, Severity } from 'stylelint';
import stylelint from 'stylelint';

import type { SeverityProps } from '@package-utils/types';
import { severityOption } from '@package-utils/types';
import { validateBasicOption } from '@package-utils/validation';

import { messages, meta, name } from './meta';
import { getOverflowAxis, isScrollableOverflow } from './utils';

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
          x: [(value: unknown) => validateBasicOption(value)],
          y: [(value: unknown) => validateBasicOption(value)],
        },
      },
    );

    if (!validOptions) {
      return;
    }

    // Default both to true
    const checkX = secondaryOptions.x !== false;
    const checkY = secondaryOptions.y !== false;

    // If both are disabled, nothing to check
    if (!checkX && !checkY) {
      return;
    }

    const { severity } = secondaryOptions;
    const xSeverity: Severity | undefined = Array.isArray(secondaryOptions.x)
      ? secondaryOptions.x[1].severity
      : severity;
    const ySeverity: Severity | undefined = Array.isArray(secondaryOptions.y)
      ? secondaryOptions.y[1].severity
      : severity;

    root.walkRules((ruleNode) => {
      const state: {
        hasScrollableOverflowX: boolean;
        hasScrollableOverflowY: boolean;
        hasScrollbarGutter: boolean;
        overflowNode?: Declaration;
      } = {
        hasScrollableOverflowX: false,
        hasScrollableOverflowY: false,
        hasScrollbarGutter: false,
      };

      // Collect all declarations in this rule
      ruleNode.walkDecls((decl) => {
        const { prop, value } = decl;

        const axis = getOverflowAxis(prop);

        // Check for scrollable overflow properties
        if (axis && isScrollableOverflow(value)) {
          state.overflowNode = decl;

          if (axis === 'x') {
            state.hasScrollableOverflowX = true;
          } else if (axis === 'y') {
            state.hasScrollableOverflowY = true;
          } else {
            // overflow shorthand affects both axes
            state.hasScrollableOverflowX = true;
            state.hasScrollableOverflowY = true;
          }
        }

        // Check for scrollbar-gutter property
        if (prop === 'scrollbar-gutter') {
          state.hasScrollbarGutter = true;
        }
      });

      if (
        checkX &&
        state.hasScrollableOverflowX &&
        !state.hasScrollbarGutter &&
        state.overflowNode
      ) {
        report({
          message: messages.rejected(ruleNode.selector),
          node: state.overflowNode,
          result,
          ruleName: name,
          severity: xSeverity,
          word: ruleNode.selector,
        });

        return;
      }

      if (
        checkY &&
        state.hasScrollableOverflowY &&
        !state.hasScrollbarGutter &&
        state.overflowNode
      ) {
        report({
          message: messages.rejected(ruleNode.selector),
          node: state.overflowNode,
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
