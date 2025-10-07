import React, { RefObject, useImperativeHandle, useRef } from 'react';
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { TextBase } from '#ui-kit';

import { BORDER_RADIUS_ROUNDED, colors, hitSlop } from '#config';

export interface IHeaderTabs<T extends unknown> {
  data: T[];
  style?: StyleProp<ViewStyle>;
  tabRef?: RefObject<RefHeaderTab<T>>;
  valueExtractor?: (item: T) => string;
  onPress?: (item: T, index: number) => void;
  onLongPress?: (item: T, index: number) => void;
  activeItem?: T;
}

export type RefHeaderTab<T> = {
  setTab: (value: T) => void;
} | null;

const TRACK_ADDITIONAL_WIDTH = 16;
const CONTAINER_GAP = 40;
const AnimatedText = Animated.createAnimatedComponent(TextBase);

export const HeaderTabs = <T extends unknown>({
  data,
  tabRef,
  activeItem,
  onPress = () => {},
  onLongPress = () => {},
  valueExtractor = (item: any) =>
    typeof item === 'string' ? item : JSON.stringify(item),
  style,
}: IHeaderTabs<T>) => {
  const translateX = useSharedValue(0);
  const width = useSharedValue(0);

  const activeItemIndex = useSharedValue(
    activeItem
      ? data.findIndex(el => valueExtractor(el) === valueExtractor(activeItem))
      : 0,
  );

  const tabTextWidthMap = useRef<{ [key in number]: number }>({});
  const anchorOffsetPoints = useRef<{ [key in number]: number }>({});

  const animateTo = async (index = 0, force = false) => {
    activeItemIndex.value = withTiming(index);

    const trackWidth = tabTextWidthMap.current[index] + TRACK_ADDITIONAL_WIDTH;
    width.value = force ? trackWidth : withTiming(trackWidth);

    const trackXOffsetAnchor = anchorOffsetPoints.current[index];
    translateX.value = force
      ? trackXOffsetAnchor
      : withTiming(trackXOffsetAnchor);
  };

  const rTrackAnchorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const rTrackStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  useImperativeHandle(tabRef, () => ({
    setTab: (tab: T) =>
      animateTo(
        data.findIndex(el => valueExtractor(el) === valueExtractor(tab)),
      ),
  }));

  return (
    <View style={[styles.container, style]}>
      {data.map((el, index) => (
        <TouchableOpacity
          key={valueExtractor(el)}
          hitSlop={hitSlop}
          style={styles.option}
          onLayout={event => {
            anchorOffsetPoints.current[index] =
              event.nativeEvent.layout.x + event.nativeEvent.layout.width / 2;
          }}
          onLongPress={() => {
            animateTo(index);
            onLongPress(el, index);
          }}
          onPress={() => {
            animateTo(index);
            onPress(el, index);
          }}
        >
          <HeaderTab
            activeItemIndex={activeItemIndex}
            index={index}
            onLayout={event => {
              tabTextWidthMap.current[index] = event.nativeEvent.layout.width;
              index === data.length - 1 &&
                animateTo(
                  !activeItem ? 0 : data.findIndex(ele => ele === activeItem),
                  true,
                );
            }}
          >
            {valueExtractor(el)}
          </HeaderTab>
        </TouchableOpacity>
      ))}
      <Animated.View style={[styles.trackAnchor, rTrackAnchorStyle]}>
        <Animated.View style={[styles.track, rTrackStyle]} />
      </Animated.View>
    </View>
  );
};

const HeaderTab = ({
  children,
  index,
  activeItemIndex,
  onLayout,
}: {
  children: string;
  index: number;
  activeItemIndex: SharedValue<number>;
  onLayout: (event: LayoutChangeEvent) => void;
}) => {
  const rTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      Math.abs(activeItemIndex.value - index),
      [0, 1],
      [colors.main.midnightBlue, colors.grayscale['400']],
    ),
  }));

  return (
    <AnimatedText
      style={rTextStyle}
      weight="600"
      onLayout={onLayout}
    >
      {children}
    </AnimatedText>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    gap: CONTAINER_GAP,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  trackAnchor: {
    width: 0,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  track: {
    height: 3,
    backgroundColor: colors.main.midnightBlue,
    borderTopLeftRadius: BORDER_RADIUS_ROUNDED,
    borderTopRightRadius: BORDER_RADIUS_ROUNDED,
  },
});
