const expression = /-\b(moz|ms|o|webkit)\b-/g;

export function findVendorPrefixes(selector) {
  if (!selector) return false;

  let prefixesFound = [...selector.trim().matchAll(expression)];
  return prefixesFound.length > 1;
}
