import parser, { Node } from 'postcss-selector-parser';
import { SecondaryOptions } from './rule';

type Mode = 'loose' | 'strict';

export function findImpureElement(
  selector: string,
  options: SecondaryOptions = {},
): Node | null {
  const { ignoreAttributeModifiers, ignoreAttributeSelectors, ignoreElements, strict } =
    options;
  const allowAttributeModifiers = ignoreAttributeModifiers ?? ignoreAttributeSelectors;
  const mode: Mode = strict ? 'strict' : 'loose';

  let nodeToReport: Node | null = null;

  const processor = parser((selectors) => {
    selectors.each((container) => {
      let impureNode: Node | null = null;
      let isStrictlyPure = true;
      let isLooselyPure = false;
      let hasIgnoredTag: boolean | undefined = false;

      container.walk((node) => {
        if (node.type === 'class' || node.type === 'id') {
          isLooselyPure = true;
          return;
        }

        if (node.type === 'tag') {
          hasIgnoredTag = ignoreElements?.includes(
            node.value as keyof HTMLElementTagNameMap,
          );

          if (hasIgnoredTag) {
            return;
          }

          isStrictlyPure = false;

          const nextNode = node.next();
          const hasAttributeModifier = nextNode?.type === 'attribute';

          if (allowAttributeModifiers && hasAttributeModifier) {
            return;
          }

          if (!impureNode) {
            impureNode = node;
          }

          return;
        }

        if (node.type === 'attribute') {
          const prevNode = node.prev();

          const allowAttributeModifier = hasIgnoredTag
            ? // If the root tag is ignored, ignore the attribute modifier
              true
            : allowAttributeModifiers
              ? // If attribute modifiers are allowed, check if the previous node exists to prevent global attribute selectors
                !!prevNode?.type
              : // if attribute modifiers are not allowed, only allow class and id selectors
                prevNode?.type === 'class' || prevNode?.type === 'id';

          if (allowAttributeModifier) {
            return;
          }

          impureNode = node;
          isStrictlyPure = false;
          return;
        }

        if (node.type === 'universal') {
          const isIgnored = ignoreElements?.includes('*' as keyof HTMLElementTagNameMap);

          if (isIgnored) {
            return;
          }

          if (!impureNode) {
            impureNode = node;
          }

          isStrictlyPure = false;
          return;
        }
      });

      if (mode === 'strict' && !isStrictlyPure) {
        nodeToReport = impureNode;
        return false;
      }

      if (mode === 'loose' && !isStrictlyPure && !isLooselyPure) {
        nodeToReport = impureNode;
        return false;
      }
    });
  });

  processor.processSync(selector);
  return nodeToReport;
}
