import { messages, name } from './meta';

/* test the default rule with fix disabled */
testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { list-style-type: ""; }',
      description: 'list-style-type set to empty string is acceptable',
    },
    {
      code: '.class { list-style-type: disc; }',
      description: 'list-style-type set to disc is acceptable',
    },
    {
      code: '.class { list-style: georgian inside url("/rocket.svg"); }',
      description: 'list-style set to georgian inside with url is acceptable',
    },
    {
      code: '.class { list-style: inside; }',
      description: 'list-style set to inside only is acceptable',
    },
    {
      code: 'nav { list-style: none; }',
      description: 'list-style inside of a nav element set to none is acceptable',
    },
    {
      code: 'nav { .class { list-style: none; } }',
      description: 'list-style nested inside of a nav element set to none is acceptable',
    },
    {
      code: 'nav { list-style-type: none; }',
      description: 'list-style inside of a nav element set to none is acceptable',
    },
    {
      code: 'nav { .class { list-style-type: none; } }',
      description: 'list-style nested inside of a nav element set to none is acceptable',
    },
    {
      code: 'nav ul { list-style: none; }',
      description: 'nav selector preserves semantics',
    },
    {
      code: 'nav > ul { list-style: none; }',
      description: 'direct child of nav',
    },
    {
      code: '.navigation nav ul { list-style: none; }',
      description: 'nav nested in other selectors',
    },
    {
      code: 'nav .list { list-style: none; }',
      description: 'list class inside nav',
    },
    {
      code: '.parent nav .list { list-style: none; }',
      description: 'list class inside nav',
    },
    {
      code: 'ul { list-style-position: inside; }',
      description: 'list-style-position property (not list-style)',
    },
    {
      code: 'ul { list-style-image: url("bullet.png"); }',
      description: 'list-style-image property (not list-style)',
    },
    {
      code: 'ul { list-style-type: ""; }',
      description: 'ul with list-style-type empty string (recommended approach)',
    },
    {
      code: 'ol { list-style-type: ""; }',
      description: 'ol with list-style-type empty string',
    },
    {
      code: 'li { list-style-type: ""; }',
      description: 'li with list-style-type empty string',
    },
    {
      code: 'nav ul { list-style: none; }',
      description: 'ul inside nav (semantics preserved)',
    },
    {
      code: 'nav > ul { list-style: none; }',
      description: 'ul as direct child of nav',
    },
    {
      code: 'nav .list { list-style: none; }',
      description: 'list class inside nav',
    },
    {
      code: 'ul { list-style: disc; }',
      description: 'ul with list-style other than none',
    },
    {
      code: 'ul { list-style: circle inside; }',
      description: 'ul with list-style shorthand (not none)',
    },
    {
      code: '.navigation nav ul { list-style: none; }',
      description: 'nav nested in other selectors',
    },
    {
      code: '.class { list-style: inside url("./none.png"); }',
      description: 'list-style shorthand with url with a filename called none',
    },
    {
      code: 'nav.class { .child { list-style: none; } }',
      description: 'list-style shorthand nested within a nav selector',
    },
  ],
  reject: [
    {
      code: 'ul { list-style: none; }',
      description: 'ul with list-style: none',
      message: messages.rejected('ul'),
    },
    {
      code: 'ol { list-style: none; }',
      description: 'ol with list-style: none',
      message: messages.rejected('ol'),
    },
    {
      code: 'li { list-style: none; }',
      description: 'li with list-style: none',
      message: messages.rejected('li'),
    },
    {
      code: '.menu ul { list-style: none; }',
      description: 'ul with class selector (not in nav)',
      message: messages.rejected('.menu ul'),
    },
    {
      code: 'div > ul { list-style: none; }',
      description: 'ul as direct child of div',
      message: messages.rejected('div > ul'),
    },
    {
      code: 'ul.menu { list-style: none; }',
      description: 'ul with class',
      message: messages.rejected('ul.menu'),
    },
    {
      code: ':not(nav) ul { list-style: none; }',
      description: 'ul explicitly NOT inside nav',
      message: messages.rejected(':not(nav) ul'),
    },
    {
      code: 'div:not(nav) ul { list-style: none; }',
      description: 'ul inside div that is not nav',
      message: messages.rejected('div:not(nav) ul'),
    },
    {
      code: ':not(nav):not(footer) ul { list-style: none; }',
      description: 'ul with multiple :not() including nav',
      message: messages.rejected(':not(nav):not(footer) ul'),
    },
    {
      code: ':not(nav) ul { list-style: none; }',
      description: 'explicitly excludes nav with :not()',
      message: messages.rejected(':not(nav) ul'),
    },
    {
      code: 'div:not(nav) ul { list-style: none; }',
      description: 'div that is not nav',
      message: messages.rejected('div:not(nav) ul'),
    },
    {
      code: 'section:not(nav) > ul { list-style: none; }',
      description: 'section excluding nav as parent',
      message: messages.rejected('section:not(nav) > ul'),
    },
    {
      code: 'ul { list-style: none; list-style-type: none; }',
      description: 'multiple invalid list-style declarations in same rule',
      warnings: [
        { message: messages.rejected('ul') },
        { message: messages.rejected('ul') },
      ],
    },
  ],
  /* eslint-enable sort-keys */
});

/* test the default rule with fix enabled */
testRule({
  config: [true],
  fix: true,
  ruleName: name,
  /* eslint-disable sort-keys */
  reject: [
    {
      code: 'ul { list-style: none; }',
      fixed: 'ul { list-style: ""; }',
      description: 'auto-fix list-style: none to list-style: ""',
      message: messages.rejected('ul'),
    },
    {
      code: 'ul { list-style: NONE; }',
      fixed: 'ul { list-style: ""; }',
      description: 'auto-fix list-style: NONE to list-style: "" (case insensitive)',
      message: messages.rejected('ul'),
    },
    {
      code: '.menu ul { list-style: none; }',
      fixed: '.menu ul { list-style: ""; }',
      description: 'auto-fix with class selector',
      message: messages.rejected('.menu ul'),
    },
    {
      code: '.menu ul { list-style: inside none; }',
      fixed: '.menu ul { list-style: inside ""; }',
      description: 'auto-fix with shorthand list-style including none',
      message: messages.rejected('.menu ul'),
    },
    {
      code: '.menu ul { list-style: none inside; }',
      fixed: '.menu ul { list-style: "" inside; }',
      description: 'auto-fix with shorthand list-style including none',
      message: messages.rejected('.menu ul'),
    },
    {
      code: '.menu ul { list-style: inside; list-style-type: none; }',
      fixed: '.menu ul { list-style: inside; list-style-type: ""; }',
      description: 'auto-fix with separate list-style-type declaration',
      message: messages.rejected('.menu ul'),
    },
    {
      code: 'ol { list-style: none; }',
      fixed: 'ol { list-style: ""; }',
      description: 'auto-fix list-style: none to list-style-type: "" for ol',
      message: messages.rejected('ol'),
    },
    {
      code: ':not(nav) ol { list-style: none; }',
      fixed: ':not(nav) ol { list-style: ""; }',
      description: 'auto-fix with :not(nav) selector',
      message: messages.rejected(':not(nav) ol'),
    },
    {
      code: `.parent { .child { list-style: none; } }`,
      fixed: `.parent { .child { list-style: ""; } }`,
      description: 'auto-fix list-style none in nested selector',
      message: messages.rejected('.child'),
    },
    {
      code: `.parent { list-style: none; & .child { list-style: disc; } }`,
      fixed: `.parent { list-style: ""; & .child { list-style: disc; } }`,
      description: 'auto-fix list-style none in parent of child selector',
      message: messages.rejected('.parent'),
    },
    {
      code: `:not(nav) { .child { list-style-type: none; } }`,
      fixed: `:not(nav) { .child { list-style-type: ""; } }`,
      description: 'auto-fix list-style-type none in parent :not(nav) selector',
      message: messages.rejected('.child'),
    },
    {
      code: 'ul { list-style: none; list-style-type: none; }',
      fixed: 'ul { list-style: ""; list-style-type: ""; }',
      description: 'multiple invalid list-style declarations in same rule',
      warnings: [
        { message: messages.rejected('ul') },
        { message: messages.rejected('ul') },
      ],
    },
  ],
  /* eslint-enable sort-keys */
});
