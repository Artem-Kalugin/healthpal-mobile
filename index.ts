import { registerRootComponent } from 'expo';
import Constants from 'expo-constants';

import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-datetimeformat/polyfill';
import '@formatjs/intl-datetimeformat/locale-data/ru';

import YaMap from 'react-native-yamap';

import { setStatusBarHidden } from 'expo-status-bar';

import 'dayjs/locale/ru';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import App from './src/App';

dayjs.locale('ru');
dayjs.extend(duration);

YaMap.init(Constants.expoConfig?.extra?.apiKeys.yandexMapKit);

setStatusBarHidden(true);

//https://github.com/software-mansion/react-native-reanimated/issues/8307 uncomment after fixed
// enableFreeze(true);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
