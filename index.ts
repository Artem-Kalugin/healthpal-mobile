import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';
import { Settings } from 'luxon';

import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/ru';

import YaMap from 'react-native-yamap';

import * as SplashScreen from 'expo-splash-screen';
import { setStatusBarHidden } from 'expo-status-bar';

import { IS_IOS } from '#config';

import App from './src/App';

YaMap.init(Constants.expoConfig?.extra?.apiKeys.yandexMapKit);

Settings.defaultLocale = 'ru';
setStatusBarHidden(true);
SplashScreen.preventAutoHideAsync();
if (IS_IOS) {
  SplashScreen.setOptions({
    duration: 500,
    fade: true,
  });
}

//https://github.com/software-mansion/react-native-reanimated/issues/8307 uncomment after fixed
// enableFreeze(true);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
