import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { toast } from 'react-hot-toast/headless';

import { DoctorDetailsCard } from '#components/entities/Doctor/DetailsCard';
import { ReviewItem } from '#components/entities/Review/Item';
import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import ListExtender from '#components/ListExtender';

import {
  Button,
  Loader,
  StatisticsFact,
  Text,
  TextSmall,
  TextXL,
} from '#ui-kit';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { useGetDoctorQuery } from '#api/Doctor';

import { colors, headerShadow, SAFE_ZONE_BOTTOM, tabbarShadow } from '#config';

const MapDayIdToName = {
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб',
  7: 'Вс',
};

const schedule: {
  [x in keyof typeof MapDayIdToName]: [string, string][];
} = {
  1: [
    ['10:00', '14:00'],
    ['15:00', '18:00'],
  ],
  2: [['15:00', '20:00']],
  3: [['8:00', '14:00']],
  4: [['8:00', '16:00']],
  5: [['18:00', '21:00']],
  6: [],
  7: [],
};
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

  useEffect(() => {
    if (doctorQuery.data) {
      setDoctorDetails(doctorQuery.data);
    }
  }, [doctorQuery.data]);

  const descriptionOverflows =
    shouldCutDescription &&
    doctorDetails?.description &&
    doctorDetails?.description?.length > 130
      ? true
      : false;

  const content = !doctorDetails ? (
    <Loader />
  ) : (
    <ScrollView contentContainerStyle={styles.mainContainer}>
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
            value={doctorDetails?.rating}
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
            <TextSmall
              color={colors.grayscale['900']}
              textDecorationLine="underline"
              onPress={() => setShouldCutDescription(old => !old)}
            >
              {shouldCutDescription ? 'показать еще' : 'скрыть'}
            </TextSmall>
          </TextSmall>
        </Text>
      </View>

      <View style={styles.schedule}>
        <TextXL
          color={colors.grayscale['800']}
          weight="700"
        >
          Расписание
        </TextXL>
        {Object.keys(schedule).map(dayId => (
          <View
            key={dayId}
            style={styles.scheduleDay}
          >
            <Text style={styles.scheduleDayTitle}>
              {
                //@ts-expect-error TODO: fix after BE
                MapDayIdToName[dayId]
              }
            </Text>

            <View style={styles.scheduleRows}>
              {
                //@ts-expect-error TODO: fix after BE
                schedule[dayId].length ? (
                  //@ts-expect-error TODO: fix after BE
                  schedule[dayId]?.map(el => (
                    <View
                      key={el[0]}
                      style={styles.scheduleRow}
                    >
                      <Text>
                        {el[0]}
                        {'\t'} —
                      </Text>
                      <Text>
                        {'\t'}
                        {el[1]}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text>Выходной</Text>
                )
              }
            </View>
          </View>
        ))}
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

      <ListExtender />
    </ScrollView>
  );
  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={[styles.headerContainer, headerShadow]}
        title="Информация о враче"
        titleTextAlign="center"
      />
      {content}
      <View style={[styles.footer, tabbarShadow]}>
        <Button
          disabled={!doctorDetails}
          onPress={() =>
            props.navigation.navigate(MainRoutes.ScheduleAppointment)
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
  schedule: {
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
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
