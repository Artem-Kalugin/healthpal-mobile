const { withAppDelegate } = require('expo/config-plugins');

const withYandexMaps = config => {
  return withAppDelegate(config, async config => {
    const appDelegate = config.modResults;

    // Add import
    if (!appDelegate.contents.includes('import YandexMapsMobile')) {
      // Replace the first line with the intercom import
      appDelegate.contents = appDelegate.contents.replace(
        /import Expo/g,
        'import Expo\nimport YandexMapsMobile\n',
      );
    }

    const mapKitMethodInvocations = [
      `\tYMKMapKit.setApiKey("${config.extra?.apiKeys.yandexMapKit}")`,
      '\tYMKMapKit.setLocale("ru_RU")',
    ]
      .map(line => `\t${line}`)
      .join('\n');

    // Add invocation

    if (!appDelegate.contents.includes(mapKitMethodInvocations)) {
      appDelegate.contents = appDelegate.contents.replace(
        /(\s*)return super\.application\(application, didFinishLaunchingWithOptions: launchOptions\)\n/,
        `\n\n${mapKitMethodInvocations} $&`,
      );
    }

    return config;
  });
};

module.exports = withYandexMaps;
