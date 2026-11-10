---
description: 'File, folder, import and export structure for the plugin source.'
applyTo: 'src/**'
paths:
  - 'src/**'
---

# Structure Rules

> **Core Philosophy:** If you know where one thing lives, you know where everything lives.

Rule IDs are permanent: rules may be reordered or retired, but an ID is never reused. See the [conventions index](README.md) for every domain.

## Rules

### FS-04 · Rule Folder Contents

- Each rule **MUST** live in `src/rules/<rule-name>/`, named exactly as the rule without its namespace.
- A rule folder contains `index.ts`, `meta.ts`, `rule.ts`, `rule.test.ts` and `README.md`, the rule's documentation page. Logic specific to that rule goes in `utils.ts`.
- A helper used by one rule stays in that rule's folder. It moves to `src/utils/` only when a second rule needs it.

```bash
✅ Correct
📁 src/rules/require-flex-wrap/
├── README.md
├── index.ts
├── meta.ts
├── rule.test.ts
├── rule.ts
└── utils.ts
```

### FS-05 · Where Tests Live

- Each rule's tests **MUST** be in the sibling `rule.test.ts`.
- Shared utilities **MUST** have a sibling test file named after them, such as `src/utils/traversal.test.ts`.

### FS-06 · Aliased Imports

- An import that climbs more than one folder **MUST** use a path alias from `tsconfig.json` (`@package-configs/*`, `@package-rules/*`, `@package-utils/*`) instead of a `../../` chain. A sibling (`./`) or a single `../` stays relative.

```ts
/* ✅ Correct */
import { matchesIgnorePattern } from '@package-utils/ignore';

/* ❌ Incorrect */
import { matchesIgnorePattern } from '../../utils/ignore';
```

### RX-04 · Named Exports & Default Export Prohibition

- All functions, types and values **MUST** use explicit named exports.
- **Exception:** `src/index.ts`, `src/configs/*` and tool config files **MUST** keep their default export, because Stylelint and those tools load it by that shape.
- Barrel files **MUST NOT** use `export * from`. Every exported entity **MUST** be named.

```ts
/* ✅ Correct */
export { requireFlexWrap } from './rule';

/* ❌ Incorrect */
export * from './rule';
export default requireFlexWrap;
```

### RX-05 · Entry Points

- `src/index.ts` and `src/configs/*` are the package's only public entry points.
- Nothing else in `src/` is public API, and consumers **MUST NOT** be directed to import it.

---

## Pre-Submission Checklist

- [ ] The rule folder holds the expected files, including its `README.md`, and helpers live with the only rule using them (FS-04)
- [ ] Rule tests and shared utility tests are siblings of what they test (FS-05)
- [ ] Imports climbing more than one folder use a path alias (FS-06)
- [ ] Named exports only, except the documented entry points, and no `export *` (RX-04, RX-05)
