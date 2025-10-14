import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';

import Animated from 'react-native-reanimated';

import { DoctorCard } from '#components/entities/Doctor/Card';
import { MedicalCenterCard } from '#components/entities/MedicalCenter/Card';
import ListExtender from '#components/ListExtender';

import {
  FavoritesRoutes,
  FavoritesScreenProps,
} from '#navigation/Main/Favorites/types';

export const Favorites: React.FC<
  FavoritesScreenProps<FavoritesRoutes>
> = props => {
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]}
        keyboardShouldPersistTaps="never"
        ListFooterComponent={<ListExtender height={36} />}
        renderItem={() => (
          <View style={styles.cardWrapper}>
            {props.route.name === FavoritesRoutes.FavoriteDosctors ? (
              <DoctorCard />
            ) : (
              //@ts-expect-error
              <MedicalCenterCard style={styles.medicalCenterCard} />
            )}
          </View>
        )}
        style={styles.container}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrapper: {
    paddingTop: 10,
    paddingHorizontal: 24,
  },
  medicalCenterCard: {
    width: '100%',
  },
});
