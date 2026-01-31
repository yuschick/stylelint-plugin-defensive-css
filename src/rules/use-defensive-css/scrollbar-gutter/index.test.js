import rule from '../index.js';
const { messages, ruleName } = rule.rule;

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'scrollbar-gutter': true }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { overflow: auto; scrollbar-gutter: auto; }`,
      description: 'A container with shorthand overflow auto property.',
    },
    {
      code: `div { overflow: hidden; }`,
      description: 'A container with shorthand overflow hidden property.',
    },
    {
      code: `div { overflow: scroll; scrollbar-gutter: stable; }`,
      description: 'A container with shorthand overflow scroll property.',
    },

    {
      code: `div { overflow: auto hidden; scrollbar-gutter: stable both-edges; }`,
      description: 'A container with shorthand overflow auto hidden property.',
    },
    {
      code: `div { overflow-x: hidden; }`,
      description: 'A container with overflow-x hidden property.',
    },
    {
      code: `div { overflow-x: auto; scrollbar-gutter: stable; }`,
      description: 'A container with overflow-x auto property.',
    },
    {
      code: `div { overflow-x: auto; overflow-y: scroll; scrollbar-gutter: stable; }`,
      description:
        'A container with overflow-x auto and overflow-y scroll property.',
    },
    {
      code: `div { overflow-block: auto; scrollbar-gutter: stable; }`,
      description: 'A container with overflow-block auto property.',
    },
    {
      code: `div { overflow-inline: hidden; }`,
      description: 'A container with overflow-inline hidden property.',
    },
    {
      code: `div { overflow-anchor: auto; }`,
      description:
        'A container with overflow-anchor property which should be ignored.',
    },
  ],

  reject: [
    {
      code: `div { overflow: auto; }`,
      description: 'A container with shorthand overflow auto property.',
      message: messages.scrollbarGutter(),
    },
    {
      code: `div { overflow: auto hidden; }`,
      description: 'A container with shorthand overflow auto hidden property.',
      message: messages.scrollbarGutter(),
    },
    {
      code: `div { overflow-x: auto; }`,
      description: 'A container with overflow-x auto property.',
      message: messages.scrollbarGutter(),
    },
    {
      code: `div { overflow-y: scroll; }`,
      description: 'A container with overflow-y scroll property.',
      message: messages.scrollbarGutter(),
    },
    {
      code: `div { overflow-y: scroll; overflow-x: auto; }`,
      description:
        'A container with overflow-y scroll and overflow-x auto property.',
      message: messages.scrollbarGutter(),
    },
    {
      code: `div { overflow-block: scroll; overflow-inline: auto; }`,
      description:
        'A container with overflow-block scroll and overflow-inline auto property.',
      message: messages.scrollbarGutter(),
    },
  ],
});
