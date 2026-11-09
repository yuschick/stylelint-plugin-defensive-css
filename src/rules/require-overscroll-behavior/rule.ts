/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require overscroll-behavior property when using scrollable overflow to prevent accidental scroll chaining.
 * @license MIT
 */

import type { Declaration } from 'postcss';
import type { Rule, Severity } from 'stylelint';
import stylelint from 'stylelint';

import type { SeverityProps } from '@package-utils/types';
import { severityOption } from '@package-utils/types';
import { validateBasicOption } from '@package-utils/validation';

import { messages, meta, name } from './meta';
import {
  getOverflowAxis,
  getOverscrollBehaviorAxis,
  isScrollableOverflow,
} from './utils';

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
        hasOverscrollBehaviorX: boolean;
        hasOverscrollBehaviorY: boolean;
        hasScrollableOverflowX: boolean;
        hasScrollableOverflowY: boolean;
        overflowNode?: Declaration;
      } = {
        hasOverscrollBehaviorX: false,
        hasOverscrollBehaviorY: false,
        hasScrollableOverflowX: false,
        hasScrollableOverflowY: false,
      };

      // Collect all declarations in this rule
      ruleNode.walkDecls((decl) => {
        const { prop, value } = decl;

        const overflowAxis = getOverflowAxis(prop);

        // Check for scrollable overflow properties
        if (overflowAxis && isScrollableOverflow(value)) {
          state.overflowNode = decl;

          if (overflowAxis === 'x') {
            state.hasScrollableOverflowX = true;
          } else if (overflowAxis === 'y') {
            state.hasScrollableOverflowY = true;
          } else {
            state.hasScrollableOverflowX = true;
            state.hasScrollableOverflowY = true;
          }
        }

        // Check for overscroll-behavior properties
        const overscrollAxis = getOverscrollBehaviorAxis(prop);

        if (overscrollAxis) {
          if (overscrollAxis === 'x') {
            state.hasOverscrollBehaviorX = true;
          } else if (overscrollAxis === 'y') {
            state.hasOverscrollBehaviorY = true;
          } else {
            state.hasOverscrollBehaviorX = true;
            state.hasOverscrollBehaviorY = true;
          }
        }
      });

      if (
        checkX &&
        state.hasScrollableOverflowX &&
        !state.hasOverscrollBehaviorX &&
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
        !state.hasOverscrollBehaviorY &&
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

requireOverscrollBehavior.ruleName = name;
requireOverscrollBehavior.messages = messages;
requireOverscrollBehavior.meta = meta;
