import { Dimensions, Platform, StyleSheet } from 'react-native';

import { withSpring } from 'react-native-reanimated';
import { initialWindowMetrics } from 'react-native-safe-area-context';

/* PLOP_INJECT_IMPORT */
import onboarding1 from '#assets/images/onboarding-1.png';
import onboarding2 from '#assets/images/onboarding-2.png';
import onboarding3 from '#assets/images/onboarding-3.png';

import { colors } from './colors';

export const IS_IOS = Platform.OS === 'ios';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
export const SAFE_ZONE_BOTTOM = initialWindowMetrics?.insets?.bottom || 14;

export const hitSlop = {
  bottom: 16,
  left: 16,
  right: 16,
  top: 16,
};

export const hitSlopBig = {
  bottom: 32,
  left: 32,
  right: 32,
  top: 32,
};

export enum ActiveOpacities {
  LIGHT = 0.1,
  MEDIUM = 0.2,
  HEAVY = 0.6,
}

export const withCustomAnimation = (toValue: number, cb?: () => void) => {
  return withSpring(
    toValue,
    {
      stiffness: 200,
      mass: 0.2,
    },
    cb,
  );
};

export const shadow = StyleSheet.create({
  style: {
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowRadius: 2.22,
    shadowOpacity: 0.42,
  },
}).style;

export const Images = {
  /* PLOP_INJECT_KEY */
  onboarding3: onboarding3,
  onboarding2: onboarding2,
  onboarding1: onboarding1,
};

export * from './colors';
