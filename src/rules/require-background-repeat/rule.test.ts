import { messages, name } from './meta';

/* Test when both background-repeat and mask-repeat are enabled (default) */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { background-image: url("image.jpg"); background-repeat: no-repeat; }',
      description: 'background-image with background-repeat',
    },
    {
      code: '.class { mask-image: url("mask.svg"); mask-repeat: no-repeat; }',
      description: 'mask-image with mask-repeat',
    },
    {
      code: '.class { background: url("image.jpg") no-repeat; }',
      description: 'background shorthand includes repeat value',
    },
    {
      code: '.class { mask: url("mask.svg") repeat-x; }',
      description: 'mask shorthand includes repeat value',
    },
    {
      code: '.class { background: url(img.jpg) center repeat-y; }',
      description: 'background shorthand includes repeat-y value',
    },
    {
      code: '.class { background: url(img.jpg) center/cover no-repeat; }',
      description: 'background shorthand includes no-repeat value',
    },
  ],

  reject: [
    {
      code: '.class { background-image: url("image.jpg"); }',
      description: 'background-image without background-repeat',
      message: messages.rejectedBackground('.class'),
    },
    {
      code: '.class { mask-image: url("mask.svg"); }',
      description: 'mask-image without mask-repeat',
      message: messages.rejectedMask('.class'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when background-repeat is disabled and mask-repeat is enabled */
testRule({
  config: [true, { 'background-repeat': false }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { background-image: url("image.jpg"); }',
      description: 'background-image without background-repeat (check disabled)',
    },
    {
      code: '.class { mask-image: url("mask.svg"); mask-repeat: no-repeat; }',
      description: 'mask-image with mask-repeat',
    },
  ],

  reject: [
    {
      code: '.class { mask-image: url("mask.svg"); }',
      description: 'mask-image without mask-repeat (still checked)',
      message: messages.rejectedMask('.class'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when mask-repeat is disabled and background-repeat is enabled */
testRule({
  config: [true, { 'mask-repeat': false }],
  ruleName: name,

  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { mask-image: url("mask.svg"); }',
      description: 'mask-image without mask-repeat (check disabled)',
    },
    {
      code: '.class { background-image: url("image.jpg"); background-repeat: no-repeat; }',
      description: 'background-image with background-repeat',
    },
  ],

  reject: [
    {
      code: '.class { background-image: url("image.jpg"); }',
      description: 'background-image without background-repeat (still checked)',
      message: messages.rejectedBackground('.class'),
    },
  ],
  /* eslint-enable sort-keys */
});

/* Test when both background-repeat and mask-repeat are disabled */
testRule({
  config: [true, { 'background-repeat': false, 'mask-repeat': false }],
  ruleName: name,

  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { background-image: url("image.jpg"); }',
      description: 'background-image without background-repeat (check disabled)',
    },
    {
      code: '.class { mask-image: url("mask.svg"); }',
      description: 'mask-image without mask-repeat (check disabled)',
    },
  ],
  /* eslint-enable sort-keys */
});
