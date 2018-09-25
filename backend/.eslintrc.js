module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
    es6: true,
  },
  rules: {
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
  },
  plugins: ['json', 'prettier', 'markdown', 'import'],
};
