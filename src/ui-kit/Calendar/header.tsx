import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { CalendarHeaderProps } from 'react-native-calendars/src/calendar/header';

import { Loader } from '#ui-kit/Loader';

import { colors, hitSlopSmall } from '#config';

import { Icon } from '../Icon';
import { TextSmall, TextXS } from '../Text';
import { CalendarHeaderTestIds, CalendarMonthNames } from './config';

export const CalendarHeader = ({
  displayLoadingIndicator,
  disableArrowLeft,
  disableArrowRight,
  onPressArrowLeft,
  onPressArrowRight,
  month,
  testIdsConfig = CalendarHeaderTestIds,
}: CalendarHeaderProps & {
  onPressArrowLeft: () => void;
  onPressArrowRight: () => void;
  testIdsConfig: typeof CalendarHeaderTestIds;
}) => {
  const displayableDate = new Date(month);
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.monthAndYearWrapper}>
        <View style={styles.title}>
          <TextSmall
            color={colors.main.midnightBlue}
            weight="700"
          >
            {CalendarMonthNames[displayableDate.getMonth()]}{' '}
            {displayableDate.getFullYear()}
          </TextSmall>
          {displayLoadingIndicator && <Loader testID={testIdsConfig.loader} />}
        </View>
        <View style={styles.monthControls}>
          <TouchableOpacity
            disabled={disableArrowLeft}
            hitSlop={hitSlopSmall}
            testID={testIdsConfig.arrowLeft}
            onPress={onPressArrowLeft}
          >
            <Icon
              color={
                disableArrowLeft
                  ? colors.grayscale['400']
                  : colors.main.midnightBlue
              }
              name="arrowLeft"
              size={20}
            />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disableArrowRight}
            hitSlop={hitSlopSmall}
            testID={testIdsConfig.arrowRight}
            onPress={onPressArrowRight}
          >
            <Icon
              color={
                disableArrowRight
                  ? colors.grayscale['400']
                  : colors.main.midnightBlue
              }
              name="arrowRight"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.weekDays}>
        {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(weekDay => (
          <View
            key={weekDay}
            style={styles.weekDayContainer}
          >
            <TextXS
              color={colors.grayscale['600']}
              weight="600"
            >
              {weekDay}
            </TextXS>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    flex: 1,
  },
  title: {
    flexDirection: 'row',
    gap: 16,
  },
  monthAndYearWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 2,
  },
  monthControls: {
    flexDirection: 'row',
    gap: 8,
  },
  weekDays: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekDayContainer: {
    flex: 1,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
