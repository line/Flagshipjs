/*
 * Copyright (c) 2022-2025 LY Corporation. All rights reserved.
 * LY Corporation PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@linecorp/eslint-plugin-header-ly'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': 0,
    'object-curly-spacing': ['error', 'always'],
    'dot-notation': 'off',
    'quote-props': 'off',

    // Turned off for some API results which aren't camel-cased.
    camelcase: 'off',

    // Turned off due to the false positives caused by imported types.
    // Reference: https://github.com/eslint/typescript-eslint-parser/issues/457
    'no-unused-vars': 'off',
    'prettier/prettier': 0,
    curly: ['error', 'multi-line'],
    'spaced-comment': ['error', 'always'],
    'key-spacing': ['error', { afterColon: true }],
    semi: 'error',
    'semi-spacing': 'error',
    'space-before-blocks': 'error',
    'no-multiple-empty-lines': 'error',
    'linebreak-style': 'error',
    'func-call-spacing': 'error',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'eol-last': ['error', 'always'],
    'comma-style': ['error', 'last'],
    'comma-spacing': ['error', { before: false, after: true }],
    'block-spacing': 'error',
    'no-tabs': 'error',
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    '@linecorp/header-ly/header': 'warn',
    '@typescript-eslint/no-explicit-any': 0,
  },
};
