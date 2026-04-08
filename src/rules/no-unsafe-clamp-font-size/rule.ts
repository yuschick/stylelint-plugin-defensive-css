/**
 * @author Daniel Yuschick
 * @fileoverview Rule to enforce safe use of the clamp() function for font sizes
 * @license MIT
 */

import stylelint, { Rule } from 'stylelint';
import { messages, meta, name } from './meta';
import { severityOption, SeverityProps } from '../../utils/types';
import { parseClampArguments } from './utils';

const { report, validateOptions } = stylelint.utils;

interface SecondaryOptions extends SeverityProps {
  maxRatio?: number;
  reportUnresolvable?: boolean;
}

export const noUnsafeClampFontSize: Rule = (
  primaryOption,
  secondaryOptions: SecondaryOptions = {},
) => {
  return (root, result) => {
    const validOptions = validateOptions(
      result,
      name,
      {
        actual: primaryOption,
        possible: [true, false],
      },
      {
        actual: secondaryOptions,
        optional: true,
        possible: {
          ...severityOption,
          maxRatio: [(value: unknown) => typeof value === 'number' && value > 0],
          reportUnresolvable: [(value: unknown) => typeof value === 'boolean'],
        },
      },
    );

    if (!validOptions) return;

    const {
      severity = 'error',
      maxRatio = 2.5,
      reportUnresolvable = true,
    } = secondaryOptions;

    const dimensionPattern = /^\s*(\d*\.?\d+)\s*([a-z%]+)\s*$/i;
    const viewportUnitPattern = /(^|[^a-z-])[dsl]?v(?:w|h|min|max|i|b)\b/i;

    root.walkDecls(/^font(-size)?$/, (decl) => {
      /**
       * 1. Check if the font size is defined using the clamp() function.
       * If not, return early.
       */
      const clampArgs = parseClampArguments(decl.value);

      if (!clampArgs) {
        return;
      }

      /**
       * 2. Extract min, preferred and max values from the clamp() function.
       * If the preferred value isn't sized with a viewport unit, return early.
       */
      const [min, preferred, max] = clampArgs;
      const preferredHasViewportUnit = viewportUnitPattern.test(preferred);

      if (!preferredHasViewportUnit) {
        return;
      }

      /**
       * 3. Parse numeric value and unit from min and max.
       * If they cannot be parsed, report as unresolvable.
       */
      const minMatch = min.match(dimensionPattern);
      const maxMatch = max.match(dimensionPattern);

      if (!minMatch || !maxMatch) {
        if (reportUnresolvable) {
          report({
            message: messages.unresolvable(decl.value),
            node: decl,
            result,
            ruleName: name,
            severity,
          });
        }

        return;
      }

      const minValue = parseFloat(minMatch[1]);
      const minUnit = minMatch[2].trim().toLowerCase();
      const maxValue = parseFloat(maxMatch[1]);
      const maxUnit = maxMatch[2].trim().toLowerCase();

      /**
       * 4. Check if the min and max values have the same units.
       * If they don't, the ratio can't be determined — always bail out.
       */
      if (minUnit !== maxUnit) {
        if (reportUnresolvable) {
          report({
            message: messages.unresolvable(decl.value),
            node: decl,
            result,
            ruleName: name,
            severity,
          });
        }

        return;
      }

      /**
       * 5. Since min and max share the same unit, compare their ratio to maxRatio.
       * If it exceeds maxRatio, report.
       */
      const ratio = minValue > 0 ? maxValue / minValue : Infinity;

      if (ratio > maxRatio) {
        report({
          message: messages.exceedsRatio(
            `${minValue}${minUnit}`,
            `${maxValue}${maxUnit}`,
            maxRatio,
          ),
          node: decl,
          result,
          ruleName: name,
          severity,
        });
      }
    });
  };
};

noUnsafeClampFontSize.ruleName = name;
noUnsafeClampFontSize.messages = messages;
noUnsafeClampFontSize.meta = meta;
