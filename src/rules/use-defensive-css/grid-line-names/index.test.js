import rule from '../index.js';
const { messages, ruleName } = rule.rule;

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'grid-line-names': { columns: true, rows: false } }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { grid-template-columns: [c-a] 1fr [c-b] 2fr; }`,
      description: 'Columns-only: named lines before each column track.',
    },
    {
      code: `div { grid: auto / [c-a] 1fr [c-b] 2fr; }`,
      description: 'Shorthand `grid` with columns portion named; rows ignored.',
    },
    {
      code: `div { grid-template-columns: repeat(auto-fill, [c] minmax(50px,1fr)); }`,
      description:
        'Repeat with auto-fill and bracketed column names is allowed.',
    },
  ],

  reject: [
    {
      code: `div { grid-template-columns: 1fr; }`,
      description: 'Columns-only: an unnamed column should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid: auto / 1fr 1fr; }`,
      description: 'Shorthand `grid` columns without named lines should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid: auto / repeat(3, 1fr); }`,
      description:
        'Shorthand `grid` using numeric repeat in columns should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: 1fr [after] 1fr; }`,
      description:
        'Columns-only: Line name following a track does not name the first column — should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: [span] 1fr; }`,
      description:
        'Columns-only: Reserved ident `span` used as a column name should fail.',
      message: messages.gridLineNames(),
    },
  ],
});

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'grid-line-names': true }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { grid-template-columns: [a] 1fr [b] 1fr; }`,
      description: 'Minimal valid: named lines before each track.',
    },
    {
      code: `div { grid-template-columns: [name-a name-b] 1fr; }`,
      description: 'Bracket with multiple names separated by space.',
    },
    {
      code: `div { grid-template-columns: [a] [b] 1fr [c] 2fr; }`,
      description:
        'Consecutive bracket groups associated with the following size.',
    },
    {
      code: `div { grid-template-columns: repeat(auto-fit, [line-name3 line-name4] 300px); }`,
      description:
        'Repeat with auto-fit and bracketed line names inside repeat is allowed.',
    },
    {
      code: `div { grid-template-columns: repeat(auto-fill, [a] minmax(100px, 1fr)); }`,
      description: 'Repeat with auto-fill and minmax track sizes with names.',
    },
    {
      code: `div { grid: auto / [col-a] 1fr [col-b] 2fr; }`,
      description:
        'Shorthand `grid` with columns portion that names each column line.',
    },
    {
      code: `div { grid: 100px / repeat(auto-fill, [a b] 200px); }`,
      description:
        'Shorthand `grid` with repeat auto-fill and bracketed names is allowed.',
    },
    {
      code: `div { grid-template-columns:repeat(auto-fit,[a]300px); }`,
      description: 'Minified repeat(...) with bracketed names is allowed.',
    },
  ],

  reject: [
    {
      code: `div { grid-template-columns: 1fr; }`,
      description: 'A single unnamed track should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: 1fr 1fr; }`,
      description: 'Unnamed tracks should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: repeat(3, 1fr); }`,
      description: 'Repeat with numeric count without names should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid: auto / 1fr 1fr; }`,
      description: 'Shorthand `grid` columns without named lines should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid: auto / repeat(3, 1fr); }`,
      description:
        'Shorthand `grid` using numeric repeat in columns should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid: auto / repeat(3, 1fr); }`,
      description:
        'Shorthand `grid` using numeric repeat in columns should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: 1fr [after] 1fr; }`,
      description:
        'Line name following a track does not name the first column — should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: [auto] 1fr; }`,
      description: 'Reserved ident `auto` used as a line name should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: [span] 1fr; }`,
      description: 'Reserved ident `span` used as a line name should fail.',
      message: messages.gridLineNames(),
    },
  ],
});
