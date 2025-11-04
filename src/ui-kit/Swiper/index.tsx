import React, {
  ReactNode,
  RefObject,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  cancelAnimation,
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

import PaginationDot from './PaginationDot';
import SlideContainer from './SlideContainer';
import { paginate } from './utils';

export interface ISwiperRef {
  swipe: (value: number) => void;
}

export interface ISwiper<ItemT> {
  swiperRef?: RefObject<ISwiperRef | null>;
  data: ItemT[];
  autoplayInterval?: number;
  ListBeforePaginationComponent?: React.ReactElement;
  renderItem?: (payload: { item: ItemT; index: number }) => ReactNode | null;
  keyExtractor?: (item: ItemT, index: number) => string | number;
  onSlideChange?: (value: number) => void;

  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;

  paginationColorInterpolation?: [string, string];
  paginationWidthInterpolation?: [number, number];
  paginationShouldOverlay?: boolean;
  paginationContainerStyle?: StyleProp<ViewStyle>;
}

const Swiper = <T extends unknown>({
  swiperRef,
  paginationShouldOverlay = false,
  contentContainerStyle = {},
  keyExtractor,
  renderItem = () => null,
  autoplayInterval = 5000,
  ListBeforePaginationComponent,
  data = [],
  style = {},
  paginationContainerStyle = {},
  paginationColorInterpolation,
  paginationWidthInterpolation,
  onSlideChange = () => {},
}: ISwiper<T>) => {
  const translation = useSharedValue(0);
  const slideSize = useSharedValue(0);
  const startXGesture = useSharedValue(0);
  const activeSlide = useSharedValue(0);
  const slideSequenceSize = useDerivedValue(() => {
    return slideSize.value * data.length;
  });

  const autoplayStartTimeoutId = useRef(0);
  const autoplayIntervalId = useRef(0);

  const interruptAutoplay = (autoRestart = true) => {
    clearTimeout(autoplayStartTimeoutId.current);
    clearInterval(autoplayIntervalId.current);

    if (autoRestart) {
      autoplayStartTimeoutId.current = setTimeout(() => {
        autoplay();
      }, autoplayInterval) as unknown as number;
    }
  };

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          runOnJS(interruptAutoplay)();
          startXGesture.value = translation.value;
          cancelAnimation(translation);
        })
        .onChange(
          event =>
            (translation.value = startXGesture.value + event.translationX),
        )
        .onFinalize(event =>
          paginate(
            translation,
            event.translationX,
            activeSlide,
            slideSize,
            slideSequenceSize,
            data.length,
            onSlideChange,
          ),
        ),
    [],
  );

  const onSwipe = (value: number) =>
    paginate(
      translation,
      -value * slideSize.value,
      activeSlide,
      slideSize,
      slideSequenceSize,
      data.length,
      onSlideChange,
    );

  useImperativeHandle(swiperRef, () => ({
    swipe: onSwipe,
  }));

  const autoplay = () => {
    clearTimeout(autoplayStartTimeoutId.current);
    clearInterval(autoplayIntervalId.current);

    if (autoplayInterval !== 0) {
      autoplayIntervalId.current = setInterval(
        () => onSwipe(+1),
        autoplayInterval,
      ) as unknown as number;
    }
  };

  useEffect(() => {
    autoplay();

    return () => interruptAutoplay(false);
  }, []);

  return (
    <View style={[styles.container, style]}>
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.slidesNestedContainer, contentContainerStyle]}
        >
          {data.length > 1
            ? data.map((el, index) => (
                <SlideContainer
                  key={keyExtractor && `SLIDE_${keyExtractor(el, index)}`}
                  containerStyle={styles.box}
                  index={index + 1}
                  slideSequenceSize={slideSequenceSize}
                  slideSize={slideSize}
                  translation={translation}
                  onLayout={e => {
                    slideSize.value = e.nativeEvent.layout.width;
                  }}
                >
                  {renderItem({
                    index,
                    item: el,
                  })}
                </SlideContainer>
              ))
            : renderItem({
                index: 1,
                item: data[0],
              })}
        </Animated.View>
      </GestureDetector>
      {ListBeforePaginationComponent}
      <View style={paginationShouldOverlay && styles.anchorBottom}>
        <View style={[styles.paginationContainer, paginationContainerStyle]}>
          {data.map((el, index) => (
            <PaginationDot
              key={keyExtractor && `PAGINATION_${keyExtractor(el, index)}`}
              colorInterpolation={paginationColorInterpolation}
              index={index}
              slideSequenceSize={slideSequenceSize}
              slideSize={slideSize}
              translation={translation}
              widthInterpolation={paginationWidthInterpolation}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
  },
  container: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  slidesNestedContainer: {
    flexDirection: 'row',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
  },
  anchorBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    paddingBottom: 6,
  },
});

export default Swiper;
