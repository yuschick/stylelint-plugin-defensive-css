/**
 * @author Daniel Yuschick
 * @fileoverview Rule to enforce safer use of the will-change property
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import { severityOption, SeverityProps } from '../../utils/types';
import { PropertiesHyphen } from 'csstype';
import { compositeProperties, CompositeProperty, defaultValues, globals } from './utils';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  ignore?: (keyof PropertiesHyphen)[];
  maxProperties?: number;
}

export const noUnsafeWillChange: Rule = (
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
          ignore: [(value: unknown) => typeof value === 'string'],
          maxProperties: [(value: unknown) => typeof value === 'number' && value > 0],
        },
      },
    );

    if (!validOptions) return;

    const { ignore = [], maxProperties = 2, severity = 'error' } = secondaryOptions;

    root.walkDecls('will-change', (decl) => {
      const { parent, value } = decl;

      // If selector is *, throw error
      if (parent?.type === 'rule') {
        const hasUniversalSelector = parent.selector
          .split(/[\s,>+~]/)
          .some((part) => part.trim() === '*');

        if (hasUniversalSelector) {
          report({
            message: messages.invalidSelector(parent.selector),
            node: decl,
            result,
            ruleName: name,
            severity,
          });
        }
      }

      const properties = value
        .split(',')
        .map((part) => part.trim().toLowerCase())
        .filter(Boolean);

      // If the amount of properties exceeds maxProperties, error
      if (properties.length > maxProperties) {
        report({
          message: messages.exceedsLimit(properties.length, maxProperties),
          node: decl,
          result,
          ruleName: name,
          severity,
        });
      }

      const filteredProperties = Array.from(properties).filter(
        (prop) => !ignore?.includes(prop as keyof PropertiesHyphen),
      );

      // If non-composite properties are in the value, and not in ignore, error
      const safeValues = [...compositeProperties, ...defaultValues, ...globals];

      const nonCompositeProperties = filteredProperties.filter(
        (prop) => !safeValues.includes(prop as CompositeProperty),
      );

      if (nonCompositeProperties.length > 0) {
        report({
          message: messages.invalidProperty(nonCompositeProperties.join(', ')),
          node: decl,
          result,
          ruleName: name,
          severity,
        });
      }
    });
  };
};

noUnsafeWillChange.ruleName = name;
noUnsafeWillChange.messages = messages;
noUnsafeWillChange.meta = meta;
