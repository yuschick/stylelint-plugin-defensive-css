import { messages, name } from './meta';

/* Test the default configuration */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { display: grid; grid-template-columns: minmax(0, 1fr) 250px; }',
      description: 'grid-template-columns with minmax(0, 1fr) is acceptable',
    },
    {
      code: '.class { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); }',
      description:
        'grid-template-columns with repeat() wrapping minmax(0, 1fr) is acceptable',
    },
    {
      code: '.class { grid-template-columns: minmax(100px, 1fr); }',
      description: 'grid-template-columns with a non-zero minmax() minimum is acceptable',
    },
    {
      code: '.class { grid-template-columns: fit-content(1fr); }',
      description: 'grid-template-columns with 1fr inside fit-content() is acceptable',
    },
    {
      code: '.class { grid-template-columns: 250px 500px auto; }',
      description: 'grid-template-columns without any 1fr value is acceptable',
    },
    {
      code: '.class { grid-template-columns: repeat(3, 100px); }',
      description: 'grid-template-columns with fixed repeat() sizes is acceptable',
    },
    {
      code: '.class { grid-template-columns: repeat(3, minmax(0, 1fr)); }',
      description:
        'grid-template-columns with repeat() count wrapping minmax() is acceptable',
    },
    {
      code: '.class { grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); }',
      description:
        'grid-template-columns with auto-fit repeat() wrapping minmax() is acceptable',
    },
    {
      code: '.class { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }',
      description:
        'grid-template-columns with auto-fill repeat() wrapping minmax() is acceptable',
    },
    {
      code: '.class { grid-template-columns: minmax(0, 1fr) minmax(100px, 1fr); }',
      description:
        'grid-template-columns with multiple protected minmax() values is acceptable',
    },
    {
      code: '.class { grid-template-columns: fit-content(200px) minmax(0, 1fr); }',
      description:
        'grid-template-columns mixing fit-content() and minmax() is acceptable',
    },
    {
      code: '.class { grid-template-columns: 2fr 3fr; }',
      description: 'grid-template-columns with only non-1fr fr units is not flagged',
    },
    {
      code: '.class { grid-auto-columns: minmax(0, 1fr); }',
      description: 'grid-auto-columns with minmax(0, 1fr) is acceptable',
    },
    {
      code: '.class { grid-auto-columns: repeat(auto-fit, minmax(0, 1fr)); }',
      description:
        'grid-auto-columns with auto-fit repeat() wrapping minmax() is acceptable',
    },
    {
      code: '.class { grid-auto-columns: 100px; }',
      description: 'grid-auto-columns without any 1fr value is acceptable',
    },
    {
      code: '.class { grid-template-rows: 1fr 250px; }',
      description: 'grid-template-rows is not checked by this rule',
    },
    {
      code: '.class { grid-auto-rows: 1fr; }',
      description: 'grid-auto-rows is not checked by this rule',
    },
    {
      code: '.class { grid: 1fr / 1fr; }',
      description: 'grid shorthand is not checked by this rule',
    },
    {
      code: '.class { flex: 1 1 0; }',
      description: 'unrelated declarations are ignored',
    },
    {
      code: `.class { grid-template-columns: repeat(auto-fit, minmax(var(--min-width, 250px), 1fr)); }`,
      description: 'should allow 1fr as minmax() value',
    },
  ],
  reject: [
    {
      code: '.class { display: grid; grid-template-columns: 1fr 250px; }',
      description: 'grid-template-columns with a single raw 1fr is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: 1fr; }',
      description: 'grid-template-columns with only a raw 1fr is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: 1fr 1fr 1fr; }',
      description: 'grid-template-columns with multiple raw 1fr values is rejected once',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: 250px 1fr 2fr; }',
      description:
        'grid-template-columns mixing fixed, raw 1fr, and other fr units is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: repeat(3, 1fr); }',
      description: 'grid-template-columns with a raw 1fr inside repeat() is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: minmax(0, 1fr) 1fr; }',
      description:
        'grid-template-columns with a raw 1fr alongside a protected minmax() is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: fit-content(1fr) 1fr; }',
      description:
        'grid-template-columns with a raw 1fr alongside a protected fit-content() is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: repeat(auto-fit, 1fr); }',
      description:
        'grid-template-columns with a raw 1fr inside an auto-fit repeat() is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: repeat(auto-fill, 1fr); }',
      description:
        'grid-template-columns with a raw 1fr inside an auto-fill repeat() is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: repeat(2,1fr); }',
      description:
        'grid-template-columns with a raw 1fr inside repeat() with no spacing is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: repeat(2, minmax(0, 1fr)) 1fr; }',
      description:
        'grid-template-columns with a raw 1fr after a protected repeat() is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: minmax(0, 1fr) minmax(100px, 1fr) 1fr; }',
      description:
        'grid-template-columns with a raw 1fr among multiple protected minmax() values is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-auto-columns: 1fr; }',
      description: 'grid-auto-columns with a raw 1fr is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-auto-columns: 1fr 1fr; }',
      description: 'grid-auto-columns with multiple raw 1fr values is rejected once',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-auto-columns: minmax(0, 1fr) 1fr; }',
      description:
        'grid-auto-columns with a raw 1fr alongside a protected minmax() is rejected',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: 1fr; grid-auto-columns: 1fr; }',
      description:
        'both grid-template-columns and grid-auto-columns are reported independently',
      warnings: [{ message: messages.rejected() }, { message: messages.rejected() }],
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test the default configuration with autofix enabled */
testRule({
  config: [true],
  fix: true,
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { grid-template-columns: minmax(0, 1fr) 250px; }',
      description: 'already safe minmax(0, 1fr) is left unchanged',
    },
  ],
  reject: [
    {
      code: '.class { grid-template-columns: 1fr 250px; }',
      fixed: '.class { grid-template-columns: minmax(0, 1fr) 250px; }',
      description: 'fix a single raw 1fr to minmax(0, 1fr)',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: 1fr 1fr 1fr; }',
      fixed:
        '.class { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr); }',
      description: 'fix every raw 1fr to minmax(0, 1fr)',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: repeat(3, 1fr); }',
      fixed: '.class { grid-template-columns: repeat(3, minmax(0, 1fr)); }',
      description: 'fix a raw 1fr inside repeat()',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: minmax(0, 1fr) 1fr; }',
      fixed: '.class { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }',
      description: 'fix only the raw 1fr and leave the protected minmax() untouched',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: repeat(auto-fit, 1fr); }',
      fixed: '.class { grid-template-columns: repeat(auto-fit, minmax(0, 1fr)); }',
      description: 'fix a raw 1fr inside an auto-fit repeat()',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: repeat(auto-fill, 1fr); }',
      fixed: '.class { grid-template-columns: repeat(auto-fill, minmax(0, 1fr)); }',
      description: 'fix a raw 1fr inside an auto-fill repeat()',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: repeat(2, minmax(0, 1fr)) 1fr; }',
      fixed:
        '.class { grid-template-columns: repeat(2, minmax(0, 1fr)) minmax(0, 1fr); }',
      description: 'fix only the raw 1fr after a protected repeat()',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-template-columns: minmax(0, 1fr) minmax(100px, 1fr) 1fr; }',
      fixed:
        '.class { grid-template-columns: minmax(0, 1fr) minmax(100px, 1fr) minmax(0, 1fr); }',
      description: 'fix only the raw 1fr among multiple protected minmax() values',
      message: messages.rejected(),
    },
    {
      code: '.class { grid-auto-columns: 1fr; }',
      fixed: '.class { grid-auto-columns: minmax(0, 1fr); }',
      description: 'fix a raw 1fr on grid-auto-columns',
      message: messages.rejected(),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test the ignore configuration */
testRule({
  config: [true, { ignore: [/^\.grid-/, '.legacy-layout'] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.legacy-layout { grid-template-columns: 1fr 250px; }',
      description: 'ignored selector with exact string match is not flagged',
    },
    {
      code: '.grid-wrapper { grid-template-columns: 1fr; }',
      description: 'selector matching regex pattern is ignored',
    },
    {
      code: '.grid-wrapper { grid-auto-columns: 1fr 1fr; }',
      description: 'grid-auto-columns on an ignored selector is not flagged',
    },
    {
      code: '.grid-wrapper { .child { grid-template-columns: 1fr; } }',
      description:
        'declaration nested inside an ignored ancestor selector is not flagged',
    },
    {
      code: '.wrapper { .legacy-layout { grid-template-columns: 1fr 250px; } }',
      description:
        'declaration nested inside an ignored ancestor with an exact match is not flagged',
    },
  ],
  reject: [
    {
      code: '.other { grid-template-columns: 1fr 250px; }',
      description: 'non-ignored selector is still flagged',
      message: messages.rejected(),
    },
    {
      code: '.layout-grid { grid-template-columns: 1fr; }',
      description: 'selector not matching the anchored regex pattern is still flagged',
      message: messages.rejected(),
    },
    {
      code: '.wrapper { .child { grid-template-columns: minmax(0, 1fr) 1fr; } }',
      description:
        'raw 1fr is still flagged when no ancestor selector matches the ignore pattern',
      message: messages.rejected(),
    },
  ],
  /* eslint-enable sort-keys */
});
