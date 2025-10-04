import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Icon, IconNames } from '#ui-kit';

import { colors, withCustomAnimation } from '#config';

export type BottomTabData = {
  iconName: IconNames;
  activeIconName: IconNames;
  onPress?: () => void;
  onLongPress?: () => void;
};

type IBottomTab = BottomTabData & {
  isFocus: boolean;
};

const BottomTab: React.FC<Partial<IBottomTab>> = ({
  iconName,
  activeIconName,
  isFocus = false,
  onPress,
  onLongPress,
}) => {
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withCustomAnimation(+isFocus);
  }, [isFocus]);

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
      style={styles.wrapper}
      onLongPress={onLongPress}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Animated.View style={[styles.absoluteLayer, rIconContainer]}>
          <Icon name={iconName} />
        </Animated.View>

        <Animated.View style={[styles.absoluteLayer, rActiveIconContainer]}>
          <Icon name={activeIconName} />
        </Animated.View>

        <Animated.View style={[styles.iconWrapper, rContainer]} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absoluteLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 48,
    aspectRatio: 1,
  },
  iconWrapper: {
    width: 48,
    aspectRatio: 1,
    zIndex: -1,
    borderRadius: 48,
    backgroundColor: colors.grayscale['200'],
  },
});

export default BottomTab;
