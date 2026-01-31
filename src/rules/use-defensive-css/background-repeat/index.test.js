import rule from '../index.js';
const { messages, ruleName } = rule.rule;

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
    {
      code: `div { mask: url('some-image.jpg') repeat top center; }`,
      description: "Shorthand mask property with 'repeat' value.",
    },
    {
      code: `div { mask: url('some-image.jpg') repeat-x top center; }`,
      description: "Shorthand mask property with 'repeat-x' value.",
    },
    {
      code: `div { mask: url('some-image.jpg') repeat-y top center; }`,
      description: "Shorthand mask property with 'repeat-y' value.",
    },
    {
      code: `div { mask: url('some-image.jpg') no-repeat top center; }`,
      description: "Shorthand mask property with 'no-repeat' value.",
    },
    {
      code: `div { mask: url('some-image.jpg') round top center; }`,
      description: "Shorthand mask property with 'round' value.",
    },
    {
      code: `div { mask: url('some-image.jpg') space top center; }`,
      description: "Shorthand mask property with 'space' value.",
    },
    {
      code: `div { mask: url('some-image.jpg') space round top center; }`,
      description: "Shorthand mask property with 'space round' value.",
    },
    {
      code: `div { mask: url('some-image.jpg') black top center; mask-repeat: no-repeat; }`,
      description: 'Shorthand mask property with mask-repeat property.',
    },
    {
      code: `div { mask-image: url('some-image.jpg'); mask-repeat: no-repeat; }`,
      description: 'Using mask-image with mask-repeat properties.',
    },
    {
      code: `div { mask-image: linear-gradient(#e66465, #9198e5); }`,
      description:
        'Using a linear-gradient mask image without mask repeat is okay.',
    },
    {
      code: `div { mask-image: linear-gradient(#e66465, #9198e5), url('some-image.jpg'); mask-repeat: no-repeat; }`,
      description:
        'Using mask-image with gradient and url with mask-repeat property is okay.',
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
    {
      code: `div { mask: url('some-image.jpg') top center; }`,
      description: 'A shorthand mask property without a repeat property.',
      message: messages.maskRepeat(),
    },
    {
      code: `div { mask-image: url('some-image.jpg'); }`,
      description: 'A mask-image property without a mask-repeat property.',
      message: messages.maskRepeat(),
    },
    {
      code: `div { mask-image: linear-gradient(#e66465, #9198e5), url('some-image.jpg'); }`,
      description:
        'A mask-image property with both a gradient and url() but no mask-repeat property.',
      message: messages.maskRepeat(),
    },
  ],
});
