/**
 * @author Daniel Yuschick
 * @fileoverview Rule to disallow accidental use of :hover outside of appropriate media queries.
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from '.';

const { report, validateOptions } = stylelint.utils;

export const noAccidentalHover: Rule = (primaryOption) => {
  return (root, result) => {
    const validOptions = validateOptions(result, name, {
      actual: primaryOption,
      possible: [true, false],
    });

    if (!validOptions) return;

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
          word: selector,
        });
      }
    });
  };
};

noAccidentalHover.ruleName = name;
noAccidentalHover.messages = messages;
noAccidentalHover.meta = meta;
