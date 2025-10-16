import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { CompositeScreenProps } from '@react-navigation/native';

import { EmptyListWarning } from '#components/EmptyListWarning';
import { DoctorCard } from '#components/entities/Doctor/Card';
import { MedicalCenterCard } from '#components/entities/MedicalCenter/Card';
import { PaginatableListFooter } from '#components/PaginatableListFooter';

import { Loader } from '#ui-kit';

import {
  FavoritesRoutes,
  FavoritesScreenProps,
} from '#navigation/Main/Favorites/types';
import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import {
  useDoctorCategoriesQuery,
  useFavoriteDoctorsInfiniteQuery,
} from '#api/Doctor';
import { useFavoriteMedicalCentersInfiniteQuery } from '#api/MedicalCenters';

import { SCREEN_HEIGHT } from '#config';

import {
  BEDoctorResponseDto,
  BEMedicalCenterResponseDto,
} from '#generated/__entities';

import { FavoritesEmptyListWarnings, FavoritesListEnd } from './config';

export const Favorites: React.FC<
  CompositeScreenProps<
    FavoritesScreenProps<FavoritesRoutes>,
    MainScreenProps<MainRoutes>
  >
> = props => {
  const availableCategoriesQuery = useDoctorCategoriesQuery(null);
  const doctorsQuery = useFavoriteDoctorsInfiniteQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      skip: props.route.name !== FavoritesRoutes.FavoriteDoctors,
    },
  );
  const medicalCentersQuery = useFavoriteMedicalCentersInfiniteQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      skip: props.route.name !== FavoritesRoutes.FavoriteMedicalCenters,
    },
  );

  const favoritesQuery =
    props.route.name === FavoritesRoutes.FavoriteDoctors
      ? doctorsQuery
      : medicalCentersQuery;

  const [isRefreshing, setIsRefreshing] = useState(true);

  const listData = (favoritesQuery?.data?.pages.map(el => el.data).flat() ||
    []) as unknown as (BEDoctorResponseDto | BEMedicalCenterResponseDto)[];

  useEffect(() => {
    setIsRefreshing(
      favoritesQuery.isFetching && !favoritesQuery.isFetchingNextPage,
    );
  }, [favoritesQuery.isFetching, favoritesQuery.isFetchingNextPage]);

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={listData}
      ListEmptyComponent={
        favoritesQuery.isLoading ? (
          <Loader size="large" />
        ) : (
          <EmptyListWarning
            style={styles.emptyWarningMessage}
            {...FavoritesEmptyListWarnings[props.route.name]}
          />
        )
      }
      ListFooterComponent={
        <PaginatableListFooter
          enabled={!!listData.length && !isRefreshing}
          message={FavoritesListEnd[props.route.name]}
          showLoader={favoritesQuery.isFetching}
          showMessage={!favoritesQuery.hasNextPage}
        />
      }
      refreshing={isRefreshing || favoritesQuery.isLoading}
      renderItem={({ item }) => (
        <View style={styles.cardWrapper}>
          {props.route.name === FavoritesRoutes.FavoriteDoctors ? (
            <DoctorCard
              item={item as BEDoctorResponseDto}
              onPress={() =>
                props.navigation.navigate(MainRoutes.DoctorDetails, {
                  defaultItem: item as BEDoctorResponseDto,
                  id: item.id,
                })
              }
            />
          ) : (
            <MedicalCenterCard
              item={item as BEMedicalCenterResponseDto}
              style={styles.medicalCenterCard}
              onPress={() =>
                props.navigation.navigate(MainRoutes.Search, {
                  availableCategories: availableCategoriesQuery.data!,
                  medicalCenterId: item.id,
                  title: item.name,
                })
              }
            />
          )}
        </View>
      )}
      style={styles.container}
      keyExtractor={item => item.id}
      onEndReached={() =>
        !favoritesQuery.isFetching &&
        favoritesQuery.hasNextPage &&
        favoritesQuery.fetchNextPage()
      }
      onEndReachedThreshold={1}
      onRefresh={favoritesQuery.refetch}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  cardWrapper: {
    paddingTop: 10,
    paddingHorizontal: 24,
  },
  medicalCenterCard: {
    width: '100%',
  },
  emptyWarningMessage: {
    marginBottom: SCREEN_HEIGHT * 0.1,
  },
});
