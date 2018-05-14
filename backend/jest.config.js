module.exports = {
  displayName: 'server',
  testEnvironment: 'node',
  coverageDirectory: "./coverage",
  transform: {".*": "<rootDir>/node_modules/babel-jest"},
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/coverage/**",
    "!**/dist/**",
    "!.eslintrc.js",
    "!.prettierrc.js"
  ],
  coverageThreshold: {
    "global": {
      "statements": 50,
      "branches": 50,
      "functions": 50,
      "lines": 100
    }
  }
};
