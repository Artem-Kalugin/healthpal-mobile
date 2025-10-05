import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import YaMap from 'react-native-yamap';

import { MedicalCenterCard } from '#components/entities/MedicalCenter/Card';

import { Icon, TextInput } from '#ui-kit';

import { TabRoutes, TabScreenProps } from '#navigation/Main/Tab/types';

import { colors } from '#config';

export const Map: React.FC<TabScreenProps<TabRoutes.Map>> = props => {
  const showMedicalCentersProgress = useSharedValue(1);

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

  const hideMedicalCenters = () => {
    showMedicalCentersProgress.value = withTiming(0);
  };
  const showMedicalCenters = () => {
    showMedicalCentersProgress.value = withDelay(250, withTiming(1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarAnchor}>
        <TouchableOpacity>
          <TextInput
            containerStyle={styles.searchBar}
            IconLeft={<Icon name="search" />}
            placeholder="Поиск"
            pointerEvents="none"
            size="small"
          />
        </TouchableOpacity>
      </View>
      <YaMap
        initialRegion={{
          lat: 55.7558,
          lon: 37.6173,
          zoom: 10,
        }}
        style={styles.map}
        userLocationIcon={{
          uri: 'https://www.clipartmax.com/png/middle/180-1801760_pin-png.png',
        }}
        onCameraPositionChange={hideMedicalCenters}
        onCameraPositionChangeEnd={showMedicalCenters}
      />

      <Animated.View style={[styles.clinicsAnchor, rMedicalCentersContainer]}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.clinicsContentContainer}
          showsHorizontalScrollIndicator={false}
          style={styles.clinicsContent}
        >
          {Array(4).fill(<MedicalCenterCard />)}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

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
    paddingHorizontal: 26,
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
    paddingHorizontal: 24,
    gap: 16,
  },
  clinicsContent: {
    marginBottom: 24,
    paddingBottom: 12,
  },
  searchBar: {
    height: 40,
    borderWidth: 0,
    backgroundColor: colors.white,
  },
});
