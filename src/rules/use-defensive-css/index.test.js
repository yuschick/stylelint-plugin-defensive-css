import rule from './index.js';
const { messages, ruleName } = rule.rule;

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
      code: `@media ( hover: hover ) { .btn:hover { color: black; } }`,
      description: 'Use media query for button hover state with spaces.',
    },
    {
      code: `@media (hover) { .btn:hover { color: black; } }`,
      description: 'Use shorthand media query for button hover state.',
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
    {
      code: `@media all and (hover: hover) and (max-width: 699px) { .btn:hover { color: black; } }`,
      description:
        'Use nested media queries with hover in the middle for button hover state.',
    },
    {
      code: `div:not(:hover) { color: red; }`,
      description: 'Use :hover selector inside of :not() selector.',
    },
    {
      code: `div:not(:focus-visible, :hover) { color: red; }`,
      description: 'Use :hover selector inside of a grouped :not() selector.',
    },
    {
      code: `web-component-name {
	&:defined {
		@media ( hover: hover ) {
			details:not( [open] ) {
				position: relative;
				z-index: 1;

				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					z-index: -1;
					width: 100%;
					height: 100%;
					background-color: #EFEFF0;
					transition: opacity 0.2s;
					opacity: 0;
				}

				&:hover::before {
					opacity: 1;
				}
			}
		}
	}
}`,
      description: 'False positive complex example',
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
  config: [true, { 'grid-line-names': { columns: false, rows: true } }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { grid-template-rows: [r-a] 1fr [r-b] 2fr; }`,
      description: 'Rows-only: named lines before each row track.',
    },
    {
      code: `div { grid: [r-a] 1fr / auto; }`,
      description: 'Shorthand `grid` with rows portion named; columns ignored.',
    },
    {
      code: `div { grid-template-rows: repeat(auto-fit, [r1 r2] 100px); }`,
      description: 'Repeat with auto-fit and bracketed row names is allowed.',
    },
    {
      code: `div { grid-template-rows:repeat(auto-fit,[r]300px); }`,
      description:
        'Minified repeat(...) with bracketed names for rows is allowed.',
    },
  ],

  reject: [
    {
      code: `div { grid-template-rows: 1fr; }`,
      description: 'Rows-only: a single unnamed row should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-rows: 1fr 1fr; }`,
      description: 'Rows-only: unnamed row tracks should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid: repeat(3, 1fr) / auto; }`,
      description: 'Shorthand `grid` using numeric repeat in rows should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-rows: 1fr [after] 1fr; }`,
      description:
        'Rows-only: Line name following a track does not name the first row — should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-rows: [auto] 1fr; }`,
      description:
        'Rows-only: Reserved ident `auto` used as a row name should fail.',
      message: messages.gridLineNames(),
    },
  ],
});

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'grid-line-names': { columns: true, rows: false } }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { grid-template-columns: [c-a] 1fr [c-b] 2fr; }`,
      description: 'Columns-only: named lines before each column track.',
    },
    {
      code: `div { grid: auto / [c-a] 1fr [c-b] 2fr; }`,
      description: 'Shorthand `grid` with columns portion named; rows ignored.',
    },
    {
      code: `div { grid-template-columns: repeat(auto-fill, [c] minmax(50px,1fr)); }`,
      description:
        'Repeat with auto-fill and bracketed column names is allowed.',
    },
  ],

  reject: [
    {
      code: `div { grid-template-columns: 1fr; }`,
      description: 'Columns-only: an unnamed column should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid: auto / 1fr 1fr; }`,
      description: 'Shorthand `grid` columns without named lines should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid: auto / repeat(3, 1fr); }`,
      description:
        'Shorthand `grid` using numeric repeat in columns should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: 1fr [after] 1fr; }`,
      description:
        'Columns-only: Line name following a track does not name the first column — should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: [span] 1fr; }`,
      description:
        'Columns-only: Reserved ident `span` used as a column name should fail.',
      message: messages.gridLineNames(),
    },
  ],
});

/* eslint-disable-next-line no-undef  */
testRule({
  ruleName,
  config: [true, { 'grid-line-names': true }],
  plugins: ['./index.js'],
  accept: [
    {
      code: `div { grid-template-columns: [a] 1fr [b] 1fr; }`,
      description: 'Minimal valid: named lines before each track.',
    },
    {
      code: `div { grid-template-columns: [name-a name-b] 1fr; }`,
      description: 'Bracket with multiple names separated by space.',
    },
    {
      code: `div { grid-template-columns: [a] [b] 1fr [c] 2fr; }`,
      description:
        'Consecutive bracket groups associated with the following size.',
    },
    {
      code: `div { grid-template-columns: repeat(auto-fit, [line-name3 line-name4] 300px); }`,
      description:
        'Repeat with auto-fit and bracketed line names inside repeat is allowed.',
    },
    {
      code: `div { grid-template-columns: repeat(auto-fill, [a] minmax(100px, 1fr)); }`,
      description: 'Repeat with auto-fill and minmax track sizes with names.',
    },
    {
      code: `div { grid: auto / [col-a] 1fr [col-b] 2fr; }`,
      description:
        'Shorthand `grid` with columns portion that names each column line.',
    },
    {
      code: `div { grid: 100px / repeat(auto-fill, [a b] 200px); }`,
      description:
        'Shorthand `grid` with repeat auto-fill and bracketed names is allowed.',
    },
    {
      code: `div { grid-template-columns:repeat(auto-fit,[a]300px); }`,
      description: 'Minified repeat(...) with bracketed names is allowed.',
    },
  ],

  reject: [
    {
      code: `div { grid-template-columns: 1fr; }`,
      description: 'A single unnamed track should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: 1fr 1fr; }`,
      description: 'Unnamed tracks should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: repeat(3, 1fr); }`,
      description: 'Repeat with numeric count without names should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid: auto / 1fr 1fr; }`,
      description: 'Shorthand `grid` columns without named lines should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid: auto / repeat(3, 1fr); }`,
      description:
        'Shorthand `grid` using numeric repeat in columns should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid: auto / repeat(3, 1fr); }`,
      description:
        'Shorthand `grid` using numeric repeat in columns should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: 1fr [after] 1fr; }`,
      description:
        'Line name following a track does not name the first column — should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: [auto] 1fr; }`,
      description: 'Reserved ident `auto` used as a line name should fail.',
      message: messages.gridLineNames(),
    },
    {
      code: `div { grid-template-columns: [span] 1fr; }`,
      description: 'Reserved ident `span` used as a line name should fail.',
      message: messages.gridLineNames(),
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
      code: `.a video::-webkit-media-controls-panel
.b video::-webkit-media-controls-panel {
    display: none;
}`,
      description:
        'Combine two of the same vendor prefixes into the same selector.',
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
