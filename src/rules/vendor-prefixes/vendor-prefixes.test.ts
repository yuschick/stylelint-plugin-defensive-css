import { messages, name } from '.';

testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: `.menu-item {
    	&.menu-item-has-children::after,
    	&.menu-item-has-grandchildren::after {
    		content: '';
    		position: absolute;
    		top: 24px;
    		right: 30px;
    		width: 18px;
    		height: 18px;
    		background-size: contain;
    	}
    }`,
      description: 'Nested scss with no prefixes defined.',
    },
    {
      code: `input::-webkit-input-placeholder { color: #222; } input::-moz-placeholder { color: #222; }`,
      description: 'Split webkit and moz placeholder selectors to separate rules.',
    },
    {
      code: `input::-ms-input-placeholder { color: #222; } input::-o-placeholder { color: #222; }`,
      description: 'Split webkit and moz placeholder selectors to separate rules.',
    },
    {
      code: `div::before,div::after { color: #222; }`,
      description: 'Combining pseudo elements with the same selector into one rule.',
    },
    {
      code: `.a video::-webkit-media-controls-panel
.b video::-webkit-media-controls-panel {
    display: none;
}`,
      description: 'Combine two of the same vendor prefixes into the same selector.',
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
      message: messages.rejected(
        'input::-webkit-input-placeholder, input::-moz-placeholder',
      ),
    },
    {
      code: `input::-ms-input-placeholder, input::-o-placeholder { color: #222; }`,
      description: 'Using webkit and moz placeholder selectors.',
      message: messages.rejected('input::-ms-input-placeholder, input::-o-placeholder'),
    },
  ],
  /* eslint-enable sort-keys */
});
