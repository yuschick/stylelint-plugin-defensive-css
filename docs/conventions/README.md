# Code Conventions

How code in this repository is written. Every rule carries a permanent ID so it can be cited in reviews, lint messages and AI output, such as "violates `TS-03`".

| File                           | IDs             | Applies to      | Governs                                  |
| :----------------------------- | :-------------- | :-------------- | :--------------------------------------- |
| [general.md](general.md)       | `GEN-*`         | Everything      | Lint discipline and naming               |
| [structure.md](structure.md)   | `FS-*`, `RX-*`  | `src/**`        | Files, folders, imports and exports      |
| [typescript.md](typescript.md) | `TS-*`          | `**/*.{ts,mts}` | Types, interfaces and functions          |

These rules are adapted from the author's shared standards. IDs match the originals, so gaps in the numbering are rules that don't apply to a Stylelint plugin.

## Precedence

1. The more specific rule wins.
2. The paired ✅/❌ examples are authoritative.
3. Stylelint's public API shapes are not ours to change. See [TS-03](typescript.md#ts-03--single-object-parameters-for-functions).

## How these files are loaded

- **Claude Code:** each file is symlinked into `.claude/rules/`. Files with a `paths` field load only when Claude reads or edits a matching file. `general.md` has no `paths` field, so it always loads.
- **GitHub Copilot:** the `applyTo` field scopes each file the same way.

Keep `paths` and `applyTo` in sync when changing a file's scope.

## Adding or changing a rule

- Use the next unused number in the domain. Never reuse a retired ID.
- Write rules with **MUST** and **MUST NOT**, followed by a ✅/❌ example.
- Add a matching line to the file's Pre-Submission Checklist.
- If a linter can check the rule, enforce it in `eslint.config.mts` or `tsconfig.json`, and cite the ID there.
- Add a new domain as a new file here, a symlink in `.claude/rules/`, and a row in the table above.
