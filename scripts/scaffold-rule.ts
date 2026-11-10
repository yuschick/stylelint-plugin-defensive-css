/**
 * Creates a rule folder from the current rule template and registers the
 * rule in `src/index.ts`.
 *
 * Usage: npm run scaffold:rule -- <rule-name> [--fixable]
 */

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { parseArgs } from 'node:util';

const ROOT = resolve(import.meta.dirname, '..');
const RULES_DIR = join(ROOT, 'src/rules');
const ENTRY_FILE = join(ROOT, 'src/index.ts');
const REPOSITORY_URL =
  'https://github.com/yuschick/stylelint-plugin-defensive-css';
const RULE_NAME_PATTERN = /^(no|require)(-[a-z0-9]+)+$/;

interface RuleNames {
  camelName: string;
  fullName: string;
  ruleName: string;
}

interface TemplateOptions {
  isFixable: boolean;
  names: RuleNames;
}

function toCamelCase(ruleName: string): string {
  return ruleName.replace(/-([a-z0-9])/g, (_match, letter: string) =>
    letter.toUpperCase(),
  );
}

function getIndexTemplate({ camelName }: RuleNames): string {
  return `import stylelint from 'stylelint';

import * as meta from './meta';
import { ${camelName} } from './rule';

export const ${camelName}Plugin = stylelint.createPlugin(meta.name, ${camelName});
`;
}

function getMetaTemplate({ isFixable, names }: TemplateOptions): string {
  return `import type { RuleMeta } from 'stylelint';
import stylelint from 'stylelint';

const { ruleMessages } = stylelint.utils;

export const name = '${names.fullName}';
export const messages = ruleMessages(name, {
  // TODO: describe the problem and how to fix it
  rejected: (property: string) => \`Unexpected "\${property}"\`,
});

export const meta: RuleMeta = {
  deprecated: false,
  fixable: ${String(isFixable)},
  url: '${REPOSITORY_URL}/blob/main/src/rules/${names.ruleName}/README.md',
};
`;
}

function getRuleTemplate({ isFixable, names }: TemplateOptions): string {
  const fix = isFixable
    ? `
        fix: () => {
          // TODO: change the node so the problem no longer applies
        },`
    : '';

  return `import type { Declaration } from 'postcss';
import type { Rule } from 'stylelint';
import stylelint from 'stylelint';

import { messages, meta, name } from './meta';

const { report, validateOptions } = stylelint.utils;

// TODO: return true when the declaration breaks the rule
function isRejected(_decl: Declaration): boolean {
  return false;
}

export const ${names.camelName}: Rule = (primaryOption) => {
  return (root, result) => {
    const validOptions = validateOptions(result, name, {
      actual: primaryOption,
      possible: [true],
    });

    if (!validOptions) {
      return;
    }

    root.walkDecls((decl) => {
      if (!isRejected(decl)) {
        return;
      }

      report({${fix}
        message: messages.rejected,
        messageArgs: [decl.prop],
        node: decl,
        result,
        ruleName: name,
        word: decl.prop,
      });
    });
  };
};

${names.camelName}.ruleName = name;
${names.camelName}.messages = messages;
${names.camelName}.meta = meta;
`;
}

function getTestTemplate({ isFixable }: TemplateOptions): string {
  const fix = isFixable ? '\n  fix: true,' : '';

  return `import { name } from './meta';

testRule({
  config: [true],${fix}
  ruleName: name,

  accept: [
    {
      code: 'a { color: red; }',
      description: 'TODO: describe why this passes',
    },
  ],

  reject: [
    // TODO: add failing cases, importing \`messages\` from './meta':
    // {
    //   code: 'a { color: red; }',
    //   description: 'why this fails',
    //   message: messages.rejected('color'),
    // },
  ],
});
`;
}

function getReadmeTemplate({ isFixable, names }: TemplateOptions): string {
  const fixNote = isFixable
    ? '\n🔧 Problems reported by this rule can be fixed automatically with `--fix`.\n'
    : '';

  return `# ${names.ruleName}

TODO: one sentence on what this rule enforces.
${fixNote}
## Why

TODO: the problem this prevents, and when it appears.

## Options

### \`true\`

\`\`\`json
{
  "rules": {
    "${names.fullName}": true
  }
}
\`\`\`

## Examples

### ❌ Incorrect

\`\`\`css
TODO
\`\`\`

### ✅ Correct

\`\`\`css
TODO
\`\`\`
`;
}

function isRuleImport(line: string): boolean {
  return line.includes("from './rules/");
}

// Sorts by module path, matching `import-x/order`
function getImportPath(line: string): string {
  return line.slice(line.indexOf("'"));
}

// Adds the rule's import and plugin to `src/index.ts`, keeping both sorted
function registerRule({ camelName, ruleName }: RuleNames): void {
  const lines = readFileSync(ENTRY_FILE, 'utf8').split('\n');
  const firstImportIndex = lines.findIndex(isRuleImport);
  const imports = [
    ...lines.filter(isRuleImport),
    `import { ${camelName}Plugin } from './rules/${ruleName}';`,
  ].sort((first, second) =>
    getImportPath(first).localeCompare(getImportPath(second)),
  );
  const updatedLines = lines.filter((line) => !isRuleImport(line));

  updatedLines.splice(firstImportIndex, 0, ...imports);

  const startIndex = updatedLines.indexOf('const plugins: Plugin[] = [');
  const endIndex = updatedLines.indexOf('];', startIndex);

  if (firstImportIndex === -1 || startIndex === -1 || endIndex === -1) {
    throw new Error(
      'Could not find the rule imports and plugin array in src/index.ts',
    );
  }

  const entries = [
    ...updatedLines.slice(startIndex + 1, endIndex),
    `  ${camelName}Plugin,`,
  ].sort((first, second) => first.localeCompare(second));

  updatedLines.splice(startIndex + 1, endIndex - startIndex - 1, ...entries);
  writeFileSync(ENTRY_FILE, updatedLines.join('\n'));
}

function scaffoldRule(): void {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: { fixable: { default: false, type: 'boolean' } },
  });
  const [ruleName] = positionals;

  if (ruleName === undefined || !RULE_NAME_PATTERN.test(ruleName)) {
    throw new Error(
      'Usage: npm run scaffold:rule -- <rule-name> [--fixable]\n' +
        'The name must be kebab-case and start with "no-" or "require-".',
    );
  }

  const ruleDir = join(RULES_DIR, ruleName);

  if (existsSync(ruleDir)) {
    throw new Error(`The rule "${ruleName}" already exists`);
  }

  const names: RuleNames = {
    camelName: toCamelCase(ruleName),
    fullName: `defensive-css/${ruleName}`,
    ruleName,
  };
  const options: TemplateOptions = { isFixable: values.fixable, names };
  const files = {
    'index.ts': getIndexTemplate(names),
    'meta.ts': getMetaTemplate(options),
    'README.md': getReadmeTemplate(options),
    'rule.test.ts': getTestTemplate(options),
    'rule.ts': getRuleTemplate(options),
  };

  mkdirSync(ruleDir);

  const createdPaths = Object.entries(files).map(([fileName, contents]) => {
    const filePath = join(ruleDir, fileName);

    writeFileSync(filePath, contents);

    return filePath;
  });

  registerRule(names);
  execFileSync('npx', ['prettier', '--write', ...createdPaths, ENTRY_FILE], {
    cwd: ROOT,
    stdio: 'ignore',
  });

  process.stdout.write(
    [
      `Created ${names.fullName}:`,
      ...createdPaths.map((filePath) => `  ${relative(ROOT, filePath)}`),
      '  registered in src/index.ts',
      '',
      'Next: write failing tests in rule.test.ts, implement rule.ts,',
      'fill in README.md, then decide whether a preset should enable it.',
      '',
    ].join('\n'),
  );
}

try {
  scaffoldRule();
} catch (unknownError) {
  process.stderr.write(
    `${unknownError instanceof Error ? unknownError.message : String(unknownError)}\n`,
  );
  process.exitCode = 1;
}
