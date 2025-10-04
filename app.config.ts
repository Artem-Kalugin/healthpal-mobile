import dotenv from 'dotenv';
import { ExpoConfig } from 'expo/config';

dotenv.config();

module.exports = ({ config }: { config: ExpoConfig }) => ({
  ...config,
  extra: {
    apiKeys: {
      yandexMapKit: process.env.YANDEX_MAPKIT_KEY,
    },
  },
  plugins: [
    ...(config.plugins || []),
    ['./expo-config-plugins/withYandexMap.js'],
  ],
});
