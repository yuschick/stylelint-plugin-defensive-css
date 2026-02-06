/**
 * @author Daniel Yuschick
 * @fileoverview Rule to prevent fixed sizes in at-rules and properties
 * @license MIT
 */
import type * as CSS from 'csstype';

import stylelint, { Rule, Severity } from 'stylelint';
import { messages, meta, name } from './meta';
import {
  AtRules,
  defaultAtRules,
  nonDimensionalAtRules,
  Properties,
  recommendedOptions,
} from './categories';
import { isValidAtRule, isValidValue } from './utils';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions {
  ['at-rules']?: AtRules;
  properties?: Properties;
  severity?: Severity;
}

export const noFixedSizes: Rule = (
  primaryOption,
  secondaryOptions: SecondaryOptions = {},
) => {
  return (root, result) => {
    const validOptions = validateOptions(result, name, {
      actual: primaryOption,
      possible: [true, false],
    });

    if (!validOptions) return;

    const { severity } = secondaryOptions;

    const completeAtRulesOptions: AtRules = {
      ...defaultAtRules,
      ...secondaryOptions['at-rules'],
    };

    const completePropertyOptions: Properties = {
      ...recommendedOptions,
      ...secondaryOptions.properties,
    };

    /* Check at-rules */
    root.walkAtRules((atRule) => {
      const atRuleName = `@${atRule.name}` as CSS.AtRules;

      const ruleOption = completeAtRulesOptions[atRuleName];
      const ruleIsEnabled = Array.isArray(ruleOption) ? ruleOption[0] : ruleOption;
      const ruleSeverity = ruleIsEnabled
        ? Array.isArray(ruleOption)
          ? ruleOption[1].severity
          : severity
        : false;

      const isNonDimensionalAtRule = nonDimensionalAtRules.includes(atRuleName);

      if (
        !(atRuleName in completeAtRulesOptions) ||
        !ruleSeverity ||
        isNonDimensionalAtRule
      ) {
        return;
      }

      const isValid = isValidAtRule(atRule.params);

      if (!isValid) {
        report({
          message: messages[ruleSeverity](atRuleName),
          node: atRule,
          result,
          ruleName: name,
          severity: ruleSeverity,
          word: atRuleName,
        });
      }
    });

    /* Check declarations */
    root.walkDecls((decl) => {
      const { prop } = decl;

      const ruleOption = completePropertyOptions[prop as keyof Properties];
      const ruleIsEnabled = Array.isArray(ruleOption) ? ruleOption[0] : ruleOption;
      const ruleSeverity = ruleIsEnabled
        ? Array.isArray(ruleOption)
          ? ruleOption[1].severity
          : severity
        : false;

      // const severity = completePropertyOptions[prop as keyof Properties] ?? false;

      if (!(prop in completePropertyOptions) || !ruleSeverity) {
        return;
      }

      const isValid = isValidValue(decl.value);

      if (!isValid) {
        report({
          message: messages[ruleSeverity](prop),
          node: decl,
          result,
          ruleName: name,
          severity: ruleSeverity,
          word: prop,
        });
      }
    });
  };
};

noFixedSizes.ruleName = name;
noFixedSizes.messages = messages;
noFixedSizes.meta = meta;
