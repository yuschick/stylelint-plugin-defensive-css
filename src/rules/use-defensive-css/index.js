'use strict';

const stylelint = require('stylelint');

const { ruleName, ruleMessages, ruleMeta } = require('./base');
const {
  findShorthandBackgroundRepeat,
} = require('../../utils/findShorthandBackgroundRepeat');
const { findVendorPrefixes } = require('../../utils/findVendorPrefixes');

const ruleFunction = (_, options) => {
  let isLastStyleDeclaration = false;
  const backgroundRepeatProps = {
    hasBackgroundImage: false,
    isMissingBackgroundRepeat: true,
    nodeToReport: undefined,
  };
  const flexWrappingProps = {
    isDisplayFlex: false,
    isFlexRow: true,
    isMissingFlexWrap: true,
    nodeToReport: undefined,
  };

  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName);

    if (!validOptions) {
      return;
    }

    root.walkDecls((decl) => {
      if (
        JSON.stringify(decl) ===
        JSON.stringify(decl.parent.nodes[decl.parent.nodes.length - 1])
      ) {
        isLastStyleDeclaration = true;
      }

      /* BACKGROUND REPEAT  */
      if (options?.['background-repeat']) {
        if (decl.prop === 'background' && decl.value.includes('url(')) {
          backgroundRepeatProps.hasBackgroundImage = true;
          backgroundRepeatProps.isMissingBackgroundRepeat =
            !findShorthandBackgroundRepeat(decl.value);
          backgroundRepeatProps.nodeToReport = decl;
        }

        if (decl.prop === 'background-image' && decl.value.includes('url(')) {
          backgroundRepeatProps.hasBackgroundImage = true;
          backgroundRepeatProps.nodeToReport = decl;
        }

        if (decl.prop === 'background-repeat') {
          backgroundRepeatProps.isMissingBackgroundRepeat = false;
        }

        if (
          isLastStyleDeclaration &&
          Object.values(backgroundRepeatProps).every((prop) => prop)
        ) {
          stylelint.utils.report({
            message: ruleMessages.backgroundRepeat(),
            node: decl.parent,
            result,
            ruleName,
          });
        }
      }

      /* CUSTOM PROPERTY FALLBACKS */
      if (options?.['custom-property-fallbacks']) {
        if (decl.value.includes('var(--') && !decl.value.includes(',')) {
          stylelint.utils.report({
            message: ruleMessages.customPropertyFallbacks(),
            node: decl,
            result,
            ruleName,
          });
        }
      }

      /* FLEX WRAPPING */
      if (options?.['flex-wrapping']) {
        if (decl.prop === 'display' && decl.value.includes('flex')) {
          flexWrappingProps.isDisplayFlex = true;
          flexWrappingProps.nodeToReport = decl;
        }

        if (decl.prop === 'flex-direction' && decl.value.includes('column')) {
          flexWrappingProps.isFlexRow = false;
        }

        if (decl.prop === 'flex-wrap' && decl.value.startsWith('wrap')) {
          flexWrappingProps.isMissingFlexWrap = false;
        }

        if (
          isLastStyleDeclaration &&
          Object.values(flexWrappingProps).every((prop) => prop)
        ) {
          stylelint.utils.report({
            message: ruleMessages.flexWrapping(),
            node: flexWrappingProps.nodeToReport,
            result,
            ruleName,
          });
        }
      }

      /* GROUPING VENDOR PREFIXES */
      if (options?.['vendor-prefix-grouping']) {
        const hasMultiplePrefixes = findVendorPrefixes(decl.parent.selector);

        if (hasMultiplePrefixes) {
          stylelint.utils.report({
            message: ruleMessages.vendorPrefixWGrouping(),
            node: decl.parent,
            result,
            ruleName,
          });
        }
      }

      return;
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = ruleMessages;
ruleFunction.meta = ruleMeta;

module.exports = stylelint.createPlugin(ruleName, ruleFunction);
