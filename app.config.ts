import { ExpoConfig } from 'expo/config';

module.exports = ({ config }: { config: ExpoConfig }): ExpoConfig => ({
  ...config,
  extra: {
    apiKeys: {
      yandexMapKit: process.env.EXPO_PUBLIC_YANDEX_MAPKIT_KEY,
    },
  },
  plugins: [
    ...(config.plugins || []),
    './expo-config-plugins/withYandexMap.js',
    './expo-config-plugins/withIOSInitiallyHiddenStatusBar.js',
  ],
});
