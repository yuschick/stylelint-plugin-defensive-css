import rule from '../index.js';
const { messages, ruleName } = rule.rule;

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'custom-property-fallbacks': true }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { color: var(--color-primary, #000); }`,
      description: 'A custom property with a fallback color value.',
    },
  ],

  reject: [
    {
      code: `div { color: var(--color-primary); }`,
      description: 'A custom property without a fallback color value.',
      message: messages.customPropertyFallbacks(),
    },
    {
      code: `div { grid-template: var(--page-header-size) 1fr / max-content minmax(0, 1fr) max-content; }`,
      description:
        'Using grid template areas without a fallback but a comma elsewhere.',
      message: messages.customPropertyFallbacks(),
    },
  ],
});

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'custom-property-fallbacks': [true, { ignore: [/hel-/] }] }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { color: var(--hel-color-primary); }`,
      description: 'A custom property with an ignored namespace.',
    },
  ],

  reject: [
    {
      code: `div { color: var(--color-primary); }`,
      description: 'A custom property without a fallback color value.',
      message: messages.customPropertyFallbacks(),
    },
  ],
});

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [
    true,
    { 'custom-property-fallbacks': [true, { ignore: [/hel-/, 'mis-'] }] },
  ],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { color: var(--hel-color-primary); }`,
      description: 'A custom property with an ignored namespace.',
    },
    {
      code: `div { color: var(--mis-color-primary); }`,
      description: 'A custom property with an ignored namespace.',
    },
  ],

  reject: [
    {
      code: `div { color: var(--color-primary); }`,
      description: 'A custom property without a fallback color value.',
      message: messages.customPropertyFallbacks(),
    },
  ],
});
