import { PropertiesHyphen } from 'csstype';

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

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isOutsideForcedColorsMode(node: any): boolean {
  let parent = node.parent;

  while (parent) {
    if (parent.type === 'atrule' && parent.name === 'media') {
      const params = parent.params;

      // Check for forced-colors: none
      if (/forced-color\s*:\s*none/.test(params)) {
        return true;
      }

      // Check for not (forced-colors: active)
      if (/not\s*\(\s*forced-colors\s*:\s*active\s*\)/.test(params)) {
        return true;
      }
    }
    parent = parent.parent;
  }

  return false;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isInsideForcedColorsMode(node: any): boolean {
  let parent = node.parent;

  while (parent) {
    if (parent.type === 'atrule' && parent.name === 'media') {
      const params = parent.params;

      // Check for forced-colors: active (without "not")
      // Make sure it's not "not (forced-colors: active)"
      if (
        /forced-colors\s*:\s*active/.test(params) &&
        !/not\s*\(\s*forced-colors\s*:\s*active\s*\)/.test(params)
      ) {
        return true;
      }

      // Check for "not (forced-colors: none)""
      // This is equivalent to (forced-colors: none)
      if (/not\s*\(\s*forced-colors\s*:\s*none\s*\)/.test(params)) {
        return true;
      }
    }
    parent = parent.parent;
  }

  return false;
}
