const expression = /\b(repeat|repeat-x|repeat-y|space|round|no-repeat|)\b/g;

function findShorthandBackgroundRepeat(value) {
  return value.match(expression).some((val) => val);
}

module.exports = {
  findShorthandBackgroundRepeat,
};
