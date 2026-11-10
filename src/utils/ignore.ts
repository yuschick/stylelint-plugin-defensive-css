interface MatchesIgnorePatternOptions {
  patterns: (string | RegExp)[];
  value: string;
}

export function matchesIgnorePattern({
  patterns,
  value,
}: MatchesIgnorePatternOptions): boolean {
  return patterns.some((pattern) => {
    const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
    return regex.test(value);
  });
}
