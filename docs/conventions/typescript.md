---
description: 'TypeScript conventions governing types, interfaces and functions.'
applyTo: '**/*.ts, **/*.mts'
paths:
  - '**/*.{ts,mts}'
---

# TypeScript Conventions

> **Core Philosophy:** Clear and stable code over complex abstractions.

Rule IDs are permanent: rules may be reordered or retired, but an ID is never reused. See the [conventions index](README.md) for every domain.

`TS-01` and `TS-05` cover React props and hooks, and are not used in this repository.

## Rules

### TS-02 · Consistent Option Names & Internal Boolean Naming

- Secondary options shared by multiple rules **MUST** use identical names, types and default behavior. Declare them once in `src/utils` and reuse them.
- Internal boolean variables and functions **MUST** use an `is`, `has` or `should` prefix.
- Public option names are API. They **MUST NOT** be renamed to fit this rule outside a major release, and **MUST** follow Stylelint's conventions, such as `ignore`.

```ts
/* ✅ Correct */
const isFlexColumn = isColumnDirection(value);
const hasFlexWrap = prop === 'flex-wrap';

/* ❌ Incorrect */
const column = isColumnDirection(value);
const wrap = prop === 'flex-wrap';
```

### TS-03 · Single-Object Parameters for Functions

- Our own utility functions and helpers accepting two or more parameters **MUST** encapsulate them into a single typed options object.
- Our own functions **MUST NOT** use multiple positional arguments.
- This covers helpers in tests too.
- **Exception:** code whose shape is defined by an external API keeps that shape. This covers Stylelint rule functions `(primaryOption, secondaryOptions)` and `(root, result)`, `ruleMessages` callbacks, and callbacks passed to built-in or library methods such as `Array.prototype.map`.
- **Our own function that deliberately mirrors a Stylelint signature**, such as a rule factory, **MUST** suppress the check on the line before it, with a description of why (GEN-01).

```ts
/* ✅ Correct: single options object */
interface HasMatchingAncestorOptions {
  node: ChildNode;
  predicate: (ancestor: AtRule | Root | Rule) => boolean;
}

export function hasMatchingAncestor({
  node,
  predicate,
}: HasMatchingAncestorOptions) {}

/* ✅ Correct: our function mirrors a Stylelint shape, with a described suppression */
// eslint-disable-next-line no-restricted-syntax -- TS-03: mirrors Stylelint's (primary, secondary) rule signature
function createRule(primary: unknown, secondary: SecondaryOptions) {}

/* ❌ Incorrect: positional parameters on our own helper */
export function hasMatchingAncestor(
  node: ChildNode,
  predicate: AncestorPredicate,
) {}
```

### TS-04 · Optional Property Syntax

- Optional properties **MUST** use the `?` operator.
- **MUST NOT** use `null` or explicit `| undefined` in option interfaces unless the code must distinguish between them.

```ts
/* ✅ Correct */
export interface SecondaryOptions {
  ignore?: (string | RegExp)[];
}

/* ❌ Incorrect */
export interface SecondaryOptions {
  ignore: (string | RegExp)[] | null;
}
```

### TS-06 · Prohibition of `any`

- The `any` type is **STRICTLY FORBIDDEN**.
- Genuinely unknown values, such as rule options, caught errors and dynamic input, **MUST** be typed as `unknown` and narrowed before use.
- Suppression directives **MUST NOT** be used to reintroduce `any`-like behavior (GEN-01).

```ts
/* ✅ Correct: unknown narrowed at the boundary */
function isIgnorePattern(value: unknown): value is string | RegExp {
  return typeof value === 'string' || value instanceof RegExp;
}

/* ❌ Incorrect */
function isIgnorePattern(value: any) {
  return value;
}
```

### TS-07 · String-Literal Unions over Enums

- Fixed sets of values **MUST** be modeled as string-literal unions.
- `enum` and `const enum` declarations are **STRICTLY FORBIDDEN**.
- Shared unions **MUST** be declared once as an exported named type and reused.

```ts
/* ✅ Correct */
export type OverflowAxis = 'both' | 'x' | 'y';

/* ❌ Incorrect */
export enum OverflowAxis {
  Both = 'both',
  X = 'x',
  Y = 'y',
}
```

### TS-08 · Invalid Option Combinations as Compile-Time Errors

- Mutually exclusive or interdependent internal types **MUST** be modeled with discriminated unions, using `never` to forbid conflicting members.
- Options arriving from a user's config are unknown at compile time, so they **MUST** also be checked with `validateOptions`.

```ts
/* ✅ Correct: a check is either by axis or across both */
interface AxisCheck {
  axis: 'x' | 'y';
  shorthand?: never;
}

interface ShorthandCheck {
  axis?: never;
  shorthand: true;
}

export type OverflowCheck = AxisCheck | ShorthandCheck;
```

### TS-09 · Casts Are the Last Resort

- Type assertions (`as`) **MUST** be avoided wherever an annotation, `satisfies`, a type guard or a better generic can express the same thing. An unavoidable assertion **MUST** have a comment explaining why nothing else works.
- `as const` **MUST NOT** be used inside a function. Use `satisfies` with the target type. `as const` remains correct for module-level value sets.

```ts
/* ✅ Correct: a type guard narrows the node */
function isAtRule(node: Node): node is AtRule {
  return node.type === 'atrule';
}

/* ❌ Incorrect: the cast checks nothing */
const atRule = node as AtRule;
```

---

## Pre-Submission Checklist

- [ ] Shared options use identical names and types, and booleans use a prefix (TS-02)
- [ ] Our own functions take a single options object, or have a described suppression when mirroring Stylelint (TS-03)
- [ ] Optional properties use `?`, not `| undefined` or `null` (TS-04)
- [ ] No `any`, using `unknown` and narrowing instead (TS-06)
- [ ] String-literal unions, never `enum` (TS-07)
- [ ] Invalid internal combinations are compile-time errors (TS-08)
- [ ] No casts where an annotation, `satisfies` or a type guard works, and no `as const` inside a function (TS-09)
