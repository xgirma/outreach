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
    'no-unused-vars': 1,
    'no-param-reassign': 0,
    'consistent-return': [
      'warn',
      {
        treatUndefinedAsUnspecified: true,
      },
    ],
  },
  plugins: ['json', 'prettier', 'markdown'],
};
