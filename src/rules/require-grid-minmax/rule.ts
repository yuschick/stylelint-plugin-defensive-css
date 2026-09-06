/**
 * @author Daniel Yuschick
 * @fileoverview Rule to help prevent grid content blowouts by enforcing the use of minmax() for '1fr' values.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import { fixOption, FixProps, severityOption, SeverityProps } from '../../utils/types';
import { matchesIgnorePattern } from '../../utils/ignore';
import { hasMatchingAncestor } from '../../utils/traversal';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps, FixProps {
  ignore?: (string | RegExp)[];
}

export const requireGridMinmax: Rule = (
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
          ...fixOption,
        },
      },
    );

    if (!validOptions) return;

    const { ignore = [], severity } = secondaryOptions;

    root.walkDecls(/grid-template-columns|grid-auto-columns/, (decl) => {
      /* Skip the declaration if any ancestor selector should be ignored */
      if (
        hasMatchingAncestor(decl, (ancestor) => {
          return (
            ancestor.type === 'rule' && matchesIgnorePattern(ancestor.selector, ignore)
          );
        })
      ) {
        return;
      }

      /* Skip is the value is 'subgrid' */
      if (decl.value === 'subgrid') {
        return;
      }

      /* Strip out any minmax() or fit-content() functions so their '1fr' values are ignored */
      const protectedFunctionPattern = /\b(minmax|fit-content)\((?:[^()]|\([^()]*\))*\)/g;
      const unprotectedValue = decl.value.replace(protectedFunctionPattern, '');

      /* If no raw '1fr' values remain outside of those functions, return early */
      if (!unprotectedValue.includes('1fr')) {
        return;
      }

      /* A raw '1fr' value has been found, report and fix only the unprotected values */
      const fix = () => {
        decl.value = decl.value.replace(
          /\b(minmax|fit-content)\((?:[^()]|\([^()]*\))*\)|1fr/g,
          (match) => (match === '1fr' ? 'minmax(0, 1fr)' : match),
        );
      };

      report({
        fix,
        message: messages.rejected(),
        node: decl,
        result,
        ruleName: name,
        severity,
      });
    });
  };
};

requireGridMinmax.ruleName = name;
requireGridMinmax.messages = messages;
requireGridMinmax.meta = meta;
