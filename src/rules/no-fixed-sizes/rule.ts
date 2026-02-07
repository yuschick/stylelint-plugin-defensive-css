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
  strictOptions,
} from './categories';
import { isValidAtRule, isValidValue } from './utils';
import { severityOption, SeverityProps } from '../../utils/types';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  ['at-rules']?: AtRules;
  properties?: Properties;
}

export const noFixedSizes: Rule = (
  primaryOption,
  secondaryOptions: SecondaryOptions = {},
) => {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      name,
      {
        actual: primaryOption,
        possible: [true, false],
      },
      {
        actual: secondaryOptions,
        optional: true,
        possible: {
          ...severityOption,
          'at-rules': [
            (value: unknown) => {
              if (typeof value !== 'object' || value === null || Array.isArray(value)) {
                return false;
              }

              const props = value as Record<string, unknown>;
              const completeAtRules = [
                ...Object.keys(defaultAtRules),
                ...nonDimensionalAtRules,
              ];

              return Object.entries(props).every(([key, val]) => {
                if (!completeAtRules.includes(key)) {
                  return false;
                }

                if (typeof val === 'boolean') {
                  return true;
                }

                if (Array.isArray(val)) {
                  if (val.length !== 2) {
                    return false;
                  }

                  return true;
                }

                return false;
              });
            },
          ],
          properties: [
            (value: unknown) => {
              if (typeof value !== 'object' || value === null || Array.isArray(value)) {
                return false;
              }

              const props = value as Record<string, unknown>;

              return Object.entries(props).every(([key, val]) => {
                if (!(key in strictOptions)) {
                  return false;
                }

                if (typeof val === 'boolean') {
                  return true;
                }

                if (Array.isArray(val)) {
                  if (val.length !== 2) {
                    return false;
                  }

                  return true;
                }

                return false;
              });
            },
          ],
        },
      },
    );

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

      const customRuleOption = secondaryOptions['at-rules']?.[atRuleName];
      const defaultRuleOption = defaultAtRules[atRuleName];
      const resolvedRuleOption = completeAtRulesOptions[atRuleName];

      const isRuleEnabled = Array.isArray(resolvedRuleOption)
        ? resolvedRuleOption[0]
        : resolvedRuleOption;

      const resolvedSeverity = Array.isArray(customRuleOption)
        ? customRuleOption[1].severity
        : (severity ??
          (Array.isArray(defaultRuleOption) ? defaultRuleOption[1].severity : undefined));

      const isNonDimensionalAtRule = nonDimensionalAtRules.includes(atRuleName);

      if (
        !(atRuleName in completeAtRulesOptions) ||
        !isRuleEnabled ||
        !resolvedSeverity ||
        isNonDimensionalAtRule
      ) {
        return;
      }

      const isValid = isValidAtRule(atRule.params);

      if (!isValid) {
        report({
          message: messages[resolvedSeverity](atRuleName),
          node: atRule,
          result,
          ruleName: name,
          severity: resolvedSeverity,
          word: atRuleName,
        });
      }
    });

    /* Check declarations */
    root.walkDecls((decl) => {
      const { prop } = decl;

      const customRuleOption = secondaryOptions.properties?.[prop as keyof Properties];
      const defaultRuleOption = recommendedOptions[prop as keyof Properties];
      const resolvedRuleOption = completePropertyOptions[prop as keyof Properties];

      const isRuleEnabled = Array.isArray(resolvedRuleOption)
        ? resolvedRuleOption[0]
        : resolvedRuleOption;

      const resolvedSeverity = Array.isArray(customRuleOption)
        ? customRuleOption[1].severity
        : (severity ??
          (Array.isArray(defaultRuleOption) ? defaultRuleOption[1].severity : undefined));

      if (!(prop in completePropertyOptions) || !isRuleEnabled || !resolvedSeverity) {
        return;
      }

      const isValid = isValidValue(decl.value);

      if (!isValid) {
        report({
          message: messages[resolvedSeverity](prop),
          node: decl,
          result,
          ruleName: name,
          severity: resolvedSeverity,
          word: prop,
        });
      }
    });
  };
};

noFixedSizes.ruleName = name;
noFixedSizes.messages = messages;
noFixedSizes.meta = meta;
