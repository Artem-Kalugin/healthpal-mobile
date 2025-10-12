import React from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '#config';

import { TextXS } from '../Text';

export interface ITextInputErrorBlock {
  errors: string[];
}

export const TextInputErrorBlock: React.FC<Partial<ITextInputErrorBlock>> = ({
  errors,
}) => {
  const notEmptyErrors = errors?.filter(el => el);

  return (
    !!notEmptyErrors?.length && (
      <View style={styles.errorContainer}>
        {notEmptyErrors.map((el, index) => (
          <TextXS
            key={`${index}{el}`}
            color={colors.error.normal}
            weight="400"
          >
            {' '}
            • {el}
          </TextXS>
        ))}
      </View>
    )
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    paddingTop: 4,
    gap: 4,
  },
});
