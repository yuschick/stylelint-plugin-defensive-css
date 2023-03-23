const expression = /-[-moz-|-ms-|-o-|-webkit-|]+-/g;

function findVendorPrefixes(selector) {
  let prefixesFound = [...selector.matchAll(expression)];
  return prefixesFound.length > 1;
}

module.exports = {
  findVendorPrefixes,
};
