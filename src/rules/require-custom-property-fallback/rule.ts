/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require a fallback value for custom properties.
 * @license MIT
 */

import type { Rule } from 'stylelint';
import stylelint from 'stylelint';

import { matchesIgnorePattern } from '@package-utils/ignore';
import type { SeverityProps } from '@package-utils/types';
import { severityOption } from '@package-utils/types';

import { messages, meta, name } from './meta';
import { findCustomPropertiesWithoutFallback } from './utils';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  ignore?: (string | RegExp)[];
}

export const requireCustomPropertyFallback: Rule = (
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

    if (!validOptions) {
      return;
    }

    const { severity } = secondaryOptions;

    const ignorePatterns = secondaryOptions.ignore || [];

    root.walkDecls((decl) => {
      const propertiesWithoutFallback = findCustomPropertiesWithoutFallback(
        decl.value,
      );

      if (propertiesWithoutFallback.length === 0) {
        return;
      }

      const violatingProperties = propertiesWithoutFallback.filter(
        (property) => {
          return !matchesIgnorePattern({
            patterns: ignorePatterns,
            value: property,
          });
        },
      );

      violatingProperties.forEach((property) => {
        report({
          message: messages.rejected(property),
          node: decl,
          result,
          ruleName: name,
          severity,
          word: property,
        });
      });
    });
  };
};

requireCustomPropertyFallback.ruleName = name;
requireCustomPropertyFallback.messages = messages;
requireCustomPropertyFallback.meta = meta;
