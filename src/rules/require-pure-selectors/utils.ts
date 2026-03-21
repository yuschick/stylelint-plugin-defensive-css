import type { Rule as PostCSSRule } from 'postcss';
import parser, { Node } from 'postcss-selector-parser';
import { SecondaryOptions } from './rule';

/**
 * Check if a node has a class or ID ancestor within its selector,
 * connected by a descendant (space) or child (>) combinator.
 * Sibling combinators (+, ~) do not establish scoping.
 */
function isScopedInSelector(node: Node): boolean {
  let current = node.prev();

  while (current) {
    if (current.type === 'class' || current.type === 'id') {
      return true;
    }

    // Sibling combinators break the scoping chain
    if (
      current.type === 'combinator' &&
      (current.value === '+' || current.value === '~')
    ) {
      return false;
    }

    current = current.prev();
  }

  return false;
}

/**
 * Check if a rule node has an ancestor rule whose selector contains
 * a class or ID. Skips at-rule nodes. Terminates at root.
 */
function isScopedByNestingParent(ruleNode: PostCSSRule): boolean {
  let parent = ruleNode.parent;

  while (parent && parent.type !== 'root') {
    if (parent.type === 'rule') {
      let found = false;

      parser((selectors) => {
        selectors.walk((n) => {
          if (n.type === 'class' || n.type === 'id') {
            found = true;
            return false;
          }
        });
      }).processSync((parent as PostCSSRule).selector);

      if (found) return true;
    }
    parent = parent.parent;
  }

  return false;
}

function isNodeScopedUnderClass(
  node: Node,
  options: SecondaryOptions,
  ruleNode?: PostCSSRule,
): boolean {
  return Boolean(
    options.allowWhenScoped &&
    (isScopedInSelector(node) || (ruleNode ? isScopedByNestingParent(ruleNode) : false)),
  );
}

export function findImpureElement(
  selector: string,
  options: SecondaryOptions = {},
  ruleNode?: PostCSSRule,
): Node | null {
  let illegalNode: Node | null = null;

  const processor = parser((selectors) => {
    selectors.each((selectorEntry) => {
      selectorEntry.walk((node) => {
        if (illegalNode) return false;

        if (
          node.type === 'tag' &&
          !options.ignoreElements?.includes(node.value as keyof HTMLElementTagNameMap)
        ) {
          const nextNode = node.next();

          const isAllowedByAttribute =
            options.ignoreAttributeSelectors && nextNode?.type === 'attribute';

          if (!isAllowedByAttribute && !isNodeScopedUnderClass(node, options, ruleNode)) {
            illegalNode = node;
            return false;
          }
        }

        if (node.type === 'attribute' && !options.ignoreAttributeSelectors) {
          const prevNode = node.prev();

          if (!prevNode || (prevNode.type !== 'class' && prevNode.type !== 'id')) {
            illegalNode = node;
            return false;
          }
        }

        if (
          node.type === 'universal' &&
          !options.ignoreElements?.includes('*' as keyof HTMLElementTagNameMap)
        ) {
          if (!isNodeScopedUnderClass(node, options, ruleNode)) {
            illegalNode = node;
            return false;
          }
        }
      });

      if (illegalNode) return false;
    });
  });

  processor.processSync(selector);
  return illegalNode;
}
