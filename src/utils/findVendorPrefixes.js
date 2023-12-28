const expression = /-\b(moz|ms|o|webkit)\b-/g;

function findVendorPrefixes(selector) {
  console.log(selector);
  if (!selector) return false;

  let prefixesFound = [...selector.trim().matchAll(expression)];
  console.log(prefixesFound);
  return prefixesFound.length > 1;
}

module.exports = {
  findVendorPrefixes,
};
