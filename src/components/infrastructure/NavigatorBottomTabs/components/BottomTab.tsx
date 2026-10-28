import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Icon } from '#ui-kit';
import { IconNames } from '#ui-kit/Icon';

import { withCustomAnimation } from '#config';
import { colors } from '#config/colors';

type BottomTabItem = {
  iconName: IconNames;
  activeIconName: IconNames;
};

export interface IBottomTab {
  item: BottomTabItem;
  isActive: boolean;
  onPress?: (item: BottomTabItem) => void;
  onLongPress?: (item: BottomTabItem) => void;
}

export const BottomTab: React.FC<IBottomTab> = ({
  item,
  isActive,
  onPress,
  onLongPress,
}) => {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withCustomAnimation(+!!isActive);
  }, [isActive]);

  const rContainer = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: animationProgress.value,
        },
      ],
    }),
    [],
  );

  const rActiveIconContainer = useAnimatedStyle(
    () => ({
      opacity: animationProgress.value,
    }),
    [],
  );

  const rIconContainer = useAnimatedStyle(
    () => ({
      opacity: 1 - animationProgress.value,
    }),
    [],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.tabWrapper}
      onLongPress={() => onLongPress && onLongPress(item)}
      onPress={() => onPress && onPress(item)}
    >
      <View style={styles.tabContainer}>
        <Animated.View style={[styles.tabAbsoluteLayer, rIconContainer]}>
          <Icon name={item.iconName} />
        </Animated.View>

        <Animated.View style={[styles.tabAbsoluteLayer, rActiveIconContainer]}>
          <Icon name={item.activeIconName} />
        </Animated.View>

        <Animated.View style={[styles.tabIconWrapper, rContainer]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabAbsoluteLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    width: 48,
    aspectRatio: 1,
  },
  tabIconWrapper: {
    width: 48,
    aspectRatio: 1,
    zIndex: -1,
    borderRadius: 48,
    backgroundColor: colors.grayscale['200'],
  },
});
