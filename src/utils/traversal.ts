import type { AtRule, ChildNode, Node, Root, Rule } from 'postcss';

/**
 * Walk up the ancestor chain from a node, testing each ancestor against a predicate.
 * Returns true if any ancestor matches the predicate.
 */
export function hasMatchingAncestor(
  node: ChildNode,
  predicate: (ancestor: AtRule | Root | Rule) => boolean,
): boolean {
  let ancestor: Node | undefined = node.parent;

  while (ancestor) {
    if (ancestor.type === 'root') {
      if (predicate(ancestor as Root)) {
        return true;
      }
    }

    if (ancestor.type === 'rule') {
      if (predicate(ancestor as Rule)) {
        return true;
      }
    }

    if (ancestor.type === 'atrule') {
      if (predicate(ancestor as AtRule)) {
        return true;
      }
    }

    ancestor = ancestor.parent;
  }

  return false;
}
