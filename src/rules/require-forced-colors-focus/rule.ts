/**
 * @author Daniel Yuschick
 * @fileoverview Rule to detect when unsafe box-shadows are used as focus outlines
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import { severityOption } from '../../utils/types';
import {
  isOutsideForcedColorsMode,
  outlineProperties,
  checkForRemovalValue,
  borderPatterns,
} from './utils';
import { PropertiesHyphen } from 'csstype';

const { report, validateOptions } = stylelint.utils;

export const requireForcedColorsFocus: Rule = (primaryOption, secondaryOptions = {}) => {
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
        },
      },
    );

    if (!validOptions) return;

    const { severity } = secondaryOptions;

    let hasVisibleOutline = true;
    let hasVisibleBoxShadowIndicator = false;
    let hasVisibleBorderIndicator = false;

    root.walkRules((ruleNode) => {
      // Reset state for top-level rules to prevent leaking across independent selectors
      if (ruleNode.parent?.type !== 'rule') {
        hasVisibleOutline = true;
      }

      // Reset focus-specific indicators for each rule to prevent leaking to siblings/children
      hasVisibleBoxShadowIndicator = false;
      hasVisibleBorderIndicator = false;

      const isOutsideForcedColors = isOutsideForcedColorsMode(ruleNode);

      /**
       * If we are explicitly outside of forced colors mode, return early
       * e.g.: media (forced-color: none) or media not (forced-color: active)
       *
       * There's no need reviewing the ruleNode's declarations
       */
      if (isOutsideForcedColors) {
        return;
      }

      /**
       * Check if this rule's selector targets a focused element directly.
       * Matches :focus and :focus-visible but NOT when
       * followed by descendant/child/sibling combinators (e.g. .btn:focus > .icon)
       */
      const isFocusSelector = /:focus(-visible)?(?=[,:]|$)/.test(ruleNode.selector);

      ruleNode.walkDecls((decl) => {
        if (outlineProperties.has(decl.prop as keyof PropertiesHyphen)) {
          // Check if the value is a simple removal like 'none' or 0
          hasVisibleOutline = !checkForRemovalValue(decl.value);

          // Check if outline shorthand has a negative-like value
          if (decl.prop === 'outline') {
            const parts = decl.value.split(' ');

            for (const part of parts) {
              if (checkForRemovalValue(part)) {
                hasVisibleOutline = false;
              }
            }
          }
        }

        if (isFocusSelector && !hasVisibleOutline) {
          if (decl.prop === 'box-shadow' && !checkForRemovalValue(decl.value)) {
            hasVisibleBoxShadowIndicator = true;
          }

          if (
            borderPatterns.test(decl.prop) &&
            !checkForRemovalValue(decl.value) &&
            !decl.value.includes('transparent')
          ) {
            hasVisibleBorderIndicator = true;
          }
        }
      });

      if (
        isFocusSelector &&
        hasVisibleBoxShadowIndicator &&
        !hasVisibleOutline &&
        !hasVisibleBorderIndicator
      ) {
        report({
          message: messages.rejected(ruleNode.selector),
          node: ruleNode,
          result,
          ruleName: name,
          severity,
        });
      }
    });
  };
};

requireForcedColorsFocus.ruleName = name;
requireForcedColorsFocus.messages = messages;
requireForcedColorsFocus.meta = meta;
