import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { CompositeScreenProps } from '@react-navigation/native';
import { Image } from 'expo-image';
import chunk from 'lodash/chunk';
import { toast } from 'react-hot-toast/headless';

import { DoctorCategoryThumbnail } from '#components/domain/doctor-category/Thumbnail';
import { MedicalCenterCard } from '#components/domain/medical-center/Card';
import { Swiper } from '#components/infrastructure';
import { ISwiperRef } from '#components/infrastructure/Swiper';

import { Icon, TextBase, TextInput, TextSmall } from '#ui-kit';

import { TabRoutes, TabScreenProps } from '#navigation/Main/Tab/types';
import { MainRoutes, MainScreenProps } from '#navigation/Main/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { useDoctorCategoriesQuery } from '#api/Doctor';
import { useMedicalCentersQuery } from '#api/MedicalCenters';

import { LocationService } from '#services/Location';

import {
  ActiveOpacities,
  BORDER_RADIUS_ROUNDED,
  shadow,
  STATUS_BAR_HEIGHT,
} from '#config';
import { colors } from '#config/colors';

import { useTranslation } from '#i18n';

import { RegionSelector } from './components/RegionSelector';
import { slides } from './config';

export const Home: React.FC<
  CompositeScreenProps<
    TabScreenProps<TabRoutes.Home>,
    CompositeScreenProps<
      MainScreenProps<MainRoutes>,
      RootScreenProps<AppRoutes>
    >
  >
> = props => {
  const { t } = useTranslation();

  const [isUserDecidedLocationUsage, setIsUserDecidedLocationUsage] =
    useState(false);
  const [location, setLocation] =
    useState<
      Awaited<ReturnType<(typeof LocationService)['getCurrentLocation']>>
    >();
  const doctorCategories = useDoctorCategoriesQuery(null);
  const medicalCenters = useMedicalCentersQuery(
    {
      params: {
        lat: location ? `${location?.coords.latitude}` : undefined,
        lon: location ? `${location?.coords.longitude}` : undefined,
        shouldTake5Only: true,
      },
    },
    {
      skip: !isUserDecidedLocationUsage,
    },
  );
  const swiperRef = useRef<ISwiperRef>(null);

  const renewLocation = async () => {
    const _location = await LocationService.getCurrentLocation();

    setLocation(_location);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- TODO: fix
    renewLocation().finally(() => setIsUserDecidedLocationUsage(true));
  }, []);

  const doctorCategoriesChunked = doctorCategories.data
    ? chunk(doctorCategories.data, 4)
    : undefined;

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          progressViewOffset={STATUS_BAR_HEIGHT}
          refreshing={doctorCategories.isLoading || medicalCenters.isLoading}
          onRefresh={() => {
            doctorCategories.refetch();
            medicalCenters.refetch();
          }}
        />
      }
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <SafeAreaView
        edges={['top']}
        style={styles.header}
      >
        <View style={styles.locationAndNotificationsWrapper}>
          <RegionSelector />

          <TouchableOpacity
            style={styles.notificationsContainer}
            onPress={() => {
              props.navigation.navigate(MainRoutes.Notifications);
            }}
          >
            <Icon name="notification"></Icon>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate(MainRoutes.Search, {
              availableCategories: doctorCategories.data!,
              autoFocus: true,
            })
          }
        >
          <TextInput
            IconLeft={<Icon name="search" />}
            inputWrapperStyle={styles.searchBar}
            placeholder={t('home.searchPlaceholder')}
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
          <TextBase weight="700">{t('home.specializations')}</TextBase>
          <TouchableOpacity
            disabled={!doctorCategories.data}
            onPress={() =>
              props.navigation.navigate(MainRoutes.Search, {
                availableCategories: doctorCategories.data!,
              })
            }
          >
            <TextSmall
              color={colors.grayscale['500']}
              weight="500"
            >
              {t('common.all')}
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
                  <DoctorCategoryThumbnail
                    key={doctorCategory.type}
                    item={doctorCategory}
                    onPress={() =>
                      props.navigation.navigate(MainRoutes.Search, {
                        categoryId: doctorCategory.id,
                        availableCategories: doctorCategories.data!,
                      })
                    }
                  />
                ))}
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <TextBase weight="700">
            {isUserDecidedLocationUsage && location
              ? t('home.nearbyCenters')
              : t('home.centers')}
          </TextBase>
          <TextSmall
            color={colors.grayscale['500']}
            weight="500"
            onPress={() => {
              toast(t('home.allCentersSoon'));
            }}
          >
            {t('common.all')}
          </TextSmall>
        </View>
        <FlatList
          horizontal
          contentContainerStyle={styles.clinicsContentContainer}
          data={medicalCenters.data || []}
          renderItem={({ item }) => (
            <MedicalCenterCard
              item={item}
              onPress={() =>
                props.navigation.navigate(MainRoutes.Search, {
                  availableCategories: doctorCategories.data!,
                  medicalCenterId: item.id,
                  title: item.name,
                })
              }
            />
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.clinicsContent}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationAndNotificationsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    paddingHorizontal: 24,
    gap: 14,
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
