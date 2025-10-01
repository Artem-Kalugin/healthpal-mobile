const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');
const projectRoot = __dirname;

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
  };
  config.resolver = {
    ...resolver,
    alias: {
      '#generated': path.resolve(projectRoot, 'generated'),
      '#ui-kit': path.resolve(projectRoot, 'src/ui-kit'),
      '#components': path.resolve(projectRoot, 'src/components'),
      '#screens': path.resolve(projectRoot, 'src/screens'),
      '#modals': path.resolve(projectRoot, 'src/modals'),
      '#navigation': path.resolve(projectRoot, 'src/navigation'),
      '#api': path.resolve(projectRoot, 'src/core/api'),
      '#hooks': path.resolve(projectRoot, 'src/core/hooks'),
      '#utils': path.resolve(projectRoot, 'src/core/utils'),
      '#services': path.resolve(projectRoot, 'src/core/services'),
      '#styles': path.resolve(projectRoot, 'src/styles'),
      '#assets': path.resolve(projectRoot, 'src/assets'),
      '#store': path.resolve(projectRoot, 'src/store'),
      '#config': path.resolve(projectRoot, 'src/config'),
    },
  };

  return config;
})();
