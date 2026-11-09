import type { Node } from 'postcss-selector-parser';
import parser from 'postcss-selector-parser';

import type { SecondaryOptions } from './rule';

type Mode = 'loose' | 'strict';

interface FindImpureElementOptions {
  options?: SecondaryOptions;
  selector: string;
}

export function findImpureElement({
  options = {},
  selector,
}: FindImpureElementOptions): Node | null {
  const {
    ignoreAttributeModifiers,
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- GEN-01: reads the deprecated public option so existing configs keep working; remove with the option in v3 (ROADMAP Milestone 4)
    ignoreAttributeSelectors,
    ignoreElements,
    strict,
  } = options;
  const allowAttributeModifiers =
    ignoreAttributeModifiers ?? ignoreAttributeSelectors;
  const mode: Mode = strict ? 'strict' : 'loose';

  let nodeToReport: Node | null = null;

  const processor = parser((selectors) => {
    selectors.each((container) => {
      const state: {
        hasIgnoredTag: boolean | undefined;
        impureNode: Node | null;
        isLooselyPure: boolean;
        isStrictlyPure: boolean;
      } = {
        hasIgnoredTag: false,
        impureNode: null,
        isLooselyPure: false,
        isStrictlyPure: true,
      };

      container.walk((node) => {
        if (node.type === 'class' || node.type === 'id') {
          state.isLooselyPure = true;
          return;
        }

        if (node.type === 'tag') {
          state.hasIgnoredTag = ignoreElements?.includes(
            node.value as keyof HTMLElementTagNameMap,
          );

          if (state.hasIgnoredTag) {
            return;
          }

          state.isStrictlyPure = false;

          const nextNode = node.next();
          const hasAttributeModifier = nextNode?.type === 'attribute';

          if (allowAttributeModifiers && hasAttributeModifier) {
            return;
          }

          if (!state.impureNode) {
            state.impureNode = node;
          }

          return;
        }

        if (node.type === 'attribute') {
          const prevNode = node.prev();

          const allowAttributeModifier = state.hasIgnoredTag
            ? // If the root tag is ignored, ignore the attribute modifier
              true
            : allowAttributeModifiers
              ? // If attribute modifiers are allowed, check if the previous node exists to prevent global attribute selectors
                !!prevNode?.type
              : // if attribute modifiers are not allowed, only allow class, id, and nesting selectors
                prevNode?.type === 'class' ||
                prevNode?.type === 'id' ||
                prevNode?.type === 'nesting';

          if (allowAttributeModifier) {
            return;
          }

          state.impureNode = node;
          state.isStrictlyPure = false;
          return;
        }

        if (node.type === 'universal') {
          const isIgnored = ignoreElements?.includes(
            '*' as keyof HTMLElementTagNameMap,
          );

          if (isIgnored) {
            return;
          }

          if (!state.impureNode) {
            state.impureNode = node;
          }

          state.isStrictlyPure = false;
          return;
        }
      });

      if (mode === 'strict' && !state.isStrictlyPure) {
        nodeToReport = state.impureNode;
        return false;
      }

      if (mode === 'loose' && !state.isStrictlyPure && !state.isLooselyPure) {
        nodeToReport = state.impureNode;
        return false;
      }
    });
  });

  processor.processSync(selector);
  return nodeToReport;
}
