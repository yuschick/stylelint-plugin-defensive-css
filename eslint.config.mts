import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier/flat';
import { createNodeResolver, importX } from 'eslint-plugin-import-x';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const restrictedSyntax = [
  {
    selector: 'ExportAllDeclaration',
    message: 'Use explicit named exports instead of `export *` (RX-04).',
  },
  {
    selector: 'TSEnumDeclaration',
    message: 'Use a string-literal union instead of an enum (TS-07).',
  },
  {
    selector: ":function TSAsExpression[typeAnnotation.typeName.name='const']",
    message: 'Use `satisfies` instead of `as const` inside a function (TS-09).',
  },
  {
    selector: 'FunctionDeclaration[params.length>1]',
    message: 'Pass a single options object to our own functions (TS-03).',
  },
  {
    // Rule functions keep the positional signature Stylelint defines
    selector:
      "VariableDeclarator[id.typeAnnotation.typeAnnotation.typeName.name!='Rule'] > :matches(ArrowFunctionExpression, FunctionExpression)[params.length>1]",
    message: 'Pass a single options object to our own functions (TS-03).',
  },
];

export default defineConfig(
  globalIgnores(['**/coverage/', '**/dist/']),
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  comments.recommended,
  // After the presets, so it turns off their rules that conflict with
  // Prettier, but before ours, so `curly` and `quotes` stay enabled
  prettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    settings: {
      // TypeScript reports unresolved imports, so the built-in Node resolver
      // is enough for classifying imports in `import-x/order`
      'import-x/resolver-next': [createNodeResolver()],
    },
    rules: {
      // GEN-01: suppressions must be targeted, described and scoped
      '@eslint-community/eslint-comments/disable-enable-pair': [
        'error',
        { allowWholeFile: false },
      ],
      '@eslint-community/eslint-comments/no-unlimited-disable': 'error',
      '@eslint-community/eslint-comments/no-unused-disable': 'error',
      '@eslint-community/eslint-comments/require-description': [
        'error',
        { ignore: ['eslint-enable'] },
      ],

      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': [
        'error',
        { default: 'array', readonly: 'array' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/member-ordering': [
        'error',
        { default: { order: 'natural-case-insensitive' } },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        // Unused variables and parameters must start with an underscore
        {
          selector: ['variable', 'parameter'],
          modifiers: ['unused'],
          leadingUnderscore: 'require',
          format: null,
        },
        { selector: ['variable', 'function'], format: ['camelCase'] },
        // UPPER_CASE for constant value sets
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
        },
        { selector: 'parameter', format: ['camelCase'] },
        // Names that need quotes, such as CSS properties, are exempt
        {
          selector: [
            'classProperty',
            'objectLiteralProperty',
            'typeProperty',
            'classMethod',
            'objectLiteralMethod',
            'typeMethod',
            'accessor',
          ],
          modifiers: ['requiresQuotes'],
          format: null,
        },
        {
          selector: ['class', 'interface', 'typeAlias'],
          format: ['PascalCase'],
        },
      ],
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: false,
        },
      ],

      curly: ['error', 'all'],
      eqeqeq: ['error', 'always'],
      // GEN-02: descriptive identifiers
      'id-length': [
        'error',
        { min: 2, exceptions: ['_'], properties: 'never' },
      ],

      'import-x/first': 'error',
      'import-x/named': 'off',
      'import-x/namespace': 'off',
      'import-x/newline-after-import': 'error',
      'import-x/no-absolute-path': 'error',
      // RX-04: named exports only
      'import-x/no-default-export': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-named-as-default': 'off',
      'import-x/no-named-as-default-member': 'off',
      // TypeScript reports unresolved imports
      'import-x/no-unresolved': 'off',
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['object'],
            ['parent', 'sibling', 'index'],
          ],
          pathGroups: [
            { pattern: '@package-*/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      'no-console': 'error',
      'no-extra-boolean-cast': [
        'error',
        { enforceForInnerExpressions: true },
      ],
      'no-prototype-builtins': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['src/*'],
              message: 'Import using a path alias or a relative path.',
            },
            {
              regex: '^(\\.\\./){2,}',
              message: 'Use a path alias instead of a deep import (FS-06).',
            },
          ],
        },
      ],
      'no-restricted-syntax': ['error', ...restrictedSyntax],
      // Prettier leaves backtick strings alone, so this keeps plain strings
      // single-quoted; template literals are still fine with interpolation
      quotes: ['error', 'single', { avoidEscape: true }],
      'sort-keys': ['error', 'asc', { caseSensitive: false, natural: true }],
    },
  },
  // JavaScript files aren't part of the TypeScript project
  {
    files: ['**/*.{js,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  // Stylelint and config tools load these files by their default export
  {
    files: ['src/index.ts', 'src/configs/*.ts', '**/*.config.{js,mjs,ts,mts}'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  // Readable order matters more than sorted keys in configs and test cases
  {
    files: ['**/*.config.{js,mjs,ts,mts}', '**/*.test.ts'],
    rules: {
      'sort-keys': 'off',
    },
  },
);
