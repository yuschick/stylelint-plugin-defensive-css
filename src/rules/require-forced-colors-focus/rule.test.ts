import { messages, name } from './meta';

testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.btn:focus-visible { outline: 2px solid transparent; box-shadow: 0 0 0 2px blue; }',
      description: 'outline: transparent with box-shadow — FCM-safe',
    },
    {
      code: '.btn:focus-visible { outline: 2px solid blue; box-shadow: 0 0 0 4px rgba(0,0,255,0.3); }',
      description: 'visible outline with decorative box-shadow — FCM-safe',
    },
    {
      code: '.btn:focus-visible { outline: 2px solid transparent; }',
      description: 'outline: transparent without box-shadow — FCM-safe',
    },

    {
      code: '.btn:focus-visible { box-shadow: 0 0 0 2px blue; }',
      description: 'box-shadow without outline removal — default outline remains',
    },
    {
      code: '.btn:focus-visible { color: red; }',
      description: 'focus-visible with no outline or box-shadow declarations',
    },
    {
      code: '.btn:focus { box-shadow: 0 0 0 2px blue; }',
      description: ':focus without outline removal — default outline remains',
    },

    {
      code: '.btn:focus-visible { outline: none; }',
      description: 'outline removed without box-shadow — no box-shadow indicator to flag',
    },
    {
      code: '.btn:focus-visible { outline: none; border: 2px solid blue; }',
      description: 'outline removed but border is visible — border survives FCM',
    },

    {
      code: '@media (forced-colors: none) { .btn:focus-visible { outline: none; box-shadow: 0 0 0 2px blue; } }',
      description: 'inside forced-colors: none media query — outside FCM',
    },
    {
      code: '@media not (forced-colors: active) { .btn:focus-visible { outline: none; box-shadow: 0 0 0 2px blue; } }',
      description: 'inside not (forced-colors: active) — outside FCM',
    },

    {
      code: '.btn { outline: 2px solid transparent; &:focus-visible { outline-color: blue; } }',
      description: 'nested: parent has transparent outline, focus-visible sets color',
    },
    {
      code: '.btn { outline: 0 solid transparent; &:focus-visible { outline-color: blue; outline-width: 2px; } }',
      description:
        'nested: parent has 0-width outline, focus-visible restores width and color',
    },
    {
      code: '.btn { outline: 2px solid transparent; &:focus-visible { outline-color: blue; box-shadow: 0 0 0 2px blue; } }',
      description: 'nested: transparent outline with focus-visible color + box-shadow',
    },
    {
      code: '.btn { outline: none; &:focus-visible { outline: 2px solid transparent; box-shadow: 0 0 0 2px blue; } }',
      description:
        'nested: parent removes outline, focus-visible re-applies with transparent',
    },

    {
      code: '.btn:focus-visible { outline: none; outline: 2px solid transparent; box-shadow: 0 0 0 2px blue; }',
      description: 'outline: none overridden by outline: transparent in same rule',
    },
    {
      code: '.btn:focus-visible { outline: none; outline-style: solid; outline-width: 2px; box-shadow: 0 0 0 2px blue; }',
      description: 'outline: none overridden by longhand style + width in same rule',
    },

    {
      code: '.btn { outline: none; box-shadow: 0 0 0 2px blue; }',
      description: 'outline: none with box-shadow outside any focus selector',
    },
    {
      code: '.btn:hover { outline: none; box-shadow: 0 0 0 2px blue; }',
      description: 'outline: none with box-shadow in :hover — not a focus selector',
    },
    {
      code: '.btn:active { outline: none; box-shadow: 0 0 0 2px blue; }',
      description: 'outline: none with box-shadow in :active — not a focus selector',
    },
    {
      code: '.btn:focus > .icon { outline: none; box-shadow: 0 0 0 2px blue; }',
      description:
        ':focus > .icon — targets child of focused element, not focus indicator',
    },
    {
      code: '.btn:focus-visible + .sibling { outline: none; box-shadow: 0 0 0 2px blue; }',
      description:
        ':focus-visible + .sibling — targets adjacent sibling, not focus indicator',
    },

    {
      code: '.btn:focus-visible { outline: none; border: 2px solid blue; box-shadow: 0 0 0 2px blue; }',
      description:
        'outline removed but border + box-shadow present — border survives FCM',
    },
    {
      code: '.btn:focus-visible { outline: none; border-width: 2px; border-style: solid; box-shadow: 0 0 0 2px blue; }',
      description: 'outline removed but border long hands present — FCM-safe',
    },
    {
      code: '.btn:focus-visible { outline: none; border-bottom: 2px solid blue; box-shadow: 0 0 0 2px blue; }',
      description: 'outline removed but border-bottom present — border survives FCM',
    },

    {
      code: '.btn:focus-visible { outline: 0.125rem solid transparent; box-shadow: 0 0 0 2px blue; }',
      description: 'outline with rem width and transparent color — FCM-safe',
    },

    {
      code: '.btn:focus-visible { outline-offset: 2px; box-shadow: 0 0 0 2px blue; }',
      description: 'outline-offset is not outline removal — default outline remains',
    },

    {
      code: '.btn:focus-visible { outline: none; box-shadow: none; }',
      description:
        'outline and box-shadow both removed — no box-shadow indicator to flag',
    },

    {
      code: '.btn:focus-visible { outline: var(--focus-outline); box-shadow: 0 0 0 2px blue; }',
      description: 'outline uses var() — cannot resolve statically, benefit of the doubt',
    },
    {
      code: '.btn:focus-visible { outline: inherit; box-shadow: 0 0 0 2px blue; }',
      description: 'outline: inherit — delegates to cascade, benefit of the doubt',
    },
    {
      code: '.btn:focus-visible { outline: revert; box-shadow: 0 0 0 2px blue; }',
      description: 'outline: revert — delegates to cascade, benefit of the doubt',
    },

    {
      code: '.a:focus-visible { outline: 2px solid blue; } .b:focus-visible { box-shadow: 0 0 0 2px red; }',
      description:
        'two separate rules — .a has safe outline, .b has box-shadow without outline removal',
    },

    {
      code: '.a { outline: none; } .b:focus-visible { box-shadow: 0 0 0 2px blue; }',
      description: 'outline removed on unrelated .a should not leak into .b focus rule',
    },

    {
      code: '@media not (forced-colors: active) { .btn { outline: none; &:focus-visible { box-shadow: 0 0 0 2px blue; } } }',
      description: 'nested CSS inside not (forced-colors: active) — safe',
    },
  ],

  reject: [
    {
      code: '.btn:focus-visible { outline: none; box-shadow: 0 0 0 2px blue; }',
      description: 'outline: none with box-shadow in :focus-visible',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn:focus { outline: none; box-shadow: 0 0 0 2px blue; }',
      description: 'outline: none with box-shadow in :focus',
      message: messages.rejected('.btn:focus'),
    },
    {
      code: '.btn:focus-visible { outline: 0; box-shadow: 0 0 0 2px blue; }',
      description: 'outline: 0 with box-shadow in :focus-visible',
      message: messages.rejected('.btn:focus-visible'),
    },

    {
      code: '.btn:focus-visible { outline-style: none; box-shadow: 0 0 0 2px blue; }',
      description: 'outline-style: none with box-shadow',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn:focus-visible { outline-width: 0; box-shadow: 0 0 0 2px blue; }',
      description: 'outline-width: 0 with box-shadow',
      message: messages.rejected('.btn:focus-visible'),
    },

    {
      code: '.btn:focus-visible { outline: 0 solid red; box-shadow: 0 0 0 2px blue; }',
      description: 'outline shorthand with 0 width — invisible even with style and color',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn:focus-visible { outline: 0 none; box-shadow: 0 0 0 2px blue; }',
      description: 'outline shorthand with 0 width and none style',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn { outline: none; &:focus-visible { box-shadow: 0 0 0 2px blue; } }',
      description: 'nested: parent removes outline, focus-visible uses only box-shadow',
      message: messages.rejected('&:focus-visible'),
    },
    {
      code: '.btn { outline-style: none; &:focus-visible { box-shadow: 0 0 0 2px blue; } }',
      description:
        'nested: parent removes outline-style, focus-visible uses only box-shadow',
      message: messages.rejected('&:focus-visible'),
    },

    {
      code: '.btn:focus-visible { outline: 2px solid blue; outline: none; box-shadow: 0 0 0 2px blue; }',
      description: 'outline set then removed — last declaration wins',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn:focus-visible { outline: 2px solid blue; outline-style: none; box-shadow: 0 0 0 2px blue; }',
      description: 'visible outline overridden by outline-style: none',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn:focus-visible { outline: 2px solid blue; outline-width: 0; box-shadow: 0 0 0 2px blue; }',
      description: 'visible outline overridden by outline-width: 0',
      message: messages.rejected('.btn:focus-visible'),
    },

    {
      code: '.a:focus-visible, .b:focus-visible { outline: none; box-shadow: 0 0 0 2px blue; }',
      description: 'multiple focus-visible selectors with outline: none + box-shadow',
      message: messages.rejected('.a:focus-visible, .b:focus-visible'),
    },

    {
      code: '@media (min-width: 768px) { .btn:focus-visible { outline: none; box-shadow: 0 0 0 2px blue; } }',
      description: 'inside non-forced-colors media query — still unsafe',
      message: messages.rejected('.btn:focus-visible'),
    },

    {
      code: '@media (forced-colors: active) { .btn:focus-visible { outline: none; box-shadow: 0 0 0 2px blue; } }',
      description: 'inside forced-colors: active — box-shadow is still invisible in FCM',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.card { .btn { outline: none; &:focus-visible { box-shadow: 0 0 0 2px blue; } } }',
      description:
        'deeply nested: grandparent context, parent removes outline, focus uses box-shadow',
      message: messages.rejected('&:focus-visible'),
    },

    {
      code: '.btn:focus-visible { outline: 2px solid transparent; outline-width: 0; box-shadow: 0 0 0 2px blue; }',
      description: 'transparent outline width overridden to 0 by longhand',
      message: messages.rejected('.btn:focus-visible'),
    },

    {
      code: '.btn:focus-visible { outline: 0px solid red; box-shadow: 0 0 0 2px blue; }',
      description: 'outline shorthand with 0px width — invisible',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn:focus-visible { outline-width: 0px; box-shadow: 0 0 0 2px blue; }',
      description: 'outline-width: 0px — zero with unit',
      message: messages.rejected('.btn:focus-visible'),
    },

    {
      code: '.btn:focus-visible { outline-width: 0rem; box-shadow: 0 0 0 2px blue; }',
      description: 'outline-width: 0rem — zero with rem unit',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn:focus-visible { outline-width: 0em; box-shadow: 0 0 0 2px blue; }',
      description: 'outline-width: 0em — zero with em unit',
      message: messages.rejected('.btn:focus-visible'),
    },

    {
      code: '.btn { outline-width: 0; &:focus-visible { box-shadow: 0 0 0 2px blue; } }',
      description: 'nested: parent removes outline-width: 0, focus uses box-shadow',
      message: messages.rejected('&:focus-visible'),
    },

    {
      code: '.btn:focus, .btn:focus-visible { outline: none; box-shadow: 0 0 0 2px blue; }',
      description:
        'combined :focus, :focus-visible selector with outline: none + box-shadow',
      message: messages.rejected('.btn:focus, .btn:focus-visible'),
    },

    {
      code: '.btn:focus-visible { outline: none; box-shadow: 0 0 0 2px blue, 0 4px 8px rgba(0,0,0,0.2); }',
      description: 'outline: none with multi-value box-shadow — still unsafe in FCM',
      message: messages.rejected('.btn:focus-visible'),
    },

    {
      code: '@media (forced-colors: active) { .card { .btn:focus-visible { outline: none; box-shadow: 0 0 0 2px blue; } } }',
      description:
        'deeply nested inside forced-colors: active — box-shadow still invisible',
      message: messages.rejected('.btn:focus-visible'),
    },

    {
      code: '@media (min-width: 768px) { @media (hover: hover) { .btn:focus-visible { outline: none; box-shadow: 0 0 0 2px blue; } } }',
      description: 'nested non-FCM media queries — still unsafe',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.a:focus-visible { outline: none; box-shadow: 0 0 0 2px blue; } .b:focus-visible { outline: 2px solid transparent; box-shadow: 0 0 0 2px blue; }',
      description: '.a is flagged — .b has safe outline and should not be flagged',
      message: messages.rejected('.a:focus-visible'),
    },
    {
      code: '.btn:focus-visible { outline: none; border: 2px solid transparent; box-shadow: 0 0 0 2px blue; }',
      description: 'outline removed with transparent border — border not visible in FCM',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn:focus-visible { outline: none; border-color: transparent; box-shadow: 0 0 0 2px blue; }',
      description: 'outline removed with border-color: transparent — not visible in FCM',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn:focus-visible { outline: none; border-bottom: 2px solid transparent; box-shadow: 0 0 0 2px blue; }',
      description: 'outline removed with transparent border-bottom — not visible in FCM',
      message: messages.rejected('.btn:focus-visible'),
    },

    {
      code: '.btn:focus-visible { outline: none; border-radius: 4px; box-shadow: 0 0 0 2px blue; }',
      description: 'border-radius is not a visible border — not FCM-safe',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn:focus-visible { outline: none; border-spacing: 2px; box-shadow: 0 0 0 2px blue; }',
      description: 'border-spacing is not a visible border — not FCM-safe',
      message: messages.rejected('.btn:focus-visible'),
    },
    {
      code: '.btn:focus-visible { outline: none; border-image: url(foo) 10; box-shadow: 0 0 0 2px blue; }',
      description: 'border-image is forced to none in FCM — not FCM-safe',
      message: messages.rejected('.btn:focus-visible'),
    },

    {
      code: '.btn { outline: none; &:focus-visible { box-shadow: 0 0 0 2px blue; & > .icon { color: red; } } }',
      description: 'only &:focus-visible should be flagged, not nested & > .icon',
      message: messages.rejected('&:focus-visible'),
    },
    {
      code: '.btn:focus-visible:not(.disabled) { outline: none; box-shadow: 0 0 0 2px blue; }',
      description: ':focus-visible:not(.disabled) — chained pseudo should still flag',
      message: messages.rejected('.btn:focus-visible:not(.disabled)'),
    },
  ],
  /* eslint-enable sort-keys */
});
