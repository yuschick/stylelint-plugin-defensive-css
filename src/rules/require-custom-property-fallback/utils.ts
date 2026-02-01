const VAR_EXPRESSION = /var\(.+?\)/g;

export function findCustomPropertiesWithoutFallback(value: string): string[] {
  if (!value) return [];

  const propertiesFound = [...value.trim().matchAll(VAR_EXPRESSION)];

  return propertiesFound
    .map(([property]) => (property.includes(',') ? undefined : property))
    .filter((value): value is string => Boolean(value));
}

export function matchesIgnorePattern(
  property: string,
  patterns: (string | RegExp)[],
): boolean {
  return patterns.some((pattern) => {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    return regex.test(property);
  });
}
