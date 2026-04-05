/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require a fallback value for custom properties.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import { cssSystemFonts, webSafeFonts } from './utils';
import { severityOption, SeverityProps } from '../../utils/types';
import { matchesIgnorePattern } from '../../utils/ignore';
import { globalKeywords } from '../../utils/css';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  ignore?: (string | RegExp)[];
  strict?: boolean;
}

export const requireSystemFontFallback: Rule = (
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
          strict: [true, false],
          ...severityOption,
        },
      },
    );

    if (!validOptions) return;

    const { ignore = [], strict, severity } = secondaryOptions;

    root.walkDecls(/^font(?:-family)?$/, (decl) => {
      if (globalKeywords.includes(decl.value.trim())) {
        return;
      }

      const values =
        decl.value.match(/(?:[^\s"'`]|["'`][^"'`]*["'`])+/g)?.reverse() || [];

      let hasSystemFallback = false;
      let hasWebSafeFallback = false;

      for (const value of values) {
        for (const val of value.split(',')) {
          if (matchesIgnorePattern(val, ignore)) {
            return;
          }

          if (!hasSystemFallback) {
            hasSystemFallback = cssSystemFonts.has(val);
          }

          if (!hasWebSafeFallback) {
            hasWebSafeFallback = webSafeFonts.has(val);
          }
        }
      }

      // Strict mode requires a CSS system font fallback for maximum support
      if (strict && !hasSystemFallback) {
        report({
          message: messages.strictReject(decl.value),
          node: decl,
          result,
          ruleName: name,
          severity,
        });
      }

      // Loose mode requires either a web safe or CSS system font fallback
      if (!strict && !hasWebSafeFallback && !hasSystemFallback) {
        report({
          message: messages.looseReject(decl.value),
          node: decl,
          result,
          ruleName: name,
          severity,
        });
      }
    });
  };
};

requireSystemFontFallback.ruleName = name;
requireSystemFontFallback.messages = messages;
requireSystemFontFallback.meta = meta;
