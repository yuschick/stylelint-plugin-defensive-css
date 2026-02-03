import { messages, name } from './meta';

testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: `
        @media (prefers-reduced-motion: no-preference) {
          .box { transition: transform 0.3s; }
        }
      `,
      description: 'transition inside prefers-reduced-motion media query',
    },
    {
      code: `
        @media (prefers-reduced-motion: no-preference) {
          .box { animation: slide 1s ease; }
        }
      `,
      description: 'animation inside prefers-reduced-motion media query',
    },
    {
      code: `
        @media not (prefers-reduced-motion: reduce) {
          .box { animation: rotate 10s ease; }
        }
      `,
      description: 'animation inside not (prefers-reduced-motion: reduce) media query',
    },
    {
      code: `
        @media not (prefers-reduced-motion: reduce) {
          .box { transition: transform 3s; }
        }
      `,
      description: 'transition inside not (prefers-reduced-motion: reduce) media query',
    },
    {
      code: '.box { transition: transform 0s; }',
      description: 'instant transition (0s)',
    },
    {
      code: '.box { transition: none; }',
      description: 'no transition',
    },
    {
      code: '.box { animation: none; }',
      description: 'no animation',
    },
    {
      code: '.box { animation-duration: 0s; }',
      description: 'zero animation duration',
    },
    {
      code: '.box { transition-duration: 0ms; }',
      description: 'zero transition duration in milliseconds',
    },
    {
      code: '.box { color: blue; }',
      description: 'no animation or transition properties',
    },
    {
      code: `
        @media (prefers-reduced-motion: no-preference) {
          @media (min-width: 768px) {
            .box { transition: transform 0.3s; }
          }
        }
      `,
      description: 'nested media queries with prefers-reduced-motion',
    },
    {
      code: '.box { transition: all 0s ease; }',
      description: 'transition shorthand with 0s duration',
    },
    {
      code: '.box { transition: color 0s, opacity 0s; }',
      description: 'multiple transitions with all 0s durations',
    },
    {
      code: '.box { animation-name: fadeIn; }',
      description: 'animation-name alone (no duration specified)',
    },
    {
      code: '.box { transition-property: opacity; }',
      description: 'transition-property alone (no duration specified)',
    },
    {
      code: '.box { animation-timing-function: ease; }',
      description: 'animation-timing-function alone (no duration specified)',
    },
    {
      code: '.box { transition-timing-function: ease-in-out; }',
      description: 'transition-timing-function alone (no duration specified)',
    },
    {
      code: '.box { transition-delay: 1s; }',
      description: 'transition-delay alone (no duration that creates motion)',
    },
    {
      code: '.box { animation-delay: 0.5s; }',
      description: 'animation-delay alone (no duration that creates motion)',
    },
    {
      code: `
        @media (prefers-reduced-motion: no-preference) {
          .parent {
            .child {
              transition: transform 0.3s;
            }
          }
        }
      `,
      description: 'nested selector inside prefers-reduced-motion',
    },
    {
      code: `
        @media not (prefers-reduced-motion: reduce) {
          .parent {
            .child {
              transition: transform 0.3s;
            }
          }
        }
      `,
      description: 'nested selector inside not (prefers-reduced-motion: reduce)',
    },
    {
      code: `
        @media (prefers-reduced-motion: reduce) {
          .box { transition: none; }
        }
      `,
      description:
        'transition: none inside prefers-reduced-motion: reduce (removing motion)',
    },
    {
      code: `
        @media (prefers-reduced-motion: reduce) {
          .box { animation: none; }
        }
      `,
      description:
        'animation: none inside prefers-reduced-motion: reduce (removing motion)',
    },
    {
      code: `
        @media (prefers-reduced-motion: reduce) {
          .box { transition-duration: 0s; }
        }
      `,
      description: 'instant duration inside prefers-reduced-motion: reduce',
    },
    {
      code: `
        @media not (prefers-reduced-motion: reduce) {
          .box { transition-duration: 2s; }
        }
      `,
      description: 'non-zero duration outside prefers-reduced-motion: reduce',
    },
  ],

  reject: [
    {
      code: '.box { transition: transform 0.3s; }',
      description: 'transition without prefers-reduced-motion',
      message: messages.rejected('transition'),
    },
    {
      code: '.box { animation: slide 1s ease; }',
      description: 'animation without prefers-reduced-motion',
      message: messages.rejected('animation'),
    },
    {
      code: '.box { animation-duration: 0.5s; }',
      description: 'animation-duration without prefers-reduced-motion',
      message: messages.rejected('animation-duration'),
    },
    {
      code: '.box { transition-duration: 300ms; }',
      description: 'transition-duration without prefers-reduced-motion',
      message: messages.rejected('transition-duration'),
    },
    {
      code: `
        @media (min-width: 768px) {
          .box { transition: transform 0.3s; }
        }
      `,
      description: 'transition in media query without prefers-reduced-motion',
      message: messages.rejected('transition'),
    },
    {
      code: '.box { transition: color 0.3s, opacity 0s; }',
      description: 'mixed durations with one being non-zero',
      message: messages.rejected('transition'),
    },
    {
      code: '.box { transition: color 0.3s, opacity 0.2s; }',
      description: 'multiple transitions without prefers-reduced-motion',
      message: messages.rejected('transition'),
    },
    {
      code: '.box { animation: slide 1s, fade 0.5s; }',
      description: 'multiple animations without prefers-reduced-motion',
      message: messages.rejected('animation'),
    },
    {
      code: `
        .parent {
          .child {
            transition: transform 0.3s;
          }
        }
      `,
      description: 'nested selector without prefers-reduced-motion',
      message: messages.rejected('transition'),
    },
    {
      code: `
        @media (prefers-reduced-motion: reduce) {
          .box { transition: all 10s ease; }
        }
      `,
      description:
        'transition with duration inside prefers-reduced-motion: reduce (anti-pattern)',
      message: messages.rejected('transition'),
    },
    {
      code: `
        @media (prefers-reduced-motion: reduce) {
          .box { animation: slide 2s ease; }
        }
      `,
      description:
        'animation with duration inside prefers-reduced-motion: reduce (anti-pattern)',
      message: messages.rejected('animation'),
    },
    {
      code: `
        @media (prefers-reduced-motion: reduce) {
          .box { animation-duration: 1s; }
        }
      `,
      description:
        'animation-duration inside prefers-reduced-motion: reduce (anti-pattern)',
      message: messages.rejected('animation-duration'),
    },
    {
      code: `
        @media (prefers-reduced-motion: reduce) {
          .box { transition-duration: 300ms; }
        }
      `,
      description:
        'transition-duration inside prefers-reduced-motion: reduce (anti-pattern)',
      message: messages.rejected('transition-duration'),
    },
    {
      code: `
      @media not (prefers-reduced-motion: no-preference) {
        .animated { animation: slide-in 1s ease-in-out; }
      }
    `,
      description:
        'animation inside not (prefers-reduced-motion: no-preference) - equivalent to reduce (anti-pattern)',
      message: messages.rejected('animation'),
    },
    {
      code: `
      @media not (prefers-reduced-motion: no-preference) {
        .animated { transition: transform 0.5s; }
      }
    `,
      description:
        'transition inside not (prefers-reduced-motion: no-preference) - equivalent to reduce (anti-pattern)',
      message: messages.rejected('transition'),
    },
  ],
  /* eslint-enable sort-keys */
});
