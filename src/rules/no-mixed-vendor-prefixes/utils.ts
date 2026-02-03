const expression = /-\b(moz|ms|o|webkit)\b-/g;

export function findVendorPrefixes(selector: string): boolean {
  if (!selector) return false;

  const prefixesFound = [...selector.trim().matchAll(expression)];
  const prefixes = new Set(prefixesFound.map((prefix) => prefix[1]));

  return prefixes.size > 1;
}
