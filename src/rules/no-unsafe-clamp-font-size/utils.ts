/**
 * Parse clamp() function arguments, handling nested functions in any argument
 * @param value - The declaration value to parse
 * @returns Tuple of [min, preferred, max] or null if not valid clamp()
 */
export const parseClampArguments = (value: string): [string, string, string] | null => {
  const clampFunctionPrefix = 'clamp(';
  const clampFunctionStartIndex = value.toLowerCase().indexOf(clampFunctionPrefix);

  if (clampFunctionStartIndex < 0) {
    return null;
  }

  const clampArgumentsStartIndex = clampFunctionStartIndex + clampFunctionPrefix.length;
  let nestedFunctionDepth = 0;
  let clampArgumentsEndIndex = clampArgumentsStartIndex;

  // Find the closing parenthesis for the outer clamp() call.
  for (let index = clampArgumentsStartIndex; index < value.length; index++) {
    if (value[index] === '(') {
      nestedFunctionDepth++;
    } else if (value[index] === ')' && nestedFunctionDepth === 0) {
      clampArgumentsEndIndex = index;
      break;
    } else if (value[index] === ')') {
      nestedFunctionDepth--;
    }
  }

  // Extract clamp() arguments and split only on top-level commas.
  const clampArgumentsText = value.slice(
    clampArgumentsStartIndex,
    clampArgumentsEndIndex,
  );
  const clampValues: string[] = [];
  let currentArgumentText = '';
  let nestedParenthesesDepth = 0;

  for (const char of clampArgumentsText) {
    if (char === '(') {
      nestedParenthesesDepth++;
    } else if (char === ')') {
      nestedParenthesesDepth--;
    } else if (char === ',' && nestedParenthesesDepth === 0) {
      clampValues.push(currentArgumentText.trim());
      currentArgumentText = '';
      continue;
    }

    currentArgumentText += char;
  }

  // Push remaining currentArgumentText as the max value from clamp()
  if (currentArgumentText.trim()) {
    clampValues.push(currentArgumentText.trim());
  }

  return clampValues.length === 3
    ? [clampValues[0], clampValues[1], clampValues[2]]
    : null;
};
