import { Dimensions, Platform, StyleSheet } from 'react-native';

import { withSpring } from 'react-native-reanimated';
import { initialWindowMetrics } from 'react-native-safe-area-context';

/* PLOP_INJECT_IMPORT */
import home1 from '#assets/images/home-1.png';
import onboarding1 from '#assets/images/onboarding-1.png';
import onboarding2 from '#assets/images/onboarding-2.png';
import onboarding3 from '#assets/images/onboarding-3.png';
import profileCircle from '#assets/images/profile-circle.png';

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
  MEDIUM = 0.4,
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
    boxShadow: '0px 6px 8px -5px #000000AA',
  },
}).style;
export const tabbarShadow = StyleSheet.create({
  style: {
    boxShadow: '0px -6px 10px -8px #00000033',
  },
}).style;

export const Images = {
  /* PLOP_INJECT_KEY */
  home1: home1,
  onboarding3: onboarding3,
  onboarding2: onboarding2,
  onboarding1: onboarding1,
  profileCircle,
};
export const BORDER_RADIUS_ROUNDED = 9999;

export * from './colors';
