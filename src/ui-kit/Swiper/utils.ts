import { runOnJS, SharedValue, withSpring } from 'react-native-reanimated';

export const reduceAnimationValue = (value: number, threshold: number) => {
  'worklet';
  const reducedMultiplicity = value % threshold;

  const reducedNegativeAxis =
    reducedMultiplicity < 0
      ? threshold + reducedMultiplicity
      : reducedMultiplicity;

  return reducedNegativeAxis;
};

export const toAbsCeil = (
  conditionalValue: number,
  value = conditionalValue,
) => {
  'worklet';

  return conditionalValue < -1 ? Math.floor(value) : Math.ceil(value);
};

const PAGINATION_THRESHOLD = 0.1;
const PAGINATION_ANIMATION_CONFIG = {
  stiffness: 50,
  mass: 0.4,
};

export const paginate = (
  translation: SharedValue<number>,
  translateX: number,
  activeSlide: SharedValue<number>,
  slideSize: SharedValue<number>,
  slideSequenceSize: SharedValue<number>,
  slidesAmount: number,
  onSlideChange?: (value: number) => void,
) => {
  'worklet';
  const direction = toAbsCeil(translateX, translateX / slideSize.value);

  const nextToCurrentSlide = activeSlide.value + direction;

  const shouldChangeSlide =
    Math.abs(translateX) > slideSize.value * PAGINATION_THRESHOLD;

  const targetSlide = shouldChangeSlide
    ? nextToCurrentSlide
    : activeSlide.value;

  translation.value = withSpring(
    targetSlide * slideSize.value,
    PAGINATION_ANIMATION_CONFIG,
    finished => {
      if (finished) {
        translation.value = translation.value % slideSequenceSize.value;
        activeSlide.value = activeSlide.value
          ? activeSlide.value % slidesAmount
          : 0;
      }
    },
  );

  onSlideChange &&
    runOnJS(onSlideChange)(reduceAnimationValue(-targetSlide, slidesAmount));

  activeSlide.value = targetSlide;
};
