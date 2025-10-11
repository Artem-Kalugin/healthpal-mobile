import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  FadeOut,
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Image } from 'expo-image';
import { setStatusBarHidden } from 'expo-status-bar';

import { Brand, Loader } from '#ui-kit';

import { colors, Images, IS_IOS, SCREEN_HEIGHT, SCREEN_WIDTH } from '#config';

export function FakeSplashScreenOverlay({ isLoading }: { isLoading: boolean }) {
  const animationProgress = useSharedValue(0);

  const onInit = async () => {
    startAnimation();
  };

  useEffect(() => {
    onInit();

    return () => setStatusBarHidden(false);
  }, []);

  const startAnimation = () => {
    const endlessAnimation = withRepeat(
      withSequence(
        withTiming(1, {
          duration: 10000,
        }),
        withTiming(0.9, {
          duration: 10000,
        }),
      ),
      -1,
    );

    const startingAnimation = withTiming(0.9, {
      duration: 2000,
      easing: Easing.bezier(0.17, 0.67, 0, 1),
    });

    animationProgress.value = withSequence(startingAnimation, endlessAnimation);
  };

  const rCard = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(animationProgress.value, [0, 1], [1, 0.45], 'clamp'),
      },
    ],
    borderRadius: interpolate(
      animationProgress.value,
      [0, 1],
      [0, 48],
      'clamp',
    ),
  }));

  const rCardOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(animationProgress.value, [0, 0.5], [0, 1], 'clamp'),
  }));

  const rGappedContainer = useAnimatedStyle(() => ({
    gap: interpolate(animationProgress.value, [0, 0.5], [0, 16], 'clamp'),
  }));

  return (
    <Animated.View
      exiting={FadeOut}
      style={styles.container}
    >
      <View style={styles.anchorCenterLayer}>
        <View style={styles.loaderOverlay}>
          <Animated.View
            entering={FadeIn}
            layout={LinearTransition.easing(Easing.ease)}
          >
            <Brand
              style={styles.brand}
              theme="light"
            />
          </Animated.View>
          {isLoading && (
            <Animated.View
              entering={FadeInDown}
              exiting={FadeOut}
            >
              <Loader
                color={!IS_IOS ? colors.white : undefined}
                cover={false}
              />
            </Animated.View>
          )}
        </View>
      </View>

      <View style={styles.anchorCenterLayer}>
        <Animated.View style={[styles.animatedContent, rGappedContainer]}>
          <Animated.View style={[styles.animatedRow, rGappedContainer]}>
            <Animated.View
              style={[
                styles.animatedCard,
                styles.cardTopLeft,
                rCard,
                rCardOpacity,
              ]}
            />
            <Animated.View
              style={[styles.animatedCard, styles.cardTop, rCard, rCardOpacity]}
            >
              <Image
                source={Images.onboarding2}
                style={styles.image}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.animatedCard,
                styles.cardTopRight,
                rCard,
                rCardOpacity,
              ]}
            />
          </Animated.View>
          <Animated.View style={[styles.animatedRow, rGappedContainer]}>
            <Animated.View
              style={[
                styles.animatedCard,
                styles.cardLeft,
                rCard,
                rCardOpacity,
              ]}
            >
              <Image
                source={Images.onboarding3}
                style={styles.image}
              />
            </Animated.View>
            <Animated.View
              style={[styles.animatedCard, rCard, styles.mainCard]}
            ></Animated.View>
            <Animated.View
              style={[
                styles.animatedCard,
                styles.cardRight,
                rCard,
                rCardOpacity,
              ]}
            >
              <Image
                source={Images.onboarding1}
                style={styles.image}
              />
            </Animated.View>
          </Animated.View>
          <Animated.View style={[styles.animatedRow, rGappedContainer]}>
            <Animated.View
              style={[
                styles.animatedCard,
                styles.cardBottomLeft,
                rCard,
                rCardOpacity,
              ]}
            />
            <Animated.View
              style={[
                styles.animatedCard,
                styles.cardBottom,
                rCard,
                rCardOpacity,
              ]}
            >
              <Image
                source={Images.onboarding1}
                style={styles.image}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.animatedCard,
                styles.cardBottomRight,
                rCard,
                rCardOpacity,
              ]}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const GAPS = 12;
const CARD_ASPECT_RATIO = (SCREEN_WIDTH * 1.5) / SCREEN_HEIGHT;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    backgroundColor: colors.grayscale['900'],
  },
  brand: {
    paddingBottom: 0,
  },
  loaderOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    gap: 36,
  },
  anchorCenterLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContent: {
    gap: GAPS,
  },
  animatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: GAPS,
  },
  animatedCard: {
    height: SCREEN_HEIGHT,
    aspectRatio: CARD_ASPECT_RATIO,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
  // eslint-disable-next-line react-native/no-color-literals
  mainCard: {
    opacity: 1,
    backgroundColor: '#352261',
  },

  cardTop: {
    transformOrigin: ['50%', '150%', 0],
  },
  // eslint-disable-next-line react-native/no-color-literals
  cardTopLeft: {
    backgroundColor: '#ACA1CD',
    transformOrigin: ['150%', '150%', 0],
  },
  // eslint-disable-next-line react-native/no-color-literals
  cardTopRight: {
    backgroundColor: '#DC9497',
    transformOrigin: ['-50%', '150%', 0],
  },
  cardLeft: {
    transformOrigin: ['150%', '50%', 0],
  },
  cardRight: {
    transformOrigin: ['-50%', '50%', 0],
  },
  // eslint-disable-next-line react-native/no-color-literals
  cardBottomLeft: {
    backgroundColor: '#D7A99C',
    transformOrigin: ['150%', '-50%', 0],
  },
  // eslint-disable-next-line react-native/no-color-literals
  cardBottomRight: {
    backgroundColor: '#4D9B91',
    transformOrigin: ['-50%', '-50%', 0],
  },
  cardBottom: {
    transformOrigin: ['50%', '-50%', 0],
  },
});
