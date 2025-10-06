import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { DoctorDetailsCard } from '#components/entities/Doctor/DetailsCard';
import { ReviewItem } from '#components/entities/Review/Item';
import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import ListExtender from '#components/ListExtender';

import { Button, StatisticsFact, Text, TextSmall, TextXL } from '#ui-kit';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { colors, SAFE_ZONE_BOTTOM, shadow, tabbarShadow } from '#config';

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
  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={[styles.headerContainer, shadow]}
        title="Информация о враче"
        titleTextAlign="center"
      />

      <ScrollView
        contentContainerStyle={styles.mainContainer}
        style={styles.main}
      >
        <DoctorDetailsCard style={styles.doctorCard} />

        <View style={styles.statisicsContainer}>
          <StatisticsFact
            icon="patients"
            label="Пациентов"
            value="2000+"
          />
          <StatisticsFact
            icon="medal"
            label="Лет опыта"
            value="10"
          />
          <StatisticsFact
            icon="star"
            iconProps={{
              size: 24,
            }}
            label="Оценка"
            value="5"
          />
          <StatisticsFact
            icon="comment"
            label="Отзывов"
            value="120"
          />
        </View>

        <View style={styles.description}>
          <TextXL
            color={colors.grayscale['800']}
            weight="700"
          >
            О враче
          </TextXL>
          <TextSmall color={colors.grayscale['500']}>
            Dr. David Patel, a dedicated cardiologist, brings a wealth of
            experience to Golden Gate Cardiology Center in Golden Gate, CA.{' '}
            <TextSmall
              color={colors.grayscale['900']}
              textDecorationLine="underline"
            >
              view more
            </TextSmall>
          </TextSmall>
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
            <TextSmall
              color={colors.grayscale['500']}
              weight="500"
            >
              Все
            </TextSmall>
          </View>
          <ReviewItem />
        </View>

        <ListExtender />
      </ScrollView>
      <View style={[styles.footer, tabbarShadow]}>
        <Button>Записаться на приём</Button>
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
  },
  main: {
    flex: 1,
  },
  mainContainer: {
    flexGrow: 1,
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
    padding: 24,
    paddingBottom: SAFE_ZONE_BOTTOM,
    backgroundColor: colors.main.white,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
