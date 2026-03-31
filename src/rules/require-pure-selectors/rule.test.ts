import { messages, name } from './meta';

testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { color: red; }',
      description: 'class selector',
    },
    {
      code: '.nav-item .link { color: red; }',
      description: 'chained class selectors',
    },
    {
      code: '#header { color: red; }',
      description: 'ID selector',
    },
    {
      code: '.button[disabled] { color: red; }',
      description: 'classname with attribute selector ',
    },
    {
      code: '.card .button { color: red; }',
      description: 'chained class selectors',
    },
    {
      code: '.card button { color: red; }',
      description: 'mixed class and tag selector in loose mode',
    },
    {
      code: '.btn:hover { color: blue; }',
      description: 'class with pseudo-class',
    },
    {
      code: '.card::before { color: blue; }',
      description: 'class with pseudo-element',
    },
    {
      code: ':root{ color: blue; }',
      description: 'root pseudo-class',
    },
    {
      code: '.btn:not(.is-disabled) { cursor: pointer; }',
      description: 'complex pseudo-class on class',
    },
    {
      code: '.input-group > .input-field { width: 100%; }',
      description: 'child combinator with pure selectors',
    },
    {
      code: '::selection { background: yellow; }',
      description: 'standalone pseudo-element (usually global)',
    },
    {
      code: '.card { .btn { background: yellow; } }',
      description: 'nested class selectors',
    },
    {
      code: '.link[target="_blank"] { color: blue; }',
      description: 'class with attribute (should pass because it is attached to a class)',
    },
    {
      code: '.input-field[aria-invalid="true"] { border-color: red; }',
      description: 'class with state attribute',
    },
    {
      code: ':where(.btn, #cta) { color: red; }',
      description: 'pseudo-class wrapper containing pure selectors',
    },
    {
      code: '.item:is(.active, .disabled) { color: red; }',
      description: 'is() with pure selector branches',
    },
    {
      code: '.item:not(.disabled) { color: red; }',
      description: 'not() with pure selector branch',
    },
  ],

  reject: [
    {
      code: 'div { color: red; }',
      description: 'a generic div selector only',
      message: messages.rejected('div'),
    },
    {
      code: 'ul > li { color: red; }',
      description: 'a list item with a child selector',
      message: messages.rejected('ul > li'),
    },
    {
      code: 'input { color: red; }',
      description: 'an input element selector',
      message: messages.rejected('input'),
    },
    {
      code: '[aria-disabled="true"] { color: red; }',
      description: 'an attribute selector',
      message: messages.rejected('[aria-disabled="true"]'),
    },
    {
      code: '.card { button:active { color: red; } }',
      description: 'nested element selector with pseudo-class',
      message: messages.rejected('button:active'),
    },
    {
      code: 'button:active { color: red; }',
      description: 'a button with a pseudo-class',
      message: messages.rejected('button:active'),
    },
    {
      code: '* { box-sizing: border-box; }',
      description: 'universal selector',
      message: messages.rejected('*'),
    },
    {
      code: '@media (min-width: 768px) { div { display: flex; } }',
      description: 'tag selector inside media query',
      message: messages.rejected('div'),
    },
    {
      code: 'header nav ul li a { text-decoration: none; }',
      description: 'deeply nested tag selectors',
      message: messages.rejected('header nav ul li a'),
    },
    {
      code: 'input[type="checkbox"] + label { display: inline; }',
      description: 'mixed tags and attributes',
      message: messages.rejected('input[type="checkbox"] + label'),
    },
    {
      code: ':where(button) { color: red; }',
      description: 'pseudo-class wrapper containing only a tag selector',
      message: messages.rejected(':where(button)'),
    },
    {
      code: '.btn, button { color: red; }',
      description: 'selector list with one impure selector',
      message: messages.rejected('.btn, button'),
    },
    {
      code: '.card { span { color: red; } }',
      description: 'nested tag selector',
      message: messages.rejected('span'),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { ignoreAttributeModifiers: true }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: 'button[disabled] { color: red; }',
      description: 'button with attribute selector ',
    },
  ],
  reject: [
    {
      code: '[hidden] { display: none }',
      description: 'a global attribute selector',
      message: messages.rejected('[hidden]'),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { ignoreAttributeSelectors: true }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: 'button[disabled] { color: red; }',
      description: 'button with attribute selector using legacy option',
    },
  ],
  reject: [
    {
      code: '[hidden] { display: none }',
      description: 'global attribute selector remains invalid with legacy option',
      message: messages.rejected('[hidden]'),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { ignoreElements: ['button'] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: 'button { color: red; }',
      description: 'button element selector',
    },
    {
      code: 'button:hover { color: blue; }',
      description: 'button element with pseudo-class',
    },
    {
      code: 'button[type=reset] { color: red; }',
      description: 'button element with attribute selector',
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { ignoreElements: ['*'] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '* { box-sizing: border-box; }',
      description: 'universal selector ignored through ignoreElements',
    },
  ],
  reject: [
    {
      code: 'section { display: block; }',
      description: 'non-ignored element selectors are still rejected',
      message: messages.rejected('section'),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { strict: true }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.btn { color: red; }',
      description: 'a .btn class selector',
    },
    {
      code: '.btn:hover { color: blue; }',
      description: 'a .btn class selector with pseudo-class',
    },
    {
      code: '.btn[type=reset] { color: red; }',
      description: 'a .btn class selector with attribute selector',
    },
    {
      code: '.btn, #header { color: red; }',
      description: 'selector list containing only pure selectors',
    },
    {
      code: '::selection { background: yellow; }',
      description: 'standalone pseudo-element selector',
    },
  ],
  reject: [
    {
      code: '[hidden] { display: none }',
      description: 'a global attribute selector',
      message: messages.rejected('[hidden]'),
    },
    {
      code: 'button { display: none }',
      description: 'a button tag selector',
      message: messages.rejected('button'),
    },
    {
      code: '.table td { display: none }',
      description: 'a table cell tag selector',
      message: messages.rejected('.table td'),
    },
    {
      code: 'a.link { color: red; }',
      description: 'compound selector with class and element tag in strict mode',
      message: messages.rejected('a.link'),
    },
    {
      code: '.card button { color: red; }',
      description: 'mixed class and element tag selector in strict mode',
      message: messages.rejected('.card button'),
    },
    {
      code: '.btn, button { color: red; }',
      description: 'selector list with impure branch in strict mode',
      message: messages.rejected('.btn, button'),
    },
    {
      code: ':where(button) { color: red; }',
      description: 'tag selector wrapped in pseudo-class in strict mode',
      message: messages.rejected(':where(button)'),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { ignoreElements: ['button'], strict: true }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: 'button { color: red; }',
      description: 'a button tag selector',
    },
    {
      code: '.card button { color: red; }',
      description: 'mixed selector with ignored element tag in strict mode',
    },
    {
      code: 'button[disabled] { color: red; }',
      description: 'ignored element tag with attribute selector in strict mode',
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { ignoreAttributeModifiers: true, strict: true }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: 'button[disabled] { color: red; }',
      description: 'a button tag with [disabled] attribute selector',
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { ignoreAttributeSelectors: true, strict: true }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: 'button[disabled] { color: red; }',
      description: 'legacy option allows element attribute selector in strict mode',
    },
  ],
  reject: [
    {
      code: '[hidden] { display: none }',
      description: 'legacy option still rejects global attribute selector in strict mode',
      message: messages.rejected('[hidden]'),
    },
  ],
  /* eslint-enable sort-keys */
});
