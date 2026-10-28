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
