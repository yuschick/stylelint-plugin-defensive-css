export function matchesIgnorePattern(
  property: string,
  patterns: (string | RegExp)[],
): boolean {
  return patterns.some((pattern) => {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    return regex.test(property);
  });
}
