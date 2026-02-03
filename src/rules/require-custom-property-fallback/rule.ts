/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require a fallback value for custom properties.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import { findCustomPropertiesWithoutFallback, matchesIgnorePattern } from './utils';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions {
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
        },
      },
    );

    if (!validOptions) return;

    const ignorePatterns = secondaryOptions.ignore || [];

    root.walkDecls((decl) => {
      const propertiesWithoutFallback = findCustomPropertiesWithoutFallback(decl.value);

      if (propertiesWithoutFallback.length === 0) return;

      const violatingProperties = propertiesWithoutFallback.filter((property) => {
        return !matchesIgnorePattern(property, ignorePatterns);
      });

      violatingProperties.forEach((property) => {
        report({
          message: messages.rejected(property),
          node: decl,
          result,
          ruleName: name,
          word: property,
        });
      });
    });
  };
};

requireCustomPropertyFallback.ruleName = name;
requireCustomPropertyFallback.messages = messages;
requireCustomPropertyFallback.meta = meta;
