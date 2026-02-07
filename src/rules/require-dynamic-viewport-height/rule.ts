import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import { SeverityProps } from '../../utils/types';
import { hasStaticViewportHeight, Properties, recommendedOptions } from './utils';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  fix?: boolean;
  properties?: Properties;
}

export const requireDynamicViewportHeight: Rule = (
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

    const completePropertyOptions: Properties = {
      ...recommendedOptions,
      ...secondaryOptions.properties,
    };

    root.walkDecls((decl) => {
      const { prop, value } = decl;

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

      if (!isRuleEnabled || !resolvedSeverity) {
        return;
      }

      if (hasStaticViewportHeight(value)) {
        report({
          fix: () => {
            decl.value = value
              .replace(/\b100vh\b/gi, '100dvh')
              .replace(/\b100vb\b/gi, '100dvb');
          },
          message: messages[resolvedSeverity](prop),
          node: decl,
          result,
          ruleName: name,
          severity: resolvedSeverity,
        });
      }
    });
  };
};

requireDynamicViewportHeight.ruleName = name;
requireDynamicViewportHeight.messages = messages;
requireDynamicViewportHeight.meta = meta;
