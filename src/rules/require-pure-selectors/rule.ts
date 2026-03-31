/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require pure selectors in CSS to avoid coupling styles to HTML structure.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import { severityOption, SeverityProps } from '../../utils/types';
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

    if (!validOptions) return;

    const { severity } = secondaryOptions;

    root.walkRules((ruleNode) => {
      const { selector } = ruleNode;

      const impureNode = findImpureElement(selector, secondaryOptions);

      if (impureNode) {
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
