import { messages, name } from './meta';

/* Test when both x and y are enabled (default) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { overflow: auto; scrollbar-gutter: stable; }',
      description: 'overflow auto with scrollbar-gutter',
    },
    {
      code: '.class { overflow: scroll; scrollbar-gutter: stable; }',
      description: 'overflow scroll with scrollbar-gutter',
    },
    {
      code: '.class { overflow-x: auto; scrollbar-gutter: stable; }',
      description: 'overflow-x auto with scrollbar-gutter',
    },
    {
      code: '.class { overflow-y: scroll; scrollbar-gutter: stable; }',
      description: 'overflow-y scroll with scrollbar-gutter',
    },
    {
      code: '.class { overflow-inline: auto; scrollbar-gutter: stable; }',
      description: 'overflow-inline auto with scrollbar-gutter',
    },
    {
      code: '.class { overflow-block: scroll; scrollbar-gutter: stable; }',
      description: 'overflow-block scroll with scrollbar-gutter',
    },
    {
      code: '.class { overflow: hidden; }',
      description: 'overflow hidden (not scrollable)',
    },
    {
      code: '.class { overflow: visible; }',
      description: 'overflow visible (not scrollable)',
    },
    {
      code: '.class { overflow-x: hidden; overflow-y: hidden; }',
      description: 'both overflows hidden (not scrollable)',
    },
    {
      code: '.class { overflow: auto scroll; scrollbar-gutter: stable; }',
      description: 'overflow with two values and scrollbar-gutter',
    },
    {
      code: '.class { overflow-x: auto; overflow-y: hidden; scrollbar-gutter: stable; }',
      description: 'mixed overflow with scrollbar-gutter',
    },
    {
      code: '.class { overflow: clip; }',
      description: 'overflow clip (not scrollable)',
    },
    {
      code: `div { overflow-anchor: auto; }`,
      description: 'A container with overflow-anchor property which should be ignored.',
    },
  ],

  reject: [
    {
      code: '.class { overflow: auto; }',
      description: 'overflow auto without scrollbar-gutter',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow: scroll; }',
      description: 'overflow scroll without scrollbar-gutter',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-x: auto; }',
      description: 'overflow-x auto without scrollbar-gutter',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-y: scroll; }',
      description: 'overflow-y scroll without scrollbar-gutter',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-inline: auto; }',
      description: 'overflow-inline auto without scrollbar-gutter',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-block: scroll; }',
      description: 'overflow-block scroll without scrollbar-gutter',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow: auto scroll; }',
      description: 'overflow with two values, one scrollable, without scrollbar-gutter',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-x: auto; overflow-y: hidden; }',
      description: 'mixed overflow with one scrollable axis, without scrollbar-gutter',
      message: messages.rejected('.class'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when x is disabled and y is enabled */
testRule({
  config: [true, { x: false }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { overflow-x: auto; }',
      description: 'overflow-x auto without scrollbar-gutter (x disabled)',
    },
    {
      code: '.class { overflow-inline: scroll; }',
      description: 'overflow-inline scroll without scrollbar-gutter (x disabled)',
    },
    {
      code: '.class { overflow-y: auto; scrollbar-gutter: stable; }',
      description: 'overflow-y auto with scrollbar-gutter (y still checked)',
    },
  ],

  reject: [
    {
      code: '.class { overflow-y: auto; }',
      description: 'overflow-y auto without scrollbar-gutter (y still checked)',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-block: scroll; }',
      description: 'overflow-block scroll without scrollbar-gutter (y still checked)',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow: auto; }',
      description: 'overflow shorthand affects both axes, y still checked',
      message: messages.rejected('.class'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when x is enabled and y is disabled */
testRule({
  config: [true, { y: false }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { overflow-y: auto; }',
      description: 'overflow-y auto without scrollbar-gutter (y disabled)',
    },
    {
      code: '.class { overflow-block: scroll; }',
      description: 'overflow-block scroll without scrollbar-gutter (y disabled)',
    },
    {
      code: '.class { overflow-x: auto; scrollbar-gutter: stable; }',
      description: 'overflow-x auto with scrollbar-gutter (x still checked)',
    },
  ],

  reject: [
    {
      code: '.class { overflow-x: auto; }',
      description: 'overflow-x auto without scrollbar-gutter (x still checked)',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-inline: scroll; }',
      description: 'overflow-inline scroll without scrollbar-gutter (x still checked)',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow: auto; }',
      description: 'overflow shorthand affects both axes, x still checked',
      message: messages.rejected('.class'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when both x and y are disabled */
testRule({
  config: [true, { x: false, y: false }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { overflow: auto; }',
      description: 'overflow auto without scrollbar-gutter (both disabled)',
    },
    {
      code: '.class { overflow-x: scroll; }',
      description: 'overflow-x scroll without scrollbar-gutter (both disabled)',
    },
    {
      code: '.class { overflow-y: auto; }',
      description: 'overflow-y auto without scrollbar-gutter (both disabled)',
    },
    {
      code: `div { overflow-anchor: auto; }`,
      description: 'A container with overflow-anchor property which should be ignored.',
    },
  ],

  reject: [],
  /* eslint-enable sort-keys */
});
