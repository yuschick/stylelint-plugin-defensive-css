import rule from '../index.js';
const { messages, ruleName } = rule.rule;

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'flex-wrapping': true }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { display: flex; flex-flow: column; }`,
      description: 'A container with flex-flow: column defined.',
    },
    {
      code: `div { display: flex; flex-flow: column-reverse wrap; }`,
      description: 'A container with flex-flow: column wrap defined.',
    },
    {
      code: `div { display: flex; flex-flow: row wrap; }`,
      description: 'A container with flex-flow: row wrap defined.',
    },
    {
      code: `div { display: flex; flex-flow: row-reverse wrap; }`,
      description: 'A container with flex-flow: row-reverse wrap defined.',
    },
    {
      code: `div { display: flex; flex-flow: row nowrap; }`,
      description: 'A container with flex-flow: row nowrap defined.',
    },
    {
      code: `div { display: flex; flex-flow: row-reverse nowrap; }`,
      description: 'A container with flex-flow: row-reverse nowrap defined.',
    },
    {
      code: `div { display: flex; flex-wrap: nowrap; }`,
      description: 'A container with flex-wrap: wrap defined.',
    },
    {
      code: `div { display: flex; flex-wrap: wrap; }`,
      description: 'A container with flex-wrap: wrap defined.',
    },
    {
      code: `div { display: flex; flex-wrap: wrap-reverse; }`,
      description: 'A container with flex-wrap: wrap defined.',
    },
    {
      code: `div { display: flex; flex-direction: column; }`,
      description: 'Ignores flex column.',
    },
    {
      code: `div { display: flex; flex-direction: column-reverse; }`,
      description: 'Ignores flex column-reverse.',
    },
    {
      code: `div { display: flex; flex-direction: row; flex-wrap: wrap; }`,
      description: 'Ignores flex direction row.',
    },
    {
      code: `div { display: flex; flex-direction: row-reverse; flex-wrap: wrap-reverse; }`,
      description: 'Ignores flex direction row-reverse.',
    },
    {
      code: `div { display: inline-flex; flex-direction: column; }`,
      description: 'Allows inline flex with direction column.',
    },
  ],

  reject: [
    {
      code: `div { display: flex; flex-flow: row; }`,
      description: 'A flex flow container without a wrap property defined.',
      message: messages.flexWrapping(),
    },
    {
      code: `div { display: flex; flex-flow: row-reverse; }`,
      description: 'A flex flow container without a wrap property defined.',
      message: messages.flexWrapping(),
    },
    {
      code: `div { display: flex; }`,
      description: 'A flex container without a flex-wrap property defined.',
      message: messages.flexWrapping(),
    },
    {
      code: `div { display: inline-flex; }`,
      description: 'A flex container without a flex-wrap property defined.',
      message: messages.flexWrapping(),
    },
    {
      code: `div { display: flex; flex-direction: row; }`,
      description:
        'A flex container set to direction row but without a flex-wrap property defined.',
      message: messages.flexWrapping(),
    },
  ],
});
