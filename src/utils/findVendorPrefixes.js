const expression = /-\b(moz|ms|o|webkit)\b-/g;

function findVendorPrefixes(selector) {
  if (!selector) return false;

  let prefixesFound = [...selector.trim().matchAll(expression)];
  return prefixesFound.length > 1;
}

module.exports = {
  findVendorPrefixes,
};
