import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { toast } from 'react-hot-toast/headless';

import { DoctorDetailsCard } from '#components/domain/Doctor/DetailsCard';
import { DoctorFavoriteButton } from '#components/domain/Doctor/FavoriteButton';
import { ReviewItem } from '#components/domain/Review/Item';
import HeaderWithThreeSections from '#components/infrastructure/HeaderWithThreeSections';
import ListExtender from '#components/infrastructure/ListExtender';

import {
  Button,
  Loader,
  StatisticsFact,
  Text,
  TextSmall,
  TextXL,
} from '#ui-kit';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { useGetDoctorQuery, useGetDoctorScheduleQuery } from '#api/Doctor';

import { colors, headerShadow, SAFE_ZONE_BOTTOM, tabbarShadow } from '#config';

import { MapWeekDayToName } from './config';

export const DoctorDetails: React.FC<
  MainScreenProps<MainRoutes.DoctorDetails>
> = props => {
  const [doctorDetails, setDoctorDetails] = useState(
    props.route.params.defaultItem,
  );
  const [shouldCutDescription, setShouldCutDescription] = useState(true);

  const doctorQuery = useGetDoctorQuery({
    path: {
      id: props.route.params.id,
    },
  });

  const doctorScheduleQuery = useGetDoctorScheduleQuery({
    path: {
      doctorId: props.route.params.id,
    },
  });

  useEffect(() => {
    if (doctorQuery.data) {
      setDoctorDetails(doctorQuery.data);
    }
  }, [doctorQuery.data]);

  const descriptionCanOverflow =
    doctorDetails?.description && doctorDetails?.description?.length > 130;
  const descriptionOverflows =
    shouldCutDescription && descriptionCanOverflow ? true : false;

  const content = !doctorDetails ? (
    <Loader size="large" />
  ) : (
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      refreshControl={
        <RefreshControl
          refreshing={doctorQuery.isFetching || doctorScheduleQuery.isFetching}
          onRefresh={() => {
            doctorQuery.refetch();
            doctorScheduleQuery.refetch();
          }}
        />
      }
    >
      <DoctorDetailsCard
        item={doctorDetails}
        style={styles.doctorCard}
      />

      {doctorDetails ? (
        <View style={styles.statisicsContainer}>
          <StatisticsFact
            icon="patients"
            label="Пациентов"
            value={doctorDetails!.patientsCount}
          />
          <StatisticsFact
            icon="medal"
            label="Лет опыта"
            value={new Date().getFullYear() - doctorDetails?.practiceStartYear}
          />
          <StatisticsFact
            icon="star"
            iconProps={{
              size: 24,
            }}
            label="Оценка"
            value={+doctorDetails?.rating}
          />
          <StatisticsFact
            icon="comment"
            label="Отзывов"
            value={doctorDetails?.reviewsCount}
          />
        </View>
      ) : null}

      <View style={styles.description}>
        <TextXL
          color={colors.grayscale['800']}
          weight="700"
        >
          О враче
        </TextXL>
        <Text>
          <TextSmall color={colors.grayscale['500']}>
            {shouldCutDescription
              ? doctorDetails?.description.slice(0, 130)
              : doctorDetails?.description}
            {descriptionOverflows ? '... ' : ' '}
            {descriptionCanOverflow ? (
              shouldCutDescription ? (
                <TextSmall
                  key="DESCRIPTION_ACTION_UNCUT_TEXT"
                  color={colors.grayscale['900']}
                  textDecorationLine="underline"
                  onPress={() => setShouldCutDescription(old => !old)}
                >
                  показать еще
                </TextSmall>
              ) : (
                <TextSmall
                  key="DESCRIPTION_ACTION_CUT_TEXT"
                  color={colors.grayscale['900']}
                  textDecorationLine="underline"
                  onPress={() => setShouldCutDescription(old => !old)}
                >
                  скрыть
                </TextSmall>
              )
            ) : null}
          </TextSmall>
        </Text>
      </View>

      {doctorScheduleQuery?.data ? (
        <>
          <View style={styles.scheduleContainer}>
            <TextXL
              color={colors.grayscale['800']}
              weight="700"
            >
              Расписание
            </TextXL>
            <View style={styles.scheduleDays}>
              {Object.keys(doctorScheduleQuery.data).map(
                //@ts-expect-error
                (dayId: keyof typeof MapWeekDayToName) => (
                  <View
                    key={dayId}
                    style={styles.scheduleDay}
                  >
                    <Text style={styles.scheduleDayTitle}>
                      {MapWeekDayToName[dayId]}
                    </Text>

                    <View style={styles.scheduleRows}>
                      {doctorScheduleQuery.data![dayId].length ? (
                        doctorScheduleQuery.data![dayId]?.map(el => (
                          <View
                            key={`${el.start}${el.end}`}
                            style={styles.scheduleRow}
                          >
                            <Text style={styles.scheduleCol}>{el.start}</Text>
                            <Text>—</Text>
                            <Text
                              style={styles.scheduleCol}
                              textAlign="right"
                            >
                              {el.end}
                            </Text>
                          </View>
                        ))
                      ) : (
                        <Text>Выходной</Text>
                      )}
                    </View>
                  </View>
                ),
              )}
            </View>
          </View>
          <View style={styles.reviews}>
            <View style={styles.sectionHeader}>
              <TextXL
                color={colors.grayscale['800']}
                weight="700"
              >
                Отзывы
              </TextXL>
              <TouchableOpacity
                onPress={() => {
                  toast(
                    'Этого экрана не было в дизайне :( но вы можете посмотреть остальную часть приложения :)',
                  );
                }}
              >
                <TextSmall
                  color={colors.grayscale['500']}
                  weight="500"
                >
                  Все
                </TextSmall>
              </TouchableOpacity>
            </View>
            <ReviewItem />
          </View>
        </>
      ) : (
        <Loader size="large" />
      )}

      <ListExtender />
    </ScrollView>
  );
  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={[styles.headerContainer, headerShadow]}
        rightElement={
          doctorDetails && (
            <DoctorFavoriteButton
              doctorId={doctorDetails?.id}
              isFavoriteOnBackend={doctorDetails?.isFavorite}
            />
          )
        }
        title="Информация о враче"
        titleTextAlign="center"
      />
      {content}
      <View style={[styles.footer, tabbarShadow]}>
        <Button
          disabled={!doctorDetails}
          onPress={() =>
            props.navigation.navigate(MainRoutes.ScheduleAppointment, {
              doctorId: props.route.params.id,
            })
          }
        >
          Записаться на приём
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale['200'],
  },
  mainContainer: {
    paddingTop: 16,
    paddingHorizontal: 24,
    gap: 16,
  },
  doctorCard: {
    marginBottom: 10,
  },
  statisicsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    gap: 8,
  },
  scheduleContainer: {
    gap: 12,
  },
  scheduleDays: {
    gap: 8,
  },
  reviews: {
    gap: 16,
  },
  scheduleDay: {
    flex: 1,
    flexDirection: 'row',
  },
  scheduleDayTitle: {
    width: '20%',
  },
  scheduleRows: {
    flexDirection: 'column',
    gap: 0,
  },
  scheduleRow: {
    flexDirection: 'row',
  },
  scheduleCol: {
    width: '30%',
  },
  footer: {
    flexShrink: 0,
    padding: 24,
    paddingBottom: SAFE_ZONE_BOTTOM,
    borderTopWidth: 1,
    borderTopColor: colors.grayscale['200'],
    backgroundColor: colors.main.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
