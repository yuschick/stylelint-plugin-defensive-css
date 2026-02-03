/**
 * Check if selector contains :focus pseudo-class
 */
export function hasFocusPseudoClass(selector: string): boolean {
  return /:focus(?=[:\s]|$)/.test(selector);
}

/**
 * Check if selector already has :focus-visible or :focus-within
 * These are acceptable focus-related pseudo-classes
 */
export function hasAcceptableFocusPseudoClass(selector: string): boolean {
  return /:focus-visible/.test(selector) || /:focus-within/.test(selector);
}

/**
 * Check if :focus is inside :not() - this is usually intentional
 */
export function isFocusInsideNot(selector: string): boolean {
  return /:not\([^)]*:focus[^)]*\)/.test(selector);
}
