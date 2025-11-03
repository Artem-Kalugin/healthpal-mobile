import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '#config';

import { Icon } from '../Icon';
import { CheckboxTestIds } from './config';

interface ICheckboxBig {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  active: boolean;
  onPress?: () => void;
  isRound?: boolean;
  testIdConfig?: typeof CheckboxTestIds;
}

export const Checkbox = ({
  active,
  children,
  onPress,
  style,
  isRound = true,
  testIdConfig = CheckboxTestIds,
}: ICheckboxBig) => {
  return (
    <TouchableOpacity
      disabled={!onPress}
      style={[styles.container, StyleSheet.flatten(style)]}
      testID={testIdConfig.root}
      onPress={onPress}
    >
      <View
        style={[
          styles.checkWrapper,
          active && styles.checkActive,
          isRound && styles.circleCheck,
        ]}
      >
        {active && (
          <Icon
            name="check"
            size={22}
            style={styles.check}
            testID={testIdConfig.checkMark}
          />
        )}
      </View>

      {children && <View style={styles.content}>{children}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  checkWrapper: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 3,
  },
  check: {
    width: 10,
  },
  circleCheck: {
    borderRadius: 100,
  },
  checkActive: {
    borderWidth: 0,
    backgroundColor: colors.primary.light,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
