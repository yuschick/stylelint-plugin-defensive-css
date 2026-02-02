import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  exports: true,
  format: ['cjs', 'es', 'esm'],
});
