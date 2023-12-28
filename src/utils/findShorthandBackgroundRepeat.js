const expression = /\b(repeat|repeat-x|repeat-y|space|round|no-repeat|)\b/g;

export function findShorthandBackgroundRepeat(value) {
  return value.match(expression).some((val) => val);
}
