const expression = /\b(repeat|repeat-x|repeat-y|space|round|no-repeat|)\b/g;

export function findShorthandBackgroundRepeat(value) {
  return value.match(expression)?.some((val) => val) || false;
}

export const findRepeatInAncestors = ({ declNode, forMask = false }) => {
  let node = declNode.parent;
  while (node && node.type !== 'root') {
    if (node.nodes && node.nodes.length) {
      for (const childDecl of node.nodes) {
        if (!childDecl || !childDecl.prop) continue;
        if (!forMask) {
          if (childDecl.prop === 'background-repeat') return true;
          if (
            childDecl.prop === 'background' &&
            childDecl.value.includes('url(')
          ) {
            if (findShorthandBackgroundRepeat(childDecl.value)) return true;
          }
        } else {
          if (childDecl.prop === 'mask-repeat') return true;
          if (childDecl.prop === 'mask' && childDecl.value.includes('url(')) {
            if (findShorthandBackgroundRepeat(childDecl.value)) return true;
          }
        }
      }
    }
    node = node.parent;
  }
  return false;
};
