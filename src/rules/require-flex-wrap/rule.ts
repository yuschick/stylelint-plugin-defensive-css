/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require explicit flex-wrap declaration for flex containers.
 * @license MIT
 */

import type { Declaration } from 'postcss';
import type { Rule } from 'stylelint';
import stylelint from 'stylelint';

import type { SeverityProps } from '@package-utils/types';
import { severityOption } from '@package-utils/types';

import { messages, meta, name } from './meta';
import { hasWrapValue, isColumnDirection, isFlexDisplay } from './utils';

const { report, validateOptions } = stylelint.utils;

export const requireFlexWrap: Rule = (
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

    if (!validOptions) {
      return;
    }

    const { severity } = secondaryOptions;

    root.walkRules((ruleNode) => {
      const { selector } = ruleNode;
      const state: {
        displayNode?: Declaration;
        hasFlexWrap: boolean;
        isDisplayFlex: boolean;
        isFlexColumn: boolean;
      } = { hasFlexWrap: false, isDisplayFlex: false, isFlexColumn: false };

      // Collect all declarations in this rule
      ruleNode.walkDecls((decl) => {
        const { prop, value } = decl;

        // Check for display: flex
        if (prop === 'display' && isFlexDisplay(value)) {
          state.isDisplayFlex = true;
          state.displayNode = decl;
        }

        // Check for flex-direction: column
        if (prop === 'flex-direction' && isColumnDirection(value)) {
          state.isFlexColumn = true;
        }

        // Check for flex-flow (can set both direction and wrap)
        if (prop === 'flex-flow') {
          if (isColumnDirection(value)) {
            state.isFlexColumn = true;
          }
          if (hasWrapValue(value)) {
            state.hasFlexWrap = true;
          }
        }

        // Check for explicit flex-wrap
        if (prop === 'flex-wrap') {
          state.hasFlexWrap = true;
        }
      });

      if (
        state.isDisplayFlex &&
        !state.hasFlexWrap &&
        !state.isFlexColumn &&
        state.displayNode
      ) {
        report({
          message: messages.rejected(selector),
          node: state.displayNode,
          result,
          ruleName: name,
          severity,
          word: selector,
        });
      }
    });
  };
};

requireFlexWrap.ruleName = name;
requireFlexWrap.messages = messages;
requireFlexWrap.meta = meta;
