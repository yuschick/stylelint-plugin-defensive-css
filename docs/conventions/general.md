---
description: 'Cross-cutting rules for all code in this repository.'
applyTo: '**'
---

# General Rules

> **Core Philosophy:** Clear and stable code over complex abstractions.

Rule IDs are permanent: rules may be reordered or retired, but an ID is never reused. See the [conventions index](README.md) for every domain.

## Rules

### GEN-01 · Strict Linter Compliance & Suppression Discipline

- All code **MUST** pass ESLint, Prettier and type-checking with zero warnings or errors.
- When a lint or type error occurs, the code **MUST** be refactored to comply rather than suppressing the check.
- Any unavoidable suppression directive **MUST** name the exact rule being overridden and explain why it is bypassed. Bare, untargeted directives are **STRICTLY FORBIDDEN**.
- A suppression that can eventually be removed **MUST** also link a tracking issue or `TODO`. A permanent one, such as matching a Stylelint API shape, needs only its reason.
- `@ts-ignore` **MUST NOT** be used. Prefer `@ts-expect-error`, so the suppression fails once the underlying error is resolved.

```ts
/* ✅ Correct: exact rule and explanation */
// eslint-disable-next-line no-restricted-syntax -- TS-03: mirrors Stylelint's (primary, secondary) rule signature
function createRule(primary: unknown, secondary: SecondaryOptions) {}

/* ❌ Incorrect: bare directive with no rule target or reason */
// @ts-ignore
const value = node.params;
```

### GEN-02 · Descriptive Identifiers (No Single-Letter Names)

- All identifiers, including parameters, loop indices, exception bindings and callback arguments, **MUST** use descriptive, full-word names.
- Single-letter names (`e`, `i`, `v`, `x`, `t`) and truncations (`err`, `idx`) are **STRICTLY FORBIDDEN**.
- Array iteration parameters **MUST** use domain-descriptive nouns such as `decl`, `selector` or `node`, and full positional names such as `index`.
- Exception parameters in `catch` blocks **MUST** be named `error` or `unknownError`.
- `decl` is the accepted name for a PostCSS declaration, matching the PostCSS API.

```ts
/* ✅ Correct */
const longhands = values.filter((value, index) => value !== '' && index > 0);

/* ❌ Incorrect */
const longhands = values.filter((v, i) => v !== '' && i > 0);
```

---

## Pre-Submission Checklist

- [ ] Zero suppressions without an exact rule and reason (GEN-01)
- [ ] Descriptive identifiers, with no single-letter names (GEN-02)
