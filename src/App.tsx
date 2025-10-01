import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '#store';

import AppMiddleware from './AppMiddleware';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={StyleSheet.absoluteFill}>
            <NavigationContainer
              theme={{
                ...DefaultTheme,
                colors: {
                  ...DefaultTheme.colors,
                  background: 'transparent',
                },
              }}
            >
              <AppMiddleware />
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
