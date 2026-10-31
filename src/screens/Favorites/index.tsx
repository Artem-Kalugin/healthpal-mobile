import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { CompositeScreenProps } from '@react-navigation/native';

import { DoctorCard } from '#components/domain/doctor/Card';
import { MedicalCenterCard } from '#components/domain/medical-center/Card';
import {
  EmptyListWarning,
  PaginatableListFooter,
} from '#components/infrastructure';

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

import { useTranslation } from '#i18n';

import {
  BEDoctorResponseDto,
  BEMedicalCenterResponseDto,
} from '#generated/__entities';

export const Favorites: React.FC<
  CompositeScreenProps<
    FavoritesScreenProps<FavoritesRoutes>,
    MainScreenProps<MainRoutes>
  >
> = props => {
  const { t } = useTranslation();

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
    // eslint-disable-next-line react-hooks/set-state-in-effect -- TODO: fix
    setIsRefreshing(false);
  }, [favoritesQuery.fulfilledTimeStamp]);

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
            subtitle={t(`favorites.${props.route.name}.empty.subtitle`)}
            title={t(`favorites.${props.route.name}.empty.title`)}
          />
        )
      }
      ListFooterComponent={
        <PaginatableListFooter
          enabled={!!listData.length && !isRefreshing}
          message={t(`favorites.${props.route.name}.endOfList`)}
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
      onRefresh={() => {
        favoritesQuery.refetch();
        setIsRefreshing(true);
      }}
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
