import { messages, name } from './meta';

testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { user-select: auto; }',
      description: 'user-select: auto is acceptable',
    },
    {
      code: '.class { user-select: text; }',
      description: 'user-select: text is acceptable',
    },
    {
      code: '.class { user-select: all; }',
      description: 'user-select: all is acceptable',
    },
    {
      code: '.class { user-select: contain; }',
      description: 'user-select: contain is acceptable',
    },
    {
      code: '.class { user-select: inherit; }',
      description: 'user-select: inherit is acceptable.',
    },
    {
      code: '.class { user-select: initial; }',
      description: 'user-select: initial is acceptable',
    },
    {
      code: '.class { user-select: unset; }',
      description: 'user-select: unset is acceptable',
    },
    {
      code: '.class { user-select: revert; }',
      description: 'user-select: revert is acceptable',
    },
    {
      code: '.class { color: red; }',
      description: 'unrelated property is not checked',
    },
    {
      code: '.class { -webkit-user-select: text; }',
      description: '-webkit-user-select: text is acceptable',
    },
  ],
  reject: [
    {
      code: '.class { user-select: none; }',
      description: 'user-select: none is not acceptable',
      message: messages.rejected(),
    },
    {
      code: '.class { -webkit-user-select: none; }',
      description: '-webkit-user-select: none is not acceptable',
      message: messages.rejected(),
    },
    {
      code: '.a { user-select: none; } .b { user-select: text; }',
      description: 'only .a is flagged — .b has acceptable value',
      message: messages.rejected(),
    },
    {
      code: '@media (min-width: 768px) { .class { user-select: none; } }',
      description: 'user-select: none inside media query is still flagged',
      message: messages.rejected(),
    },
    {
      code: '.parent { .child { user-select: none; } }',
      description: 'user-select: none in nested CSS is flagged.',
      message: messages.rejected(),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { ignore: [/^\.icon-/, '.drag-handle'] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.drag-handle { user-select: none; }',
      description: 'ignored selector with exact string match',
    },
    {
      code: '.drag-handle { -webkit-user-select: none; }',
      description: 'ignored selector with vendor prefix',
    },
    {
      code: '.parent { .drag-handle { user-select: none; } }',
      description: 'ignored selector nested inside a parent',
    },
    {
      code: '.icon-btn { user-select: none; }',
      description: 'selector matching regex pattern is ignored',
    },
    {
      code: '.icon-close { user-select: none; }',
      description: 'another selector matching regex pattern is ignored',
    },
    {
      code: '.wrapper { .icon-btn { user-select: none; } }',
      description: 'nested selector matching regex is ignored via ancestor traversal',
    },
  ],
  reject: [
    {
      code: '.other { user-select: none; }',
      description: 'non-ignored selector is still flagged',
      message: messages.rejected(),
    },
    {
      code: '.btn-icon { user-select: none; }',
      description: 'selector not matching regex is still flagged',
      message: messages.rejected(),
    },
  ],
  /* eslint-enable sort-keys */
});
