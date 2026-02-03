import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-plugin-prettier/recommended";

export default defineConfig([
  /* --------------------------------------------------
   * Global ignores
   * -------------------------------------------------- */
  {
    ignores: ["eslint.config.mts", "vitest.config.ts", "vitest.setup.ts", "**/dist/**", "**/node_modules/**"],
  },

  /* --------------------------------------------------
   * Base JS (applies to everything)
   * -------------------------------------------------- */
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      curly: ["error", "all"],
      eqeqeq: ["error", "always"],
      "no-console": "error",
      "no-extra-boolean-cast": ["error", { enforceForLogicalOperands: true }],
      "no-plusplus": "off",
      "no-prototype-builtins": "off",
      "no-underscore-dangle": "off",
      "sort-keys": ["error", "asc", { caseSensitive: false, natural: true }],
    },
  },

  /* --------------------------------------------------
   * ESLint recommended JS rules
   * -------------------------------------------------- */
  js.configs.recommended,

  /* --------------------------------------------------
   * TypeScript recommended rules
   * -------------------------------------------------- */
  ...tseslint.configs.recommended,

  /* --------------------------------------------------
   * TypeScript-only rules
   * -------------------------------------------------- */
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: {
            order: "natural-case-insensitive",
          },
        },
      ],
    },
  },

  /* --------------------------------------------------
   * Prettier (MUST BE LAST)
   * -------------------------------------------------- */
  prettier,
]);
