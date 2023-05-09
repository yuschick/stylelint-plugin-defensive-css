const expression = /var\(.+?\)/g;

function findCustomProperties(value) {
  if (!value) return false;

  let propertiesFound = [...value.trim().matchAll(expression)];
  return propertiesFound
    .map(([property]) => (property.includes(',') ? undefined : property))
    .filter((value) => value);
}

module.exports = {
  findCustomProperties,
};
