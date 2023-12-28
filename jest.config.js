export default {
  clearMocks: true,
  preset: 'jest-preset-stylelint',
  roots: ['src'],
  runner: 'jest-light-runner',
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
};
