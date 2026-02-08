import { messages, name } from './meta';

/* Test recommended at-rules behavior (default) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { height: 100dvh; }',
      description: 'dynamic viewport height (dvh)',
    },
    {
      code: '.class { block-size: 100dvb; }',
      description: 'dynamic viewport block-size (dvb)',
    },
    {
      code: '.class { height: 100svh; }',
      description: 'small viewport height (svh)',
    },
    {
      code: '.class { height: 100lvh; }',
      description: 'large viewport height (lvh)',
    },
    {
      code: '.class { height: 50vh; }',
      description: 'non-100 viewport height',
    },
    {
      code: '.class { height: 75vb; }',
      description: 'non-100 viewport block-size',
    },
    {
      code: '.class { width: 100vw; }',
      description: 'width property (not validated)',
    },
    {
      code: '.class { inline-size: 100vi; }',
      description: 'inline-size property (not validated)',
    },
    {
      code: '.class { height: calc(100dvh - 20px); }',
      description: 'calc with dynamic viewport height',
    },
    {
      code: '.class { height: 100%; }',
      description: 'percentage height',
    },
    {
      code: '.class { height: 100rem; }',
      description: 'rem units',
    },
  ],

  reject: [
    {
      code: '.class { height: 100vh; }',
      description: 'height with 100vh',
      message: messages.warning('height'),
    },
    {
      code: '.class { block-size: 100vb; }',
      description: 'block-size with 100vb',
      message: messages.warning('block-size'),
    },
    {
      code: '.class { max-height: 100vh; }',
      description: 'max-height with 100vh',
      message: messages.warning('max-height'),
    },
    {
      code: '.class { max-block-size: 100vb; }',
      description: 'max-block-size with 100vb',
      message: messages.warning('max-block-size'),
    },
    {
      code: '.class { height: 100VH; }',
      description: 'height with 100VH (uppercase)',
      message: messages.warning('height'),
    },
    {
      code: '.class { height: calc(100vh - 20px); }',
      description: 'calc with 100vh',
      message: messages.warning('height'),
    },
    {
      code: '.class { block-size: clamp(100vb, 50vb, 100vb); }',
      description: 'clamp with 100vb',
      message: messages.warning('block-size'),
    },
    {
      code: '.class { height: 100vh; block-size: 100vb; }',
      description: 'multiple properties with static viewport units',
      warnings: [
        {
          message: messages.warning('height'),
        },
        {
          message: messages.warning('block-size'),
        },
      ],
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true],
  fix: true,
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { height: 100dvh; }',
      description: 'dynamic viewport height (dvh)',
    },
  ],

  reject: [
    {
      code: '.class { height: 100vh; }',
      fixed: '.class { height: 100dvh; }',
      description: 'fix 100vh to 100dvh',
      message: messages.warning('height'),
    },
    {
      code: '.class { block-size: 100vb; }',
      fixed: '.class { block-size: 100dvb; }',
      description: 'fix 100vb to 100dvb',
      message: messages.warning('block-size'),
    },
    {
      code: '.class { height: 100VH; }',
      fixed: '.class { height: 100dvh; }',
      description: 'fix uppercase 100VH to 100dvh',
      message: messages.warning('height'),
    },
    {
      code: '.class { height: calc(100vh - 20px); }',
      fixed: '.class { height: calc(100dvh - 20px); }',
      description: 'fix 100vh inside calc',
      message: messages.warning('height'),
    },
    {
      code: '.class { block-size: clamp(100vb, 50vb, 100vb); }',
      fixed: '.class { block-size: clamp(100dvb, 50vb, 100dvb); }',
      description: 'fix multiple 100vb inside clamp',
      message: messages.warning('block-size'),
    },
    {
      code: '.class { height: 100vh; block-size: 100vb; }',
      fixed: '.class { height: 100dvh; block-size: 100dvb; }',
      description: 'fix multiple properties',
      warnings: [
        {
          message: messages.warning('height'),
        },
        {
          message: messages.warning('block-size'),
        },
      ],
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [
    true,
    { properties: { 'block-size': [true, { severity: 'warning' }], height: false } },
  ],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { height: 100vb; }',
      description: 'fixed viewport height with manual disable of height property check',
    },
  ],

  reject: [
    {
      code: '.class { block-size: 100vh; }',
      description: 'block-size with 100vh warning',
      message: messages.warning('block-size'),
    },
  ],
  /* eslint-enable sort-keys */
});
