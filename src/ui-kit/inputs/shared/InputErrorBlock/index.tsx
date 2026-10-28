import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TextXS } from '#ui-kit/Text';

import { colors } from '#config/colors';

export interface IInputErrorBlock {
  errors: string[];
}

export const InputErrorBlock: React.FC<Partial<IInputErrorBlock>> = ({
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
