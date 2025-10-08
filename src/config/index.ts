import { Dimensions, Platform, StyleSheet } from 'react-native';

import { withSpring } from 'react-native-reanimated';
import { initialWindowMetrics } from 'react-native-safe-area-context';

/* PLOP_INJECT_IMPORT */
import clinic from '#assets/images/clinic.png';
import home1 from '#assets/images/home-1.png';
import onboarding1 from '#assets/images/onboarding-1.png';
import onboarding2 from '#assets/images/onboarding-2.png';
import onboarding3 from '#assets/images/onboarding-3.png';
import profileCircle from '#assets/images/profile-circle.png';

export const IS_IOS = Platform.OS === 'ios';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;
const insetsAndroid = initialWindowMetrics?.insets?.bottom
  ? initialWindowMetrics?.insets?.bottom + 14
  : 0;
const insetsIOS = initialWindowMetrics?.insets?.bottom;
export const SAFE_ZONE_BOTTOM = (IS_IOS ? insetsIOS : insetsAndroid) || 14;

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
  'worklet';
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
    boxShadow: [
      {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 6,
        color: 'rgba(0, 0, 0, 0.05)',
      },
      {
        offsetX: 0,
        offsetY: 10,
        blurRadius: 15,
        spreadDistance: -3,
        color: 'rgba(0, 0, 0, 0.1)',
      },
    ],
  },
}).style;
export const headerShadow = StyleSheet.create({
  style: {
    boxShadow: '0px 6px 10px -8px #00000022',
  },
}).style;
export const tabbarShadow = StyleSheet.create({
  style: {
    boxShadow: '0px -6px 10px -8px #00000033',
  },
}).style;

export const Images = {
  /* PLOP_INJECT_KEY */
  clinic: clinic,
  home1: home1,
  onboarding3: onboarding3,
  onboarding2: onboarding2,
  onboarding1: onboarding1,
  profileCircle,
};
export const BORDER_RADIUS_ROUNDED = 9999;

export * from './colors';
