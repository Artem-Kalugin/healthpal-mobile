import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Icon } from '#ui-kit/Icon';

export interface IButtonGoBack {
  onPress: () => void;
  style: StyleProp<ViewStyle>;
}

const ButtonGoBack: React.FC<Partial<IButtonGoBack>> = ({
  onPress = undefined,
  style,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={style}
      onPress={onPress || navigation.goBack}
    >
      <Icon name="arrowLeft" />
    </TouchableOpacity>
  );
};

export default ButtonGoBack;
