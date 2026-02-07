import { SeverityProps } from '../../utils/types';

export const hasStaticViewportHeight = (value: string): boolean => {
  // Match 100vh or 100vb (word boundary to avoid matching 1100vh)
  const staticViewportRegex = /\b100v[hb]\b/i;
  return staticViewportRegex.test(value);
};

export interface Properties {
  'block-size'?: boolean | [boolean, SeverityProps];
  height?: boolean | [boolean, SeverityProps];
  'max-block-size'?: boolean | [boolean, SeverityProps];
  'max-height'?: boolean | [boolean, SeverityProps];
  'min-block-size'?: boolean | [boolean, SeverityProps];
  'min-height'?: boolean | [boolean, SeverityProps];
}

export const recommendedOptions: Properties = {
  'block-size': [true, { severity: 'warning' }],
  height: [true, { severity: 'warning' }],
  'max-block-size': [true, { severity: 'warning' }],
  'max-height': [true, { severity: 'warning' }],
  'min-block-size': [true, { severity: 'warning' }],
  'min-height': [true, { severity: 'warning' }],
};

export const strictOptions: Properties = {
  'block-size': [true, { severity: 'error' }],
  height: [true, { severity: 'error' }],
  'max-block-size': [true, { severity: 'error' }],
  'max-height': [true, { severity: 'error' }],
  'min-block-size': [true, { severity: 'error' }],
  'min-height': [true, { severity: 'error' }],
};
