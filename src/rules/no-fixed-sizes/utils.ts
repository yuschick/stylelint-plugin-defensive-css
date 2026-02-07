const PX_VALUE = /\d+(\.\d+)?px\b/i;

const VALIDATED_FUNCTIONS = [
  'calc',
  'calc-size',
  'clamp',
  'fit-content',
  'max',
  'min',
  'minmax',
  'repeat',
  'translate',
  'translateX',
  'translateY',
];

/**
 * Check if at-rule params contain pixel values
 * Supports both:
 *   - Legacy: (min-width: 768px)
 *   - Range: (width >= 768px) or (768px <= width <= 1024px)
 */
export const isValidAtRule = (params: string): boolean => {
  const normalized = params.replace(/\s+/g, ' ');

  // Pattern 1: Legacy syntax (min-width: 768px)
  const legacyRegex = /\(\s*([\w-]+)\s*:\s*([^)]+)\s*\)/g;

  let match;
  while ((match = legacyRegex.exec(normalized)) !== null) {
    const value = match[2].trim();

    if (PX_VALUE.test(value)) {
      return false;
    }
  }

  // Pattern 2: Range syntax (width >= 768px) or (768px <= width)
  const rangeRegex = /\(([^)]+)\)/g;

  while ((match = rangeRegex.exec(normalized)) !== null) {
    const expression = match[1];

    if (PX_VALUE.test(expression)) {
      return false;
    }
  }

  return true;
};

/**
 * Check if a CSS declaration value contains pixel values
 * Validates both regular values and CSS functions
 */
export const isValidValue = (value: string): boolean => {
  const normalized = value.toLowerCase();

  const functionPattern = new RegExp(`\\b(${VALIDATED_FUNCTIONS.join('|')})\\s*\\(`, 'i');

  if (functionPattern.test(normalized)) {
    // If the function contains var(), it's 'flexible-ish' (we don't know the value)
    if (/var\(/.test(normalized)) {
      return true;
    }

    const allUnits = normalized.match(/\d+(\.\d+)?[a-z%]+/gi) || [];
    const hasNonPxUnit = allUnits.some((unit) => !PX_VALUE.test(unit));

    if (hasNonPxUnit) {
      return true;
    }
    return false;
  }

  const withoutFunctions = normalized.replace(/\w+\([^)]*\)/g, '');
  const withoutZeroPx = withoutFunctions.replace(/\b0(\.0+)?px\b/gi, '');

  if (PX_VALUE.test(withoutZeroPx)) {
    return false;
  }

  return true;
};
