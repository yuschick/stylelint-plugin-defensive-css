import { messages, name } from './meta';

/* Test when there is no 'ignore' option passed (default) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { color: var(--primary-color, blue); }',
      description: 'custom property with fallback',
    },
    {
      code: '.class { padding: var(--spacing, 1rem); }',
      description: 'custom property with fallback value',
    },
    {
      code: '.class { color: blue; }',
      description: 'no custom properties used',
    },
    {
      code: '.class { margin: var(--m-top, 10px) var(--m-right, 20px); }',
      description: 'multiple custom properties with fallbacks',
    },
    {
      code: '.class { /* var(--comment) */ color: blue; }',
      description: 'custom property in comment',
    },
  ],

  reject: [
    {
      code: '.class { color: var(--primary-color); }',
      description: 'custom property without fallback',
      message: messages.rejected('var(--primary-color)'),
    },
    {
      code: '.class { padding: var(--spacing); }',
      description: 'custom property without fallback value',
      message: messages.rejected('var(--spacing)'),
    },
    {
      code: '.class { margin: var(--m-top) var(--m-right, 20px); }',
      description: 'multiple properties, one missing fallback',
      message: messages.rejected('var(--m-top)'),
    },
    {
      code: '.class { border: 1px solid var(--border-color); }',
      description: 'custom property in shorthand without fallback',
      message: messages.rejected('var(--border-color)'),
    },
    {
      code: '.class { color: var(--a) var(--b) var(--c); }',
      description: 'multiple properties without fallbacks',
      warnings: [
        { message: messages.rejected('var(--a)') },
        { message: messages.rejected('var(--b)') },
        { message: messages.rejected('var(--c)') },
      ],
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when 'ignore' is an array of strings */
testRule({
  config: [true, { ignore: ['var\\(--color-.*\\)', 'var\\(--theme-.*\\)'] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { color: var(--color-primary); }',
      description: 'ignored pattern --color-* without fallback',
    },
    {
      code: '.class { background: var(--theme-background); }',
      description: 'ignored pattern --theme-* without fallback',
    },
    {
      code: '.class { padding: var(--spacing, 1rem); }',
      description: 'non-ignored property with fallback',
    },
  ],

  reject: [
    {
      code: '.class { padding: var(--spacing); }',
      description: 'non-ignored property without fallback',
      message: messages.rejected('var(--spacing)'),
    },
    {
      code: '.class { margin: var(--margin-top); }',
      description: 'property not matching ignore pattern',
      message: messages.rejected('var(--margin-top)'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when 'ignore' is an array of regular expressions */
testRule({
  config: [true, { ignore: [/var\(--color-.*\)/, /var\(--size-.*\)/] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { color: var(--color-primary); }',
      description: 'RegExp ignored pattern --color-* without fallback',
    },
    {
      code: '.class { font-size: var(--size-large); }',
      description: 'RegExp ignored pattern --size-* without fallback',
    },
  ],

  reject: [
    {
      code: '.class { padding: var(--padding-top); }',
      description: 'property not matching RegExp ignore pattern',
      message: messages.rejected('var(--padding-top)'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when 'ignore' is an array of strings and regular expressions */
testRule({
  config: [true, { ignore: ['var\\(--exact-match\\)', /var\(--pattern-.*\)/] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { color: var(--exact-match); }',
      description: 'exact string match ignored',
    },
    {
      code: '.class { color: var(--pattern-anything); }',
      description: 'RegExp pattern match ignored',
    },
    {
      code: '.class { padding: var(--other, 10px); }',
      description: 'non-ignored with fallback',
    },
  ],

  reject: [
    {
      code: '.class { margin: var(--other); }',
      description: 'non-ignored property without fallback',
      message: messages.rejected('var(--other)'),
    },
  ],
  /* eslint-enable sort-keys */
});
