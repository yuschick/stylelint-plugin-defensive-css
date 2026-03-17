import { messages, name } from './meta';

/* Test with supportedLayerNames option */
testRule({
  config: [true, { supportedLayerNames: ['ds.components'] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '@layer ds.components { div { color: red; } }',
      description: 'wrapped in supported layer name',
    },
    {
      code: '@layer ds.components { @media (min-width: 768px) { div { color: red; } } }',
      description: 'wrapped in supported layer with nested @media',
    },
    {
      code: '@layer ds.components { div { &:hover { color: blue; } } }',
      description: 'nested rule inside supported layer',
    },
  ],

  reject: [
    {
      code: 'div { color: red; }',
      description: 'not wrapped in a @layer rule',
      message: messages.notWrapped(['ds.components']),
    },
    {
      code: '@layer components { div { color: red; } }',
      description: 'wrapped in unsupported layer name',
      message: messages.unsupportedName('components', ['ds.components']),
    },
    {
      code: '@media (min-width: 768px) { div { color: red; } }',
      description: 'wrapped in @media but not @layer',
      message: messages.notWrapped(['ds.components']),
    },
    {
      code: 'div { color: red; background: white; @layer { font-size: 16px; } }',
      description: 'non-root level layer',
      message: messages.notWrapped(['ds.components']),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test without supportedLayerNames (any layer name accepted) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '@layer components { div { color: red; } }',
      description: 'wrapped in any @layer',
    },
    {
      code: '@layer utilities { .sr-only { position: absolute; } }',
      description: 'wrapped in another @layer name',
    },
  ],

  reject: [
    {
      code: 'div { color: red; }',
      description: 'not wrapped in any @layer rule',
      message: messages.notWrapped([]),
    },
    {
      code: '@media (min-width: 768px) { div { color: red; } }',
      description: 'wrapped in @media but not @layer',
      message: messages.notWrapped([]),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test with multiple supported layer names */
testRule({
  config: [true, { supportedLayerNames: ['ds.components', 'ds.utilities'] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '@layer ds.components { div { color: red; } }',
      description: 'wrapped in first supported layer',
    },
    {
      code: '@layer ds.utilities { .sr-only { position: absolute; } }',
      description: 'wrapped in second supported layer',
    },
  ],

  reject: [
    {
      code: '@layer theme { div { color: red; } }',
      description: 'wrapped in unsupported layer name',
      message: messages.unsupportedName('theme', ['ds.components', 'ds.utilities']),
    },
  ],
  /* eslint-enable sort-keys */
});
