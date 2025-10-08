module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '#generated': './generated',
          '#ui-kit': './src/ui-kit',
          '#components': './src/components',
          '#screens': './src/screens',
          '#modals': './src/modals',
          '#navigation': './src/navigation',
          '#api': './src/core/api',
          '#hooks': './src/core/hooks',
          '#utils': './src/core/utils',
          '#services': './src/core/services',
          '#styles': './src/styles',
          '#assets': './src/assets',
          '#store': './src/store',
          '#config': './src/config',
        },
      },
    ],
  ],
};
