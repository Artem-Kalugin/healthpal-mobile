import React, { useRef } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { CompositeScreenProps } from '@react-navigation/native';
import { Image } from 'expo-image';
import chunk from 'lodash/chunk';

import { DoctorsCategoryThumbnail } from '#components/entities/DoctorsCategory/Thumbnail';
import { MedicalCenterCard } from '#components/entities/MedicalCenter/Card';
import Swiper from '#components/Swiper';
import { ISwiperRef } from '#components/Swiper/Swiper';

import { Icon, TextBase, TextInput, TextSmall } from '#ui-kit';

import { TabRoutes, TabScreenProps } from '#navigation/Main/Tab/types';
import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { useDoctorCategoriesQuery } from '#api/Doctor';
import { useMedicalCentersQuery } from '#api/MedicalCenters';

import {
  ActiveOpacities,
  BORDER_RADIUS_ROUNDED,
  colors,
  shadow,
} from '#config';

import { slides } from './config';

export const Home: React.FC<
  CompositeScreenProps<
    TabScreenProps<TabRoutes.Home>,
    MainScreenProps<MainRoutes>
  >
> = props => {
  const doctorCategories = useDoctorCategoriesQuery(null);
  const medicalCenters = useMedicalCentersQuery(
    {
      params: {
        lat: '55.7558',
        lon: '37.6173',
        shouldTake5Only: true,
      },
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  const swiperRef = useRef<ISwiperRef>(null);

  const doctorCategoriesChunked = doctorCategories.data
    ? chunk(doctorCategories.data, 4)
    : undefined;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <SafeAreaView
          edges={['top']}
          style={styles.header}
        >
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
              IconLeft={<Icon name="search" />}
              inputWrapperStyle={styles.searchBar}
              placeholder="Поиск врача…"
              pointerEvents="none"
              size="small"
            />
          </TouchableOpacity>
        </SafeAreaView>

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
        />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextBase weight="700">Специализации</TextBase>
            <TouchableOpacity
              onPress={() => props.navigation.navigate(MainRoutes.Search)}
            >
              <TextSmall
                color={colors.grayscale['500']}
                weight="500"
              >
                Все
              </TextSmall>
            </TouchableOpacity>
          </View>
          {doctorCategoriesChunked && doctorCategoriesChunked.length && (
            <View style={styles.categoriesContent}>
              {doctorCategoriesChunked.map(_chunk => (
                <View
                  key={_chunk.map(el => el.type).join('')}
                  style={styles.categoryRow}
                >
                  {_chunk.map(doctorCategory => (
                    <DoctorsCategoryThumbnail
                      key={doctorCategory.type}
                      item={doctorCategory}
                      onPress={() => {}}
                    />
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextBase weight="700">Ближайшие медицинские центры</TextBase>
            <TextSmall
              color={colors.grayscale['500']}
              weight="500"
            >
              Все
            </TextSmall>
          </View>
          <FlatList
            horizontal
            contentContainerStyle={styles.clinicsContentContainer}
            data={medicalCenters.data || []}
            renderItem={({ item }) => <MedicalCenterCard item={item} />}
            showsHorizontalScrollIndicator={false}
            style={styles.clinicsContent}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </View>
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
    height: 40,
    marginBottom: 16,
    borderWidth: 0,
    backgroundColor: colors.grayscale['100'],
  },
  swiper: {
    width: '100%',
    aspectRatio: (342 + 24 + 24) / 162,
    marginBottom: 20,
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
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  categoriesContent: {
    marginBottom: 20,
    gap: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  clinicsContent: {
    overflow: 'visible',
    marginBottom: 36,
  },
  clinicsContentContainer: {
    overflow: 'visible',
    paddingHorizontal: 24,
    gap: 16,
  },
});
