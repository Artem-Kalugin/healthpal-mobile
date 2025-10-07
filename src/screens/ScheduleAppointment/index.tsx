import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { DateData } from 'react-native-calendars';
import Animated, { Easing, LinearTransition } from 'react-native-reanimated';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';

import { Button, Calendar, TextSmall } from '#ui-kit';
import { timestampToCalendarDate } from '#ui-kit/Calendar/utils';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { colors, SAFE_ZONE_BOTTOM, shadow, tabbarShadow } from '#config';

export const ScheduleAppointment: React.FC<
  MainScreenProps<MainRoutes.ScheduleAppointment>
> = props => {
  const [selectedDate, setSelectedDate] = useState<DateData>(
    timestampToCalendarDate(Date.now()),
  );

  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={[styles.headerContainer, shadow]}
        title="Запланировать прием"
        titleTextAlign="center"
      />

      <ScrollView
        contentContainerStyle={styles.mainContainer}
        style={styles.main}
      >
        <Calendar
          activeDays={[1, 2, 3, 4, 5]}
          maxDate="2025-12-02"
          minDate="2025-10-08"
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <Animated.FlatList
          columnWrapperStyle={styles.timeSlotColumn}
          contentContainerStyle={styles.timeSlotColumnContainer}
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          layout={LinearTransition.easing(Easing.ease)}
          numColumns={3}
          renderItem={({ item }) => (
            <Button
              style={styles.timeSlot}
              type={item === 1 ? 'primary' : 'secondary'}
            >
              <TextSmall
                color={item === 1 ? colors.white : colors.grayscale['500']}
                weight="600"
              >
                10:00 AM
              </TextSmall>
            </Button>
          )}
          scrollEnabled={false}
        />
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
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale['200'],
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
  timeSlot: {
    borderRadius: 8,
  },
  timeSlotColumn: {
    gap: 13.5,
  },
  timeSlotColumnContainer: {
    gap: 13.5,
  },

  footer: {
    padding: 24,
    paddingBottom: SAFE_ZONE_BOTTOM + 24,
    borderTopWidth: 1,
    borderTopColor: colors.grayscale['200'],
    backgroundColor: colors.main.white,
  },
});
