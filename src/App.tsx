import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider as KeyboardController } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import FocusAwareStatusBar from '#components/infrastructure/FocusAwareStatusBar';
import { OTPTimerProvider } from '#components/infrastructure/providers/OTPTimer';
import ToastProvider from '#components/infrastructure/providers/Toaster';

import { persistor, store } from '#store';

import AppMiddleware from './AppMiddleware';

export default function App() {
  const [navigationReady, setNavigationReady] = useState(false);

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
                  onReady={async () => setNavigationReady(true)}
                >
                  <FocusAwareStatusBar barStyle="dark-content" />
                  <AppMiddleware navigationReady={navigationReady} />
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
