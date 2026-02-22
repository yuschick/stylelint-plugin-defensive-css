import { PropertiesHyphen } from 'csstype';

export const motionAtRules = ['@view-transition'] as const;
export type MotionAtRule = (typeof motionAtRules)[number];

export const motionProperties: (keyof PropertiesHyphen)[] = [
  'animation',
  'animation-duration',
  'background',
  'background-attachment',
  'scroll-behavior',
  'transition',
  'view-transition-name',
] as const;
export type MotionProperty = (typeof motionProperties)[number];

export const safeTransitionProperties: (keyof PropertiesHyphen)[] = [
  'accent-color',
  'background-color',
  'backdrop-filter',
  'border-bottom-color',
  'border-color',
  'border-left-color',
  'border-right-color',
  'border-top-color',
  'column-rule-color',
  'color',
  'fill',
  'filter',
  'mix-blend-mode',
  'opacity',
  'outline-color',
  'stroke',
  'text-decoration-color',
] as const;
export type SafeTransitionProperty = (typeof safeTransitionProperties)[number];

export function isInstantValue(value: string): boolean {
  if (value.trim() === 'none') return true;

  // For explicit 0 duration
  if (/^0(\.0+)?\s*(s|ms)?$/.test(value.trim())) return true;

  // Extract all durations (handles spaces, decimal points, etc.)
  const durations = value.match(/(\d*\.?\d+)\s*(s|ms)/g);

  if (!durations) return true; // No durations found

  // Check if all durations are 0
  return durations.every((duration) => {
    const numericValue = parseFloat(duration);
    return numericValue === 0;
  });
}

export function hasMotionBackgroundAttachment(value: string): boolean {
  const backgrounds = value.split(',');

  for (const background of backgrounds) {
    if (/(?<!url\([^)]*)\bfixed\b(?![^(]*\))/.test(background)) {
      return true;
    }
  }

  return false;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isInsidePrefersReducedMotion(node: any): boolean {
  let parent = node.parent;

  while (parent) {
    if (parent.type === 'atrule' && parent.name === 'media') {
      const params = parent.params;

      // Check for prefers-reduced-motion: no-preference
      if (/prefers-reduced-motion\s*:\s*no-preference/.test(params)) {
        return true;
      }

      // Check for not (prefers-reduced-motion: reduce)
      if (/not\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/.test(params)) {
        return true;
      }
    }
    parent = parent.parent;
  }

  return false;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isInsidePrefersReducedMotionReduce(node: any): boolean {
  let parent = node.parent;

  while (parent) {
    if (parent.type === 'atrule' && parent.name === 'media') {
      const params = parent.params;

      // Check for prefers-reduced-motion: reduce (without "not")
      // Make sure it's not "not (prefers-reduced-motion: reduce)"
      if (
        /prefers-reduced-motion\s*:\s*reduce/.test(params) &&
        !/not\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/.test(params)
      ) {
        return true;
      }

      // Check for not (prefers-reduced-motion: no-preference)
      // This is equivalent to (prefers-reduced-motion: reduce)
      if (/not\s*\(\s*prefers-reduced-motion\s*:\s*no-preference\s*\)/.test(params)) {
        return true;
      }
    }
    parent = parent.parent;
  }

  return false;
}

export function getInvalidTransitionProperties(value: string): string[] {
  const transitions = value.split(',').map((t) => t.trim());
  const invalidProperties: string[] = [];

  for (const transition of transitions) {
    if (isInstantValue(transition)) continue;

    const parts = transition.split(/\s+/);

    let property: string | undefined;

    for (const part of parts) {
      if (/^\d*\.?\d+\s*(s|ms)/.test(part)) continue;
      if (/^(ease|linear|ease-in|ease-out|ease-in-out|step-start|step-end)$/.test(part))
        continue;
      if (part.startsWith('cubic-bezier(') || part.startsWith('steps(')) continue;

      property = part;
      break;
    }

    if (!safeTransitionProperties.includes(property as keyof PropertiesHyphen)) {
      // if no property is found, the duration and easing will apply to 'all' properties
      invalidProperties.push(property ?? 'all');
    }
  }

  return invalidProperties;
}
