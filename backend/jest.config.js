process.env.NODE_ENV = 'development';

module.exports = {
  displayName: 'server',
  testEnvironment: 'node',
  coverageDirectory: './coverage',
  transform: { '.*': '<rootDir>/node_modules/babel-jest' },
  collectCoverageFrom: [
    '**/*.{js,jsx}',
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
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
};
