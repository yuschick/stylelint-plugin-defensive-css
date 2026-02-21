import { messages, name } from './meta';

testRule({
  config: [true],
  ruleName: name,
  /* eslint-disable sort-keys */
  accept: [
    {
      code: '.class { display: flex; flex-wrap: wrap; }',
      description: 'display flex with explicit flex-wrap',
    },
    {
      code: '.class { display: flex; flex-wrap: nowrap; }',
      description: 'display flex with flex-wrap nowrap (explicit choice)',
    },
    {
      code: '.class { display: flex; flex-wrap: wrap-reverse; }',
      description: 'display flex with flex-wrap wrap-reverse',
    },
    {
      code: '.class { display: flex; flex-flow: row wrap; }',
      description: 'display flex with flex-flow including wrap',
    },
    {
      code: '.class { display: flex; flex-flow: wrap; }',
      description: 'display flex with flex-flow wrap shorthand',
    },
    {
      code: '.class { display: flex; flex-flow: column wrap; }',
      description: 'display flex with flex-flow column and wrap',
    },
    {
      code: '.class { display: flex; flex-direction: column; }',
      description: 'display flex with column direction (exempt from wrap requirement)',
    },
    {
      code: '.class { display: flex; flex-flow: column; }',
      description: 'display flex with flex-flow column (exempt from wrap requirement)',
    },
    {
      code: '.class { display: block; }',
      description: 'no flex display',
    },
    {
      code: '.class { display: inline-flex; flex-wrap: wrap; }',
      description: 'inline-flex with flex-wrap',
    },
    {
      code: '.class { display: flex; flex-direction: column-reverse; }',
      description: 'column-reverse direction (exempt)',
    },
    {
      code: '.class { display: flex; flex-flow: column-reverse; }',
      description: 'flex-flow column-reverse (exempt)',
    },
    {
      code: '.class { display: flex; flex-flow: row nowrap; }',
      description: 'flex-flow with row and nowrap',
    },
    {
      code: '.class { display: flex; flex-flow: nowrap; }',
      description: 'flex-flow with nowrap shorthand',
    },
    {
      code: '.class { display: flex; flex-flow: row-reverse nowrap; }',
      description: 'flex-flow with row-reverse and nowrap',
    },
    {
      code: '.class { display: flex; flex-flow: column nowrap; }',
      description: 'flex-flow with column and nowrap (column exempt)',
    },
    {
      code: `
        @media (min-width: 768px) {
          .class { display: flex; flex-flow: row nowrap; }
        }
      `,
      description: 'flex-flow with nowrap inside media query',
    },
    {
      code: `
        @media (min-width: 768px) {
          .class { display: flex; flex-wrap: nowrap; }
        }
      `,
      description: 'flex-wrap nowrap inside media query',
    },
    {
      code: '.class { display: grid; }',
      description: 'grid display (not flex)',
    },
    {
      code: `
        .class {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
        }
      `,
      description: 'flex with other properties and wrap',
    },
    {
      code: `
        .row { display: flex; flex-wrap: wrap; }
        .column { display: flex; flex-direction: column; }
      `,
      description: 'multiple rules with different configurations',
    },
  ],
  reject: [
    {
      code: '.class { display: flex; }',
      description: 'display flex without flex-wrap',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { display: flex; flex-direction: row; }',
      description: 'display flex with explicit row direction but no wrap',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { display: inline-flex; }',
      description: 'inline-flex without flex-wrap',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { display: flex; flex-flow: row; }',
      description: 'flex-flow with row but no wrap',
      message: messages.rejected('.class'),
    },
    {
      code: '.class { display: flex; flex-direction: row-reverse; }',
      description: 'row-reverse still needs wrap',
      message: messages.rejected('.class'),
    },
    {
      code: `
        .class {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `,
      description: 'flex with other properties but no wrap',
      message: messages.rejected('.class'),
    },
  ],
  /* eslint-enable sort-keys */
});
