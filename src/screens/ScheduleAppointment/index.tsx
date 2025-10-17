import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { DateData } from 'react-native-calendars';
import Animated, { Easing, LinearTransition } from 'react-native-reanimated';

import dayjs from 'dayjs';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import ListExtender from '#components/ListExtender';

import { Button, Calendar, Loader, TextSmall, TextXL } from '#ui-kit';
import { toDateString } from '#ui-kit/Calendar/utils';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import {
  useGetDoctorTimeSlotsQuery,
  useGetDoctorTimeSlotsRangeQuery,
} from '#api/Doctor';

import { colors, headerShadow, SAFE_ZONE_BOTTOM, tabbarShadow } from '#config';

import { BETimeSlotDto } from '#generated/__entities';

const MAX_DAYS_IN_MONTH = 31;
const MAX_OVERLAP_DAYS_IN_UI = 6;
export const ScheduleAppointment: React.FC<
  MainScreenProps<MainRoutes.ScheduleAppointment>
> = props => {
  const availableTimeSlotsRangeQuery = useGetDoctorTimeSlotsRangeQuery({
    path: {
      doctorId: props.route.params.doctorId,
    },
  });

  const [anchorDate, setAnchorDate] = useState('');

  const availableTimeSlotsQuery = useGetDoctorTimeSlotsQuery(
    {
      path: {
        doctorId: props.route.params.doctorId,
      },
      params: {
        startDate: (anchorDate
          ? dayjs(anchorDate)
              .date(1)
              .subtract(MAX_OVERLAP_DAYS_IN_UI, 'day')
              .toISOString()
          : undefined)!,
        endDate: (anchorDate
          ? dayjs(anchorDate)
              .date(MAX_DAYS_IN_MONTH + MAX_OVERLAP_DAYS_IN_UI)
              .toISOString()
          : undefined)!,
      },
    },
    {
      skip: !anchorDate,
    },
  );
  const [timeSlotActive, setTimeSlotActive] = useState<
    BETimeSlotDto | undefined
  >();
  const [selectedDate, setSelectedDate] = useState<
    Pick<DateData, 'dateString'> | undefined
  >();
  const [outlinedDate, setOutlinedDate] = useState<
    Pick<DateData, 'dateString'> | undefined
  >();

  useEffect(() => {
    if (availableTimeSlotsQuery.data?.[0].date) {
      setSelectedDate({ dateString: availableTimeSlotsQuery.data[0].date });
      setTimeSlotActive(availableTimeSlotsQuery.data[0].slots[0]);
    }
  }, [availableTimeSlotsQuery.data && !selectedDate]);

  useEffect(() => {
    setOutlinedDate(selectedDate);
  }, [timeSlotActive]);

  useEffect(() => {
    if (availableTimeSlotsRangeQuery.data) {
      setAnchorDate(
        toDateString(availableTimeSlotsRangeQuery.data.minDate, true),
      );
    }
  }, [availableTimeSlotsRangeQuery]);

  useEffect(() => {
    if (timeSlotActive && availableTimeSlotsQuery.data) {
      const availableTimeSlots = availableTimeSlotsQuery.data
        .map(el => el.slots)
        .flat();

      if (!availableTimeSlots.find(el => el.id === timeSlotActive.id)) {
        setTimeSlotActive(undefined);
      }
    }
  }, [availableTimeSlotsQuery.data]);

  const content =
    !selectedDate || !anchorDate ? (
      <Loader />
    ) : (
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        style={styles.main}
      >
        <TextXL
          color={colors.main.midnightBlue}
          style={styles.calendarTitle}
          weight="600"
        >
          Выберите дату
        </TextXL>
        <Calendar
          activeDates={availableTimeSlotsQuery.data?.map(el => el.date) || []}
          initialAnchorDate={{
            dateString: anchorDate,
          }}
          loading={
            availableTimeSlotsQuery.isLoading ||
            availableTimeSlotsQuery.isFetching
          }
          maxDate={availableTimeSlotsRangeQuery.data!.maxDate}
          minDate={availableTimeSlotsRangeQuery.data!.minDate}
          outlinedDate={outlinedDate}
          selectedDate={selectedDate}
          style={styles.calendar}
          onViewableMonthChange={setAnchorDate}
          setSelectedDate={setSelectedDate}
        />

        <TextXL
          color={colors.main.midnightBlue}
          style={styles.timeSlotsTitle}
          weight="600"
        >
          Выберите время
        </TextXL>
        <Animated.FlatList
          columnWrapperStyle={styles.timeSlotColumn}
          contentContainerStyle={styles.timeSlotColumnContainer}
          data={
            availableTimeSlotsQuery.data?.find(
              el => el.date === selectedDate?.dateString,
            )?.slots || []
          }
          layout={LinearTransition.easing(Easing.ease)}
          numColumns={3}
          renderItem={({ item }) => (
            <Button
              style={[
                styles.timeSlot,
                item.id !== timeSlotActive?.id ? styles.timeSlotInactive : {},
              ]}
              type={item.id === timeSlotActive?.id ? 'primary' : 'secondary'}
              onPress={() => setTimeSlotActive(item)}
            >
              <TextSmall
                color={
                  item.id === timeSlotActive?.id
                    ? colors.white
                    : colors.grayscale['500']
                }
                weight="600"
              >
                {item.startTime}
              </TextSmall>
            </Button>
          )}
          scrollEnabled={false}
        />
        <ListExtender />
      </ScrollView>
    );

  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={[styles.headerContainer, headerShadow]}
        title="Запланировать прием"
        titleTextAlign="center"
      />
      {content}
      <View style={[styles.footer, tabbarShadow]}>
        <Button
          disabled={
            !timeSlotActive ||
            outlinedDate?.dateString !== selectedDate?.dateString
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
    borderBottomColor: colors.grayscale['200'],
    borderBottomWidth: 1,
  },
  main: {
    flex: 1,
  },
  mainContainer: {
    flexGrow: 1,
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  calendar: {
    marginBottom: 32,
  },
  calendarTitle: {
    marginBottom: 8,
  },
  timeSlotsTitle: {
    marginBottom: 16,
  },
  timeSlot: {
    flex: 1,
    borderRadius: 8,
  },
  timeSlotInactive: {
    backgroundColor: colors.grayscale['50'],
  },
  timeSlotColumn: {
    gap: 13.5,
  },
  timeSlotColumnContainer: {
    gap: 13.5,
  },
  footer: {
    padding: 24,
    paddingBottom: SAFE_ZONE_BOTTOM,
    borderTopColor: colors.grayscale['200'],
    borderTopWidth: 1,
    backgroundColor: colors.main.white,
  },
});
