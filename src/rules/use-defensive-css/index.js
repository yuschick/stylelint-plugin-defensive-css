'use strict';

const stylelint = require('stylelint');

const { ruleName, ruleMessages, ruleMeta } = require('./base');
const {
  findShorthandBackgroundRepeat,
} = require('../../utils/findShorthandBackgroundRepeat');
const { findVendorPrefixes } = require('../../utils/findVendorPrefixes');
const { findCustomProperties } = require('../../utils/findCustomProperties');

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
const defaultScrollChainingProps = {
  hasOverflow: false,
  hasOverscrollBehavior: false,
  nodeToReport: undefined,
};

let backgroundRepeatProps = { ...defaultBackgroundRepeatProps };
let flexWrappingProps = { ...defaultFlexWrappingProps };
let scrollChainingProps = { ...defaultScrollChainingProps };
let isLastStyleDeclaration = false;
let isWrappedInHoverAtRule = false;

function traverseParentRules(parent) {
  if (parent.parent.type === 'root') {
    return;
  }

  if (parent.parent.type === 'atrule') {
    if (parent.parent.params && parent.parent.params.includes('hover: hover')) {
      isWrappedInHoverAtRule = true;
    } else {
      traverseParentRules(parent.parent);
    }
  }
}

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

      /* ACCIDENTAL HOVER */
      if (options?.['accidental-hover']) {
        const parent = decl.parent;
        const selector = parent.selector;
        const isHoverSelector = selector?.includes(':hover');
        isWrappedInHoverAtRule = false;

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
        const propertiesWithoutFallback = findCustomProperties(decl.value);

        if (propertiesWithoutFallback.length) {
          if (Array.isArray(options?.['custom-property-fallbacks'])) {
            if (options['custom-property-fallbacks'][0]) {
              const patterns = options['custom-property-fallbacks'][1].ignore;
              const patternMatched = propertiesWithoutFallback.some(
                (property) => {
                  return patterns.some((pattern) =>
                    typeof pattern === 'string'
                      ? new RegExp(pattern).test(property)
                      : pattern.test(property),
                  );
                },
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

      /* SCROLL CHAINING */
      if (options?.['scroll-chaining']) {
        const overflowProperties = [
          'overflow',
          'overflow-x',
          'overflow-y',
          'overflow-inline',
          'overflow-block',
        ];
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

      /* VENDOR PREFIX GROUPING */
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
