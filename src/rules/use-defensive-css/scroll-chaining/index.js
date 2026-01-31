import stylelint from 'stylelint';
import { ruleMessages, ruleName } from '../base.js';
import { overflowProperties } from '../../../utils/overflow.js';

const defaultScrollChainingProps = {
  hasOverflow: false,
  hasOverscrollBehavior: false,
  nodeToReport: undefined,
};

let scrollChainingProps = { ...defaultScrollChainingProps };

export function scrollChaining({ decl, isLastStyleDeclaration, result }) {
  if (
    overflowProperties.includes(decl.prop) &&
    (decl.value.includes('auto') || decl.value.includes('scroll'))
  ) {
    scrollChainingProps.hasOverflow = true;
    scrollChainingProps.nodeToReport = decl;
  }

  if (decl.prop.includes('overscroll-behavior')) {
    scrollChainingProps.hasOverscrollBehavior = true;
  }

  if (isLastStyleDeclaration) {
    if (
      scrollChainingProps.hasOverflow &&
      !scrollChainingProps.hasOverscrollBehavior
    ) {
      stylelint.utils.report({
        message: ruleMessages.scrollChaining(),
        node: scrollChainingProps.nodeToReport,
        result,
        ruleName,
      });
    }

    scrollChainingProps = { ...defaultScrollChainingProps };
  }
}
