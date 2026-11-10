---
name: create-rule
description: Plan, scaffold, implement, test and document a new defensive-css Stylelint rule. Use when asked to add, create or prototype a rule in this plugin.
---

# Create a rule

Follow these steps in order. [AGENTS.md](../../../AGENTS.md) defines the rule anatomy and the commands.

## 1. Agree on the rule first

Before writing code, confirm these with the user:

- **The problem:** the CSS pattern that fails, and when it breaks a real layout or user experience.
- **The name:** `no-<thing>` for a disallowed pattern, or `require-<thing>` for a missing safeguard.
- **False positives:** valid code that looks similar, and how the rule tells the two apart. If it can't be told apart reliably, the rule should not report it.
- **Overlap:** whether a built-in Stylelint rule already covers it. If one does, don't create the rule.
- **Autofix:** offer one only when the fix is always safe and keeps the author's intent.
- **Options:** start with `true` only. Add secondary options when a real use case needs one, and reuse an existing option's name and shape when it means the same thing (`TS-02`).

## 2. Scaffold

```bash
npm run scaffold:rule -- <rule-name>
npm run scaffold:rule -- <rule-name> --fixable
```

This creates `src/rules/<rule-name>/` and registers the rule in `src/index.ts`. Don't add it to a preset. Adding a rule to an existing preset is a breaking change, so that's the user's decision.

## 3. Write failing tests

Fill in `rule.test.ts` before the implementation, and cover:

- The basic accept and reject cases, each with a `description` explaining why.
- Nested CSS that must give the same result as its flat equivalent, such as `.a { &:hover {} }` and `.a { @media (width > 40em) { … } }`.
- Uppercase and mixed-case properties and values.
- Values inside `var()`, `calc()` and other functions.
- Look-alikes that must not report: matches inside strings, comments, URLs, custom property names and longer identifiers.
- Selector lists, handled one selector at a time, when the rule reads selectors.
- The exact range, using `line`, `column`, `endLine` and `endColumn`, when it matters.
- With `fix: true`, a `fixed` result for every reject case.

Run `npm test -- src/rules/<rule-name>` and confirm the reject cases fail.

## 4. Implement

- Keep the scaffold's `report()` shape: pass `message: messages.<key>` and its arguments as `messageArgs`.
- Prefer a parser to regular expressions on raw values, and use the helpers in `src/utils/` before writing new ones.
- Change nodes only inside the `fix` callback.
- Logic used only by this rule goes in the rule's `utils.ts` (`FS-04`).

## 5. Document

Fill in the rule's `README.md`. Replace every `TODO` with a real explanation and real examples, and check that the examples match the tests.

## 6. Verify

```bash
npm run lint
npm run typecheck
npm run format:check
npm test
```

`test/conformance.test.ts` must pass without exemptions. Never add a new rule to its exemption lists.

Pull request titles use `feat(<rule-name>): <summary>`.
