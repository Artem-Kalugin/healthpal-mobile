import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-screens';

import { Image } from 'expo-image';

import Swiper from '#components/Swiper';
import { ISwiperRef } from '#components/Swiper/Swiper';

import { Button, Icon, TextInput, TextLarge, TextSmall } from '#ui-kit';

import { TabRoutes, TabScreenProps } from '#navigation/Tab/types';

import {
  ActiveOpacities,
  BORDER_RADIUS_ROUNDED,
  colors,
  SAFE_ZONE_BOTTOM,
  shadow,
} from '#config';

import { animateLayout } from '#utils';

import { slides } from './config';

export const Home: React.FC<TabScreenProps<TabRoutes.Home>> = props => {
  const swiperRef = useRef<ISwiperRef>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <SafeAreaView
      edges={['top']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.locationAndNotificationsWrapper}>
          <View style={styles.locationContainer}>
            <TextSmall color={colors.grayscale['500']}>Город</TextSmall>
            <TouchableOpacity style={styles.locationSelector}>
              <Icon name="mapActive" />
              <TextSmall weight="600">Москва</TextSmall>
              <Icon name="chevronDown" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.notificationsContainer}>
            <Icon name="notification"></Icon>
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <TextInput
            containerStyle={styles.searchBar}
            IconLeft={<Icon name="search" />}
            placeholder="Поиск врача…"
            pointerEvents="none"
            size="small"
          />
        </TouchableOpacity>
      </View>

      <Swiper
        autoplayInterval={10000}
        contentContainerStyle={styles.slideWrapper}
        data={slides}
        paginationColorInterpolation={[colors.grayscale['200'], colors.white]}
        paginationShouldOverlay={true}
        paginationWidthInterpolation={[6, 30]}
        renderItem={({ item }) => (
          <View style={styles.slideWrapper}>
            <TouchableOpacity
              activeOpacity={ActiveOpacities.HEAVY}
              style={[styles.shadowedImageContainer, shadow]}
            >
              <Image
                key={item.image}
                source={item.image}
                style={styles.slideImage}
              />
            </TouchableOpacity>
          </View>
        )}
        style={styles.swiper}
        swiperRef={swiperRef}
        keyExtractor={(item, index) => index}
        onSlideChange={newSlideIndex => {
          animateLayout();
          setActiveSlide(newSlideIndex);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  locationAndNotificationsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 24,
    gap: 14,
  },
  locationContainer: {
    gap: 4,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  notificationsContainer: {
    height: 34,
    width: 34,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: BORDER_RADIUS_ROUNDED,
    backgroundColor: colors.grayscale['100'],
  },
  container: {
    flex: 1,
    gap: 12,
  },
  searchBar: {
    borderWidth: 0,
    backgroundColor: colors.grayscale['100'],
  },
  swiper: {
    width: '100%',
    aspectRatio: (342 + 24 + 24) / 162,
  },
  slideWrapper: {
    paddingHorizontal: 12,
  },
  shadowedImageContainer: {
    borderRadius: 12,
  },
  slideImage: {
    width: '100%',
    aspectRatio: 342 / 162,
  },
});
