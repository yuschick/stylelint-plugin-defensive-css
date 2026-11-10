import { inspect } from 'node:util';

import type { Config, LinterResult, LintResult } from 'stylelint';
import stylelint from 'stylelint';
import { describe, expect, it } from 'vitest';

const { lint } = stylelint;

interface TestCase {
  code: string;
  description?: string;
}

interface ExpectedWarning {
  column?: number;
  endColumn?: number;
  endLine?: number;
  line?: number;
  message?: string;
}

interface RejectTestCase extends TestCase, ExpectedWarning {
  fixed?: string;
  warnings?: ExpectedWarning[];
}

interface TestSchema {
  accept?: TestCase[];
  config: unknown;
  fix?: boolean;
  reject?: RejectTestCase[];
  ruleName: string;
}

export type TestRule = (schema: TestSchema) => void;

function getResult(output: LinterResult): LintResult {
  const [result] = output.results;

  if (!result) {
    throw new TypeError('Stylelint returned no results');
  }

  return result;
}

// Reads the PostCSS result because `code` and `output` differ between
// the supported Stylelint major versions
function getFixedCode(output: LinterResult): string {
  const postcssResult = getResult(output)._postcssResult;

  if (!postcssResult) {
    throw new TypeError('Stylelint returned no PostCSS result');
  }

  return postcssResult.root.toString(postcssResult.opts.syntax);
}

function toExpectedWarning({
  column,
  endColumn,
  endLine,
  line,
  message,
}: ExpectedWarning) {
  expect(message, 'Reject cases must have a message').toBeDefined();

  return Object.fromEntries(
    Object.entries({
      column,
      endColumn,
      endLine,
      line,
      text: message,
    }).filter(([, value]) => value !== undefined),
  );
}

export function getTestRule({ plugins }: Pick<Config, 'plugins'>): TestRule {
  return ({ accept = [], config, fix = false, reject = [], ruleName }) => {
    const stylelintConfig: Config = { plugins, rules: { [ruleName]: config } };
    const title = inspect(config);

    describe(ruleName, () => {
      describe.runIf(accept.length > 0)('accept', () => {
        it.each(accept)(`${title} $code: $description`, async ({ code }) => {
          const result = getResult(
            await lint({ code, config: stylelintConfig }),
          );

          expect(result.warnings).toEqual([]);
          expect(result.parseErrors).toEqual([]);
          expect(result.invalidOptionWarnings).toEqual([]);

          if (fix) {
            const fixedOutput = await lint({
              code,
              config: stylelintConfig,
              fix: true,
            });

            expect(getFixedCode(fixedOutput)).toBe(code);
          }
        });
      });

      describe.runIf(reject.length > 0)('reject', () => {
        it.each(reject)(`${title} $code: $description`, async (testCase) => {
          const { code, fixed, warnings = [testCase] } = testCase;
          const result = getResult(
            await lint({ code, config: stylelintConfig }),
          );
          const actualWarnings = [
            ...result.invalidOptionWarnings,
            ...result.warnings,
          ];

          expect(result.parseErrors).toEqual([]);
          expect(actualWarnings).toHaveLength(warnings.length);

          warnings.forEach((warning, index) => {
            expect(actualWarnings[index]).toMatchObject(
              toExpectedWarning(warning),
            );
          });

          if (!fix) {
            return;
          }

          if (fixed === undefined) {
            throw new Error('With `fix: true`, reject cases must have `fixed`');
          }

          const fixedOutput = await lint({
            code,
            config: stylelintConfig,
            fix: true,
          });
          const fixedCode = getFixedCode(fixedOutput);

          expect(fixedCode).toBe(fixed);
          expect(fixedCode).not.toBe(code);

          const relintResult = getResult(
            await lint({ code: fixedCode, config: stylelintConfig }),
          );

          expect(relintResult.parseErrors).toEqual([]);
          expect(relintResult.warnings).toEqual(
            getResult(fixedOutput).warnings,
          );
        });
      });
    });
  };
}
