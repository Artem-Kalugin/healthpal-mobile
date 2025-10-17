import YaMap from 'react-native-yamap';

import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';
import { setStatusBarHidden } from 'expo-status-bar';

import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/ru';
import 'dayjs/locale/ru';

import { enableFreeze } from 'react-native-screens';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import App from './src/App';

dayjs.locale('ru');
dayjs.extend(duration);

YaMap.init(Constants.expoConfig?.extra?.apiKeys.yandexMapKit);
setStatusBarHidden(true);

enableFreeze(true);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
