/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require animations and transitions to respect prefers-reduced-motion.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import {
  isAnimationProperty,
  isInstantValue,
  isInsidePrefersReducedMotion,
  isInsidePrefersReducedMotionReduce,
} from './utils';

const { report, validateOptions } = stylelint.utils;

export const requirePrefersReducedMotion: Rule = (primaryOption) => {
  return (root, result) => {
    const validOptions = validateOptions(result, name, {
      actual: primaryOption,
      possible: [true, false],
    });

    if (!validOptions) return;

    root.walkDecls((decl) => {
      const { prop, value } = decl;

      // Only check animation/transition properties
      if (!isAnimationProperty(prop)) {
        return;
      }

      // Allow instant/no animations (0s, none)
      if (isInstantValue(value)) {
        return;
      }

      // REJECT: Animations inside prefers-reduced-motion: reduce
      if (isInsidePrefersReducedMotionReduce(decl)) {
        report({
          message: messages.rejected(prop),
          node: decl,
          result,
          ruleName: name,
        });
        return;
      }

      // Check if already inside prefers-reduced-motion media query
      if (isInsidePrefersReducedMotion(decl)) {
        return;
      }

      // Report violation
      report({
        message: messages.rejected(prop),
        node: decl,
        result,
        ruleName: name,
      });
    });
  };
};

requirePrefersReducedMotion.ruleName = name;
requirePrefersReducedMotion.messages = messages;
requirePrefersReducedMotion.meta = meta;
