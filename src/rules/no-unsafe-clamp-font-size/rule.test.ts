import { messages, name } from './meta';

testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.title { font-size: 1.5rem; }',
      description: 'static rem font-size',
    },
    {
      code: '.title { font-size: 16px; }',
      description: 'static px font-size',
    },
    {
      code: '.title { font-size: var(--fs); }',
      description: 'CSS variable font-size',
    },
    {
      code: '.title { font-size: calc(1rem + 2px); }',
      description: 'calc() without clamp()',
    },
    {
      code: '.title { font: italic 1.2em "Fira Sans", sans-serif; }',
      description: 'font shorthand without clamp()',
    },
    {
      code: '.title { font-size: clamp(10px, 20px, 50px); }',
      description: 'clamp with only px — no viewport unit in preferred',
    },
    {
      code: '.title { font-size: clamp(1rem, 2rem, 5rem); }',
      description: 'clamp with only rem — no viewport unit in preferred',
    },
    {
      code: '.title { font-size: clamp(1rem, 50%, 3rem); }',
      description: 'clamp with percentage preferred — not a viewport unit',
    },
    {
      code: '.title { font-size: clamp(10px, 5vw, 25px); }',
      description: 'exact 2.5x ratio — boundary safe',
    },
    {
      code: '.title { font-size: clamp(10px, 5vw, 20px); }',
      description: 'ratio of 2.0',
    },
    {
      code: '.title { font-size: clamp(16px, 3vw, 18px); }',
      description: 'small range — ratio 1.125',
    },
    {
      code: '.title { font-size: clamp(1rem, 2vw, 2.5rem); }',
      description: 'safe 2.5x ratio using rem',
    },
    {
      code: '.title { font-size: clamp(1em, 3vw, 2em); }',
      description: 'safe ratio using em',
    },
    {
      code: '.title { font: clamp(10px, 5vw, 25px) / 1.5 "Helvetica", sans-serif; }',
      description: 'font shorthand with safe clamp ratio',
    },
    {
      code: '.title { font: italic clamp(1rem, 2vw, 2.5rem) "Arial", sans-serif; }',
      description: 'font shorthand with style and safe clamp ratio',
    },
    {
      code: '.title { font-size: clamp(10px, 5vh, 25px); }',
      description: 'vh in preferred — safe ratio',
    },
    {
      code: '.title { font-size: clamp(10px, 5vi, 25px); }',
      description: 'vi in preferred — safe ratio',
    },
    {
      code: '.title { font-size: clamp(10px, 5vb, 25px); }',
      description: 'vb in preferred — safe ratio',
    },
    {
      code: '.title { font-size: clamp(10px, 5dvw, 25px); }',
      description: 'dvw in preferred — safe ratio',
    },
    {
      code: '.title { font-size: clamp(10px, 5svh, 25px); }',
      description: 'svh in preferred — safe ratio',
    },
    {
      code: '.title { font-size: clamp(10px, 5lvmin, 25px); }',
      description: 'lvmin in preferred — safe ratio',
    },
    {
      code: '.title { font-size: clamp(1rem, 0.5rem + 2vw, 2.5rem); }',
      description: 'calc-style preferred with rem + vw — safe ratio',
    },
    {
      code: '.title { font-size: clamp(16px, 14px + 0.5vw, 40px); }',
      description: 'calc-style preferred with px + vw — ratio exactly 2.5',
    },
    {
      code: '.title { font-size: clamp(10px, min(5vw, 2rem), 25px); }',
      description: 'preferred min() with inner comma parses correctly (safe ratio)',
    },
    {
      code: '.box { width: clamp(100px, 50vw, 500px); }',
      description: 'clamp on width — not font-size',
    },
    {
      code: '.box { height: clamp(10px, 5vw, 100px); }',
      description: 'clamp on height — not font-size',
    },
    {
      code: '.title { font-size: clamp( 10px , 5vw , 25px ); }',
      description: 'extra whitespace inside clamp()',
    },
    {
      code: '.title { font-size: clamp(10px,5vw,25px); }',
      description: 'no whitespace inside clamp()',
    },
  ],

  reject: [
    {
      code: '.title { font-size: clamp(10px, 5vw, 50px); }',
      description: 'ratio of 5.0 — well above safe limit',
      message: messages.exceedsRatio('10px', '50px', 2.5),
    },
    {
      code: '.title { font-size: clamp(10px, 5vw, 26px); }',
      description: 'ratio of 2.6 — just above safe limit',
      message: messages.exceedsRatio('10px', '26px', 2.5),
    },
    {
      code: '.title { font-size: clamp(16px, 4vw, 48px); }',
      description: "ratio of 3.0 — the article's original failing example",
      message: messages.exceedsRatio('16px', '48px', 2.5),
    },
    {
      code: '.title { font-size: clamp(1rem, 2vw, 3rem); }',
      description: 'ratio of 3.0 using rem',
      message: messages.exceedsRatio('1rem', '3rem', 2.5),
    },
    {
      code: '.title { font-size: clamp(0.5rem, 2vw, 2rem); }',
      description: 'ratio of 4.0 using rem',
      message: messages.exceedsRatio('0.5rem', '2rem', 2.5),
    },
    {
      code: '.title { font-size: clamp(1em, 3vw, 4em); }',
      description: 'ratio of 4.0 using em',
      message: messages.exceedsRatio('1em', '4em', 2.5),
    },
    {
      code: '.title { font: clamp(10px, 5vw, 50px) / 1.5 "Helvetica", sans-serif; }',
      description: 'font shorthand with unsafe clamp ratio',
      message: messages.exceedsRatio('10px', '50px', 2.5),
    },
    {
      code: '.title { font: bold clamp(1rem, 3vw, 4rem) "Arial", sans-serif; }',
      description: 'font shorthand with weight and unsafe clamp ratio',
      message: messages.exceedsRatio('1rem', '4rem', 2.5),
    },
    {
      code: '.title { font-size: clamp(10px, 3vh, 50px); }',
      description: 'vh in preferred — unsafe ratio',
      message: messages.exceedsRatio('10px', '50px', 2.5),
    },
    {
      code: '.title { font-size: clamp(10px, 3vmin, 50px); }',
      description: 'vmin in preferred — unsafe ratio',
      message: messages.exceedsRatio('10px', '50px', 2.5),
    },
    {
      code: '.title { font-size: clamp(10px, 3dvw, 50px); }',
      description: 'dvw in preferred — unsafe ratio',
      message: messages.exceedsRatio('10px', '50px', 2.5),
    },
    {
      code: '.title { font-size: clamp(1rem, 0.5rem + 2vw, 3rem); }',
      description: 'calc-style preferred — unsafe ratio of 3.0',
      message: messages.exceedsRatio('1rem', '3rem', 2.5),
    },
    {
      code: '.title { font-size: clamp(10px, min(5vw, 2rem), 50px); }',
      description: 'preferred min() with inner comma parses correctly (unsafe ratio)',
      message: messages.exceedsRatio('10px', '50px', 2.5),
    },
    {
      code: '.title { font-size: clamp(10px, var(--fluid, 5vw), 50px); }',
      description: 'preferred var() fallback with inner comma parses correctly',
      message: messages.exceedsRatio('10px', '50px', 2.5),
    },
    {
      code: '.title { font-size: clamp(1rem, 5vw, 40px); }',
      description: 'mixed units (rem min, px max)',
      message: messages.unresolvable('clamp(1rem, 5vw, 40px)'),
    },
    {
      code: '.title { font-size: clamp(16px, 3vw, 2.5rem); }',
      description: 'mixed units (px min, rem max)',
      message: messages.unresolvable('clamp(16px, 3vw, 2.5rem)'),
    },
    {
      code: '.title { font-size: clamp(var(--min), 5vw, 25px); }',
      description: 'var() in min',
      message: messages.unresolvable('clamp(var(--min), 5vw, 25px)'),
    },
    {
      code: '.title { font-size: clamp(10px, 5vw, var(--max)); }',
      description: 'var() in max',
      message: messages.unresolvable('clamp(10px, 5vw, var(--max))'),
    },
    {
      code: '.title { font-size: clamp(0, 5vw, 25px); }',
      description: 'unitless 0 as min — treated as unresolvable',
      message: messages.unresolvable('clamp(0, 5vw, 25px)'),
    },
    {
      code: '.title { font-size: clamp(10px, 5vw, 0); }',
      description: 'unitless 0 as max — treated as unresolvable',
      message: messages.unresolvable('clamp(10px, 5vw, 0)'),
    },
    {
      code: '.title { font-size: clamp(0, 5vw, 0); }',
      description: 'unitless 0 for both min and max — treated as unresolvable',
      message: messages.unresolvable('clamp(0, 5vw, 0)'),
    },
    {
      code: '.title { font-size: clamp(16, 5vw, 48); }',
      description: 'unitless numbers in min and max — treated as unresolvable',
      message: messages.unresolvable('clamp(16, 5vw, 48)'),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { maxRatio: 2 }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.title { font-size: clamp(10px, 5vw, 20px); }',
      description: 'exact 2.0x ratio — boundary safe with maxRatio: 2',
    },
    {
      code: '.title { font-size: clamp(10px, 5vw, 15px); }',
      description: 'ratio of 1.5 — well within maxRatio: 2',
    },
    {
      code: '.title { font-size: clamp(1rem, 2vw, 2rem); }',
      description: 'exact 2.0x ratio using rem',
    },
  ],
  reject: [
    {
      code: '.title { font-size: clamp(10px, 5vw, 25px); }',
      description: 'ratio of 2.5 — exceeds maxRatio: 2',
      message: messages.exceedsRatio('10px', '25px', 2),
    },
    {
      code: '.title { font-size: clamp(10px, 5vw, 21px); }',
      description: 'ratio of 2.1 — just above maxRatio: 2',
      message: messages.exceedsRatio('10px', '21px', 2),
    },
    {
      code: '.title { font-size: clamp(1rem, 2vw, 3rem); }',
      description: 'ratio of 3.0 using rem — exceeds maxRatio: 2',
      message: messages.exceedsRatio('1rem', '3rem', 2),
    },
    {
      code: '.title { font-size: clamp(0, 5vw, 25px); }',
      description: 'unitless 0 as min — treated as unresolvable',
      message: messages.unresolvable('clamp(0, 5vw, 25px)'),
    },
    {
      code: '.title { font-size: clamp(10px, 5vw, 0); }',
      description: 'unitless 0 as max — treated as unresolvable',
      message: messages.unresolvable('clamp(10px, 5vw, 0)'),
    },
    {
      code: '.title { font-size: clamp(0, 5vw, 0); }',
      description: 'unitless 0 for both min and max — treated as unresolvable',
      message: messages.unresolvable('clamp(0, 5vw, 0)'),
    },
    {
      code: '.title { font-size: clamp(16, 5vw, 48); }',
      description: 'unitless numbers in min and max — treated as unresolvable',
      message: messages.unresolvable('clamp(16, 5vw, 48)'),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { maxRatio: 3 }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.title { font-size: clamp(10px, 5vw, 25px); }',
      description: 'ratio of 2.5 — safe with maxRatio: 3',
    },
    {
      code: '.title { font-size: clamp(10px, 5vw, 30px); }',
      description: 'exact 3.0x ratio — boundary safe with maxRatio: 3',
    },
  ],
  reject: [
    {
      code: '.title { font-size: clamp(10px, 5vw, 31px); }',
      description: 'ratio of 3.1 — just above maxRatio: 3',
      message: messages.exceedsRatio('10px', '31px', 3),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { reportUnresolvable: false }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.title { font-size: clamp(1rem, 5vw, 40px); }',
      description: 'mixed units silently ignored when reportUnresolvable: false',
    },
    {
      code: '.title { font-size: clamp(var(--min), 5vw, 25px); }',
      description: 'var() in min silently ignored when reportUnresolvable: false',
    },
    {
      code: '.title { font-size: clamp(10px, 5vw, var(--max)); }',
      description: 'var() in max silently ignored when reportUnresolvable: false',
    },
    {
      code: '.title { font-size: clamp(16px, 3vw, 2.5rem); }',
      description: 'mixed units (px/rem) silently ignored when reportUnresolvable: false',
    },
  ],
  reject: [
    {
      code: '.title { font-size: clamp(10px, 5vw, 50px); }',
      description: 'unsafe ratio still reported when reportUnresolvable: false',
      message: messages.exceedsRatio('10px', '50px', 2.5),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { reportUnresolvable: true }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [],
  reject: [
    {
      code: '.title { font-size: clamp(1rem, 5vw, 40px); }',
      description: 'mixed units reported when reportUnresolvable: true',
      message: messages.unresolvable('clamp(1rem, 5vw, 40px)'),
    },
    {
      code: '.title { font-size: clamp(var(--min), 5vw, 25px); }',
      description: 'var() in min reported when reportUnresolvable: true',
      message: messages.unresolvable('clamp(var(--min), 5vw, 25px)'),
    },
    {
      code: '.title { font-size: clamp(10px, 5vw, var(--max)); }',
      description: 'var() in max reported when reportUnresolvable: true',
      message: messages.unresolvable('clamp(10px, 5vw, var(--max))'),
    },
  ],
  /* eslint-enable sort-keys */
});
