import { Globals, PropertiesHyphen, VendorLonghandPropertiesHyphen } from 'csstype';

export const globals: Globals[] = [
  '-moz-initial',
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
];
export const defaultValues = ['auto', 'contents', 'scroll-position'] as const;

// Standard composite properties (create separate layers)
const standardCompositeProperties: (keyof PropertiesHyphen)[] = [
  'backdrop-filter',
  'filter',
  'opacity',
  'perspective',
  'rotate',
  'scale',
  'transform',
  'transform-origin',
  'translate',
] as const;

// Vendor-prefixed versions of composite properties that are in csstype
const vendorPrefixedProperties: (keyof VendorLonghandPropertiesHyphen)[] = [
  // -webkit- prefixes
  '-webkit-backdrop-filter',
  '-webkit-filter',
  '-webkit-perspective',
  '-webkit-transform',
  '-webkit-transform-origin',

  // -moz- prefixes
  '-moz-perspective',
  '-moz-transform',
  '-moz-transform-origin',

  // -ms- prefixes
  '-ms-filter',
  '-ms-transform',
  '-ms-transform-origin',
];

// Additional vendor prefixes not in csstype but valid in CSS
const additionalVendorPrefixes = [
  '-moz-backdrop-filter',
  '-moz-filter',
  '-ms-perspective',
  '-o-transform',
  '-o-transform-origin',
] as const;

// Combined list of all valid composite properties
export const compositeProperties: (
  | keyof VendorLonghandPropertiesHyphen
  | keyof PropertiesHyphen
  | string
)[] = [
  ...standardCompositeProperties,
  ...vendorPrefixedProperties,
  ...additionalVendorPrefixes,
];

export type CompositeProperty = (typeof compositeProperties)[number];
export type DefaultValue = Globals & (typeof defaultValues)[number];
