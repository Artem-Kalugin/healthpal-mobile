import React, { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Animated, {
  FadeOutDown,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Point, Yamap, YamapRef } from 'react-native-yamap-plus';

import { CompositeScreenProps } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { distance, point as turfPoint } from '@turf/turf';
import { debounce } from 'lodash';

import { MedicalCenterCard } from '#components/domain/medical-center/Card';
import { MedicalCenterMarker } from '#components/domain/medical-center/Marker';
import { BlinkAnimator } from '#components/infrastructure';

import { Icon, TextInput } from '#ui-kit';

import { TabRoutes, TabScreenProps } from '#navigation/Main/Tab/types';
import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { useDoctorCategoriesQuery } from '#api/Doctor';
import { useMedicalCentersQuery } from '#api/MedicalCenters';

import { shadow } from '#config';

import { getLanguage, useTranslation } from '#i18n';

import { useErrorHandler } from '#hooks/useErrorHandler';

import { reactSync } from '#utils';

import { useSelector } from '#store';

import { BEMedicalCenterResponseDto } from '#generated/__entities';

import { MapLanguageNotice } from './components/MapLanguageNotice';
import {
  CENTER_ON_MARKER_DISTANCE_THRESHOLD,
  MARKER_ZOOM,
  REGION_ZOOM,
} from './config';
import {
  getMedicalCentersAveragePoint,
  getSortedMedicalCentersByDistance,
} from './utils';

export const Map: React.FC<
  CompositeScreenProps<
    TabScreenProps<TabRoutes.Map>,
    MainScreenProps<MainRoutes>
  >
> = props => {
  const { t } = useTranslation();
  const mapLanguage = useSelector(state => state.runtime.mapLanguage);
  const [isMapLanguageNoticeClosed, setIsMapLanguageNoticeClosed] =
    useState(false);

  const doctorCategories = useDoctorCategoriesQuery(null);
  const yamapRef = useRef<YamapRef>(null);
  const showMedicalCentersProgress = useSharedValue(0);
  const { data: medicalCenters = [], ...meta } = useMedicalCentersQuery({
    params: { shouldTake5Only: false },
  });
  const [cameraPoint, setCameraPoint] = useState<
    { lat: number; lon: number } | undefined
  >(undefined);
  const [itemToBlink, setItemToBlink] = useState<
    BEMedicalCenterResponseDto | undefined
  >(undefined);

  const medicalCentersSorted = cameraPoint
    ? getSortedMedicalCentersByDistance(
        medicalCenters,
        cameraPoint.lat,
        cameraPoint.lon,
      )
    : medicalCenters;

  const getCameraPosition = () => {
    return new Promise<Point>((resolve, reject) => {
      yamapRef.current?.getCameraPosition(position => {
        resolve({ ...position.point });
      });
    });
  };

  const debounceSortAndShowMedicalCenters = useMemo(() => {
    return debounce(async (point: { lat: number; lon: number }) => {
      setCameraPoint(point);
      await reactSync();
      showMedicalCenters();
    }, 100);
  }, []);

  const showMedicalCenters = () => {
    showMedicalCentersProgress.value = withTiming(1);
  };

  const hideMedicalCenters = async () => {
    if (!medicalCenters.length) {
      return;
    }
    showMedicalCentersProgress.value = withTiming(0);
    const point = await getCameraPosition();
    debounceSortAndShowMedicalCenters(point);
  };

  const centerMapOnPoint = (lat: number, lon: number, zoom: number) => {
    yamapRef.current?.setCenter(
      {
        lon: lon,
        lat: lat,
      },
      zoom,
      0,
      0,
      0.5,
    );
  };

  const highlightItem = async (el: BEMedicalCenterResponseDto) => {
    setItemToBlink(el);
    await reactSync();
    setItemToBlink(undefined);
  };

  const onMarkerPress = async (el: BEMedicalCenterResponseDto) => {
    const point = await getCameraPosition();

    const distanceToMove = distance(
      turfPoint([point.lat, point.lon]),
      turfPoint([el.lat, el.lon]),
    );

    if (distanceToMove > CENTER_ON_MARKER_DISTANCE_THRESHOLD) {
      centerMapOnPoint(el.lat, el.lon, MARKER_ZOOM);
    } else {
      highlightItem(el);
    }
  };

  const rMedicalCentersContainer = useAnimatedStyle(() => ({
    pointerEvents: showMedicalCentersProgress.value === 1 ? 'auto' : 'none',
    transform: [
      {
        translateY: interpolate(
          showMedicalCentersProgress.value,
          [0, 1],
          [50, 0],
        ),
      },
    ],
    opacity: interpolate(showMedicalCentersProgress.value, [0.0, 1], [0.01, 1]),
  }));

  // the region is defined by the response: center the map on the average point of its medical centers
  useEffect(() => {
    if (!medicalCenters.length) {
      return;
    }

    const { lat, lon } = getMedicalCentersAveragePoint(medicalCenters);

    centerMapOnPoint(lat, lon, REGION_ZOOM);
    debounceSortAndShowMedicalCenters({ lat, lon });
  }, [medicalCenters]);

  useErrorHandler(meta);

  const Markers = medicalCenters.map(el => (
    <MedicalCenterMarker
      key={el.id}
      item={el}
      onPress={() => onMarkerPress(el)}
    />
  ));

  // `mapLanguage` is set once the native map locale is applied; it can change only after a restart
  const isMapLanguageNoticeVisible =
    !isMapLanguageNoticeClosed &&
    !!mapLanguage &&
    mapLanguage !== getLanguage();

  return (
    <View style={styles.container}>
      <View style={styles.searchBarAnchor}>
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
            inputWrapperStyle={shadow}
            placeholder={t('map.searchPlaceholder')}
            pointerEvents="none"
            size="small"
            style={styles.searchBar}
          />
        </TouchableOpacity>
        {isMapLanguageNoticeVisible && (
          <Animated.View
            exiting={FadeOutDown}
            style={styles.mapLanguageNotice}
          >
            <MapLanguageNotice
              onClose={() => setIsMapLanguageNoticeClosed(true)}
            />
          </Animated.View>
        )}
      </View>
      <Yamap
        ref={yamapRef}
        followUser={false}
        style={styles.map}
        onCameraPositionChange={hideMedicalCenters}
      >
        {Markers}
      </Yamap>

      <Animated.View style={[styles.clinicsAnchor, rMedicalCentersContainer]}>
        <FlashList
          key={JSON.stringify(medicalCentersSorted.map(el => el.id))}
          horizontal
          contentContainerStyle={styles.clinicsContentContainer}
          data={medicalCentersSorted}
          renderItem={({ item }) => (
            <BlinkAnimator
              startAnimation={itemToBlink?.id === item.id}
              style={styles.cardWrapper}
            >
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
            </BlinkAnimator>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.clinicsContent}
          keyExtractor={item => item.id}
        />
      </Animated.View>
    </View>
  );
};

const CONTAINER_HORIZONTAL_PADDING = 24;
const LIST_ITEM_GAP = 8;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarAnchor: {
    position: 'absolute',
    zIndex: 2,
    top: 76,
    right: 0,
    left: 0,
    paddingHorizontal: CONTAINER_HORIZONTAL_PADDING,
  },
  mapLanguageNotice: {
    marginTop: 8,
  },
  map: {
    flex: 1,
  },
  clinicsAnchor: {
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  clinicsContentContainer: {
    alignItems: 'center',
    paddingHorizontal: CONTAINER_HORIZONTAL_PADDING - LIST_ITEM_GAP,
  },
  cardWrapper: {
    paddingBottom: 12,
    paddingHorizontal: LIST_ITEM_GAP,
  },
  clinicsContent: {
    marginBottom: 24,
  },
  searchBar: {
    height: 40,
    borderWidth: 0,
  },
});
