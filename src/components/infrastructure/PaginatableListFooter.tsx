import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Loader, TextSmall } from '#ui-kit';

import { colors } from '#config';

import ListExtender from './ListExtender';

interface IPaginatableListFooter {
  enabled?: boolean;
  showLoader: boolean;
  showMessage: boolean;
  message: string;
  style?: StyleProp<ViewStyle>;
}

export const PaginatableListFooter = ({
  enabled = true,
  showLoader,
  showMessage,
  message,
}: Partial<IPaginatableListFooter>) => {
  if (!enabled) {
    return null;
  }

  return (
    <ListExtender height={80}>
      {showLoader ? <Loader /> : undefined}
      {showMessage ? (
        <TextSmall
          color={colors.grayscale['400']}
          style={styles.message}
          textAlign="center"
          weight="400"
        >
          {message}
        </TextSmall>
      ) : undefined}
    </ListExtender>
  );
};

const styles = StyleSheet.create({
  message: {
    paddingTop: 36,
  },
});
