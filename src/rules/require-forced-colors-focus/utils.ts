import { PropertiesHyphen } from 'csstype';
import type { ChildNode } from 'postcss';
import { hasMatchingAncestor } from '../../utils/traversal';

export const outlineProperties: Set<keyof PropertiesHyphen> = new Set([
  'outline',
  'outline-style',
  'outline-width',
]);

export const negativeValues: Set<string | number> = new Set(['none', 0]);

/**
 * Matches border properties that create visible borders in FCM.
 * Excludes border-radius, border-collapse, border-spacing, border-image, etc.
 */
export const borderPatterns =
  /^border(-top|-right|-bottom|-left|-block(-start|-end)?|-inline(-start|-end)?)?(-width|-style|-color)?$/;

export function checkForRemovalValue(value: string): boolean {
  return negativeValues.has(value) || /^0(%|[a-z]+)?$/.test(value);
}

export function isOutsideForcedColorsMode(node: ChildNode): boolean {
  return hasMatchingAncestor(
    node,
    (ancestor) =>
      ancestor.type === 'atrule' &&
      ancestor.name === 'media' &&
      (/forced-colors\s*:\s*none/.test(ancestor.params) ||
        /not\s*\(\s*forced-colors\s*:\s*active\s*\)/.test(ancestor.params)),
  );
}
