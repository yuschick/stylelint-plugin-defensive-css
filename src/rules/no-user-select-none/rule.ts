/**
 * @author Daniel Yuschick
 * @fileoverview Rule to prevent user-select: none which can negatively impact usability and accessibility.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import { severityOption, SeverityProps } from '../../utils/types';
import { matchesIgnorePattern } from '../../utils/ignore';
import { hasMatchingAncestor } from '../../utils/traversal';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  ignore?: (string | RegExp)[];
}

export const noUserSelectNone: Rule = (
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
          ignore: [
            (value: unknown) => {
              return typeof value === 'string' || value instanceof RegExp;
            },
          ],
          ...severityOption,
        },
      },
    );

    if (!validOptions) return;

    const { ignore = [], severity } = secondaryOptions;

    root.walkDecls(/^(-(webkit|moz)-)?user-select$/, (decl) => {
      if (decl.value !== 'none') {
        return;
      }

      if (
        hasMatchingAncestor(decl, (ancestor) => {
          return (
            ancestor.type === 'rule' && matchesIgnorePattern(ancestor.selector, ignore)
          );
        })
      ) {
        return;
      }

      report({
        message: messages.rejected(),
        node: decl,
        result,
        ruleName: name,
        severity,
      });
    });
  };
};

noUserSelectNone.ruleName = name;
noUserSelectNone.messages = messages;
noUserSelectNone.meta = meta;
