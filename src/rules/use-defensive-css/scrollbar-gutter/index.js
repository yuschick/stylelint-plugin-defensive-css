import stylelint from 'stylelint';
import { ruleMessages, ruleName } from '../base.js';
import { overflowProperties } from '../../../utils/overflow.js';

const defaultScrollbarGutterProps = {
  hasOverflow: false,
  hasScrollbarGutter: false,
  nodeToReport: undefined,
};

let scrollbarGutterProps = { ...defaultScrollbarGutterProps };

export function scrollbarGutter({ decl, isLastStyleDeclaration, result }) {
  if (
    overflowProperties.includes(decl.prop) &&
    (decl.value.includes('auto') || decl.value.includes('scroll'))
  ) {
    scrollbarGutterProps.hasOverflow = true;
    scrollbarGutterProps.nodeToReport = decl;
  }

  if (decl.prop.includes('scrollbar-gutter')) {
    scrollbarGutterProps.hasScrollbarGutter = true;
  }

  if (isLastStyleDeclaration) {
    if (
      scrollbarGutterProps.hasOverflow &&
      !scrollbarGutterProps.hasScrollbarGutter
    ) {
      stylelint.utils.report({
        message: ruleMessages.scrollbarGutter(),
        node: scrollbarGutterProps.nodeToReport,
        result,
        ruleName,
      });
    }

    scrollbarGutterProps = { ...defaultScrollbarGutterProps };
  }
}
