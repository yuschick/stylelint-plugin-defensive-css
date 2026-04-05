import { messages, name } from './meta';

testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.heading { font: 1.2em "Fira Sans", sans-serif; }',
      description: 'font shorthand with size, font family, and system fallback',
    },
    {
      code: '.heading { font: 1.2em "Fira Sans",sans-serif; }',
      description:
        'font shorthand with size, font family, and system fallback with no space after comma',
    },
    {
      code: '.heading { font: 1.2em "Fira Sans" , sans-serif; }',
      description: 'font shorthand with extra spaces around comma',
    },
    {
      code: '.heading { font: 1.2em/2 "Fira Sans", sans-serif; }',
      description:
        'font shorthand with size, line height, font family, and system fallback',
    },
    {
      code: '.heading { font: italic bold 1.2em "Fira Sans", sans-serif; }',
      description:
        'font shorthand with style, weight, size, font family, and system fallback',
    },
    {
      code: '.heading { font: ultra-condensed small-caps 1.2em "Fira Sans", sans-serif; }',
      description:
        'font shorthand with style, variant, weight, size, font family, and system fallback',
    },
    {
      code: '.heading { font: ultra-condensed small-caps 1.2em Arial, sans-serif; }',
      description:
        'font shorthand with style, variant, weight, size, font family, and system fallback',
    },
    {
      code: '.heading { font: caption; }',
      description: 'font shorthand with a system font keyword',
    },
    {
      code: '.heading { font: status-bar; }',
      description: 'font shorthand with a CSS system font keyword',
    },
    {
      code: '.heading { font-family: "Fira Sans", sans-serif; }',
      description: 'font-family with custom font and system fallback',
    },
    {
      code: '.heading { font-family: Georgia, serif; }',
      description: 'font-family with web-safe font and system fallback',
    },
    {
      code: '.heading { font-family: "Times New Roman", Times, serif; }',
      description: 'font-family with multiple fonts and system fallback',
    },
    {
      code: '.heading { font: normal 1.2em monospace; }',
      description: 'font shorthand with style and system font keyword',
    },
    {
      code: '.heading { font-family: Verdana, Geneva, sans-serif; }',
      description: 'font-family with multiple web-safe fonts and system fallback',
    },
    {
      code: '.heading { font: 1.2em/1.5 "Custom Font", cursive; }',
      description: 'font shorthand with line height and system fallback',
    },
    {
      code: '.heading { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }',
      description: 'font-family with multiple fallbacks and system font',
    },
    {
      code: ".heading { font-family: 'Custom Font', serif; }",
      description: 'font-family with single quotes and system fallback',
    },
    {
      code: '.heading { font-family: `Custom Font`, monospace; }',
      description: 'font-family with backticks and system fallback',
    },
    {
      code: '.heading { font-family: "Font One", "Font Two", sans-serif; }',
      description: 'font-family with multiple quoted fonts and system fallback',
    },
    {
      code: '.heading { font: 1em/1rem "Segoe UI", sans-serif; }',
      description: 'font shorthand with relative line height and system fallback',
    },
    {
      code: '.heading { font-family: Arial; }',
      description: 'font-family with web-safe font alone',
    },
    {
      code: '.heading { font-family: system-ui; }',
      description: 'font-family with standalone system-ui generic family',
    },
    {
      code: '.heading { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }',
      description: 'font-family with real-world Apple font stack and system fallback',
    },
    {
      code: '.heading { font-family: "Custom Font", ui-sans-serif; }',
      description: 'font-family with newer ui-sans-serif generic as fallback',
    },
    {
      code: '.heading { font-family: "A", "B", "C", "D", serif; }',
      description: 'font-family with long chain of custom fonts and system fallback',
    },
    {
      code: '.heading { font: menu; }',
      description: 'font shorthand with menu system font keyword',
    },
    {
      code: '.heading { font-family: "Custom Font", emoji; }',
      description: 'font-family with emoji generic family as fallback',
    },
    {
      code: '.heading { font-family: math; }',
      description: 'font-family with standalone math generic family',
    },
    {
      code: '.heading { font-family: inherit; }',
      description: 'font-family with CSS global keyword inherit',
    },
    {
      code: '.heading { font-family: initial; }',
      description: 'font-family with CSS global keyword initial',
    },
    {
      code: '.heading { font-family: unset; }',
      description: 'font-family with CSS global keyword unset',
    },
    {
      code: '.heading { font-family: revert; }',
      description: 'font-family with CSS global keyword revert',
    },
    {
      code: '.heading { font-family: revert-layer; }',
      description: 'font-family with CSS global keyword revert-layer',
    },
    {
      code: '.heading { font: inherit; }',
      description: 'font shorthand with CSS global keyword inherit',
    },
  ],

  reject: [
    {
      code: '.heading { font: 1.2em "Fira Sans"; }',
      description: 'font shorthand without system font fallback',
      message: messages.looseReject('1.2em "Fira Sans"'),
    },
    {
      code: '.heading { font-family: "Fira Sans"; }',
      description: 'font-family without system font fallback',
      message: messages.looseReject('"Fira Sans"'),
    },
    {
      code: ".heading { font: 1.2em 'Custom Font'; }",
      description: 'font shorthand with single quotes and no fallback',
      message: messages.looseReject("1.2em 'Custom Font'"),
    },
    {
      code: '.heading { font-family: "Font One", "Font Two"; }',
      description: 'font-family with multiple quoted fonts and no fallback',
      message: messages.looseReject('"Font One", "Font Two"'),
    },
    {
      code: '.heading { font: italic 1.2em "Custom Font"; }',
      description: 'font shorthand with style and no fallback',
      message: messages.looseReject('italic 1.2em "Custom Font"'),
    },
    {
      code: '.heading { font-family: "sans-serif"; }',
      description: 'font-family with quoted system font name treated as custom family',
      message: messages.looseReject('"sans-serif"'),
    },
    {
      code: '.heading { font-family: "Custom Font", "serif"; }',
      description: 'font-family with quoted generic name as fallback',
      message: messages.looseReject('"Custom Font", "serif"'),
    },
    {
      code: '.heading { font-family: "Custom Font", Sans-Serif; }',
      description: 'font-family with incorrect casing on generic family',
      message: messages.looseReject('"Custom Font", Sans-Serif'),
    },
    {
      code: '.heading { font-family: var(--font-family); }',
      description: 'font-family with CSS variable and no ignore pattern',
      message: messages.looseReject('var(--font-family)'),
    },
    {
      code: '.heading { font: bold "Custom Font"; }',
      description: 'font shorthand with weight and no fallback',
      message: messages.looseReject('bold "Custom Font"'),
    },
    {
      code: '.heading { font-family: "Custom Font", "Another Font", "Third Font"; }',
      description: 'font-family with three custom fonts and no fallback',
      message: messages.looseReject('"Custom Font", "Another Font", "Third Font"'),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { strict: true }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.heading { font: 1.2em "Fira Sans", sans-serif; }',
      description: 'font shorthand with size, font family, and system fallback',
    },
    {
      code: '.heading { font-family: "Fira Sans", sans-serif; }',
      description: 'font-family with custom font and system fallback',
    },
    {
      code: '.heading { font-family: Georgia, serif; }',
      description: 'font-family with web-safe font and system fallback',
    },
    {
      code: '.heading { font: 1.2em/2 "Fira Sans", sans-serif; }',
      description:
        'font shorthand with size, line height, font family, and system fallback',
    },
    {
      code: '.heading { font: italic bold 1.2em "Fira Sans", sans-serif; }',
      description:
        'font shorthand with style, weight, size, font family, and system fallback',
    },
    {
      code: '.heading { font: caption; }',
      description: 'font shorthand with a system font keyword',
    },
    {
      code: '.heading { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; }',
      description: 'font-family with multiple fallbacks and system font',
    },
    {
      code: '.heading { font-family: Arial, sans-serif; }',
      description: 'font-family with web-safe font and system font',
    },
    {
      code: '.heading { font-family: "Custom Font", ui-serif; }',
      description: 'font-family with ui-serif CSS system font fallback',
    },
    {
      code: '.heading { font-family: system-ui; }',
      description: 'font-family with standalone system-ui',
    },
    {
      code: '.heading { font-family: inherit; }',
      description: 'font-family with CSS global keyword inherit',
    },
    {
      code: '.heading { font-family: initial; }',
      description: 'font-family with CSS global keyword initial',
    },
    {
      code: '.heading { font-family: unset; }',
      description: 'font-family with CSS global keyword unset',
    },
    {
      code: '.heading { font-family: revert; }',
      description: 'font-family with CSS global keyword revert',
    },
    {
      code: '.heading { font-family: revert-layer; }',
      description: 'font-family with CSS global keyword revert-layer',
    },
  ],

  reject: [
    {
      code: '.heading { font: 1.2em "Fira Sans"; }',
      description: 'font shorthand without system font fallback',
      message: messages.strictReject('1.2em "Fira Sans"'),
    },
    {
      code: '.heading { font-family: "Fira Sans"; }',
      description: 'font-family without system font fallback',
      message: messages.strictReject('"Fira Sans"'),
    },
    {
      code: '.heading { font-family: "Font One", "Font Two"; }',
      description: 'font-family with multiple quoted fonts and no system fallback',
      message: messages.strictReject('"Font One", "Font Two"'),
    },
    {
      code: '.heading { font: italic bold 1.2em "Custom Font"; }',
      description: 'font shorthand with style, weight, size and no fallback',
      message: messages.strictReject('italic bold 1.2em "Custom Font"'),
    },
    {
      code: '.heading { font-family: Arial; }',
      description: 'font-family with web-safe font alone in strict mode',
      message: messages.strictReject('Arial'),
    },
    {
      code: '.heading { font-family: Georgia; }',
      description: 'font-family with web-safe font only in strict mode',
      message: messages.strictReject('Georgia'),
    },
    {
      code: '.heading { font-family: "Custom Font", Helvetica; }',
      description: 'font-family with web-safe fallback but no CSS system font',
      message: messages.strictReject('"Custom Font", Helvetica'),
    },
    {
      code: '.heading { font-family: Verdana, Georgia; }',
      description: 'font-family with two web-safe fonts and no CSS system font',
      message: messages.strictReject('Verdana, Georgia'),
    },
  ],
  /* eslint-enable sort-keys */
});

testRule({
  config: [true, { ignore: ['var\\(--ds-font-family.*\\)', 'Exact Font'] }],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.heading { font-family: var(--ds-font-family-primary); }',
      description: 'font-family with CSS variable matching ignore pattern',
    },
    {
      code: '.heading { font-family: var(--ds-font-family-secondary); }',
      description: 'font-family with CSS variable matching ignore regex',
    },
    {
      code: '.heading { font-family: "Exact Font"; }',
      description: 'font-family with exact string match in ignore list',
    },
    {
      code: '.heading { font: 1.2em var(--ds-font-family-custom); }',
      description: 'font shorthand with ignored CSS variable',
    },
  ],

  reject: [
    {
      code: '.heading { font-family: "Custom Font"; }',
      description: 'font-family without system font fallback and not in ignore list',
      message: messages.looseReject('"Custom Font"'),
    },
    {
      code: '.heading { font: 1.2em "Fira Sans"; }',
      description: 'font shorthand without system font fallback and not in ignore list',
      message: messages.looseReject('1.2em "Fira Sans"'),
    },
  ],
  /* eslint-enable sort-keys */
});
