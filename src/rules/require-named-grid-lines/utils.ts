/**
 * Tokenize grid template value by splitting on whitespace outside of functions and brackets
 */
export function tokenizeGridValue(value: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let depth = 0;
  let inBrackets = false;

  for (let i = 0; i < value.length; i++) {
    const char = value[i];

    if (char === '(') {
      depth++;
      current += char;
    } else if (char === ')') {
      depth--;
      current += char;
    } else if (char === '[') {
      inBrackets = true;
      current += char;
    } else if (char === ']') {
      inBrackets = false;
      current += char;
    } else if (char === ' ' && depth === 0 && !inBrackets) {
      if (current.trim()) {
        tokens.push(current.trim());
        current = '';
      }
    } else {
      current += char;
    }
  }

  if (current.trim()) {
    tokens.push(current.trim());
  }

  return tokens;
}

/**
 * Check if a repeat() function contains named lines
 */
function hasNamedLinesInRepeat(repeatValue: string): boolean {
  // Extract content inside repeat()
  const match = repeatValue.match(/repeat\s*\(\s*[^,]+,\s*(.+)\s*\)/i);
  if (!match) return false;

  const content = match[1];
  // Check if the content has at least one named line
  return /\[[^\]]+\]/.test(content);
}

/**
 * Check if a grid value is missing line names
 * A value is invalid if it contains track sizes without corresponding line names
 */
export function isValueInvalidForLineNames(value: string): boolean {
  if (!value || value.trim() === '') return false;

  const tokens = tokenizeGridValue(value);

  // If there are no tokens, nothing to validate
  if (tokens.length === 0) return false;

  // Check each token
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    const isLineName = /^\[[^\]]+\]$/.test(token);
    const isRepeat = /^repeat\s*\(/i.test(token);

    if (isRepeat) {
      // Check if repeat has named lines inside it
      if (!hasNamedLinesInRepeat(token)) {
        return true; // Invalid - repeat without named lines
      }
    } else if (!isLineName) {
      // This is a track size - check if previous token was a line name
      if (i === 0) {
        return true; // Invalid - first token is a track without a preceding line name
      }

      const previousToken = tokens[i - 1];
      const previousWasLineName = /^\[[^\]]+\]$/.test(previousToken);

      if (!previousWasLineName) {
        return true; // Invalid - track without preceding line name
      }
    }
  }

  return false;
}

/**
 * Parse grid shorthand to extract rows and columns values
 */
export function parseGridShorthand(value: string): {
  columns: string;
  rows: string;
} | null {
  const slashIndex = value.indexOf('/');

  if (slashIndex === -1) return null;

  return {
    columns: value.slice(slashIndex + 1).trim(),
    rows: value.slice(0, slashIndex).trim(),
  };
}

/**
 * Check if rows value should skip validation (e.g., single keyword value)
 */
export function shouldSkipRowsValidation(rowsValue: string): boolean {
  const tokens = tokenizeGridValue(rowsValue);

  return (
    tokens.length === 1 &&
    !/^\[[^\]]+\]$/.test(tokens[0]) &&
    !/repeat\s*\(/i.test(tokens[0])
  );
}
