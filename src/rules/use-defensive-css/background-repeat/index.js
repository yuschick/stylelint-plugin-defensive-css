import stylelint from 'stylelint';
import { ruleMessages, ruleName } from '../base.js';
import { findShorthandBackgroundRepeat } from './utils.js';

const defaultBackgroundRepeatProps = {
  hasBackgroundImage: false,
  isMissingBackgroundRepeat: true,
  nodeToReport: undefined,
};

const defaultMaskRepeatProps = {
  hasMaskImage: false,
  isMissingMaskRepeat: true,
  nodeToReport: undefined,
};

let backgroundRepeatProps = { ...defaultBackgroundRepeatProps };
let maskRepeatProps = { ...defaultMaskRepeatProps };

export function backgroundRepeat({ decl, isLastStyleDeclaration, result }) {
  const hasUrl = decl.value.includes('url(');
  if (decl.prop === 'background' && hasUrl) {
    backgroundRepeatProps.hasBackgroundImage = true;
    backgroundRepeatProps.isMissingBackgroundRepeat =
      !findShorthandBackgroundRepeat(decl.value);
    backgroundRepeatProps.nodeToReport = decl;
  }
  if (decl.prop === 'mask' && hasUrl) {
    maskRepeatProps.hasMaskImage = true;
    maskRepeatProps.isMissingMaskRepeat = !findShorthandBackgroundRepeat(
      decl.value,
    );
    maskRepeatProps.nodeToReport = decl;
  }

  if (decl.prop === 'background-image' && hasUrl) {
    backgroundRepeatProps.hasBackgroundImage = true;
    backgroundRepeatProps.nodeToReport = decl;
  }
  if (decl.prop === 'mask-image' && hasUrl) {
    maskRepeatProps.hasMaskImage = true;
    maskRepeatProps.nodeToReport = decl;
  }

  if (decl.prop === 'background-repeat') {
    backgroundRepeatProps.isMissingBackgroundRepeat = false;
  }
  if (decl.prop === 'mask-repeat') {
    maskRepeatProps.isMissingMaskRepeat = false;
  }

  if (isLastStyleDeclaration) {
    if (Object.values(backgroundRepeatProps).every((prop) => prop)) {
      stylelint.utils.report({
        message: ruleMessages.backgroundRepeat(),
        node: backgroundRepeatProps.nodeToReport,
        result,
        ruleName,
      });
    }
    if (Object.values(maskRepeatProps).every((prop) => prop)) {
      stylelint.utils.report({
        message: ruleMessages.maskRepeat(),
        node: maskRepeatProps.nodeToReport,
        result,
        ruleName,
      });
    }

    backgroundRepeatProps = { ...defaultBackgroundRepeatProps };
    maskRepeatProps = { ...defaultMaskRepeatProps };
  }
}
