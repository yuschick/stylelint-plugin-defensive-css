export const globalKeywords = ['inherit', 'initial', 'unset', 'revert', 'revert-layer'];

export function checkForCustomProperty(value: string): [boolean, string[]] {
  const normalized = value.toLocaleLowerCase().trim();
  const fallbacks = normalized.split(',').slice(1);

  return [/var\(/.test(normalized), fallbacks];
}
