'use strict';

const {
  rule: { messages, ruleName },
} = require('./index.js');

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'accidental-hover': true }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `@media (hover: hover) { .btn:hover { color: black; } }`,
      description: 'Use media query for button hover state.',
    },
    {
      code: `@media (min-width: 1px) { @media (hover: hover) { .btn:hover { color: black; } } }`,
      description: 'Use nested media queries for button hover state.',
    },
    {
      code: `@media (hover: hover) { @media (min-width: 1px) { .btn:hover { color: black; } } }`,
      description:
        'Use nested media queries with hover as the parent for button hover state.',
    },
    {
      code: `@media (min-width: 1px) { @media (hover: hover) { @media (min-width: 1px) { .btn:hover { color: black; } } } }`,
      description:
        'Use nested media queries with hover in the middle for button hover state.',
    },
  ],

  reject: [
    {
      code: `.fail-btn:hover { color: black; }`,
      description: 'Use a hover pseudo selector not inside of a media query.',
      message: messages.accidentalHover(),
    },
    {
      code: `@media (min-width: 1px) { .btn:hover { color: black; } }`,
      description:
        'Use a hover pseudo selector inside of a min-width media query.',
      message: messages.accidentalHover(),
    },
  ],
});

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
    {
      code: `div { grid-template: var(--page-header-size) 1fr / max-content minmax(0, 1fr) max-content; }`,
      description:
        'Using grid template areas without a fallback but a comma elsewhere.',
      message: messages.customPropertyFallbacks(),
    },
  ],
});

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'custom-property-fallbacks': [true, { ignore: [/hel-/] }] }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { color: var(--hel-color-primary); }`,
      description: 'A custom property with an ignored namespace.',
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
  config: [
    true,
    { 'custom-property-fallbacks': [true, { ignore: [/hel-/, 'mis-'] }] },
  ],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { color: var(--hel-color-primary); }`,
      description: 'A custom property with an ignored namespace.',
    },
    {
      code: `div { color: var(--mis-color-primary); }`,
      description: 'A custom property with an ignored namespace.',
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
    {
      code: `div { display: inline-flex; flex-direction: column; }`,
      description: 'Allows inline flex with direction column.',
    },
  ],

  reject: [
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

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'scroll-chaining': true }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { overflow: auto; overscroll-behavior: contain; }`,
      description: 'A container with shorthand overflow auto property.',
    },
    {
      code: `div { overflow: hidden; }`,
      description: 'A container with shorthand overflow hidden property.',
    },
    {
      code: `div { overflow: scroll; overscroll-behavior: contain; }`,
      description: 'A container with shorthand overflow scroll property.',
    },
    {
      code: `div { overflow: auto hidden; overscroll-behavior: contain; }`,
      description: 'A container with shorthand overflow auto hidden property.',
    },
    {
      code: `div { overflow-x: hidden; }`,
      description: 'A container with overflow-x hidden property.',
    },
    {
      code: `div { overflow-x: auto; overscroll-behavior: contain; }`,
      description: 'A container with overflow-x auto property.',
    },
    {
      code: `div { overflow-x: auto; overflow-y: scroll; overscroll-behavior: contain; }`,
      description:
        'A container with overflow-x auto and overflow-y scroll property.',
    },
    {
      code: `div { overflow-block: auto; overscroll-behavior: contain; }`,
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
      message: messages.scrollChaining(),
    },
    {
      code: `div { overflow: auto hidden; }`,
      description: 'A container with shorthand overflow auto hidden property.',
      message: messages.scrollChaining(),
    },
    {
      code: `div { overflow-x: auto; }`,
      description: 'A container with overflow-x auto property.',
      message: messages.scrollChaining(),
    },
    {
      code: `div { overflow-y: scroll; }`,
      description: 'A container with overflow-y scroll property.',
      message: messages.scrollChaining(),
    },
    {
      code: `div { overflow-y: scroll; overflow-x: auto; }`,
      description:
        'A container with overflow-y scroll and overflow-x auto property.',
      message: messages.scrollChaining(),
    },
    {
      code: `div { overflow-block: scroll; overflow-inline: auto; }`,
      description:
        'A container with overflow-block scroll and overflow-inline auto property.',
      message: messages.scrollChaining(),
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
      code: `input::-webkit-input-placeholder { color: #222; } input::-moz-placeholder { color: #222; }`,
      description:
        'Split webkit and moz placeholder selectors to separate rules.',
    },
    {
      code: `input::-ms-input-placeholder { color: #222; } input::-o-placeholder { color: #222; }`,
      description:
        'Split webkit and moz placeholder selectors to separate rules.',
    },
    {
      code: `div::before,div::after { color: #222; }`,
      description:
        'Combining pseudo elements with the same selector into one rule.',
    },
    {
      code: `
      .tabs-pink--active strong,
      .tabs-pink--active svg,
      .tabs-pink:hover strong,
      .tab-type-2--active strong,
      .tab-type-2--active svg,
      .tab-type-2:hover strong,
      .tab-resource-item:hover {
          color: #e20072;
      }`,
      description:
        'Combining a bunch of selectors into one rule. See: https://github.com/yuschick/stylelint-plugin-defensive-css/issues/4',
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
