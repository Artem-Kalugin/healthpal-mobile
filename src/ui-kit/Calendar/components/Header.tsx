import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { CalendarHeaderProps } from 'react-native-calendars/src/calendar/header';

import { Icon } from '#ui-kit/Icon';
import { Loader } from '#ui-kit/Loader';
import { TextSmall, TextXS } from '#ui-kit/Text';

import { hitSlopSmall } from '#config';
import { colors } from '#config/colors';

import { useFormatters, useTranslation } from '#i18n';

export const CalendarHeaderTestIds = {
  arrowLeft: 'CalendarHeader_arrowLeft',
  arrowRight: 'CalendarHeader_arrowRight',
  loader: 'CalendarHeader_loader',
};

const WeekDays = ['1', '2', '3', '4', '5', '6', '7'] as const;

// ru returns a lowercase standalone month name
const capitalize = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

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
  const { t } = useTranslation();
  const { formatDate } = useFormatters();
  const displayableDate = new Date(month);
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.monthAndYearWrapper}>
        <View style={styles.title}>
          <TextSmall
            color={colors.main.midnightBlue}
            weight="700"
          >
            {capitalize(formatDate(displayableDate, { month: 'long' }))}{' '}
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
        {WeekDays.map(weekDay => (
          <View
            key={weekDay}
            style={styles.weekDayContainer}
          >
            <TextXS
              color={colors.grayscale['600']}
              weight="600"
            >
              {t(`calendar.weekDays.${weekDay}`)}
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
