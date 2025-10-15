import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import { TextLarge, TextSmall } from '#ui-kit';

interface IEmptyListWarning {
  enabled: boolean;
  cover: boolean;
  title: string;
  subtitle: string;
  style?: StyleProp<ViewStyle>;
}

export const EmptyListWarning = ({
  enabled = true,
  cover = false,
  subtitle = 'Empty list warning subtitle ',
  title = 'List Subtitle',
  style,
}: Partial<IEmptyListWarning>) => {
  if (!enabled) {
    return null;
  }
  const styles = getStyles(cover);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.container, style]}
    >
      <TextLarge
        style={styles.title}
        weight="700"
      >
        {title}
      </TextLarge>
      <TextSmall
        style={styles.subtitle}
        weight="400"
      >
        {subtitle}
      </TextSmall>
    </KeyboardAvoidingView>
  );
};

const getStyles = (cover: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      gap: 8,
      ...(cover ? { flex: 1 } : {}),
    },
    title: {
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
    },
  });
