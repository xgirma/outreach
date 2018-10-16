module.exports = {
  printWidth: 100,
  parser: 'babylon',
  useTabs: false,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'always',
  overrides: [
    {
      files: ['package.json', 'src/api/swagger/swagger.json'],
      options: { parser: 'json' },
    },
  ],
};
