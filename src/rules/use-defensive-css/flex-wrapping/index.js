import stylelint from 'stylelint';
import { ruleMessages, ruleName } from '../base.js';

const defaultFlexWrappingProps = {
  isDisplayFlex: false,
  isFlexRow: true,
  isMissingFlexWrap: true,
  nodeToReport: undefined,
};

let flexWrappingProps = { ...defaultFlexWrappingProps };

export function flexWrapping({ decl, isLastStyleDeclaration, result }) {
  if (decl.prop === 'display' && decl.value.includes('flex')) {
    flexWrappingProps.isDisplayFlex = true;
    flexWrappingProps.nodeToReport = decl;
  }

  if (decl.prop === 'flex-flow' && decl.value.includes('column')) {
    flexWrappingProps.isFlexRow = false;
    flexWrappingProps.isMissingFlexWrap = false;
  }

  if (decl.prop === 'flex-direction' && decl.value.includes('column')) {
    flexWrappingProps.isFlexRow = false;
  }

  if (
    decl.prop === 'flex-wrap' ||
    (decl.prop === 'flex-flow' && decl.value.includes('wrap'))
  ) {
    flexWrappingProps.isMissingFlexWrap = false;
  }

  if (isLastStyleDeclaration) {
    if (Object.values(flexWrappingProps).every((prop) => prop)) {
      stylelint.utils.report({
        message: ruleMessages.flexWrapping(),
        node: flexWrappingProps.nodeToReport,
        result,
        ruleName,
      });
    }

    flexWrappingProps = { ...defaultFlexWrappingProps };
  }
}
