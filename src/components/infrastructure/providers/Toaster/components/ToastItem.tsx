import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import { Toast } from 'react-hot-toast/headless';

import { Text } from '#ui-kit';

import { withCustomAnimation } from '#config';
import { colors } from '#config/colors';

export const ToastItem = ({
  t,
  updateHeight,
  offset,
}: {
  t: Toast;
  updateHeight: (height: number) => void;
  offset: number;
}) => {
  const fadeAnim = useSharedValue(0.5);
  const posAnim = useSharedValue(100);

  useEffect(() => {
    fadeAnim.value = withCustomAnimation(t.visible ? 1 : 0);
  }, [t.visible]);

  useEffect(() => {
    posAnim.value = withCustomAnimation(-offset);
  }, [offset, t.visible]);

  const rStyle = useAnimatedStyle(() => ({
    zIndex: +t.visible * 100,
    opacity: fadeAnim.value,
    transform: [
      {
        translateY: posAnim.value,
      },
    ],
  }));

  return (
    <Animated.View style={[styles.toastWrapper, rStyle]}>
      <View
        key={t.id}
        style={styles.toast}
        onLayout={event => updateHeight(event.nativeEvent.layout.height)}
      >
        {typeof t.message === 'string' && (
          <Text style={styles.toastText}>{t.message}</Text>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
  },
  toast: {
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
    marginHorizontal: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: colors.grayscale['700'],
  },
  toastText: {
    color: colors.grayscale['50'],
    textAlign: 'center',
  },
});
