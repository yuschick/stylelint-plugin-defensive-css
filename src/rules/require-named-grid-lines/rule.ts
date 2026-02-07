/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require named grid lines in grid templates.
 * @license MIT
 */

import stylelint, { Rule, Severity } from 'stylelint';
import { messages, meta, name } from './meta';
import {
  isValueInvalidForLineNames,
  parseGridShorthand,
  shouldSkipRowsValidation,
} from './utils';
import { SeverityProps } from '../../utils/types';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  columns?: boolean | [boolean, SeverityProps];
  rows?: boolean | [boolean, SeverityProps];
}

export const requireNamedGridLines: Rule = (
  primaryOption,
  secondaryOptions: SecondaryOptions = {},
) => {
  return (root, result) => {
    const validOptions = validateOptions(result, name, {
      actual: primaryOption,
      possible: [true, false],
    });

    if (!validOptions) return;

    // Default both to true
    const validateColumns = secondaryOptions.columns !== false;
    const validateRows = secondaryOptions.rows !== false;

    // If both are disabled, nothing to check
    if (!validateColumns && !validateRows) return;

    const { severity } = secondaryOptions;
    const columnsSeverity: Severity | undefined = Array.isArray(secondaryOptions.columns)
      ? secondaryOptions.columns[1].severity
      : severity;
    const rowsSeverity: Severity | undefined = Array.isArray(secondaryOptions.rows)
      ? secondaryOptions.rows[1].severity
      : severity;

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
            severity: columnsSeverity,
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
            severity: rowsSeverity,
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
