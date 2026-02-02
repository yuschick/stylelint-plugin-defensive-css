/**
 * Animation and transition properties that should respect prefers-reduced-motion
 */
export const animationProperties = [
  'animation',
  'animation-duration',
  'transition',
  'transition-duration',
];

/**
 * Check if a property is an animation/transition property that requires motion wrapping
 * Note: We only check properties that actually create motion (with duration)
 */
export function isAnimationProperty(prop: string): boolean {
  return animationProperties.includes(prop);
}

/**
 * Check if a value is effectively instant (no motion)
 * e.g., 0s, 0ms, none
 */
export function isInstantValue(value: string): boolean {
  // Check for 'none'
  if (value.trim() === 'none') {
    return true;
  }

  // Check for explicit 0s or 0ms
  if (/^0(s|ms)?$/.test(value.trim())) {
    return true;
  }

  // For shorthand properties with multiple values (e.g., "color 0.3s, opacity 0s")
  // Check if ALL durations are 0
  const durations = value.match(/(\d+\.?\d*)(s|ms)/g);

  if (!durations) {
    return true; // No durations found
  }

  // Check if all durations are 0
  return durations.every((duration) => {
    const numericValue = parseFloat(duration);
    return numericValue === 0;
  });
}

/**
 * Check if currently inside a prefers-reduced-motion media query
 * Accepts both:
 * - @media (prefers-reduced-motion: no-preference)
 * - @media not (prefers-reduced-motion: reduce)
 */
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

/**
 * Check if currently inside a prefers-reduced-motion: reduce media query
 * This is the WRONG place for animations - they should be removed or instant
 */
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
    }
    parent = parent.parent;
  }

  return false;
}
