import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider as KeyboardController } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import FocusAwareStatusBar from '#components/FocusAwareStatusBar';
import { OTPTimerProvider } from '#components/providers/OTPTimer';
import ToastProvider from '#components/providers/Toaster';

import { delay } from '#utils';

import { persistor, store } from '#store';

import AppMiddleware from './AppMiddleware';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <OTPTimerProvider>
            <KeyboardController>
              <GestureHandlerRootView style={StyleSheet.absoluteFill}>
                <NavigationContainer
                  theme={{
                    ...DefaultTheme,
                    colors: {
                      ...DefaultTheme.colors,
                      background: 'transparent',
                    },
                  }}
                  onReady={async () => {
                    await delay(200);
                    await BootSplash.hide({ fade: true });
                  }}
                >
                  <FocusAwareStatusBar barStyle="dark-content" />
                  <AppMiddleware />
                  <ToastProvider />
                </NavigationContainer>
              </GestureHandlerRootView>
            </KeyboardController>
          </OTPTimerProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
