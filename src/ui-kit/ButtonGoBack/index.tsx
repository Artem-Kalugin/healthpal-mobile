import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { Icon } from '#ui-kit/Icon';

import { colors, hitSlopBig } from '#config';

import { ButtonGoBackTestIds } from './config';

export interface IButtonGoBack {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
  testIdConfig: typeof ButtonGoBackTestIds;
}

const ButtonGoBack: React.FC<Partial<IButtonGoBack>> = ({
  onPress = undefined,
  style,
  testIdConfig = ButtonGoBackTestIds,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      hitSlop={hitSlopBig}
      style={style}
      testID={testIdConfig.root}
      onPress={onPress || navigation.goBack}
    >
      <Icon
        color={colors.grayscale['900']}
        name="arrowLeft"
      />
    </TouchableOpacity>
  );
};

export default ButtonGoBack;
