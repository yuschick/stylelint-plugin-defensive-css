'use strict';

const {
  rule: { messages, ruleName },
} = require('./index.js');

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'background-repeat': true }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { background: url('some-image.jpg') repeat black top center; }`,
      description: "Shorthand background property with 'repeat' value.",
    },
    {
      code: `div { background: url('some-image.jpg') repeat-x black top center; }`,
      description: "Shorthand background property with 'repeat-x' value.",
    },
    {
      code: `div { background: url('some-image.jpg') repeat-y black top center; }`,
      description: "Shorthand background property with 'repeat-y' value.",
    },
    {
      code: `div { background: url('some-image.jpg') no-repeat black top center; }`,
      description: "Shorthand background property with 'no-repeat' value.",
    },
    {
      code: `div { background: url('some-image.jpg') round black top center; }`,
      description: "Shorthand background property with 'round' value.",
    },
    {
      code: `div { background: url('some-image.jpg') space black top center; }`,
      description: "Shorthand background property with 'space' value.",
    },
    {
      code: `div { background: url('some-image.jpg') space round black top center; }`,
      description: "Shorthand background property with 'space round' value.",
    },
    {
      code: `div { background: url('some-image.jpg') black top center; background-repeat: no-repeat; }`,
      description:
        'Shorthand background property with background-repeat property.',
    },
    {
      code: `div { background-image: url('some-image.jpg'); background-repeat: no-repeat; }`,
      description: 'Using background-image with background-repeat properties.',
    },
    {
      code: `div { background-image: linear-gradient(#e66465, #9198e5); }`,
      description:
        'Using a linear-gradient background image without background repeat is okay.',
    },
    {
      code: `div { background-image: linear-gradient(#e66465, #9198e5), url('some-image.jpg'); background-repeat: no-repeat; }`,
      description:
        'Using background-image with gradient and url with background-repeat property is okay.',
    },
  ],

  reject: [
    {
      code: `div { background: url('some-image.jpg') black top center; }`,
      description: 'A shorthand background property without a repeat property.',
      message: messages.backgroundRepeat(),
    },
    {
      code: `div { background-image: url('some-image.jpg'); }`,
      description:
        'A background-image property without a background-repeat property.',
      message: messages.backgroundRepeat(),
    },
    {
      code: `div { background-image: linear-gradient(#e66465, #9198e5), url('some-image.jpg'); }`,
      description:
        'A background-image property with both a gradient and url() but no background-repeat property.',
      message: messages.backgroundRepeat(),
    },
  ],
});

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'custom-property-fallbacks': true }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { color: var(--color-primary, #000); }`,
      description: 'A custom property with a fallback color value.',
    },
  ],

  reject: [
    {
      code: `div { color: var(--color-primary); }`,
      description: 'A custom property without a fallback color value.',
      message: messages.customPropertyFallbacks(),
    },
  ],
});

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'flex-wrapping': true }],
  plugins: ['./index.js'],
  accept: [
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
  ],

  reject: [
    {
      code: `div { display: flex; }`,
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

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'vendor-prefix-grouping': true }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `input::-webkit-input-placeholder { color: #222; } input::-moz-placeholder { color: #222; } `,
      description:
        'Split webkit and moz placeholder selectors to separate rules.',
    },
    {
      code: `input::-ms-input-placeholder { color: #222; } input::-o-placeholder { color: #222; } `,
      description:
        'Split webkit and moz placeholder selectors to separate rules.',
    },
  ],

  reject: [
    {
      code: `input::-webkit-input-placeholder, input::-moz-placeholder { color: #222; }`,
      description: 'Using webkit and moz placeholder selectors.',
      message: messages.vendorPrefixWGrouping(),
    },
    {
      code: `input::-ms-input-placeholder, input::-o-placeholder { color: #222; }`,
      description: 'Using webkit and moz placeholder selectors.',
      message: messages.vendorPrefixWGrouping(),
    },
  ],
});
