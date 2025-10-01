import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import { StatusBar } from 'expo-status-bar';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '#store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </View>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
