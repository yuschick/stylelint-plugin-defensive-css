export const hasUrlValue = (value: string) => value.includes('url(');

export const findShorthandRepeat = (value: string) => {
  // Check if shorthand includes repeat value (no-repeat, repeat, repeat-x, repeat-y, space, round)
  return /(^|\s)(no-repeat|repeat(-[xy])?|space|round)(\s|$)/i.test(value);
};
