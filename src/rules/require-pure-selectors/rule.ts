/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require pure selectors in CSS to avoid coupling styles to HTML structure.
 * @license MIT
 */

import type { Rule } from 'stylelint';
import stylelint from 'stylelint';

import { hasMatchingAncestor } from '@package-utils/traversal';
import type { SeverityProps } from '@package-utils/types';
import { severityOption } from '@package-utils/types';

import { messages, meta, name } from './meta';
import { findImpureElement } from './utils';

const { report, validateOptions } = stylelint.utils;

export interface SecondaryOptions extends SeverityProps {
  ignoreAttributeModifiers?: boolean;
  /**
   * @deprecated Use the 'ignoreAttributeModifiers' prop instead.
   * The 'ignoreAttributeSelectors' prop will be removed in the next major release.
   */
  ignoreAttributeSelectors?: boolean;
  ignoreElements?: (keyof HTMLElementTagNameMap)[];
  strict?: boolean;
}

export const requirePureSelectors: Rule = (
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
        possible: {
          ...severityOption,
          ignoreAttributeModifiers: [true, false],
          ignoreAttributeSelectors: [true, false],
          ignoreElements: [(value: unknown) => typeof value === 'string'],
          strict: [true, false],
        },
      },
    );

    if (!validOptions) {
      return;
    }

    const { severity } = secondaryOptions;

    root.walkRules((ruleNode) => {
      const { selector } = ruleNode;

      const impureNode = findImpureElement({
        options: secondaryOptions,
        selector: selector,
      });

      if (impureNode) {
        const usesNestingSelector = /&/.test(selector);

        const shouldSkip = hasMatchingAncestor({
          node: ruleNode,
          predicate: (ancestor) => {
            if (ancestor.type === 'atrule' && ancestor.name === 'keyframes') {
              return true;
            }

            return (
              usesNestingSelector &&
              ancestor.type === 'rule' &&
              !findImpureElement({
                options: secondaryOptions,
                selector: ancestor.selector,
              })
            );
          },
        });

        if (shouldSkip) {
          return;
        }

        const hasNestedAttributeModifier =
          secondaryOptions.ignoreAttributeModifiers &&
          ruleNode.some(
            (child) => child.type === 'rule' && /^&\[/.test(child.selector),
          );

        if (hasNestedAttributeModifier) {
          return;
        }

        report({
          message: messages.rejected(selector),
          node: ruleNode,
          result,
          ruleName: name,
          severity,
          word: impureNode.value,
        });
      }
    });
  };
};

requirePureSelectors.ruleName = name;
requirePureSelectors.messages = messages;
requirePureSelectors.meta = meta;
