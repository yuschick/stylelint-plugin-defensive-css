import { messages, name } from './meta';

/* Test when both columns and rows are enabled (default) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { grid-template-columns: [start] 1fr [end]; }',
      description: 'grid-template-columns with named lines',
    },
    {
      code: '.class { grid-template-columns: [col-start] 1fr [col-middle] 2fr [col-end]; }',
      description: 'grid-template-columns with multiple named lines',
    },
    {
      code: '.class { grid-template-rows: [row-start] 100px [row-end]; }',
      description: 'grid-template-rows with named lines',
    },
    {
      code: '.class { grid-template-rows: [header] auto [content] 1fr [footer] auto [end]; }',
      description: 'grid-template-rows with multiple named lines',
    },
    {
      code: '.class { grid: [row-start] 1fr [row-end] / [col-start] 1fr [col-end]; }',
      description: 'grid shorthand with named lines for both rows and columns',
    },
    {
      code: '.class { grid-template-columns: repeat(3, [col] 1fr); }',
      description: 'grid-template-columns with repeat and named lines',
    },
    {
      code: '.class { display: grid; }',
      description: 'grid display without template properties',
    },
    {
      code: '.class { grid-template-columns: [a] minmax(100px, 1fr) [b]; }',
      description: 'grid-template-columns with minmax and named lines',
    },
    {
      code: '.class { grid-template-columns: [start] fit-content(200px) [end]; }',
      description: 'grid-template-columns with fit-content and named lines',
    },
    {
      code: '.class { grid-template-columns: [a] repeat(auto-fill, [b] 100px [c]) [d]; }',
      description: 'grid-template-columns with auto-fill repeat and named lines',
    },
  ],

  reject: [
    {
      code: '.class { grid-template-columns: 1fr 2fr; }',
      description: 'grid-template-columns without named lines',
      message: messages.rejected('grid-template-columns: 1fr 2fr'),
    },
    {
      code: '.class { grid-template-columns: 100px 1fr; }',
      description: 'grid-template-columns with sizes but no names',
      message: messages.rejected('grid-template-columns: 100px 1fr'),
    },
    {
      code: '.class { grid-template-rows: 100px auto 1fr; }',
      description: 'grid-template-rows without named lines',
      message: messages.rejected('grid-template-rows: 100px auto 1fr'),
    },
    {
      code: '.class { grid-template-columns: [start] 1fr 2fr; }',
      description: 'grid-template-columns with only first line named',
      message: messages.rejected('grid-template-columns: [start] 1fr 2fr'),
    },
    {
      code: '.class { grid: 1fr / 1fr 2fr; }',
      description: 'grid shorthand without named lines',
      message: messages.rejected('grid: 1fr / 1fr 2fr'),
    },
    {
      code: '.class { grid-template-columns: minmax(100px, 1fr) 2fr; }',
      description: 'grid-template-columns with minmax but no names',
      message: messages.rejected('grid-template-columns: minmax(100px, 1fr) 2fr'),
    },
    {
      code: '.class { grid-template-columns: repeat(3, 1fr); }',
      description: 'grid-template-columns with repeat but no names',
      message: messages.rejected('grid-template-columns: repeat(3, 1fr)'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when columns are disabled and rows are enabled */
testRule({
  config: [true, { columns: false, rows: [true, { severity: 'warning' }] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { grid-template-columns: 1fr 2fr; }',
      description: 'grid-template-columns without names (columns check disabled)',
    },
    {
      code: '.class { grid-template-rows: [row-start] 100px [row-end]; }',
      description: 'grid-template-rows with named lines (rows still checked)',
    },
    {
      code: '.class { grid: [row-start] 1fr [row-end] / 1fr 2fr; }',
      description: 'grid shorthand - rows named, columns unnamed (columns disabled)',
    },
    {
      code: '.class { grid: repeat(2, [row-start] 1fr [row-end]) / 1fr 2fr; }',
      description:
        'grid shorthand - rows named in repeat(), columns unnamed (columns disabled)',
    },
  ],

  reject: [
    {
      code: '.class { grid-template-rows: 100px auto; }',
      description: 'grid-template-rows without names (rows still checked)',
      message: messages.rejected('grid-template-rows: 100px auto'),
    },
    {
      code: '.class { grid-template-rows: repeat(3, 100px); }',
      description: 'grid-template-rows without names (rows still checked)',
      message: messages.rejected('grid-template-rows: repeat(3, 100px)'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when columns are enabled and rows are disabled */
testRule({
  config: [true, { rows: false }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { grid-template-rows: 100px auto 1fr; }',
      description: 'grid-template-rows without names (rows check disabled)',
    },
    {
      code: '.class { grid-template-columns: [col-start] 1fr [col-end]; }',
      description: 'grid-template-columns with named lines (columns still checked)',
    },
    {
      code: '.class { grid: 1fr auto / [col-start] 1fr [col-end]; }',
      description: 'grid shorthand - columns named, rows unnamed (rows disabled)',
    },
  ],

  reject: [
    {
      code: '.class { grid-template-columns: 1fr 2fr; }',
      description: 'grid-template-columns without names (columns still checked)',
      message: messages.rejected('grid-template-columns: 1fr 2fr'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when both columns and rows are disabled */
testRule({
  config: [true, { columns: false, rows: false }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { grid-template-columns: 1fr 2fr; }',
      description: 'grid-template-columns without names (both disabled)',
    },
    {
      code: '.class { grid-template-rows: 100px auto; }',
      description: 'grid-template-rows without names (both disabled)',
    },
    {
      code: '.class { grid: 1fr / 1fr 2fr; }',
      description: 'grid shorthand without names (both disabled)',
    },
  ],

  reject: [],
  /* eslint-enable sort-keys */
});
