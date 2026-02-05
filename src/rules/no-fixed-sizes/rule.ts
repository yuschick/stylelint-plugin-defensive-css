/**
 * @author Daniel Yuschick
 * @fileoverview Rule to prevent fixed sizes in at-rules and properties
 * @license MIT
 */
import type * as CSS from 'csstype';

import stylelint, { Rule } from 'stylelint';
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
      const severity = completeAtRulesOptions[atRuleName] ?? false;
      const isNonDimensionalAtRule = nonDimensionalAtRules.includes(atRuleName);

      if (
        !(atRuleName in completeAtRulesOptions) ||
        !severity ||
        isNonDimensionalAtRule
      ) {
        return;
      }

      const isValid = isValidAtRule(atRule.params);

      if (!isValid) {
        report({
          message: messages[severity](atRuleName),
          node: atRule,
          result,
          ruleName: name,
          severity,
          word: atRuleName,
        });
      }
    });

    /* Check declarations */
    root.walkDecls((decl) => {
      const { prop } = decl;
      const severity = completePropertyOptions[prop as keyof Properties] ?? false;

      if (!(prop in completePropertyOptions) || !severity) {
        return;
      }

      const isValid = isValidValue(decl.value);

      if (!isValid) {
        report({
          message: messages[severity](prop),
          node: decl,
          result,
          ruleName: name,
          severity,
          word: prop,
        });
      }
    });
  };
};

noFixedSizes.ruleName = name;
noFixedSizes.messages = messages;
noFixedSizes.meta = meta;
