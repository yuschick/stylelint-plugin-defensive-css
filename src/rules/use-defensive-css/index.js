import stylelint from 'stylelint';

import { ruleName, ruleMessages, ruleMeta } from './base.js';

import { accidentalHover } from './accidental-hover/index.js';
import { backgroundRepeat } from './background-repeat/index.js';
import { customPropertyFallbacks } from './custom-property-fallbacks/index.js';
import { flexWrapping } from './flex-wrapping/index.js';
import { scrollChaining } from './scroll-chaining/index.js';
import { scrollbarGutter } from './scrollbar-gutter/index.js';
import { vendorPrefixGrouping } from './vendor-prefix-grouping/index.js';
import { gridLineNames } from './grid-line-names/index.js';

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

      /* ACCIDENTAL HOVER */
      if (options?.['accidental-hover']) {
        accidentalHover({ decl, result });
      }

      /* BACKGROUND REPEAT  */
      if (options?.['background-repeat']) {
        backgroundRepeat({ decl, isLastStyleDeclaration, result });
      }

      /* CUSTOM PROPERTY FALLBACKS */
      if (options?.['custom-property-fallbacks']) {
        customPropertyFallbacks({ decl, options, result });
      }

      /* FLEX WRAPPING */
      if (options?.['flex-wrapping']) {
        flexWrapping({ decl, isLastStyleDeclaration, result });
      }

      /* GRID LINE NAMES */
      if (options?.['grid-line-names']) {
        gridLineNames({ decl, options, result });
      }

      /* SCROLL CHAINING */
      if (options?.['scroll-chaining']) {
        scrollChaining({ decl, isLastStyleDeclaration, result });
      }

      /* SCROLLBAR GUTTER */
      if (options?.['scrollbar-gutter']) {
        scrollbarGutter({ decl, isLastStyleDeclaration, result });
      }

      /* VENDOR PREFIX GROUPING */
      if (options?.['vendor-prefix-grouping']) {
        vendorPrefixGrouping({ decl, result });
      }

      return;
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = ruleMessages;
ruleFunction.meta = ruleMeta;

export default stylelint.createPlugin(ruleName, ruleFunction);
