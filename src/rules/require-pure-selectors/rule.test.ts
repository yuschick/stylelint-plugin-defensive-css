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
  ],

  reject: [
    {
      code: 'div { color: red; }',
      description: 'a generic div selector only',
      message: messages.rejected('div'),
    },
    {
      code: '.card div { color: red; }',
      description: 'a classname with a descendant div selector',
      message: messages.rejected('.card div'),
    },
    {
      code: 'a.link { color: red; }',
      description: 'an anchor with a class selector',
      message: messages.rejected('a.link'),
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
      code: '.btn, button { color: red; }',
      description: 'mixed pure and impure selectors',
      message: messages.rejected('.btn, button'),
    },
    {
      code: '.label + input { color: red; }',
      description: 'mixed pure and impure selectors',
      message: messages.rejected('.label + input'),
    },
    {
      code: '.title ~ p { color: red; }',
      description: 'mixed pure and impure selectors',
      message: messages.rejected('.title ~ p'),
    },
    {
      code: '* { box-sizing: border-box; }',
      description: 'universal selector',
      message: messages.rejected('*'),
    },
    {
      code: '.container * { box-sizing: border-box; }',
      description: 'universal selector within a container',
      message: messages.rejected('.container *'),
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
      code: '.article p::first-line { font-weight: bold; }',
      description: 'pseudo-element on tag descendant',
      message: messages.rejected('.article p::first-line'),
    },
    {
      code: 'input[type="checkbox"] + label { display: inline; }',
      description: 'mixed tags and attributes',
      message: messages.rejected('input[type="checkbox"] + label'),
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
  config: [true, { ignoreAttributeSelectors: true }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: 'button[disabled] { color: red; }',
      description: 'button with attribute selector ',
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
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { allowWhenScoped: true }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.card td { color: red; }',
      description: 'element as flat descendant of class',
    },
    {
      code: '.card > td { color: red; }',
      description: 'element as flat child of class',
    },
    {
      code: '.doc-table thead td { color: red; }',
      description: 'element chain with class ancestor',
    },
    {
      code: '.card { td { color: red; } }',
      description: 'element nested under class parent',
    },
    {
      code: '.card { span { color: red; } }',
      description: 'element nested under class via parent walk',
    },
    {
      code: '.card { thead { td { color: red; } } }',
      description: 'deeply nested element with class ancestor',
    },
    {
      code: '#main td { color: red; }',
      description: 'element scoped under ID',
    },
    {
      code: '.card * { box-sizing: border-box; }',
      description: 'universal selector scoped under class',
    },
    {
      code: '.card { @media (min-width: 768px) { td { color: red; } } }',
      description: 'element nested under class with at-rule in between',
    },
    {
      code: '.card { &.active td { color: red; } }',
      description: 'nesting selector with class in flat selector',
    },
  ],

  reject: [
    {
      code: 'td { color: red; }',
      description: 'bare element selector',
      message: messages.rejected('td'),
    },
    {
      code: 'div td { color: red; }',
      description: 'element under element with no class',
      message: messages.rejected('div td'),
    },
    {
      code: 'div { td { color: red; } }',
      description: 'element nested under element with no class ancestor',
      warnings: [
        { message: messages.rejected('div') },
        { message: messages.rejected('td') },
      ],
    },
    {
      code: '.card + td { color: red; }',
      description: 'adjacent sibling combinator does not scope',
      message: messages.rejected('.card + td'),
    },
    {
      code: '.card ~ td { color: red; }',
      description: 'general sibling combinator does not scope',
      message: messages.rejected('.card ~ td'),
    },
    {
      code: '.card td, span { color: red; }',
      description: 'unscoped entry in selector list',
      message: messages.rejected('.card td, span'),
    },
    {
      code: '* { box-sizing: border-box; }',
      description: 'bare universal selector',
      message: messages.rejected('*'),
    },
  ],
  /* eslint-enable sort-keys */
});
