export const isFlexDisplay = (value: string): boolean => {
  return value.includes('flex');
};

export const isColumnDirection = (value: string): boolean => {
  return value.includes('column');
};

export const hasWrapValue = (value: string): boolean => {
  return /\b(no)?wrap(-reverse)?\b/.test(value);
};
