import { messages, name } from './meta';

/* Test recommended at-rules behavior (default) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '@media (min-width: 125rem) { .class { width: 10rem; } }',
      description: 'media query with width rem value',
    },
    {
      code: '@container (min-width: 125rem) { .class { width: 10rem; } }',
      description: 'container query with width rem value',
    },
    {
      code: '@media (prefers-reduced-motion: reduce) { .class { width: 10rem; } }',
      description: 'media query with prefers-reduced-motion',
    },
    {
      code: '@media (width >= 48rem) { .class { width: 10rem; } }',
      description: 'range syntax with rem (>=)',
    },
    {
      code: '@media (width < 64rem) { .class { width: 10rem; } }',
      description: 'range syntax with rem (<)',
    },
    {
      code: '@media (48rem <= width <= 64rem) { .class { width: 10rem; } }',
      description: 'range syntax with rem (between)',
    },
    {
      code: '@media (min-resolution: 192dpi) { .class { width: 10rem; } }',
      description: 'resolution with dpi (not dimensional, allowed)',
    },
    {
      code: '@media (min-resolution: 2dppx) { .class { width: 10rem; } }',
      description: 'resolution with dppx (not dimensional, allowed)',
    },
  ],

  reject: [
    {
      code: '@media (min-width: 125px) and (max-width: 500px) { .class { width: 10px; } }',
      description: 'media query with width px value',
      warnings: [
        { message: messages.error('@media') },
        { message: messages.error('width') },
      ],
    },
    {
      code: '@media (min-width: 125px) and (max-width: 120rem) { .class { width: 10px; } }',
      description: 'media query with mixed width values',
      warnings: [
        { message: messages.error('@media') },
        { message: messages.error('width') },
      ],
    },
    {
      code: '@media (min-width: 125rem) and (max-width: 120px) { .class { width: 10px; } }',
      description: 'media query with mixed width values',
      warnings: [
        { message: messages.error('@media') },
        { message: messages.error('width') },
      ],
    },
    {
      code: '@container (min-width: 125px) { .class { width: 10px; } }',
      description: 'container query with mixed width values',
      warnings: [
        { message: messages.error('@container') },
        { message: messages.error('width') },
      ],
    },
    {
      code: '@container (min-width: 125rem) and (max-width: 120px) { .class { width: 10px; } }',
      description: 'container query with mixed width values',
      warnings: [
        { message: messages.error('@container') },
        { message: messages.error('width') },
      ],
    },
    {
      code: '@media (width >= 768px) { .class { width: 10px; } }',
      description: 'range syntax with px (>=)',
      warnings: [
        { message: messages.error('@media') },
        { message: messages.error('width') },
      ],
    },
    {
      code: '@media (width < 1024px) { .class { width: 10px; } }',
      description: 'range syntax with px (<)',
      warnings: [
        { message: messages.error('@media') },
        { message: messages.error('width') },
      ],
    },
    {
      code: '@media (768px <= width <= 1024px) { .class { width: 10px; } }',
      description: 'range syntax with px (between)',
      warnings: [
        { message: messages.error('@media') },
        { message: messages.error('width') },
      ],
    },
    {
      code: '@media (768px <= width) { .class { width: 10px; } }',
      description: 'range syntax with px on left side',
      warnings: [
        { message: messages.error('@media') },
        { message: messages.error('width') },
      ],
    },
    {
      code: '@media (width >= 48rem) and (height >= 600px) { .class { width: 10px; } }',
      description: 'mixed range syntax with one px value',
      warnings: [
        { message: messages.error('@media') },
        { message: messages.error('width') },
      ],
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test recommended property values behavior (default) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { width: 10rem; }',
      description: 'width rem value',
    },
    {
      code: '.class { min-width: 100px; }',
      description: 'min-width px value',
    },
    {
      code: '.class { margin: 1rem 1.5em; }',
      description: 'margin with non-px values',
    },
    {
      code: '.box { width: 50%; }',
      description: 'width with percentage',
    },
    {
      code: '.box { height: 100vh; }',
      description: 'height with viewport unit',
    },
    {
      code: '.box { margin: 1rem 2rem; }',
      description: 'margin with all rem values',
    },
    {
      code: '.box { padding: 0; }',
      description: 'padding with 0',
    },
    {
      code: '.box { padding: 0px; }',
      description: 'padding with 0px',
    },
    {
      code: '.box { width: var(--width); }',
      description: 'width with custom property',
    },
    {
      code: '.box { min-width: 100px; }',
      description: 'min-width with px (not in config, allowed)',
    },
    {
      code: '.box { min-height: 200px; }',
      description: 'min-height with px (not in config, allowed)',
    },
    {
      code: '.box { gap: 0; }',
      description: 'gap with 0',
    },
    {
      code: '.box { padding: 1rem 2rem 3rem 4rem; }',
      description: 'padding with all rem values (4 values)',
    },
    {
      code: '.box { display: grid; grid-template-columns: 1fr 2fr; }',
      description: 'grid display with fractional units',
    },
    {
      code: '.box { display: grid; grid: 1fr 2fr / 2fr 1fr; }',
      description: 'grid shorthand with fractional units',
    },
  ],

  reject: [
    {
      code: '.class { width: 10px; }',
      description: 'width px value',
      message: messages.error('width'),
    },
    {
      code: '.class { margin: 10px 1rem 15px 1rem; }',
      description: 'margin px value',
      message: messages.warning('margin'),
    },
    {
      code: '.box { margin: 10px 20px; }',
      description: 'margin with all px values',
      message: messages.warning('margin'),
    },
    {
      code: '.box { padding: 10px 20px 30px 40px; }',
      description: 'padding with all px values (4 values)',
      message: messages.warning('padding'),
    },
    {
      code: '.box { padding: 1rem 2rem 10px 1rem; }',
      description: 'padding with mixed units including px',
      message: messages.warning('padding'),
    },
    {
      code: '.box { margin: 0 20px; }',
      description: 'margin with 0 and px',
      message: messages.warning('margin'),
    },
    {
      code: '.box { gap: 16px; }',
      description: 'gap with px',
      message: messages.warning('gap'),
    },
    {
      code: '.box { line-height: 24px; }',
      description: 'line-height with px',
      message: messages.warning('line-height'),
    },
    {
      code: '.box { grid-template-columns: 24px 1fr; }',
      description: 'grid-template-columns with px',
      message: messages.error('grid-template-columns'),
    },
    {
      code: '.box { grid: 24px 1fr / 1fr 2fr; }',
      description: 'grid shorthand with px',
      message: messages.error('grid'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test recommended property function values behavior (default) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { width: clamp(100px, 50vi, 500px); }',
      description: 'clamp with px, vi, px values',
    },
    {
      code: '.class { width: calc(100% - calc(25px * 2)); }',
      description: 'calc with percentage and px values',
    },
    {
      code: '.class { width: calc(100% - 25px); }',
      description: 'calc with percentage and px',
    },
    {
      code: '.class { width: min(500px, 100%); }',
      description: 'min with px and percentage',
    },
    {
      code: '.class { width: min(500px, 50vw); }',
      description: 'min with px and vw',
    },
    {
      code: '.class { width: max(300px, 50%); }',
      description: 'max with px and percentage',
    },
    {
      code: '.class { width: max(300px, 20rem); }',
      description: 'max with px and rem',
    },
    {
      code: '.class { width: clamp(200px, 50%, 800px); }',
      description: 'clamp with px, percentage, px',
    },
    {
      code: '.grid { grid-template-columns: repeat(3, 1fr); }',
      description: 'repeat with fr',
    },
    {
      code: '.grid { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }',
      description: 'repeat with minmax containing fr',
    },
    {
      code: '.grid { grid-template-columns: minmax(100px, 1fr); }',
      description: 'minmax with px and fr',
    },
    {
      code: '.grid { grid-template-columns: minmax(10%, 500px); }',
      description: 'minmax with percentage and px',
    },
    {
      code: '.box { transform: translate(10px, 2rem); }',
      description: 'translate with px and rem',
    },
    {
      code: '.box { transform: translateX(50%); }',
      description: 'translateX with percentage',
    },
    {
      code: '.box { transform: translateY(2rem); }',
      description: 'translateY with rem',
    },
    {
      code: '.box { padding: calc(1rem + 10px); }',
      description: 'calc with rem and px',
    },
    {
      code: '.box { width: calc(100vw - 20px); }',
      description: 'calc with vw and px',
    },
  ],

  reject: [
    {
      code: '.class { width: calc(25px - calc(10px * 2)); }',
      description: 'width with calc px values',
      message: messages.error('width'),
    },
    {
      code: '.class { width: calc(25px * 2); }',
      description: 'calc with only px',
      message: messages.error('width'),
    },
    {
      code: '.class { width: min(500px, 800px); }',
      description: 'min with only px values',
      message: messages.error('width'),
    },
    {
      code: '.class { width: max(300px, 600px); }',
      description: 'max with only px values',
      message: messages.error('width'),
    },
    {
      code: '.class { width: clamp(200px, 400px, 800px); }',
      description: 'clamp with only px values',
      message: messages.error('width'),
    },
    {
      code: '.grid { grid-template-columns: repeat(3, 100px); }',
      description: 'repeat with only px',
      message: messages.error('grid-template-columns'),
    },
    {
      code: '.grid { grid-template-columns: minmax(100px, 500px); }',
      description: 'minmax with only px values',
      message: messages.error('grid-template-columns'),
    },
    {
      code: '.box { padding: calc(10px + 5px); }',
      description: 'calc with only px in padding',
      message: messages.warning('padding'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test custom property function values behavior */
testRule({
  config: [true, { properties: { transform: true, translate: true }, severity: 'error' }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { translate: 1rem -1rem; }',
      description: 'translate with rem values',
    },
    {
      code: '.class { transform: translate(100%, -25%); }',
      description: 'translate with percentage values',
    },
  ],

  reject: [
    {
      code: '.class { translate: 10px 20px; }',
      description: 'translate with px values',
      message: messages.error('translate'),
    },
    {
      code: '.class { transform: translate(10px, 20px); }',
      description: 'transform with px values',
      message: messages.error('transform'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test additional critical properties */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { font-size: 1.5rem; }',
      description: 'font-size with rem',
    },
    {
      code: '.class { height: 50vh; }',
      description: 'height with vh',
    },
    {
      code: '.class { block-size: 100%; }',
      description: 'block-size with percentage',
    },
    {
      code: '.class { inline-size: 80vw; }',
      description: 'inline-size with vw',
    },
    {
      code: '.class { max-width: 100%; }',
      description: 'max-width with percentage',
    },
    {
      code: '.class { max-height: 90vh; }',
      description: 'max-height with vh',
    },
    {
      code: '.class { grid-template-rows: 1fr auto 2fr; }',
      description: 'grid-template-rows with fr and auto',
    },
  ],

  reject: [
    {
      code: '.class { font-size: 16px; }',
      description: 'font-size with px',
      message: messages.error('font-size'),
    },
    {
      code: '.class { height: 200px; }',
      description: 'height with px',
      message: messages.error('height'),
    },
    {
      code: '.class { block-size: 150px; }',
      description: 'block-size with px',
      message: messages.error('block-size'),
    },
    {
      code: '.class { inline-size: 300px; }',
      description: 'inline-size with px',
      message: messages.error('inline-size'),
    },
    {
      code: '.class { max-width: 1200px; }',
      description: 'max-width with px',
      message: messages.error('max-width'),
    },
    {
      code: '.class { max-height: 600px; }',
      description: 'max-height with px',
      message: messages.error('max-height'),
    },
    {
      code: '.class { grid-template-rows: 100px auto 200px; }',
      description: 'grid-template-rows with px',
      message: messages.error('grid-template-rows'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test spacing properties (individual sides) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { padding-top: 1rem; }',
      description: 'padding-top with rem',
    },
    {
      code: '.class { margin-bottom: 2em; }',
      description: 'margin-bottom with em',
    },
    {
      code: '.class { padding-inline-start: 1.5rem; }',
      description: 'padding-inline-start with rem',
    },
    {
      code: '.class { margin-block-end: 2rem; }',
      description: 'margin-block-end with rem',
    },
    {
      code: '.class { row-gap: 1rem; }',
      description: 'row-gap with rem',
    },
    {
      code: '.class { column-gap: 2em; }',
      description: 'column-gap with em',
    },
  ],

  reject: [
    {
      code: '.class { padding-left: 20px; }',
      description: 'padding-left with px',
      message: messages.warning('padding-left'),
    },
    {
      code: '.class { margin-top: 15px; }',
      description: 'margin-top with px',
      message: messages.warning('margin-top'),
    },
    {
      code: '.class { padding-block-start: 10px; }',
      description: 'padding-block-start with px',
      message: messages.warning('padding-block-start'),
    },
    {
      code: '.class { margin-inline-end: 25px; }',
      description: 'margin-inline-end with px',
      message: messages.warning('margin-inline-end'),
    },
    {
      code: '.class { row-gap: 12px; }',
      description: 'row-gap with px',
      message: messages.warning('row-gap'),
    },
    {
      code: '.class { column-gap: 16px; }',
      description: 'column-gap with px',
      message: messages.warning('column-gap'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test typography properties */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { line-height: 1.5; }',
      description: 'line-height with unitless value',
    },
    {
      code: '.class { line-height: 1.5em; }',
      description: 'line-height with em',
    },
    {
      code: '.class { letter-spacing: 0.05em; }',
      description: 'letter-spacing with em',
    },
    {
      code: '.class { word-spacing: 0.25rem; }',
      description: 'word-spacing with rem',
    },
  ],

  reject: [
    {
      code: '.class { line-height: 24px; }',
      description: 'line-height with px',
      message: messages.warning('line-height'),
    },
    {
      code: '.class { letter-spacing: 2px; }',
      description: 'letter-spacing with px',
      message: messages.warning('letter-spacing'),
    },
    {
      code: '.class { word-spacing: 4px; }',
      description: 'word-spacing with px',
      message: messages.warning('word-spacing'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test edge cases and special values */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { width: auto; }',
      description: 'width with auto keyword',
    },
    {
      code: '.class { height: fit-content; }',
      description: 'height with fit-content keyword',
    },
    {
      code: '.class { width: max-content; }',
      description: 'width with max-content keyword',
    },
    {
      code: '.class { width: min-content; }',
      description: 'width with min-content keyword',
    },
    {
      code: '.class { width: var(--custom-width); }',
      description: 'width with CSS custom property',
    },
    {
      code: '.class { padding: var(--spacing-md); }',
      description: 'padding with CSS custom property',
    },
    {
      code: '.class { margin: 0; }',
      description: 'margin with zero (no unit)',
    },
    {
      code: '.class { padding: 0px; }',
      description: 'padding with 0px',
    },
    {
      code: '.class { width: calc(var(--width) - 20px); }',
      description: 'calc with custom property and px',
    },
  ],

  reject: [
    {
      code: '.class { width: fit-content(200px); }',
      description: 'fit-content function with px argument',
      message: messages.error('width'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test disabling properties via config */
testRule({
  config: [true, { properties: { margin: false, width: false } }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { width: 100px; }',
      description: 'width with px when disabled',
    },
    {
      code: '.class { margin: 20px 30px; }',
      description: 'margin with px when disabled',
    },
  ],

  reject: [
    {
      code: '.class { height: 100px; }',
      description: 'height still validated when width is disabled',
      message: messages.error('height'),
    },
    {
      code: '.class { padding: 20px; }',
      description: 'padding still validated when margin is disabled',
      message: messages.warning('padding'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test changing severity levels */
testRule({
  config: [
    true,
    {
      properties: {
        padding: [true, { severity: 'error' }],
        width: [true, { severity: 'warning' }],
      },
    },
  ],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { width: 50%; }',
      description: 'width with percentage',
    },
    {
      code: '.class { padding: 1rem; }',
      description: 'padding with rem',
    },
  ],

  reject: [
    {
      code: '.class { width: 100px; }',
      description: 'width with px (changed to warning)',
      message: messages.warning('width'),
    },
    {
      code: '.class { padding: 20px; }',
      description: 'padding with px (changed to error)',
      message: messages.error('padding'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test at-rule configuration */
testRule({
  config: [true, { 'at-rules': { '@media': false } }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '@media (min-width: 768px) { .class { width: 10rem; } }',
      description: 'media query with px when disabled',
    },
  ],

  reject: [
    {
      code: '@container (min-width: 768px) { .class { width: 10rem; } }',
      description: 'container query still validated when media is disabled',
      message: messages.error('@container'),
    },
  ],
  /* eslint-enable sort-keys */
});
