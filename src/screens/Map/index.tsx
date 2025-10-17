import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import YaMap, { Point } from 'react-native-yamap';

import { CompositeScreenProps } from '@react-navigation/native';
import { distance, point as turfPoint } from '@turf/turf';
import { debounce } from 'lodash';

import { BlinkAnimator } from '#components/BlinkAnimator';
import { MedicalCenterCard } from '#components/entities/MedicalCenter/Card';
import { MedicalCenterMarker } from '#components/entities/MedicalCenter/Marker';

import { Icon, TextInput } from '#ui-kit';

import { TabRoutes, TabScreenProps } from '#navigation/Main/Tab/types';
import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { useDoctorCategoriesQuery } from '#api/Doctor';
import { useLazyMedicalCentersQuery } from '#api/MedicalCenters';

import { colors, shadow } from '#config';

import useBEErrorHandler from '#hooks/useErrorHandler';

import { delay } from '#utils';

import { BEMedicalCenterResponseDto } from '#generated/__entities';

import {
  CENTER_ON_MARKER_DISTANCE_THRESHOLD,
  getSortedMedicalCentersByDistance,
} from './config';

const initCoordinates = {
  lat: 55.7558,
  lon: 37.6173,
};
const initRegion = {
  ...initCoordinates,
  zoom: 10,
};

export const Map: React.FC<
  CompositeScreenProps<
    TabScreenProps<TabRoutes.Map>,
    MainScreenProps<MainRoutes>
  >
> = props => {
  const doctorCategories = useDoctorCategoriesQuery(null);
  const medicalCentersListRef = useRef<FlatList>(null);
  const yamapRef = useRef<YaMap>(null);
  const showMedicalCentersProgress = useSharedValue(0);
  const [triggerMedicalCentersQuery, meta] = useLazyMedicalCentersQuery();
  const [medicalCentersSorted, setMedicalCentersSorted] = useState<
    BEMedicalCenterResponseDto[]
  >([]);
  const [itemToBlink, setItemToBlink] = useState<
    BEMedicalCenterResponseDto | undefined
  >(undefined);

  const isInited = useRef(false);

  const sortMedicalCenters = (lat: number, lon: number) => {
    setMedicalCentersSorted(old =>
      getSortedMedicalCentersByDistance(old, lat, lon),
    );
  };

  const getCameraPosition = () => {
    return new Promise<Point>((resolve, reject) => {
      yamapRef.current?.getCameraPosition(position => {
        resolve({ ...position.point });
      });
    });
  };

  const onInit = async () => {
    if (isInited.current) {
      return;
    }

    const response = await triggerMedicalCentersQuery({
      params: { shouldTake5Only: false },
    });

    if (response.data) {
      setMedicalCentersSorted(response.data);
      isInited.current = true;
      debounceSortAndShowMedicalCenters();
    }
  };

  const debounceSortAndShowMedicalCenters = useMemo(() => {
    return debounce(async (point?: { lat: number; lon: number }) => {
      point && sortMedicalCenters(point.lat, point.lon);
      await delay(0);
      showMedicalCenters();
    }, 100);
  }, []);

  const showMedicalCenters = () => {
    showMedicalCentersProgress.value = withTiming(1);
  };

  const hideMedicalCenters = async () => {
    if (!isInited.current) {
      return;
    }
    showMedicalCentersProgress.value = withTiming(0);
    const point = await getCameraPosition();
    debounceSortAndShowMedicalCenters(point);
  };

  const centerMapOnPoint = (lat: number, lon: number) => {
    yamapRef.current?.setCenter(
      {
        lon: lon,
        lat: lat,
        zoom: 15,
      },
      15,
      0,
      0,
      0.5,
    );
  };

  const highlightItem = async (el: BEMedicalCenterResponseDto) => {
    setItemToBlink(el);
    await delay(0);
    medicalCentersListRef.current?.scrollToIndex({
      animated: true,
      index: 0,
      viewPosition: CONTAINER_HORIZONTAL_PADDING,
    });
    setItemToBlink(undefined);
  };

  const onMarkerPress = async (el: BEMedicalCenterResponseDto) => {
    const point = await getCameraPosition();

    const distanceToMove = distance(
      turfPoint([point.lat, point.lon]),
      turfPoint([el.lat, el.lon]),
    );

    if (distanceToMove > CENTER_ON_MARKER_DISTANCE_THRESHOLD) {
      centerMapOnPoint(el.lat, el.lon);
    } else {
      highlightItem(el);
    }
  };

  const rMedicalCentersContainer = useAnimatedStyle(() => ({
    transformOrigin: 'center 150%',
    pointerEvents: showMedicalCentersProgress.value === 1 ? 'auto' : 'none',
    transform: [
      {
        scale: showMedicalCentersProgress.value,
      },
    ],
    opacity: interpolate(showMedicalCentersProgress.value, [0.75, 1], [0, 1]),
  }));

  useEffect(() => {
    onInit();
  }, []);
  useBEErrorHandler(meta);

  const Markers = useMemo(() => {
    return medicalCentersSorted?.map(el => (
      <MedicalCenterMarker
        key={el.id}
        item={el}
        onPress={() => onMarkerPress(el)}
      />
    ));
  }, [isInited.current]);

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
            placeholder="Поиск"
            pointerEvents="none"
            size="small"
            style={styles.searchBar}
          />
        </TouchableOpacity>
      </View>
      <YaMap
        ref={yamapRef}
        followUser={false}
        initialRegion={initRegion}
        style={styles.map}
        userLocationAccuracyFillColor={colors.main.midnightBlue}
        onCameraPositionChange={hideMedicalCenters}
      >
        {Markers}
      </YaMap>

      <Animated.View style={[styles.clinicsAnchor, rMedicalCentersContainer]}>
        <FlatList
          ref={medicalCentersListRef}
          horizontal
          contentContainerStyle={styles.clinicsContentContainer}
          data={medicalCentersSorted}
          renderItem={({ item }) => (
            <BlinkAnimator startAnimation={itemToBlink?.id === item.id}>
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
        />
      </Animated.View>
    </View>
  );
};

const CONTAINER_HORIZONTAL_PADDING = 24;
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
    paddingHorizontal: CONTAINER_HORIZONTAL_PADDING,
    gap: 16,
  },
  clinicsContent: {
    marginBottom: 24,
    paddingBottom: 12,
  },
  searchBar: {
    height: 40,
    borderWidth: 0,
  },
});
