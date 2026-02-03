export const listStyleProperties = {
  listStyle: 'list-style',
  listStyleType: 'list-style-type',
};

/* Check if selector is within a nav element */
export function isNavSelector(selector: string): boolean {
  if (!/\bnav\b/.test(selector)) {
    return false;
  }

  if (/:not\([^)]*\bnav\b[^)]*\)/.test(selector)) {
    return false;
  }

  return true;
}

export const isListStyleNone = (value: string): boolean => {
  const parts = [...new Intl.Segmenter('en', { granularity: 'word' }).segment(value)].map(
    (part) => part.segment,
  );

  return parts.some((part) => part.trim().toLowerCase() === 'none');
};
