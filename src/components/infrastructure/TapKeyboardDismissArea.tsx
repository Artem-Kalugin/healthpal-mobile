import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

export const TapKeyboardDismissArea = () => (
  <View
    style={StyleSheet.absoluteFill}
    onTouchStart={Keyboard.dismiss}
  />
);
