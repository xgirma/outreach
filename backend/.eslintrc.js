module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': 'warn',
    'import/prefer-default-export': 'warn',
    'arrow-parens': 'warn',
    'no-unused-vars': 1,
    'no-underscore-dangle': 'warn',
    'no-param-reassign': 0,
    'consistent-return': ['warn', { treatUndefinedAsUnspecified: true }],
    'import/no-extraneous-dependencies': ['warn', { devDependencies: true }],
  },
  plugins: ['json', 'prettier', 'markdown'],
};
