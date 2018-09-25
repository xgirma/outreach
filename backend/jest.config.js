process.env.NODE_ENV = 'test';

module.exports = {
  displayName: 'server',
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  transform: { '^.+\\.jsx?$': 'babel-jest' },
  collectCoverageFrom: [
    '**/*.{js}',
    '!**/node_modules/**',
    '!**/coverage/**',
    '!**/dist/**',
    '!.eslintrc.js',
    '!.prettierrc.js',
    '!webpack.config.js',
    '!jest.config.js',
    '!**/resources/**/index.js',
    '!**/src/config/**',
  ],
  coverageThreshold: {
    global: {
      statements: 0,
      branches: 0,
      functions: 0,
      lines: 0,
    },
  },
};
