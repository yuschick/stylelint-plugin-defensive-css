/**
 * @author Daniel Yuschick
 * @fileoverview Rule to require all styles to be wrapped in a top-level @layer rule.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import { severityOption, SeverityProps } from '../../utils/types';
import { findRootLevelLayer } from './utils';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  supportedLayerNames?: string[];
}

export const requireAtLayer: Rule = (
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
          supportedLayerNames: [(value: unknown) => typeof value === 'string'],
        },
      },
    );

    if (!validOptions) return;

    const { severity, supportedLayerNames = [] } = secondaryOptions;

    root.walkRules((ruleNode) => {
      // Skip rules nested inside another rule (only check top-level style rules)
      if (ruleNode.parent?.type === 'rule') {
        return;
      }

      const rootLayer = findRootLevelLayer(ruleNode);

      if (!rootLayer) {
        report({
          message: messages.notWrapped(supportedLayerNames),
          node: ruleNode,
          result,
          ruleName: name,
          severity,
        });

        return;
      }

      if (supportedLayerNames?.length && !supportedLayerNames.includes(rootLayer.name)) {
        report({
          message: messages.unsupportedName(rootLayer.name, supportedLayerNames),
          node: ruleNode,
          result,
          ruleName: name,
          severity,
        });
      }
    });
  };
};

requireAtLayer.ruleName = name;
requireAtLayer.messages = messages;
requireAtLayer.meta = meta;
