/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require animations and transitions to respect prefers-reduced-motion.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import {
  isInstantValue,
  isInsidePrefersReducedMotion,
  motionProperties,
  hasMotionBackgroundAttachment,
  getInvalidTransitionProperties,
  isInsidePrefersReducedMotionReduce,
} from './utils';
import { severityOption, SeverityProps } from '../../utils/types';
import { PropertiesHyphen } from 'csstype';

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
      // Check if already inside prefers-reduced-motion media query
      if (
        isInsidePrefersReducedMotion(decl) &&
        !isInsidePrefersReducedMotionReduce(decl)
      ) {
        return;
      }

      const { prop, value } = decl;
      let message;

      /* Check against @view-transitions */
      if (decl.parent?.type === 'atrule' && decl.parent.name === 'view-transition') {
        if (prop === 'navigation' && value !== 'none') {
          report({
            message: messages.viewTransition(),
            node: decl,
            result,
            ruleName: name,
            severity,
          });
          return;
        }
      }

      if (!motionProperties.includes(prop as keyof PropertiesHyphen)) {
        return;
      }

      switch (prop) {
        case 'animation': {
          if (value !== 'none' && !isInstantValue(value)) {
            message = messages.animation();
          }
          break;
        }
        case 'animation-duration': {
          if (!isInstantValue(value)) {
            message = messages.animationDuration();
          }
          break;
        }
        case 'background':
        case 'background-attachment': {
          if (hasMotionBackgroundAttachment(value)) {
            message = messages.backgroundAttachment();
          }
          break;
        }
        case 'scroll-behavior': {
          if (value === 'smooth') {
            message = messages.scrollBehavior();
          }
          break;
        }
        case 'transition': {
          const invalidTransitionProperties = getInvalidTransitionProperties(value);

          if (invalidTransitionProperties.length > 0) {
            message = messages.transition(invalidTransitionProperties.join(', '));
          }
          break;
        }
        case 'view-transition-name':
          if (value !== 'none') {
            message = messages.viewTransition();
          }
          break;
      }

      if (!message) return;

      report({
        message,
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
