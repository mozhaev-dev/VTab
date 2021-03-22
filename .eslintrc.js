module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    },
  },

  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'require-jsdoc': 'off',
    'no-trailing-spaces': 'off',
    'arrow-parens': 'off',
  },
};
