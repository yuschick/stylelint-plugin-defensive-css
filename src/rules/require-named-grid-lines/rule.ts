/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require named grid lines in grid templates.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import {
  isValueInvalidForLineNames,
  parseGridShorthand,
  shouldSkipRowsValidation,
} from './utils';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions {
  columns?: boolean;
  rows?: boolean;
}

export const requireNamedGridLines: Rule = (
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
          columns: [(value: unknown) => typeof value === 'boolean'],
          rows: [(value: unknown) => typeof value === 'boolean'],
        },
      },
    );

    if (!validOptions) return;

    // Default both to true
    const validateColumns = secondaryOptions.columns !== false;
    const validateRows = secondaryOptions.rows !== false;

    // If both are disabled, nothing to check
    if (!validateColumns && !validateRows) return;

    root.walkDecls((decl) => {
      const { prop, value } = decl;

      // Check grid-template-columns
      if (prop === 'grid-template-columns' && validateColumns) {
        if (isValueInvalidForLineNames(value)) {
          report({
            message: messages.rejected(decl.prop + ': ' + decl.value),
            node: decl,
            result,
            ruleName: name,
            word: decl.value,
          });
        }
        return;
      }

      // Check grid-template-rows
      if (prop === 'grid-template-rows' && validateRows) {
        if (isValueInvalidForLineNames(value)) {
          report({
            message: messages.rejected(decl.prop + ': ' + decl.value),
            node: decl,
            result,
            ruleName: name,
            word: decl.value,
          });
        }
        return;
      }

      // Check grid shorthand
      if (prop === 'grid') {
        const parsed = parseGridShorthand(value);

        if (!parsed) return;

        const { rows: rowsValue, columns: colsValue } = parsed;
        let invalidRows = false;
        let invalidCols = false;

        // Validate rows
        if (validateRows) {
          const skipRowsValidation = shouldSkipRowsValidation(rowsValue);

          if (!skipRowsValidation && isValueInvalidForLineNames(rowsValue)) {
            invalidRows = true;
          }
        }

        // Validate columns
        if (validateColumns && isValueInvalidForLineNames(colsValue)) {
          invalidCols = true;
        }

        // Report if either is invalid
        if (invalidRows || invalidCols) {
          report({
            message: messages.rejected(decl.prop + ': ' + decl.value),
            node: decl,
            result,
            ruleName: name,
            word: decl.value,
          });
        }
      }
    });
  };
};

requireNamedGridLines.ruleName = name;
requireNamedGridLines.messages = messages;
requireNamedGridLines.meta = meta;
