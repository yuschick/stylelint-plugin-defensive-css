import { messages, name } from './meta';

testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '@view-transition { navigation: none; }',
      description: 'view-transition is allowed when set to none',
    },
    {
      code: 'button{ transition: color 1s ease; }',
      description: 'simple transition color is allowed',
    },
    {
      code: 'button{ transition: color 1s ease, opacity 1s ease; }',
      description: 'complex transition with color and opacity is allowed',
    },
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
          .box { animation: rotate 10s ease; }
        }
      `,
      description: 'animation inside not (prefers-reduced-motion: reduce) media query',
    },
    {
      code: `button { transition: color 1s ease; }`,
      description: 'transition color is allowed',
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
    {
      code: `
        @media not (prefers-reduced-motion: reduce) {
          .box { scroll-behavior: smooth; }
        }
      `,
      description: 'scroll behavior smooth outside prefers-reduced-motion: reduce',
    },
    {
      code: `
        @media not (prefers-reduced-motion: reduce) {
          .box { background-attachment: fixed; }
        }
      `,
      description: 'background attachment fixed outside prefers-reduced-motion: reduce',
    },
    {
      code: `
        @media not (prefers-reduced-motion: reduce) {
          .box { background: url(fixed.jpg) fixed, linear-gradient(#000, #fff); }
        }
      `,
      description:
        'multiple background shorthand values with fixed attachment outside prefers-reduced-motion: reduce',
    },
    {
      code: '.box { transition: color 1s, opacity 0.5s, background-color 2s; }',
      description: 'multiple safe transitions',
    },
  ],

  reject: [
    {
      code: '.box { transition: 0.3s; }',
      description:
        'transition: with only a duration set should fail as it applies to all properties',
      message: messages.transition('all'),
    },
    {
      code: '.box { transition: all 0.3s; }',
      description: 'transition: all is motion-causing',
      message: messages.transition('all'),
    },
    {
      code: '.box { transition: transform 0.3s, width 0.5s; }',
      description: 'mixed safe and unsafe transitions',
      message: messages.transition('transform, width'),
    },
    {
      code: '.box { transition: .5s transform; }',
      description: 'transition with decimal duration without leading zero',
      message: messages.transition('transform'),
    },
    {
      code: 'div { transition: all 0.3s ease; }',
      description: 'transition without prefers-reduced-motion',
      message: messages.transition('all'),
    },
    {
      code: 'div { scroll-behavior: smooth; }',
      description: 'scroll behavior smooth without prefers-reduced-motion',
      message: messages.scrollBehavior(),
    },
    {
      code: 'div { background-attachment: fixed; }',
      description: 'background attachment fixed without prefers-reduced-motion',
      message: messages.backgroundAttachment(),
    },
    {
      code: 'div { background: url(fixed.jpg) fixed, linear-gradient(#000, #fff); }',
      description:
        'multiple background shorthand values with fixed attachment without prefers-reduced-motion',
      message: messages.backgroundAttachment(),
    },
    {
      code: '@view-transition { navigation: auto; }',
      description: 'view-transition without prefers-reduced-motion',
      message: messages.viewTransition(),
    },
    {
      code: 'body { view-transition-name: slide; }',
      description: 'view-transition-name without prefers-reduced-motion',
      message: messages.viewTransition(),
    },
    {
      code: '.box { transition: transform 0.3s; }',
      description: 'transition without prefers-reduced-motion',
      message: messages.transition('transform'),
    },
    {
      code: '.box { animation: slide 1s ease; }',
      description: 'animation without prefers-reduced-motion',
      message: messages.animation(),
    },
    {
      code: '.box { animation-duration: 0.5s; }',
      description: 'animation-duration without prefers-reduced-motion',
      message: messages.animationDuration(),
    },
    {
      code: `
        @media (min-width: 768px) {
          .box { transition: transform 0.3s; }
        }
      `,
      description: 'transition in media query without prefers-reduced-motion',
      message: messages.transition('transform'),
    },
    {
      code: '.box { animation: slide 1s, fade 0.5s; }',
      description: 'multiple animations without prefers-reduced-motion',
      message: messages.animation(),
    },
    {
      code: `
        .parent {
          .child {
            transition: transform 0.3s, color 0.3s ease, scale 0.3s ease;
          }
        }
      `,
      description: 'nested selector without prefers-reduced-motion',
      message: messages.transition('transform, scale'),
    },
    {
      code: `
        @media (prefers-reduced-motion: reduce) {
          .box { transition: all 10s ease; }
        }
      `,
      description:
        'transition with duration inside prefers-reduced-motion: reduce (anti-pattern)',
      message: messages.transition('all'),
    },
    {
      code: `
        @media (prefers-reduced-motion: reduce) {
          .box { animation: slide 2s ease; }
        }
      `,
      description:
        'animation with duration inside prefers-reduced-motion: reduce (anti-pattern)',
      message: messages.animation(),
    },
    {
      code: `
        @media (prefers-reduced-motion: reduce) {
          .box { animation-duration: 1s; }
        }
      `,
      description:
        'animation-duration inside prefers-reduced-motion: reduce (anti-pattern)',
      message: messages.animationDuration(),
    },
    {
      code: `
      @media not (prefers-reduced-motion: no-preference) {
        .animated { animation: slide-in 1s ease-in-out; }
      }
    `,
      description:
        'animation inside not (prefers-reduced-motion: no-preference) - equivalent to reduce (anti-pattern)',
      message: messages.animation(),
    },
    {
      code: `
      @media not (prefers-reduced-motion: no-preference) {
        .animated { transition: transform 0.5s; }
      }
    `,
      description:
        'transition inside not (prefers-reduced-motion: no-preference) - equivalent to reduce (anti-pattern)',
      message: messages.transition('transform'),
    },
  ],
  /* eslint-enable sort-keys */
});
