/**
 * Structural checks over every rule and preset. AGENTS.md explains the
 * requirements, and the exemption lists below explain the exceptions.
 */

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Config, Plugin, Rule } from 'stylelint';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import plugins from '../src';

const ROOT = join(import.meta.dirname, '..');
const RULES_DIR = join(ROOT, 'src/rules');
const CONFIGS_DIR = join(ROOT, 'src/configs');
const NAMESPACE = 'defensive-css';
const PACKAGE_NAME = 'stylelint-plugin-defensive-css';
const DOCS_BASE_URL = `https://github.com/yuschick/${PACKAGE_NAME}/blob/main/src/rules`;
const REQUIRED_FILES = ['index.ts', 'meta.ts', 'rule.test.ts', 'rule.ts'];

type CheckName = 'docs' | 'fixable' | 'messageArgs' | 'url';

const CHECK_NAMES: CheckName[] = ['docs', 'fixable', 'messageArgs', 'url'];

/**
 * Rules that predate a check, until the milestone that brings them into line.
 * These lists may only shrink: a new rule is never added, and the check fails
 * when an exempted rule starts passing, so it must then be removed.
 */
const EXEMPTIONS: Record<CheckName, string[]> = {
  // Milestone 5 writes every rule's README.md
  docs: [
    'no-accidental-hover',
    'no-fixed-sizes',
    'no-list-style-none',
    'no-mixed-vendor-prefixes',
    'no-unsafe-clamp-font-size',
    'no-unsafe-will-change',
    'no-user-select-none',
    'require-at-layer',
    'require-background-repeat',
    'require-custom-property-fallback',
    'require-dynamic-viewport-height',
    'require-flex-wrap',
    'require-focus-visible',
    'require-forced-colors-focus',
    'require-grid-minmax',
    'require-named-grid-lines',
    'require-overscroll-behavior',
    'require-prefers-reduced-motion',
    'require-pure-selectors',
    'require-scrollbar-gutter',
    'require-system-font-fallback',
  ],
  fixable: [],
  // Milestone 3 adopts `messageArgs`
  messageArgs: [
    'no-accidental-hover',
    'no-fixed-sizes',
    'no-list-style-none',
    'no-mixed-vendor-prefixes',
    'no-unsafe-clamp-font-size',
    'no-unsafe-will-change',
    'no-user-select-none',
    'require-at-layer',
    'require-background-repeat',
    'require-custom-property-fallback',
    'require-dynamic-viewport-height',
    'require-flex-wrap',
    'require-focus-visible',
    'require-forced-colors-focus',
    'require-grid-minmax',
    'require-named-grid-lines',
    'require-overscroll-behavior',
    'require-prefers-reduced-motion',
    'require-pure-selectors',
    'require-scrollbar-gutter',
    'require-system-font-fallback',
  ],
  // Milestone 3 gives each rule its own `meta.url`
  url: [
    'no-accidental-hover',
    'no-fixed-sizes',
    'no-list-style-none',
    'no-mixed-vendor-prefixes',
    'no-unsafe-clamp-font-size',
    'no-unsafe-will-change',
    'no-user-select-none',
    'require-at-layer',
    'require-background-repeat',
    'require-custom-property-fallback',
    'require-dynamic-viewport-height',
    'require-flex-wrap',
    'require-focus-visible',
    'require-forced-colors-focus',
    'require-grid-minmax',
    'require-named-grid-lines',
    'require-overscroll-behavior',
    'require-prefers-reduced-motion',
    'require-pure-selectors',
    'require-scrollbar-gutter',
    'require-system-font-fallback',
  ],
};

interface RuleContext {
  folder: string;
  reportCalls: ts.ObjectLiteralExpression[];
  rule?: Rule;
}

const ruleFolders = readdirSync(RULES_DIR, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const presetFiles = readdirSync(CONFIGS_DIR)
  .filter((file) => file.endsWith('.ts') && !file.endsWith('.d.ts'))
  .sort();

function toRuleName(folder: string): string {
  return `${NAMESPACE}/${folder}`;
}

function getRegisteredRule(plugin: Plugin): { rule: Rule; ruleName: string } {
  if ('ruleName' in plugin) {
    return plugin;
  }

  if (plugin.default === undefined) {
    throw new TypeError('A registered plugin has no rule');
  }

  return plugin.default;
}

const registeredRules = plugins.map(getRegisteredRule);

function getPropertyName(property: ts.ObjectLiteralElementLike) {
  return property.name !== undefined && ts.isIdentifier(property.name)
    ? property.name.text
    : undefined;
}

function getProperty({
  call,
  name,
}: {
  call: ts.ObjectLiteralExpression;
  name: string;
}) {
  return call.properties.find((property) => getPropertyName(property) === name);
}

function isReportCall(node: ts.Node): node is ts.CallExpression {
  if (!ts.isCallExpression(node)) {
    return false;
  }

  const callee = node.expression;

  return ts.isPropertyAccessExpression(callee)
    ? callee.name.text === 'report'
    : ts.isIdentifier(callee) && callee.text === 'report';
}

// Finds the options object of every `report()` call in the rule's source
function getReportCalls(folder: string): ts.ObjectLiteralExpression[] {
  const ruleDir = join(RULES_DIR, folder);
  const calls: ts.ObjectLiteralExpression[] = [];

  function visit(node: ts.Node) {
    if (isReportCall(node)) {
      const [options] = node.arguments;

      if (options !== undefined && ts.isObjectLiteralExpression(options)) {
        calls.push(options);
      }
    }

    ts.forEachChild(node, visit);
  }

  readdirSync(ruleDir)
    .filter((file) => file.endsWith('.ts') && !file.endsWith('.test.ts'))
    .forEach((file) => {
      const filePath = join(ruleDir, file);

      visit(
        ts.createSourceFile(
          filePath,
          readFileSync(filePath, 'utf8'),
          ts.ScriptTarget.Latest,
        ),
      );
    });

  return calls;
}

// A message must be `messages.<key>` and, when that message is a function,
// its arguments must be passed as `messageArgs`
function getMessageProblems({
  call,
  rule,
}: {
  call: ts.ObjectLiteralExpression;
  rule: Rule;
}): string[] {
  const message = getProperty({ call, name: 'message' });

  if (
    message === undefined ||
    !ts.isPropertyAssignment(message) ||
    !ts.isPropertyAccessExpression(message.initializer)
  ) {
    return ['report() must pass `message: messages.<key>`'];
  }

  const messageKey = message.initializer.name.text;
  const hasMessageArgs =
    getProperty({ call, name: 'messageArgs' }) !== undefined;

  return typeof rule.messages[messageKey] === 'function' && !hasMessageArgs
    ? [`report() passing messages.${messageKey} must also pass messageArgs`]
    : [];
}

const CHECKS: Record<CheckName, (context: RuleContext) => string[]> = {
  docs: ({ folder }) =>
    existsSync(join(RULES_DIR, folder, 'README.md'))
      ? []
      : ['README.md is missing'],

  fixable: ({ reportCalls, rule }) => {
    const hasFixCallback = reportCalls.some(
      (call) => getProperty({ call, name: 'fix' }) !== undefined,
    );
    const isFixable = rule?.meta?.fixable === true;

    return isFixable === hasFixCallback
      ? []
      : [
          `meta.fixable is ${String(isFixable)}, but a fix callback is ${hasFixCallback ? '' : 'not '}passed to report()`,
        ];
  },

  messageArgs: ({ reportCalls, rule }) =>
    rule === undefined
      ? ['the rule is not registered']
      : reportCalls.flatMap((call) => getMessageProblems({ call, rule })),

  url: ({ folder, rule }) => {
    const expectedUrl = `${DOCS_BASE_URL}/${folder}/README.md`;

    return rule?.meta?.url === expectedUrl
      ? []
      : [`meta.url must be ${expectedUrl}`];
  },
};

function hasDefaultConfig(module: unknown): module is { default: Config } {
  return typeof module === 'object' && module !== null && 'default' in module;
}

describe('rule registration', () => {
  it('registers exactly one plugin for every rule folder', () => {
    expect(registeredRules.map(({ ruleName }) => ruleName).sort()).toEqual(
      ruleFolders.map(toRuleName),
    );
  });

  it.each(CHECK_NAMES)('only exempts existing rules from "%s"', (check) => {
    expect(
      EXEMPTIONS[check].filter((folder) => !ruleFolders.includes(folder)),
    ).toEqual([]);
  });
});

describe.each(ruleFolders)('%s', (folder) => {
  const rule = registeredRules.find(
    ({ ruleName }) => ruleName === toRuleName(folder),
  )?.rule;

  it('has the required files', () => {
    expect(
      REQUIRED_FILES.filter(
        (file) => !existsSync(join(RULES_DIR, folder, file)),
      ),
    ).toEqual([]);
  });

  it('reports problems through report()', () => {
    expect(getReportCalls(folder)).not.toEqual([]);
  });

  it.each(CHECK_NAMES)('passes the "%s" check', (check) => {
    const problems = CHECKS[check]({
      folder,
      reportCalls: getReportCalls(folder),
      rule,
    });

    if (EXEMPTIONS[check].includes(folder)) {
      expect(
        problems,
        `${folder} now passes "${check}", so remove it from EXEMPTIONS.${check}`,
      ).not.toEqual([]);

      return;
    }

    expect(problems, problems.join('\n')).toEqual([]);
  });

  it.todo('is registered with the nesting test suite from Milestone 3');
});

describe.each(presetFiles)('preset %s', (file) => {
  it('loads this plugin and references only its existing rules', async () => {
    const module: unknown = await import(join(CONFIGS_DIR, file));

    if (!hasDefaultConfig(module)) {
      throw new TypeError(`${file} has no default export`);
    }

    const { plugins: presetPlugins, rules = {} } = module.default;
    const ruleNames = ruleFolders.map(toRuleName);

    expect(presetPlugins).toEqual([PACKAGE_NAME]);
    expect(
      Object.keys(rules).filter((ruleName) => !ruleNames.includes(ruleName)),
    ).toEqual([]);
  });
});
