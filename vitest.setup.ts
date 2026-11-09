import { getTestRule, type TestRule } from 'vitest-stylelint-utils';

import plugins from './src';

globalThis.testRule = getTestRule({ plugins });

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention -- GEN-01: an ambient global declaration can never be marked as used
  var testRule: TestRule;
}
