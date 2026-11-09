import { resolve } from 'node:path';

import { defineConfig } from 'vitest/config';

const fromRoot = (path: string) => resolve(import.meta.dirname, path);

export default defineConfig({
  resolve: {
    // Keep in sync with `paths` in tsconfig.json
    alias: {
      '@package-configs': fromRoot('src/configs'),
      '@package-rules': fromRoot('src/rules'),
      '@package-utils': fromRoot('src/utils'),
    },
  },
  test: {
    setupFiles: [fromRoot('vitest.setup.ts')],
  },
});
