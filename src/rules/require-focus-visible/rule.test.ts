import { messages, name } from '.';

testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.btn:focus-visible { outline: 2px solid blue; }',
      description: 'using :focus-visible',
    },
    {
      code: '.btn:focus-visible:hover { outline: 2px solid blue; }',
      description: 'using :focus-visible with other pseudo-classes',
    },
    {
      code: '.modal:focus-within { border: 1px solid blue; }',
      description: 'using :focus-within (acceptable alternative)',
    },
    {
      code: '.btn { color: black; }',
      description: 'no focus pseudo-class',
    },
    {
      code: '.btn:hover { color: blue; }',
      description: 'other pseudo-classes without focus',
    },
    {
      code: '.input:not(:focus) { border: 1px solid gray; }',
      description: ':focus inside :not() (intentional exclusion)',
    },
    {
      code: ':not(:focus):not(:focus-visible) { outline: none; }',
      description: 'multiple :not() with focus pseudo-classes',
    },
    {
      code: '.btn:focus-visible, .link:focus-visible { outline: 2px solid blue; }',
      description: 'grouped selectors with :focus-visible',
    },
    {
      code: '.focus-trap { display: block; }',
      description: 'class name contains "focus" but no pseudo-class',
    },
    {
      code: '[data-focus="true"] { outline: 2px solid blue; }',
      description: 'attribute selector with focus',
    },
    {
      code: '.btn::before:focus-visible { content: ""; }',
      description: ':focus-visible with pseudo-element',
    },
    {
      code: `
        .parent {
          .child:focus-visible {
            outline: 2px solid blue;
          }
        }
      `,
      description: 'nested selector with :focus-visible',
    },
  ],
  reject: [
    {
      code: '.btn:focus { outline: 2px solid blue; }',
      description: 'using :focus instead of :focus-visible',
      message: messages.rejected('.btn:focus'),
    },
    {
      code: 'button:focus { outline: none; }',
      description: 'removing outline with :focus',
      message: messages.rejected('button:focus'),
    },
    {
      code: '.input:focus:hover { border-color: blue; }',
      description: ':focus with other pseudo-classes',
      message: messages.rejected('.input:focus:hover'),
    },
    {
      code: '.input:hover:focus { border-color: blue; }',
      description: ':focus with other pseudo-classes',
      message: messages.rejected('.input:hover:focus'),
    },
    {
      code: 'a:link:focus { color: red; }',
      description: ':focus with :link pseudo-class',
      message: messages.rejected('a:link:focus'),
    },
    {
      code: '.btn:focus, .link:focus { outline: 2px solid blue; }',
      description: 'grouped selectors with :focus',
      message: messages.rejected('.btn:focus, .link:focus'),
    },
    {
      code: '.btn::before:focus { content: ""; }',
      description: ':focus with pseudo-element',
      message: messages.rejected('.btn::before:focus'),
    },
    {
      code: `
        .parent {
          .child:focus {
            outline: 2px solid blue;
          }
        }
      `,
      description: 'nested selector with :focus',
      message: messages.rejected('.child:focus'),
    },
  ],
  /* eslint-enable sort-keys */
});
