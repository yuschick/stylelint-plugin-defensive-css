import stylelint from 'stylelint';
import { ruleMessages, ruleName } from '../base.js';
import { isValueInvalidForLineNames, tokenizeGridColumns } from './utils.js';

export function gridLineNames({ decl, options, result }) {
  const opt = options['grid-line-names'];
  let validateColumns = false;
  let validateRows = false;

  if (opt === true) {
    validateColumns = validateRows = true;
  } else if (Array.isArray(opt)) {
    const cfg = opt[1] || {};
    validateColumns = cfg.columns !== false;
    validateRows = cfg.rows !== false;
  } else if (typeof opt === 'object') {
    validateColumns = opt.columns !== false;
    validateRows = opt.rows !== false;
  } else {
    // unknown shape — skip
    return;
  }

  // Determine which declarations to validate
  if (decl.prop === 'grid-template-columns' && validateColumns) {
    if (isValueInvalidForLineNames(decl.value)) {
      stylelint.utils.report({
        message: ruleMessages.gridLineNames(),
        node: decl,
        result,
        ruleName,
      });
    }
  }

  if (decl.prop === 'grid-template-rows' && validateRows) {
    if (isValueInvalidForLineNames(decl.value)) {
      stylelint.utils.report({
        message: ruleMessages.gridLineNames(),
        node: decl,
        result,
        ruleName,
      });
    }
  }

  if (decl.prop === 'grid') {
    if (!validateColumns && !validateRows) return;

    const value = decl.value;
    const slashIndex = value.indexOf('/');

    // If there's no slash we can't reliably extract rows/columns
    if (slashIndex === -1) return;

    const rowsValue = value.slice(0, slashIndex).trim();
    const colsValue = value.slice(slashIndex + 1).trim();

    let invalidRows = false;
    let invalidCols = false;

    if (validateRows) {
      const rowTokens = tokenizeGridColumns(rowsValue || '');
      const skipRowsValidation =
        rowTokens.length === 1 &&
        !/^\[[^\]]+\]$/.test(rowTokens[0]) &&
        !/repeat\s*\(/i.test(rowTokens[0]);

      if (!skipRowsValidation && isValueInvalidForLineNames(rowsValue)) {
        invalidRows = true;
      }
    }

    if (validateColumns) {
      if (isValueInvalidForLineNames(colsValue)) {
        invalidCols = true;
      }
    }

    if (invalidRows || invalidCols) {
      stylelint.utils.report({
        message: ruleMessages.gridLineNames(),
        node: decl,
        result,
        ruleName,
      });
    }
  }
}
