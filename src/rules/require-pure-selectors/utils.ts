import parser, { Node } from 'postcss-selector-parser';
import { SecondaryOptions } from './rule';

export function findImpureElement(
  selector: string,
  options: SecondaryOptions = {},
): Node | null {
  let illegalNode: Node | null = null;

  const processor = parser((selectors) => {
    selectors.walk((node) => {
      if (
        node.type === 'tag' &&
        !options.ignoreElements?.includes(node.value as keyof HTMLElementTagNameMap)
      ) {
        const nextNode = node.next();

        const isAllowedByAttribute =
          options.ignoreAttributeSelectors && nextNode?.type === 'attribute';

        if (!isAllowedByAttribute) {
          illegalNode = node;
          return false;
        }
      }

      if (node.type === 'attribute' && !options.ignoreAttributeSelectors) {
        const prevNode = node.prev();

        if (
          !prevNode ||
          (prevNode.type === 'tag' &&
            !options.ignoreElements?.includes(
              prevNode.value as keyof HTMLElementTagNameMap,
            ))
        ) {
          illegalNode = node;
          return false;
        }
      }

      if (
        node.type === 'universal' &&
        !options.ignoreElements?.includes('*' as keyof HTMLElementTagNameMap)
      ) {
        illegalNode = node;
        return false;
      }
    });
  });

  processor.processSync(selector);
  return illegalNode;
}
