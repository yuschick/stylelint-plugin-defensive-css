/**
 * @author Daniel Yuschick
 * @fileoverview Rule to prevent list-style: none which removes list semantics in Safari.
 * @license MIT
 */

import type { Rule } from 'stylelint';
import stylelint from 'stylelint';

import { hasMatchingAncestor } from '@package-utils/traversal';
import type { FixProps, SeverityProps } from '@package-utils/types';
import { fixOption, severityOption } from '@package-utils/types';

import { messages, meta, name } from './meta';
import { isNavSelector, isListStyleNone, listStyleProperties } from './utils';

const { report, validateOptions } = stylelint.utils;

export const noListStyleNone: Rule = (
  primaryOption,
  secondaryOptions: SeverityProps & FixProps = {},
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
        possible: { ...severityOption, ...fixOption },
      },
    );

    if (!validOptions) {
      return;
    }

    const { severity } = secondaryOptions;

    root.walkRules((ruleNode) => {
      const { selector } = ruleNode;

      const isWrappedInNavSelector =
        isNavSelector(selector) ||
        hasMatchingAncestor({
          node: ruleNode,
          predicate: (ancestor) =>
            ancestor.type === 'rule' && isNavSelector(ancestor.selector),
        });

      ruleNode.walkDecls(/^list-style(?:-type)?$/, (decl) => {
        if (isWrappedInNavSelector) {
          return;
        }

        if (decl.parent !== ruleNode) {
          return;
        }

        // Skip if the value doesn't resolve to 'none'
        if (!isListStyleNone(decl.value)) {
          return;
        }

        const fix = () => {
          if (decl.prop === listStyleProperties.listStyle) {
            decl.value = decl.value.replace(/none/gi, '""');
            return;
          }

          if (decl.prop === listStyleProperties.listStyleType) {
            decl.value = '""';
            return;
          }
        };

        report({
          fix,
          message: messages.rejected(selector),
          node: decl,
          result,
          ruleName: name,
          severity,
          word: selector,
        });
      });
    });
  };
};

noListStyleNone.ruleName = name;
noListStyleNone.messages = messages;
noListStyleNone.meta = meta;
