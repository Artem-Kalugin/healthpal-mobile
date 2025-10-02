import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

import { Image } from 'expo-image';

import Swiper from '#components/Swiper';
import { ISwiperRef } from '#components/Swiper/Swiper';

import { Button, TextLarge, TextSmall } from '#ui-kit';

import { AuthRoutes } from '#navigation/Auth/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { colors, SAFE_ZONE_BOTTOM } from '#config';

import { animateLayout } from '#utils';

import { slides } from './config';

export const Onboarding: React.FC<RootScreenProps<AppRoutes>> = props => {
  const swiperRef = useRef<ISwiperRef>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const onPressNext = () => {
    const haveSeenLastSlide = activeSlide === slides.length - 1;

    if (haveSeenLastSlide) {
      props.navigation.replace(AppRoutes.StackAuth, {
        screen: AuthRoutes.SignUp,
      });
    } else {
      swiperRef.current?.swipe(+1);
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        autoplayInterval={0}
        contentContainerStyle={styles.slideWrapper}
        data={slides}
        ListBeforePaginationComponent={
          <View style={styles.slideContent}>
            <Animated.View
              key={activeSlide}
              entering={FadeInUp.delay(500)}
              exiting={FadeOutDown}
              style={styles.slideText}
            >
              <TextLarge
                color={colors.main.midnightBlue}
                textAlign="center"
                weight="600"
              >
                {slides[activeSlide].title}
              </TextLarge>
              <TextSmall
                textAlign="center"
                weight="400"
              >
                {slides[activeSlide].description}
              </TextSmall>
            </Animated.View>
            <Button onPress={onPressNext}>
              {activeSlide === slides.length - 1 ? 'Продолжить' : 'Далее'}
            </Button>
          </View>
        }
        renderItem={({ item }) => (
          <Image
            key={item.image}
            source={item.image}
            style={styles.slideImage}
          />
        )}
        style={styles.swiper}
        swiperRef={swiperRef}
        keyExtractor={item => item.image}
        onSlideChange={newSlideIndex => {
          animateLayout();
          setActiveSlide(newSlideIndex);
        }}
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
    flexShrink: 1,
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
    paddingHorizontal: 40,
  },
});
