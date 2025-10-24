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
      boundaries: require('eslint-plugin-boundaries'),
    },
    settings: {
      'boundaries/elements': [
        { type: 'global', pattern: '{config,store,core/utils}' },
        { type: 'core', pattern: '{core/services,core/hooks,core/api}' },
        {
          type: 'components/infrastructure',
          pattern: 'components/infrastructure',
        },
        {
          type: 'components/domain',
          pattern: 'components/domain',
        },
        { type: 'ui-kit', pattern: 'ui-kit' },
        { type: 'view', pattern: '{screens,modals}' },
        { type: 'navigation', pattern: 'navigation' },
      ],
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
      'boundaries/element-types': [
        error,
        {
          default: 'disallow',
          rules: [
            { from: 'global', allow: ['core'] },
            { from: 'core', allow: ['global', 'core'] },
            {
              from: 'components/domain',
              allow: [
                'global',
                'navigation',
                'components/domain',
                'ui-kit',
                'core',
              ],
            },
            {
              from: 'components/infrastructure',
              allow: ['global', 'ui-kit', 'core'],
            },
            { from: 'ui-kit', allow: ['global'] },
            {
              from: 'view',
              allow: [
                'core',
                'navigation',
                'components/infrastructure',
                'components/domain',
                'ui-kit',
                'global',
              ],
            },
            {
              from: 'navigation',
              allow: ['global', 'view', 'components/infrastructure'],
            },
          ],
        },
      ],
    },
  },
]);
