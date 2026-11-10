# AGENTS.md

Guidance for AI agents and contributors working in this repository. `CLAUDE.md` imports this file, so it is the single source for every tool.

## Project

`stylelint-plugin-defensive-css` is a Stylelint plugin of rules that enforce defensive CSS practices. It ships as an ESM-only package and supports Stylelint 16.7 and newer on Node 22.12 and newer.

v3 is in progress on `release/v3.0.0`, which acts as the main branch until 3.0.0 ships. [ROADMAP.md](ROADMAP.md) records the decisions, the milestones and what is done.

## Commands

Use the Node version in `.nvmrc`.

| Command                         | What it does                                      |
| :------------------------------ | :------------------------------------------------ |
| `npm test`                      | Run every test once                               |
| `npm test -- <path>`            | Run one test file, such as a single rule          |
| `npm run lint`                  | ESLint with zero warnings allowed                 |
| `npm run typecheck`             | TypeScript without emitting                       |
| `npm run format`                | Format everything with Prettier                   |
| `npm run build`                 | Build `dist/` with tsdown                         |
| `npm run check:package`         | Validate the packed package with publint and attw |
| `npm run scaffold:rule -- name` | Create a new rule, registered and ready for tests |

Before finishing any change, run `npm run lint`, `npm run typecheck`, `npm run format:check` and `npm test`. CI also runs the tests on the lowest supported Stylelint 16.x, the latest 16.x, 17 and 18.

## Layout

```text
src/
├── index.ts            Plugin entry: every rule's plugin, in one array
├── configs/            Presets: accessibility, recommended, strict
├── rules/<rule-name>/  One folder per rule
└── utils/              Helpers shared by two or more rules
test/
├── conformance.test.ts Structural checks over every rule
└── testRule.ts         The `testRule` adapter used by rule tests
scripts/                Contributor scripts, such as the rule scaffold
docs/conventions/       Code conventions, each with a permanent ID
```

`src/index.ts` and `src/configs/*` are the only public entry points.

## Rule anatomy

Each rule lives in `src/rules/<rule-name>/`, and its Stylelint name is `defensive-css/<rule-name>`.

| File           | Purpose                                                             |
| :------------- | :------------------------------------------------------------------ |
| `index.ts`     | Creates the plugin with `stylelint.createPlugin`                    |
| `meta.ts`      | `name`, `messages` and `meta` (`url`, `fixable`, `deprecated`)      |
| `rule.ts`      | The rule function: validate options, walk the tree, report problems |
| `rule.test.ts` | Accept, reject and autofix cases through the global `testRule`      |
| `README.md`    | The rule's documentation page, which `meta.url` links to            |
| `utils.ts`     | Optional logic used only by this rule                               |

Create new rules with `npm run scaffold:rule -- <rule-name>` rather than by copying an existing rule. The scaffold uses the current target shape, while existing rules are only brought up to it during the Milestone 4 audit.

A rule must:

- Pass the message arguments to `report()` as `messageArgs`, and pass the message function itself as `message`, so users can override messages.
- Set `meta.fixable: true` only when it passes a `fix` callback to `report()`. Never mutate the tree outside that callback.
- Set `meta.url` to its own `README.md` on GitHub.
- Be registered in `src/index.ts`. The scaffold does this.

`test/conformance.test.ts` enforces these. It keeps a temporary exemption list for each check, covering rules that predate the check. The lists may only shrink: a new rule never goes on one, and the test fails when an exempted rule starts passing, so remove it from the list.

## Writing tests

Rule tests call the global `testRule`:

```ts
import { messages, name } from './meta';

testRule({
  config: [true],
  fix: true,
  ruleName: name,

  accept: [{ code: 'a { color: red; }', description: 'why this passes' }],

  reject: [
    {
      code: 'a { color: blue; }',
      description: 'why this fails',
      fixed: 'a { color: red; }',
      message: messages.rejected('blue'),
    },
  ],
});
```

- Every reject case needs a `message`. Add `line`, `column`, `endLine` and `endColumn` when the range matters, or use `warnings` for several problems.
- With `fix: true`, every reject case needs `fixed`. The adapter also checks that accept cases are unchanged by the fix and that fixed output lints to the same result.
- Cover nested CSS. Native nesting is the reference: a nested selector must give the same result as its flat equivalent, and syntax only a preprocessor can resolve must never crash a rule or produce a misleading report.

## Conventions

The rules in [docs/conventions/](docs/conventions/README.md) apply to all code, and each has a permanent ID to cite in reviews:

- [general.md](docs/conventions/general.md): lint discipline and descriptive names (`GEN-*`)
- [structure.md](docs/conventions/structure.md): files, folders, imports and exports (`FS-*`, `RX-*`)
- [typescript.md](docs/conventions/typescript.md): types and function signatures (`TS-*`)

Most of these are enforced by ESLint and TypeScript. Fix violations instead of suppressing them. An unavoidable suppression names the exact rule and gives a reason (`GEN-01`).

## Pull requests and commits

- Branch from `release/v3.0.0` and open pull requests against it.
- Pull requests are squash merged, so the title becomes the changelog entry. Titles must follow Conventional Commits, such as `fix(require-flex-wrap): handle nested rules`. Use `!` for breaking changes.
- Keep one rule per pull request when changing rule behavior.
- Never push to `main` or force-push a shared branch.

## Skills

Repository skills live in `.claude/skills/`:

- `create-rule`: plan, scaffold, implement and test a new rule.
