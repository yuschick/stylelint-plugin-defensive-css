/**
 * @author Daniel Yuschick
 * @fileoverview Rule to disallow accidental use of :hover outside of appropriate media queries.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import { SeverityProps } from '../../utils/types';

const { report, validateOptions } = stylelint.utils;

export const noAccidentalHover: Rule = (
  primaryOption,
  secondaryOptions: SeverityProps = {},
) => {
  return (root, result) => {
    const validOptions = validateOptions(result, name, {
      actual: primaryOption,
      possible: [true, false],
    });

    if (!validOptions) return;

    const { severity } = secondaryOptions;

    root.walkRules((ruleNode) => {
      const { selector } = ruleNode;

      // Skip if no :hover in selector
      if (!selector.includes(':hover')) {
        return;
      }

      // Skip if :hover is inside :not()
      if (/:not\(([^)]*:hover[^)]*)\)/g.test(selector)) {
        return;
      }

      // Check if wrapped in @media (hover: hover) or @media (hover)
      let { parent } = ruleNode;
      let isWrappedInHoverMedia = false;

      while (parent && parent.type !== 'root') {
        if (parent.type === 'atrule' && parent.name === 'media') {
          if (/hover(:\s*hover)?/.test(parent.params)) {
            isWrappedInHoverMedia = true;
            break;
          }
        }
        parent = parent.parent;
      }

      // Report if :hover is not wrapped in appropriate media query
      if (!isWrappedInHoverMedia) {
        report({
          message: messages.rejected(selector),
          node: ruleNode,
          result,
          ruleName: name,
          severity,
          word: selector,
        });
      }
    });
  };
};

noAccidentalHover.ruleName = name;
noAccidentalHover.messages = messages;
noAccidentalHover.meta = meta;
