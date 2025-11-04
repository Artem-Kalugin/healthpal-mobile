import React, { ReactNode } from 'react';
import { LayoutChangeEvent, ViewStyle } from 'react-native';

import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { reduceAnimationValue } from './utils';

interface ISlideContainer {
  index?: number;
  children?: ReactNode;
  translation: SharedValue<number>;
  slideSize: SharedValue<number>;
  slideSequenceSize: SharedValue<number>;
  onLayout?: (value: LayoutChangeEvent) => void;
  containerStyle: ViewStyle;
}

const SlideContainer: React.FC<ISlideContainer> = ({
  index = 1,
  onLayout = undefined,
  children = undefined,
  translation,
  containerStyle = {},
  slideSize,
  slideSequenceSize,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const containerOffset = translation.value + slideSize.value * index;
    const reducedValue = reduceAnimationValue(
      containerOffset,
      slideSequenceSize.value,
    );

    return {
      transform: [
        {
          translateX: reducedValue - slideSize.value * index,
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[containerStyle, animatedStyle]}
      testID={`slide-container-${index}`}
      onLayout={onLayout}
    >
      {children}
    </Animated.View>
  );
};

export default SlideContainer;
