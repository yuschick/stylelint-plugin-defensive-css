import { messages, name } from '.';

/* Test when both x and y are enabled (default) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { overflow: auto; overscroll-behavior: contain; }',
      description: 'overflow auto with overscroll-behavior',
    },
    {
      code: '.class { overflow: scroll; overscroll-behavior: none; }',
      description: 'overflow scroll with overscroll-behavior',
    },
    {
      code: '.class { overflow-x: auto; overscroll-behavior-x: contain; }',
      description: 'overflow-x auto with overscroll-behavior-x',
    },
    {
      code: '.class { overflow-y: scroll; overscroll-behavior-y: none; }',
      description: 'overflow-y scroll with overscroll-behavior-y',
    },
    {
      code: '.class { overflow-inline: auto; overscroll-behavior-inline: contain; }',
      description: 'overflow-inline auto with overscroll-behavior-inline',
    },
    {
      code: '.class { overflow-block: scroll; overscroll-behavior-block: none; }',
      description: 'overflow-block scroll with overscroll-behavior-block',
    },
    {
      code: '.class { overflow: auto; overscroll-behavior: auto; }',
      description: 'overflow auto with overscroll-behavior auto (any value accepted)',
    },
    {
      code: '.class { overflow-x: auto; overscroll-behavior: contain; }',
      description: 'overflow-x with overscroll-behavior shorthand (covers both axes)',
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
      code: '.class { overflow: auto scroll; overscroll-behavior: contain; }',
      description: 'overflow with two values and overscroll-behavior',
    },
    {
      code: '.class { overflow-x: auto; overflow-y: hidden; overscroll-behavior-x: contain; }',
      description: 'mixed overflow with axis-specific overscroll-behavior',
    },
    {
      code: '.class { overflow: clip; }',
      description: 'overflow clip (not scrollable)',
    },
    {
      code: '.class { overflow-wrap: break-word; }',
      description: 'overflow-wrap (not an overflow property)',
    },
    {
      code: '.class { overflow-anchor: auto; }',
      description: 'overflow-anchor (not an overflow property)',
    },
  ],

  reject: [
    {
      code: '.class { overflow: auto; }',
      description: 'overflow auto without overscroll-behavior',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow: scroll; }',
      description: 'overflow scroll without overscroll-behavior',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-x: auto; }',
      description: 'overflow-x auto without overscroll-behavior',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-y: scroll; }',
      description: 'overflow-y scroll without overscroll-behavior',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-inline: auto; }',
      description: 'overflow-inline auto without overscroll-behavior',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-block: scroll; }',
      description: 'overflow-block scroll without overscroll-behavior',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-x: auto; overscroll-behavior-y: contain; }',
      description: 'overflow-x but only overscroll-behavior-y (wrong axis)',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-y: scroll; overscroll-behavior-x: none; }',
      description: 'overflow-y but only overscroll-behavior-x (wrong axis)',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow: auto scroll; }',
      description:
        'overflow with two values, one scrollable, without overscroll-behavior',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-x: auto; overflow-y: hidden; }',
      description: 'mixed overflow with one scrollable axis, without overscroll-behavior',
      message: messages.rejected('.class'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when the x axis is disabled and the y axis is enabled */
testRule({
  config: [true, { x: false }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { overflow-x: auto; }',
      description: 'overflow-x auto without overscroll-behavior (x disabled)',
    },
    {
      code: '.class { overflow-inline: scroll; }',
      description: 'overflow-inline scroll without overscroll-behavior (x disabled)',
    },
    {
      code: '.class { overflow-y: auto; overscroll-behavior-y: contain; }',
      description: 'overflow-y auto with overscroll-behavior-y (y still checked)',
    },
    {
      code: '.class { overflow-y: auto; overscroll-behavior: contain; }',
      description: 'overflow-y auto with overscroll-behavior shorthand (y still checked)',
    },
  ],

  reject: [
    {
      code: '.class { overflow-y: auto; }',
      description: 'overflow-y auto without overscroll-behavior (y still checked)',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-block: scroll; }',
      description: 'overflow-block scroll without overscroll-behavior (y still checked)',
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

/* Test when the x axis is enabled and the y axis is disabled */
testRule({
  config: [true, { y: false }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { overflow-y: auto; }',
      description: 'overflow-y auto without overscroll-behavior (y disabled)',
    },
    {
      code: '.class { overflow-block: scroll; }',
      description: 'overflow-block scroll without overscroll-behavior (y disabled)',
    },
    {
      code: '.class { overflow-x: auto; overscroll-behavior-x: contain; }',
      description: 'overflow-x auto with overscroll-behavior-x (x still checked)',
    },
    {
      code: '.class { overflow-x: auto; overscroll-behavior: contain; }',
      description: 'overflow-x auto with overscroll-behavior shorthand (x still checked)',
    },
  ],

  reject: [
    {
      code: '.class { overflow-x: auto; }',
      description: 'overflow-x auto without overscroll-behavior (x still checked)',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { overflow-inline: scroll; }',
      description: 'overflow-inline scroll without overscroll-behavior (x still checked)',
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

/* Test when both the x and y axis are disabled */
testRule({
  config: [true, { x: false, y: false }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { overflow: auto; }',
      description: 'overflow auto without overscroll-behavior (both disabled)',
    },
    {
      code: '.class { overflow-x: scroll; }',
      description: 'overflow-x scroll without overscroll-behavior (both disabled)',
    },
    {
      code: '.class { overflow-y: auto; }',
      description: 'overflow-y auto without overscroll-behavior (both disabled)',
    },
  ],

  reject: [],
  /* eslint-enable sort-keys */
});
