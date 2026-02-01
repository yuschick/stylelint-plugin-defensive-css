import { messages, name } from '.';

testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: `@media (hover: hover) { .btn:hover { color: black; } }`,
      description: 'Use media query for button hover state.',
    },
    {
      code: `@media (min-width: 1400px) and (hover: hover) { .btn:hover { color: black; } }`,
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

                        &::before {
                          content: '';
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
      message: messages.rejected('.fail-btn:hover'),
    },
    {
      code: `@media (min-width: 1px) { .btn:hover { color: black; } }`,
      description: 'Use a hover pseudo selector inside of a min-width media query.',
      message: messages.rejected('.btn:hover'),
    },
  ],
  /* eslint-enable sort-keys */
});
