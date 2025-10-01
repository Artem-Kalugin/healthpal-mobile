const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const { fixupPluginRules } = require('@eslint/compat');
const reactNativePlugin = require('eslint-plugin-react-native');

const error = 'error';
const warn = 'warn';
const off = 'off';

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ['dist/*'],
  },

  {
    plugins: {
      'react-native': fixupPluginRules(reactNativePlugin),
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-console': error,
      'max-lines': [error, { max: 350, skipBlankLines: true }],
      'arrow-parens': [error, 'as-needed'],

      '@typescript-eslint/no-shadow': [error],

      'react-native/no-color-literals': error,
      'react-native/no-single-element-style-arrays': error,
      'react-native/no-inline-styles': error,
      'react-native/no-unused-styles': error,
      'react-native/sort-styles': [
        warn,
        'asc',
        { ignoreClassNames: true, ignoreStyleProperties: false },
      ],

      'react/prefer-stateless-function': error,
      'react/jsx-curly-brace-presence': [error, 'never'],
      'react/no-unstable-nested-components': [error, { allowAsProps: true }],
      'react/jsx-sort-props': [
        warn,
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'ignore',
          ignoreCase: true,
          reservedFirst: true,
        },
      ],

      'react-hooks/exhaustive-deps': off,

      'import/first': error,
      'import/no-duplicates': error,
    },
  },
]);
