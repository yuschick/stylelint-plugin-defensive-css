'use strict';

const stylelint = require('stylelint');

const { ruleName, ruleMessages, ruleMeta } = require('./base');
const {
  findShorthandBackgroundRepeat,
} = require('../../utils/findShorthandBackgroundRepeat');
const { findVendorPrefixes } = require('../../utils/findVendorPrefixes');

const defaultBackgroundRepeatProps = {
  hasBackgroundImage: false,
  isMissingBackgroundRepeat: true,
  nodeToReport: undefined,
};
const defaultFlexWrappingProps = {
  isDisplayFlex: false,
  isFlexRow: true,
  isMissingFlexWrap: true,
  nodeToReport: undefined,
};

let backgroundRepeatProps = { ...defaultBackgroundRepeatProps };
let flexWrappingProps = { ...defaultFlexWrappingProps };
let isLastStyleDeclaration = false;

const ruleFunction = (_, options) => {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName);

    if (!validOptions) {
      return;
    }

    root.walkDecls((decl) => {
      isLastStyleDeclaration =
        JSON.stringify(decl) ===
        JSON.stringify(decl.parent.nodes[decl.parent.nodes.length - 1]);

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

        if (isLastStyleDeclaration) {
          if (Object.values(backgroundRepeatProps).every((prop) => prop)) {
            stylelint.utils.report({
              message: ruleMessages.backgroundRepeat(),
              node: backgroundRepeatProps.nodeToReport,
              result,
              ruleName,
            });
          }

          backgroundRepeatProps = { ...defaultBackgroundRepeatProps };
        }
      }

      /* CUSTOM PROPERTY FALLBACKS */
      if (options?.['custom-property-fallbacks']) {
        if (decl.value.includes('var(--') && !decl.value.includes(',')) {
          if (Array.isArray(options?.['custom-property-fallbacks'])) {
            if (options['custom-property-fallbacks'][0]) {
              const patterns = options['custom-property-fallbacks'][1].ignore;
              const patternMatched = patterns.some((pattern) =>
                typeof pattern === 'string'
                  ? new RegExp(pattern).test(decl.value.slice(4, -1))
                  : pattern.test(decl.value.slice(4, -1)),
              );

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
