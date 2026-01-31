import stylelint from 'stylelint';
import { ruleMessages, ruleName } from '../base.js';
import { findCustomProperties } from './utils.js';

export function customPropertyFallbacks({ decl, options, result }) {
  const propertiesWithoutFallback = findCustomProperties(decl.value);

  if (propertiesWithoutFallback.length) {
    if (Array.isArray(options?.['custom-property-fallbacks'])) {
      if (options['custom-property-fallbacks'][0]) {
        const patterns = options['custom-property-fallbacks'][1].ignore;
        const patternMatched = propertiesWithoutFallback.some((property) => {
          return patterns.some((pattern) =>
            typeof pattern === 'string'
              ? new RegExp(pattern).test(property)
              : pattern.test(property),
          );
        });

        if (patternMatched) {
          return;
        }
      } else {
        return;
      }
    }

    stylelint.utils.report({
      message: ruleMessages.customPropertyFallbacks(),
      node: decl,
      result,
      ruleName,
    });
  }
}
