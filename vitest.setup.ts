import plugins from './src';
import type { TestRule } from './test/testRule';
import { getTestRule } from './test/testRule';

globalThis.testRule = getTestRule({ plugins });

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention -- GEN-01: an ambient global declaration can never be marked as used
  var testRule: TestRule;
}
