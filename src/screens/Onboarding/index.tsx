import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

import { Button, Image, Loader, TextLarge, TextSmall } from '#ui-kit';
import Swiper, { ISwiperRef } from '#ui-kit/Swiper';

import { AuthRoutes } from '#navigation/Auth/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { useOnboardingQuery } from '#api/Onboarding';

import { colors, SAFE_ZONE_BOTTOM } from '#config';

export const Onboarding: React.FC<RootScreenProps<AppRoutes>> = props => {
  const onboardingQuery = useOnboardingQuery(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const swiperRef = useRef<ISwiperRef>(null);
  const isRenderedRef = useRef<boolean>(false);

  const lastSlideIndex = (onboardingQuery.data?.length || 0) - 1;

  const onPressNext = () => {
    const haveSeenLastSlide = activeSlideIndex === lastSlideIndex;

    if (haveSeenLastSlide) {
      props.navigation.replace(AppRoutes.StackAuth, {
        screen: AuthRoutes.SignUp,
      });
    } else {
      swiperRef.current?.swipe(+1);
    }
  };

  useEffect(() => {
    isRenderedRef.current = true;
  }, []);

  if (!onboardingQuery?.data?.length) {
    return <Loader />;
  }
  return (
    <View style={styles.container}>
      <Swiper
        autoplayInterval={0}
        contentContainerStyle={styles.slideWrapper}
        data={onboardingQuery.data || []}
        ListBeforePaginationComponent={
          <View style={styles.slideContent}>
            <Animated.View
              key={activeSlideIndex}
              entering={
                !isRenderedRef.current ? undefined : FadeInUp.delay(200)
              }
              exiting={FadeOutDown}
              style={styles.slideText}
            >
              <TextLarge
                color={colors.main.midnightBlue}
                textAlign="center"
                weight="600"
              >
                {onboardingQuery.data?.[activeSlideIndex].title}
              </TextLarge>
              <TextSmall
                textAlign="center"
                weight="400"
              >
                {onboardingQuery.data?.[activeSlideIndex].text}
              </TextSmall>
            </Animated.View>
            <View style={styles.buttonContainer}>
              <Button onPress={onPressNext}>
                {lastSlideIndex === activeSlideIndex ? 'Продолжить' : 'Далее'}
              </Button>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <Image
            source={item.image}
            style={styles.slideImage}
          />
        )}
        style={styles.swiper}
        swiperRef={swiperRef}
        keyExtractor={item => item.text}
        onSlideChange={setActiveSlideIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  swiper: {
    flex: 1,
    paddingBottom: SAFE_ZONE_BOTTOM,
  },
  slideImage: {
    height: '100%',
    width: '100%',
  },
  slideWrapper: {
    flex: 1,
  },
  slideText: {
    minHeight: 120,
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  container: {
    flex: 1,
    gap: 12,
  },
  slideContent: {
    paddingVertical: 28,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingHorizontal: 24,
  },
});
