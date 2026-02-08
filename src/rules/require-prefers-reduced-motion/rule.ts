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
import { severityOption, SeverityProps } from '../../utils/types';

const { report, validateOptions } = stylelint.utils;

export const requirePrefersReducedMotion: Rule = (
  primaryOption,
  secondaryOptions: SeverityProps = {},
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
        possible: severityOption,
      },
    );

    if (!validOptions) return;

    const { severity } = secondaryOptions;

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
          severity,
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
        severity,
      });
    });
  };
};

requirePrefersReducedMotion.ruleName = name;
requirePrefersReducedMotion.messages = messages;
requirePrefersReducedMotion.meta = meta;
