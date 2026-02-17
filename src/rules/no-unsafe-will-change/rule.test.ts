import { messages, name } from './meta';

/* Test when there is no 'ignore' option passed (default) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: 'div { will-change: auto; }',
      description: 'single default property',
    },
    {
      code: 'div { will-change: revert-layer; }',
      description: 'single default property',
    },
    {
      code: 'div { will-change: transform; }',
      description: 'single composite property',
    },
    {
      code: 'div { will-change: opacity; }',
      description: 'opacity only',
    },
    {
      code: 'div { will-change: transform, opacity; }',
      description: 'two composite properties (at limit)',
    },
    {
      code: '.button:hover { will-change: transform; }',
      description: 'composite property in pseudo-class',
    },
    {
      code: '@media (min-width: 768px) { div { will-change: opacity; } }',
      description: 'composite property in media query',
    },
    {
      code: 'div { will-change: -webkit-transform; }',
      description: 'webkit vendor prefix',
    },
    {
      code: 'div { will-change: -moz-transform; }',
      description: 'moz vendor prefix',
    },
    {
      code: 'div { will-change: -ms-transform; }',
      description: 'ms vendor prefix',
    },
    {
      code: 'div { will-change: -o-transform; }',
      description: 'opera vendor prefix',
    },
    {
      code: 'div { will-change: -webkit-filter; }',
      description: 'webkit filter',
    },
    {
      code: 'div { will-change: -webkit-backdrop-filter; }',
      description: 'webkit backdrop-filter',
    },
    {
      code: 'div { will-change: -webkit-transform, opacity; }',
      description: 'vendor prefix with standard property',
    },
  ],

  reject: [
    {
      code: 'div { will-change: transform, opacity, perspective; }',
      description: 'exceeds max properties (3 > 2)',
      message: messages.exceedsLimit(3, 2),
    },
    {
      code: '* { will-change: transform; }',
      description: 'universal selector',
      message: messages.invalidSelector('*'),
    },
    {
      code: '* { will-change: width, height, margin; }',
      description: 'will-change with multiple properties on a star selector',
      warnings: [
        { message: messages.invalidSelector('*') },
        { message: messages.exceedsLimit(3, 2) },
        { message: messages.invalidProperty('width, height, margin') },
      ],
    },
    {
      code: '.container > * { will-change: width; }',
      description: 'will-change inside a nested * selector',
      warnings: [
        { message: messages.invalidSelector('.container > *') },
        { message: messages.invalidProperty('width') },
      ],
    },
    {
      code: '.container > * { will-change: opacity; }',
      description: 'universal selector in descendant',
      message: messages.invalidSelector('.container > *'),
    },
    {
      code: 'div { will-change: transform, opacity, filter; }',
      description: 'exceeds max properties (3 > 2)',
      message: messages.exceedsLimit(3, 2),
    },
    {
      code: 'div { will-change: width; }',
      description: 'non-composite property (width)',
      message: messages.invalidProperty('width'),
    },
    {
      code: 'div { will-change: height; }',
      description: 'non-composite property (height)',
      message: messages.invalidProperty('height'),
    },
    {
      code: 'div { will-change: margin; }',
      description: 'non-composite property (margin)',
      message: messages.invalidProperty('margin'),
    },
    {
      code: 'div { will-change: top; }',
      description: 'non-composite property (top)',
      message: messages.invalidProperty('top'),
    },
    {
      code: 'div { will-change: width, height; }',
      description: 'multiple non-composite properties',
      message: messages.invalidProperty('width, height'),
    },
    {
      code: 'div { will-change: transform, width, opacity; }',
      description: 'mixed composite and non-composite',
      warnings: [
        {
          message: messages.exceedsLimit(3, 2),
        },
        {
          message: messages.invalidProperty('width'),
        },
      ],
    },
    {
      code: '* { will-change: width, height, margin; }',
      description: 'universal selector with multiple issues',
      warnings: [
        {
          message: messages.invalidSelector('*'),
        },
        {
          message: messages.exceedsLimit(3, 2),
        },
        {
          message: messages.invalidProperty('width, height, margin'),
        },
      ],
    },
    {
      code: 'div { will-change: -webkit-width; }',
      description: 'vendor prefix on non-composite property',
      message: messages.invalidProperty('-webkit-width'),
    },
    {
      code: 'div { will-change: -moz-box-sizing; }',
      description: 'moz prefix on non-composite property',
      message: messages.invalidProperty('-moz-box-sizing'),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { maxProperties: 3 }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: 'div { will-change: transform; }',
      description: 'single composite property',
    },
    {
      code: 'div { will-change: opacity; }',
      description: 'opacity only',
    },
    {
      code: 'div { will-change: transform, opacity; }',
      description: 'two composite properties (at limit)',
    },
    {
      code: '.button:hover { will-change: transform; }',
      description: 'composite property in pseudo-class',
    },
    {
      code: '@media (min-width: 768px) { div { will-change: opacity; } }',
      description: 'composite property in media query',
    },
    {
      code: 'div { will-change: -webkit-transform, -moz-transform, transform; }',
      description: 'three vendor-prefixed properties at limit',
    },
  ],

  reject: [
    {
      code: '* { will-change: transform; }',
      description: 'universal selector',
      message: messages.invalidSelector('*'),
    },
    {
      code: '* { will-change: width, height, margin, padding; }',
      description: 'will-change with multiple properties on a star selector',
      warnings: [
        { message: messages.invalidSelector('*') },
        { message: messages.exceedsLimit(4, 3) },
        { message: messages.invalidProperty('width, height, margin, padding') },
      ],
    },
    {
      code: '.container > * { will-change: width; }',
      description: 'will-change inside a nested * selector',
      warnings: [
        { message: messages.invalidSelector('.container > *') },
        { message: messages.invalidProperty('width') },
      ],
    },
    {
      code: '.container > * { will-change: opacity; }',
      description: 'universal selector in descendant',
      message: messages.invalidSelector('.container > *'),
    },
    {
      code: 'div { will-change: transform, opacity, filter, margin; }',
      description: 'exceeds max properties (4 > 3)',
      warnings: [
        { message: messages.exceedsLimit(4, 3) },
        { message: messages.invalidProperty('margin') },
      ],
    },
    {
      code: 'div { will-change: width; }',
      description: 'non-composite property (width)',
      message: messages.invalidProperty('width'),
    },
    {
      code: 'div { will-change: height; }',
      description: 'non-composite property (height)',
      message: messages.invalidProperty('height'),
    },
    {
      code: 'div { will-change: margin; }',
      description: 'non-composite property (margin)',
      message: messages.invalidProperty('margin'),
    },
    {
      code: 'div { will-change: top; }',
      description: 'non-composite property (top)',
      message: messages.invalidProperty('top'),
    },
    {
      code: 'div { will-change: width, height; }',
      description: 'multiple non-composite properties',
      message: messages.invalidProperty('width, height'),
    },
    {
      code: 'div { will-change: transform, width, opacity, height; }',
      description: 'mixed composite and non-composite',
      warnings: [
        {
          message: messages.exceedsLimit(4, 3),
        },
        {
          message: messages.invalidProperty('width, height'),
        },
      ],
    },
    {
      code: '* { will-change: width, height, margin, padding; }',
      description: 'universal selector with multiple issues',
      warnings: [
        {
          message: messages.invalidSelector('*'),
        },
        {
          message: messages.exceedsLimit(4, 3),
        },
        {
          message: messages.invalidProperty('width, height, margin, padding'),
        },
      ],
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { ignore: ['height', 'width'] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: 'div { will-change: width; }',
      description: 'width is ignored',
    },
    {
      code: 'div { will-change: height; }',
      description: 'height is ignored',
    },
    {
      code: 'div { will-change: width, height; }',
      description: 'both ignored properties',
    },
  ],

  reject: [
    {
      code: 'div { will-change: margin; }',
      description: 'non-ignored non-composite property',
      message: messages.invalidProperty('margin'),
    },
    {
      code: 'div { will-change: width, margin; }',
      description: 'mixed ignored and non-ignored',
      message: messages.invalidProperty('margin'),
    },
  ],
  /* eslint-enable sort-keys */
});
