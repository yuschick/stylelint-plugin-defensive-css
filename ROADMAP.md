# v3 Roadmap

**Status:** Draft, November 2026. Target: 3.0.0 by the end of March 2027. Dates are estimates.

v3 makes the plugin accurate first and larger second. Every existing rule is audited and moved to real CSS parsing, the project adopts Stylelint's own conventions, and releases become tokenless and verifiable. New rules come after that work is done.

## Decisions

| Topic | Decision |
| --- | --- |
| Stylelint support | 16 and newer. Drop 14 and 15. The exact 16.x floor is set by CI in Milestone 1. |
| Module format | ESM only. Stylelint 17 and 18 are ESM-only, and 16 can load ESM plugins. |
| v2 | Frozen at 2.10.0. All fixes ship in v3, and the accuracy gains are a reason to upgrade. |
| Branching | All v3 work happens on `release/v3.0.0`, which acts as the release's main branch. `main` stays on v2 until 3.0.0 ships, so v2 work needs no cherry-picking. |
| Testing releases | Each qualifying merge into `release/v3.0.0` publishes an RC to the `next` dist-tag, so `latest` stays on 2.10.0 until 3.0.0. |
| Landing v3 | The official release workflow publishes 3.0.0 and merges the branch into `main` with a merge commit, preserving the history. |
| Code conventions | Imported from an existing source and audited for this codebase. Anything a linter can check is enforced by CI, and the rest is written guidance. |
| Nesting | Native CSS nesting is the reference behavior. A nested selector must produce the same result as its flat equivalent, and syntax that only a preprocessor can resolve must never crash a rule or produce a misleading report. |
| Docs | Structured Markdown that can move to a site later without rewriting. |
| New presets | Undecided. Revisit once the new rules are known. |
| Breaking changes | Anything that changes what gets reported or fixed ships in 3.0.0. |

## Milestones

| # | Milestone | Target | Depends on |
| --- | --- | --- | --- |
| 1 | Tooling and CI | Nov–Dec | None |
| 2 | Release pipeline | Dec | 1 |
| 3 | Shared architecture | Dec–Jan | 1 |
| 4 | Audit of the existing rules | Jan | 3 |
| 5 | Documentation | Jan–Feb | 4 |
| 6 | New rule development | Feb | 4, 5 |
| 7 | Agent integrations and migration | Feb–Mar | 5 |
| 8 | Beta, release candidate and 3.0.0 | Mar | All |

Milestone 6 can continue in 3.x if time runs short, because new rules are not breaking changes unless they join an existing preset.

---

## Milestone 1: Tooling and CI

**Outcome:** every pull request proves the plugin builds, lints and passes on every supported Stylelint version.

### Release branch

- [x] Create `release/v3.0.0` from `main` at v2.10.0, so changelog generation has a reachable starting tag.
- [x] Add a `release/**` ruleset that requires pull requests and squash merges, so each pull request is one changelog entry.
- [ ] Open one bootstrap pull request to `main` containing the new `release.yaml` and Dependabot's `target-branch: release/v3.0.0`. GitHub reads manually triggered workflows and Dependabot config from the default branch.
- [ ] If `main` ever gets a v2 fix, merge `main` into `release/v3.0.0`.

### Code conventions

This work comes before the Milestone 3 refactors, so all later code follows it.

- [x] Import the TypeScript and coding conventions from the source repository.
- [x] Audit each one: keep, adapt for this codebase, or remove.
- [x] Move everything a linter can check into `eslint.config.mts` and `tsconfig.json`.
- [ ] Put the remaining guidance in `AGENTS.md` and focused files under `docs/conventions/`.
- [ ] Add a `CLAUDE.md` that imports `AGENTS.md`, so every agent tool reads one source.
- [x] Bring existing code into line with the new lint settings.

### Pull request checks

- [x] Run lint, typecheck, build and tests. Today only tests run.
- [x] Add a compatibility matrix: lowest supported 16.x, latest 16.x, 17 and 18.
- [x] Set the 16.x floor from what the matrix proves, then update `peerDependencies`. The floor is 16.7.0: 27 autofix tests fail on 16.6.1 and every earlier version tested.
- [x] Add `engines.node` and raise `.nvmrc` to at least 24.15. It is on 24.10, below Stylelint 18's minimum.
- [ ] Validate the published package shape with `publint` and `@arethetypeswrong/cli`.
- [ ] Mark the required checks in the `Main` and `release/**` rulesets.
- [x] Lint pull request titles as Conventional Commits, because squash merges turn the title into the changelog entry.

### Dependencies

- [ ] Close the Dependabot backlog on `main` (#235, #236, #237, #238 and #239) and take those updates on `release/v3.0.0`.
- [ ] Group Dependabot updates and add the `github-actions` ecosystem.
- [ ] Remove `eslint-plugin-prettier` and run `prettier --check` directly.
- [ ] Decide whether `vitest-stylelint-utils` stays or is replaced by a small local adapter.
- [ ] Remove stale `external` entries from `tsdown.config.ts` and confirm `csstype` does not leak into published types.
- [ ] Add `types` conditions to `exports`, and drop the CommonJS builds.
- [ ] Move `V1-DOCUMENTATION.md` out of the repository root.

The plugin has only one runtime dependency, so there is little to remove. Milestone 3 may add a parser, and that is a good trade for correctness.

### Contributor automation

- [ ] Add `AGENTS.md` with the rule anatomy, conventions and commands.
- [ ] Add a `scaffold:rule` script that creates the source, test and doc files.
- [ ] Add repository skills for creating a rule, auditing a rule and writing rule docs.
- [ ] Add a conformance test that runs over every rule and fails unless:
  - the rule is exported and has a test file and a doc page
  - `meta.url` points at that rule's doc page
  - `meta.fixable` matches whether the rule passes a `fix` callback
  - reports pass `messageArgs`
  - every preset references only rules that exist
  - the rule is registered with the nesting test suite from Milestone 3

The conformance test enforces the rules. Skills speed up the writing, and the test catches what they miss.

---

## Milestone 2: Release pipeline

**Outcome:** merging publishes a testable RC automatically, and an official release is one button in GitHub with nothing to type. No token ever needs regenerating, and every npm version carries provenance.

### Current problems

- `NPM_TOKEN` and `GH_TOKEN` are long-lived secrets that have to be replaced by hand.
- The release job runs no lint or tests before publishing.
- `inputs.branch` is interpolated directly into a shell command.
- The package publishes first and merges to `main` afterwards, so a failed merge leaves npm ahead of the repository.
- The `Main` ruleset requires pull requests, so the release commit relies on `GH_TOKEN` holding admin bypass.

### Target design

| Credential today | Replacement | Upkeep |
| --- | --- | --- |
| `NPM_TOKEN` | npm trusted publishing (OIDC) | None. No secret exists. |
| `GH_TOKEN` | GitHub App with ruleset bypass, minting a one-hour token per run | None. The key does not expire unless rotated. |

One workflow, `release.yaml`, handles both paths, so npm needs only one trusted publisher. The version always comes from the branch name: `release/v3.0.0` means `3.0.0`.

**Release candidates run automatically** on a merge into a `release/**` branch, skipping merges that only touch docs or tests:

1. Verify: install, lint, typecheck, build and test.
2. Set the version to `3.0.0-rc.<workflow run number>` in CI only.
3. Publish to the `next` dist-tag. Nothing is committed back, so there are no CI loops or tag clutter.

Test the latest RC with `npm install -D stylelint-plugin-defensive-css@next`.

**Official releases run manually:** open **Actions**, then **Release**, choose **Run workflow**, and select the release branch.

1. Verify as above, and confirm the branch merges cleanly into `main` before anything is published.
2. Mint the GitHub App token.
3. Let `release-it` set the version, write the changelog, commit, tag, create the GitHub release and publish.
4. Merge the release branch into `main` with a merge commit. This step is safe to re-run if it fails.

Later v2 work uses the same flow from a branch such as `release/v2.10.1`.

### Setup steps for the repository owner

These need your npm and GitHub accounts. npm trusted publisher configurations expire if they don't complete a successful publish within 2 days, so do Part A on the day of the first RC.

**Before Part A:** finish the workflow changes below and merge them, so the workflow filename is final. npm connections cannot be edited, only deleted and recreated.

#### Part A: npm trusted publisher

1. On npmjs.com, open the package's **Settings**, then **Trusted publishing**, and choose **GitHub Actions**.
2. Enter these values. They are case-sensitive, and npm doesn't validate them until publish time:
   - Organization or user: `yuschick`
   - Repository: `stylelint-plugin-defensive-css`
   - Workflow filename: `release.yaml`
   - Environment name: `npm`
   - Allowed actions: `npm publish`

#### Part B: GitHub environment

1. In the repository, open **Settings**, then **Environments**, and create `npm`.
2. Restrict **Deployment branches** to the pattern `release/*`.

#### Part C: GitHub App, replacing `GH_TOKEN`

1. Open **GitHub Settings**, **Developer settings**, **GitHub Apps**, then **New GitHub App**.
2. Name it, set the homepage to the repository, and turn off **Webhook**.
3. Under repository permissions, set **Contents** to read and write. Leave everything else off.
4. Allow installation only on your own account and create the app.
5. Generate a private key, then install the app on this repository only.
6. In the repository's Actions settings, add a variable `RELEASE_APP_ID` and a secret `RELEASE_APP_PRIVATE_KEY`.
7. In **Settings**, **Rules**, add the app to the bypass list with **Always** on both the `Main` and `release/**` rulesets.

#### Part D: After the first successful RC and official-release dry run

1. On npmjs.com, open **Settings**, then **Publishing access**, and select the option that requires 2FA and disallows tokens. OIDC publishing is unaffected.
2. Delete the `NPM_TOKEN` and `GH_TOKEN` repository secrets, and revoke the originals.

### Workflow and configuration changes

- [ ] Replace the old workflow with `release.yaml`, triggered by `push` to `release/**` for RCs and `workflow_dispatch` for official releases, with no typed inputs.
- [ ] Limit RCs to changes under `src/` and to `package.json`, `package-lock.json` and build config.
- [ ] Refuse to run unless the branch name matches `release/v<major>.<minor>.<patch>`.
- [ ] Add a concurrency group so two releases can't overlap.
- [ ] Set permissions to `id-token: write` and `contents: read`, and run both jobs in the `npm` environment. The App token handles pushes.
- [ ] Mint the App token with `actions/create-github-app-token`, in the official job only.
- [ ] Use `actions/setup-node` with `registry-url` set, `package-manager-cache: false`, and Node 24.
- [ ] Add a step that fails unless npm is 11.5.1 or newer.
- [ ] Remove the step that writes an auth token to `.npmrc`.
- [ ] Set `npm.skipChecks: true` in the `release-it` config, because `npm whoami` has no token under OIDC.
- [ ] Remove `requireCleanWorkingDir: false` and `requireBranch: false`, and require `release/*`.
- [ ] Pin third-party actions to commit SHAs.

**Exit test:** a merge into `release/v3.0.0` publishes `3.0.0-rc.<n>` to `next` with provenance and leaves `latest` on 2.10.0. A `release-it` dry run also succeeds on the branch and generates the expected changelog.

### Changelog and release notes

- [ ] Use rule names as commit scopes, such as `fix(require-grid-minmax): ...`, so entries say which rule changed.
- [ ] Show a **Breaking Changes** section generated from `!` and `BREAKING CHANGE:` footers.
- [ ] Hide `build`, `ci`, `chore`, `refactor`, `style` and `test`, so tooling work stays out of user-facing notes.
- [ ] Publish the same content to `CHANGELOG.md` and the GitHub release.
- [ ] Link the migration guide from the 3.0.0 release notes.
- [ ] Generate the 3.0.0 changelog from `v2.10.0` to the release commit. RCs create no tags, so it reads as one complete summary.

The changelog is generated, and the migration guide is written by hand. Commits explain what changed, while the guide explains what to do about it.

---

## Milestone 3: Shared architecture

**Outcome:** rules contain only their CSS logic, and each kind of parsing has one tested implementation.

- [ ] Add `createRule()` to replace the option validation, metadata attachment and `createPlugin` setup repeated in all 21 rules. If it mirrors Stylelint's signature, it needs a described TS-03 suppression.
- [ ] Remove the remaining type assertions as rules move to the traversal module, then enable `@typescript-eslint/consistent-type-assertions` to enforce TS-09.
- [ ] Choose the parsing stack. Evaluate `@csstools/css-tokenizer`, `@csstools/css-parser-algorithms` and `@csstools/media-query-list-parser`, all of which Stylelint 18 already depends on, and keep `postcss-selector-parser`.
- [ ] Build one tree traversal module, so loops and tree logic live in one place:
  - a single `ancestors(node)` iterator containing the only upward loop
  - `closest()` and `hasAncestor()` built on that iterator
  - type-safe checks for a node's direct parent
  - `ownDeclarations(rule)`, which collects a rule's declarations without entering nested rules
  - at-rule guard helpers such as "inside `@media (hover: hover)`", built on the media query parser
- [ ] Replace the current mix of traversal code: `hasMatchingAncestor` (7 callers), hand-written `while` loops in `require-at-layer` and `require-prefers-reduced-motion` (2), direct `.parent` checks in 4 rules, and media query regular expressions in 3 rules.
- [ ] Add a lint restriction against manual `.parent` traversal outside the traversal module.
- [ ] Add shared helpers for:
  - finding functions and dimensions in values
  - walking selectors, including `:not()` and selector lists
  - normalizing property and function case
  - skipping non-standard syntax such as SCSS and Less
  - matching `ignore` patterns using Stylelint's string and `/regex/` conventions

### Nesting and selector model

Stylelint lints source code, so the differences that matter are in how nesting is written. Lightning CSS and `postcss-nesting` accept the native syntax, and mainly change the compiled output. `postcss-nested`, SCSS and Less add forms that have no native equivalent.

| Group | Forms to cover |
| --- | --- |
| Native, explicit | `& .b`, `&.b`, `&:hover`, `& > .b`, `.b &`, `& + &` |
| Native, implicit | `.a { .b {} }`, `.a { > .b {} }`, `.a { :hover {} }` |
| Chained and compound | `.a.b`, `.a:hover.b`, `&.a.b:hover`, `.a .b:hover > .c` |
| Selector lists | `.a, .b { &:hover {} }`, `.a { &:hover, .b & {} }` |
| Functional pseudo-classes | `:is()`, `:where()`, `:not()`, `:has()`, including `&` inside them |
| Nested at-rules | `@media`, `@supports`, `@container` and `@layer` inside a rule, and rules inside each of those, at multiple depths |
| Scoping | `@scope`, with `:scope` and `&` |
| Preprocessor only | `&__element`, `&-suffix`, `#{&}`, `@at-root`, Less mixins and guards |
| Legacy | `@nest` |

- [ ] Start with a spike: run all 21 rules against this matrix and record what each one does before any refactoring.
- [ ] Add a selector module that gives each rule its selectors resolved against their parents, evaluating `@csstools/selector-resolve-nested` first. Stylelint 18 already depends on it.
- [ ] Have that module clearly mark selectors it cannot resolve, so each rule handles them deliberately.
- [ ] Add a guard check that sees conditions on either side of a nested selector, such as `@media (hover: hover) { .a { &:hover {} } }` and `.a { @media (hover: hover) { &:hover {} } }`.
- [ ] Apply one coverage principle to rules that pair declarations: the required declaration must apply everywhere the triggering declaration applies.
  - A nested `.b` never satisfies `.a`, because it targets a different element.
  - `.a { display: flex; @media (min-width: 40em) { flex-wrap: wrap } }` is reported, because `flex-wrap` is undefined below 40em.
  - `.a { @media (min-width: 40em) { display: flex; flex-wrap: wrap } }` passes, because both declarations share the same condition.
  - Conditions that can't be proven to cover the trigger are treated as not covering it.
- [ ] Add a shared nesting test suite:
  - **Equivalence:** flat cases are rewritten into nested forms automatically, and must produce the same result as the flat version.
  - **Fixtures:** cases that can't be generated, such as guards and declaration pairing, are written by hand for each rule.
  - **Parsers:** cases run with the default parser, `postcss-scss` and `postcss-less`.
  - **Autofix:** fixes on nested code produce valid output that is stable when run twice.
- [ ] Record any intentional difference from the flat result in the rule's test file and docs.

### Adopt Stylelint's built-in behavior

- [ ] Replace the custom `fix` option with Stylelint's `disableFix`. **Breaking.**
- [ ] Pass `messageArgs` to `report()` so custom `message` options work.
- [ ] Stop declaring `severity` in rule validation, and remove redundant `severity: 'error'` from presets where possible. Per-axis severities stay.
- [ ] Give each rule its own `meta.url`.
- [ ] Report precise ranges with `index` and `endIndex` where a problem is narrower than its node.
- [ ] Use `result.stylelint.postcss` when creating nodes. It is new in Stylelint 18, so 16 and 17 need a fallback.
- [ ] Use `utils.checkAgainstRule()` wherever a built-in rule already does the work.
- [ ] Review each rule for overlap with built-in rules.

---

## Milestone 4: Audit of the existing rules

**Outcome:** all 21 rules are migrated to the shared architecture and each passes the same checklist.

Every rule gets one pull request. Each case below starts as a failing test.

### Audit checklist

- [ ] Uses the shared parsers instead of regular expressions on raw values
- [ ] Uses the traversal module for all tree navigation
- [ ] Handles uppercase and mixed-case CSS
- [ ] Passes the shared nesting test suite for every form in the Milestone 3 matrix
- [ ] Ignores matches inside strings, comments, URLs and longer identifiers
- [ ] Handles selector lists item by item
- [ ] Handles `var()`, `calc()` and nested functions
- [ ] Handles logical properties where a physical one is checked
- [ ] Reports the correct source range
- [ ] Autofix output is valid CSS and stable when run twice
- [ ] Tested with SCSS and Less syntaxes where relevant
- [ ] Tested with `disableFix`, custom `message`, `severity` and `ignore`

### Confirmed defects

| Rule | Input | Current result | Expected |
| --- | --- | --- | --- |
| `require-grid-minmax` | `11fr 1fr` | Fixed to `1minmax(0, 1fr) minmax(0, 1fr)` | Valid output |
| `require-grid-minmax` | `1.1fr 2fr` | Fixed to `1.minmax(0, 1fr) 2fr` | Valid output |
| `require-grid-minmax` | `var(--col-1fr)` | Fixed to `var(--col-minmax(0, 1fr))` | Untouched |
| `require-grid-minmax` | `--grid-template-columns: 1fr` | Reported | Not reported |
| `require-grid-minmax` | `GRID-TEMPLATE-COLUMNS: 1FR` | Missed | Reported |
| `require-grid-minmax`, `no-list-style-none`, `require-dynamic-viewport-height` | `{ fix: false }` | Still fixes | Replaced by `disableFix` |
| `require-flex-wrap` | `.a { display: flex; .b { flex-wrap: wrap } }` | Missed | Reported on `.a` |
| `require-flex-wrap` | `DISPLAY: FLEX` | Missed | Reported |
| `require-flex-wrap` | `a { display: flex }` | Highlights the "a" in `display` | Correct range |
| `require-scrollbar-gutter` | Parent `overflow`, gutter only in nested child | Missed | Reported on parent |
| `require-custom-property-fallback` | `var(--a, var(--b))` | Inner `--b` missed | Reported |
| `require-custom-property-fallback` | `VAR(--a)` | Missed | Reported |
| `require-custom-property-fallback` | `"var(--a)"` in a string | Reported | Not reported |
| `require-custom-property-fallback` | `somevar(--a)` | Reported | Not reported |
| `require-focus-visible` | `a:focus, b:focus-visible` | Missed | Reports `a:focus` |
| `require-focus-visible` | `a:not(:focus) b:focus` | Missed | Reports `b:focus` |
| `no-accidental-hover` | `@media (hover: none) { a:hover {} }` | Treated as guarded | Reported |
| All rules with `ignore` | `"/^\\.foo/"` as a string | Never matches | Treated as regex |
| All rules with `ignore` | Regex with the `g` flag | Matches inconsistently | Consistent |
| All rules | Custom `message` with `%s` | Prints a literal `%s` | Substitutes arguments |

Up to 8 rules use the same `word: selector` reporting pattern as `require-flex-wrap`. The audit should check each one. The checklist is expected to uncover more defects.

### Rules audited

Tick off as each rule's pull request merges.

- [ ] `no-accidental-hover`
- [ ] `no-fixed-sizes`
- [ ] `no-list-style-none`
- [ ] `no-mixed-vendor-prefixes`
- [ ] `no-unsafe-clamp-font-size`
- [ ] `no-unsafe-will-change`
- [ ] `no-user-select-none`
- [ ] `require-at-layer`
- [ ] `require-background-repeat`
- [ ] `require-custom-property-fallback`
- [ ] `require-dynamic-viewport-height`
- [ ] `require-flex-wrap`
- [ ] `require-focus-visible`
- [ ] `require-forced-colors-focus`
- [ ] `require-grid-minmax`
- [ ] `require-named-grid-lines`
- [ ] `require-overscroll-behavior`
- [ ] `require-prefers-reduced-motion`
- [ ] `require-pure-selectors`
- [ ] `require-scrollbar-gutter`
- [ ] `require-system-font-fallback`

---

## Milestone 5: Documentation

**Outcome:** every rule has a complete page, and every example in the docs is proven by a test.

- [ ] Reduce the README to the pitch, install, quickstart, presets and a generated rule table.
- [ ] Create `docs/rules/<rule>.md` from one template: why it matters, options, failing examples, passing examples, autofix before and after, browser support and references.
- [ ] Add `docs/guides/` for getting started, presets, nesting and custom syntaxes, ignoring patterns and troubleshooting.
- [ ] Add `docs/migrations/v3.md`.
- [ ] Generate the rule and preset tables from rule metadata, and fail CI if they are stale.
- [ ] Test the fenced CSS examples in each doc page against its rule.
- [ ] Use front matter and relative links, so the pages can be moved into a site later.
- [ ] Add `CONTRIBUTING.md`, linked from `AGENTS.md`.

---

## Milestone 6: New rule development

**Outcome:** new rules that catch CSS that fails unsafely, each held to the same standard as the audited rules.

Individual rules are deliberately not defined yet. This milestone starts only once Milestones 4 and 5 are complete.

### Areas to research

- Custom functions and `if()`
- Modern color functions
- `corner-shape` and `border-shape`
- Anchor positioning and anchored container queries
- `inherit()`
- View transitions
- Scroll-driven and scroll-triggered animations
- `reading-flow` and `reading-order`
- Scroll-state container queries
- Further defensive CSS patterns and common gotchas

### Process

- [ ] Refresh browser support data from `web-features`, since these features are moving quickly.
- [ ] Propose candidates in a shared list, deciding for each whether it is a new rule or an extension of an existing one.
- [ ] Check each candidate against built-in Stylelint rules and popular plugins.
- [ ] Assess whether it can be decided from one file, since Stylelint lints files individually.
- [ ] Define and commit the final rule list.
- [ ] Build each rule through the scaffold, conformance test and docs template.
- [ ] Decide preset placement, including whether a new preset is justified.

---

## Milestone 7: Agent integrations and migration

**Outcome:** agents follow the rules while generating CSS, and can move a project from v2 to v3.

### Generation-time guidance

- [ ] Generate a `rules.json` manifest from rule metadata.
- [ ] Ship `skills/defensive-css/SKILL.md`, generated from the rule docs, covering what to write before any lint runs.
- [ ] Document a verification loop: lint with the JSON formatter, fix, and repeat.
- [ ] Publish usage docs for popular agent tools.
- [ ] Evaluate an MCP server after the skill ships. It would validate code after generation, so it comes second.

### v2 to v3 migration

- [ ] Keep a register of every breaking change in `migrations/v3.json`.
- [ ] Ship a migration skill that reads the register and:
  - updates the Stylelint config and peer version
  - replaces `fix` options with `disableFix`
  - corrects `ignore` patterns
  - runs Stylelint before and after
  - sorts new warnings into autofixable, needs review, and worth a suppression comment
  - summarizes the changes for the developer to review
- [ ] Test the skill against fixture projects with known expected configs.
- [ ] Publish the human migration guide from the same register.

---

## Milestone 8: Release

RCs publish continuously to `next` from Milestone 2 onward. These checkpoints decide when to ask for wider testing and when to ship.

| Checkpoint | Dist-tag | Exit criteria |
| --- | --- | --- |
| Internal testing | `next` | RC pipeline proven, and used on your own projects |
| Public testing | `next` | All rules audited, and docs complete |
| Release ready | `next` | Migration skill verified on at least 2 real projects, with no open blockers |
| 3.0.0 | `latest` | At least 2 weeks of RCs with no breaking issues, then run the official release |

- [ ] Test RCs on real projects, and ask existing users for feedback at the public testing checkpoint.
- [ ] Publish the migration guide and release notes together.
- [ ] Add a README note pointing v2 users to the migration guide.
- [ ] Write a launch post covering what the audit found and why accuracy was the priority.

## Breaking changes so far

| Change | Migration |
| --- | --- |
| Stylelint 14, 15 and 16.0–16.6 are no longer supported | Upgrade to Stylelint 16.7 or newer, on Node 20.19 or newer |
| CommonJS build removed | Load the plugin as ESM. Stylelint handles this. |
| `fix` option removed | Remove it, and use `disableFix: true` to opt out |
| `ignore` strings follow Stylelint's `/regex/` convention | Review existing patterns |
| More accurate rules report new problems | Run `--fix`, then review what remains |

## References

- [Writing Stylelint plugins](https://stylelint.io/developer-guide/plugins/)
- [Migrating to Stylelint 17](https://stylelint.io/migration-guide/to-17/)
- [Migrating to Stylelint 18](https://stylelint.io/migration-guide/to-18/)
- [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/)
- [release-it npm documentation](https://github.com/release-it/release-it/blob/main/docs/npm.md)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [web-features](https://github.com/web-platform-dx/web-features)
