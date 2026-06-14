export const webSafeFonts = new Set([
  'Arial',
  'Brush Script MT',
  'Courier New',
  'Garamond',
  'Georgia',
  'Helvetica',
  'Tahoma',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
]);

const VAR_FUNCTION_START = 'var(';

/**
 * Determines whether a declaration value is composed entirely of `var(...)`
 * references (optionally separated by commas). Since the plugin does not
 * resolve custom properties, such values cannot be validated and should be
 * skipped instead of reported as missing a fallback.
 */
export function isOnlyVarReferences(value: string): boolean {
  const lower = value.toLowerCase();
  let remainder = '';
  let index = 0;

  while (index < value.length) {
    const isVarStart =
      lower.startsWith(VAR_FUNCTION_START, index) &&
      !/[a-z0-9-]/i.test(value[index - 1] ?? '');

    if (isVarStart) {
      let depth = 0;
      let cursor = index + VAR_FUNCTION_START.length - 1; // points at the '('
      let isClosed = false;

      for (; cursor < value.length; cursor++) {
        if (value[cursor] === '(') {
          depth++;
        } else if (value[cursor] === ')') {
          depth--;
          if (depth === 0) {
            cursor++;
            isClosed = true;
            break;
          }
        }
      }

      if (!isClosed) {
        return false;
      }

      index = cursor;
      continue;
    }

    remainder += value[index];
    index++;
  }

  return value.trim().length > 0 && /^[\s,]*$/.test(remainder);
}

export const cssSystemFonts = new Set([
  '-moz-button',
  '-moz-desktop',
  '-moz-dialog',
  '-moz-document',
  '-moz-field',
  '-moz-info',
  '-moz-list',
  '-moz-pull-down-menu',
  '-moz-window',
  'caption',
  'cursive',
  'emoji',
  'fangsong',
  'fantasy',
  'icon',
  'math',
  'message-box',
  'menu',
  'monospace',
  'sans-serif',
  'serif',
  'small-caption',
  'status-bar',
  'system-ui',
  'ui-monospace',
  'ui-rounded',
  'ui-sans-serif',
  'ui-serif',
]);
