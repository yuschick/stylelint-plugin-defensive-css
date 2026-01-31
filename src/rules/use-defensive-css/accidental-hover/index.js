import stylelint from 'stylelint';
import { ruleMessages, ruleName } from '../base.js';

export function accidentalHover({ decl, result }) {
  let isWrappedInHoverAtRule = false;

  function traverseParentRules(parent) {
    if (parent.parent.type === 'root') {
      return;
    }

    if (parent.parent.params && /hover(: hover)?/.test(parent.parent.params)) {
      isWrappedInHoverAtRule = true;
    } else {
      traverseParentRules(parent.parent);
    }
  }

  const parent = decl.parent;
  const selector = parent.selector;
  const isHoverSelector = selector?.includes(':hover');

  // If the :hover selector is inside a :not() selector, ignore it
  if (/:not\(([^)]*:hover[^)]*)\)/g.test(selector)) {
    return;
  }

  if (isHoverSelector) {
    traverseParentRules(parent);

    if (!isWrappedInHoverAtRule) {
      stylelint.utils.report({
        message: ruleMessages.accidentalHover(),
        node: decl.parent,
        result,
        ruleName,
      });
    }
  }
}
