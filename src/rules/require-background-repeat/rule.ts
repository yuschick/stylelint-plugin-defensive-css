/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require explicit background-repeat and/or mask-repeat property when using background and mask shorthands.
 * @license MIT
 */

import stylelint, { Rule, Severity } from 'stylelint';
import { messages, meta, name } from './meta';
import { findShorthandRepeat, hasUrlValue } from './utils';
import { SeverityProps } from '../../utils/types';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  'background-repeat'?: boolean | [boolean, SeverityProps];
  'mask-repeat'?: boolean | [boolean, SeverityProps];
}

export const requireBackgroundRepeat: Rule = (
  primaryOption,
  secondaryOptions: SecondaryOptions = {},
) => {
  return (root, result) => {
    const validOptions = validateOptions(result, name, {
      actual: primaryOption,
      possible: [true, false],
    });

    if (!validOptions) return;

    // Default both to true
    const checkBackgroundRepeat = secondaryOptions['background-repeat'] !== false;
    const checkMaskRepeat = secondaryOptions['mask-repeat'] !== false;

    if (!checkBackgroundRepeat && !checkMaskRepeat) {
      return;
    }

    const { severity } = secondaryOptions;
    const backgroundRepeatSeverity: Severity | undefined = checkBackgroundRepeat
      ? Array.isArray(secondaryOptions['background-repeat'])
        ? secondaryOptions['background-repeat'][1].severity
        : severity
      : 'error';
    const maskRepeatSeverity: Severity | undefined = checkMaskRepeat
      ? Array.isArray(secondaryOptions['mask-repeat'])
        ? secondaryOptions['mask-repeat'][1].severity
        : severity
      : 'error';

    root.walkRules((ruleNode) => {
      const { selector } = ruleNode;
      const declMap = {
        backgroundImageNode: null,
        hasBackgroundImage: false,
        hasBackgroundRepeat: false,
        hasMaskImage: false,
        hasMaskRepeat: false,
        maskImageNode: null,
      };

      // FIRST: Walk through ALL declarations to collect state
      ruleNode.walkDecls((decl) => {
        const { prop, value } = decl;

        if (checkBackgroundRepeat) {
          // Check for background-image or background shorthand
          if (
            prop === 'background-image' ||
            (prop === 'background' && hasUrlValue(value))
          ) {
            declMap.hasBackgroundImage = true;

            // Check if shorthand includes repeat
            if (prop === 'background' && findShorthandRepeat(value)) {
              declMap.hasBackgroundRepeat = true;
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              declMap.backgroundImageNode = decl as any;
            }
          }

          // Explicit repeat property
          if (prop === 'background-repeat') {
            declMap.hasBackgroundRepeat = true;
          }
        }

        if (checkMaskRepeat) {
          // Check for mask-image or mask shorthand
          if (prop === 'mask-image' || (prop === 'mask' && hasUrlValue(value))) {
            declMap.hasMaskImage = true;

            // Check if shorthand includes repeat
            if (prop === 'mask' && findShorthandRepeat(value)) {
              declMap.hasMaskRepeat = true;
            } else {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              declMap.maskImageNode = decl as any;
            }
          }

          // Explicit repeat property
          if (prop === 'mask-repeat') {
            declMap.hasMaskRepeat = true;
          }
        }
      });

      if (
        checkBackgroundRepeat &&
        declMap.hasBackgroundImage &&
        !declMap.hasBackgroundRepeat &&
        declMap.backgroundImageNode
      ) {
        report({
          message: messages.rejectedBackground(selector),
          node: declMap.backgroundImageNode,
          result,
          ruleName: name,
          severity: backgroundRepeatSeverity,
          word: selector,
        });
      }

      if (
        checkMaskRepeat &&
        declMap.hasMaskImage &&
        !declMap.hasMaskRepeat &&
        declMap.maskImageNode
      ) {
        report({
          message: messages.rejectedMask(selector),
          node: declMap.maskImageNode,
          result,
          ruleName: name,
          severity: maskRepeatSeverity,
          word: selector,
        });
      }
    });
  };
};

requireBackgroundRepeat.ruleName = name;
requireBackgroundRepeat.messages = messages;
requireBackgroundRepeat.meta = meta;
