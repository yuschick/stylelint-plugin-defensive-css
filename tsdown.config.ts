import { defineConfig } from 'tsdown';

export default defineConfig({
  clean: true,
  entry: {
    'configs/recommended': 'src/configs/recommended.ts',
    'configs/strict': 'src/configs/strict.ts',
    index: 'src/index.ts',
  },
  exports: true,
  external: ['stylelint'],
  format: ['cjs', 'es'],
});
