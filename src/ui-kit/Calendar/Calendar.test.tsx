import React from 'react';

import { Calendar as _Calendar } from 'react-native-calendars';

import { act, render } from '@testing-library/react-native';

import { Calendar } from './index';
import * as utils from './utils';

jest.mock('react-native-calendars', () => ({ Calendar: jest.fn(() => null) }));
describe('Calendar (integration)', () => {
  const defaultProps = {
    initialAnchorDate: { dateString: '2025-01-01' },
    selectedDate: { dateString: '2025-01-15' },
    activeDates: ['2025-01-10'],
    minDate: '2025-01-01',
    maxDate: '2025-12-31',
    setSelectedDate: jest.fn(),
    onViewableMonthChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('корректно передает все пропсы в react-native-calendars', () => {
    render(<Calendar {...defaultProps} />);

    //@ts-expect-error
    const calendarProps = _Calendar.mock.calls[0][0];

    expect(calendarProps.initialDate).toBe(
      defaultProps.initialAnchorDate.dateString,
    );
    expect(calendarProps.minDate).toBe(defaultProps.minDate);
    expect(calendarProps.maxDate).toBe(defaultProps.maxDate);
  });

  it('меняет anchorDate при onPressArrowLeft/onPressArrowRight', () => {
    const spyChange = jest.spyOn(utils, 'changeAnchorDate');

    render(<Calendar {...defaultProps} />);

    //@ts-expect-error
    const args = _Calendar.mock.calls[0][0];

    act(() => args.onPressArrowLeft());
    act(() => args.onPressArrowRight());

    expect(spyChange).toHaveBeenCalledTimes(2);

    expect(spyChange).toHaveBeenNthCalledWith(1, expect.any(Object), -1);
    expect(spyChange).toHaveBeenNthCalledWith(2, expect.any(Object), +1);
  });

  it('вызывает onViewableMonthChange при изменении anchorDate', () => {
    render(<Calendar {...defaultProps} />);

    expect(defaultProps.onViewableMonthChange).toHaveBeenCalledTimes(1);

    //@ts-expect-error
    const args = _Calendar.mock.calls[0][0];

    act(() => args.onPressArrowLeft());

    expect(defaultProps.onViewableMonthChange).toHaveBeenCalledTimes(2);
  });

  it('корректно передает даты в getDayState через renderDay', () => {
    const fakeDay = { date: { dateString: '2025-01-10' }, onPress: jest.fn() };

    const spyGetDayState = jest.spyOn(utils, 'getDayState');

    render(<Calendar {...defaultProps} />);

    //@ts-expect-error
    const args = _Calendar.mock.calls[0][0];

    act(() => args.dayComponent(fakeDay));

    expect(spyGetDayState).toHaveBeenCalledWith(
      fakeDay.date.dateString,
      defaultProps.activeDates,
      defaultProps.selectedDate.dateString,
      undefined,
    );
  });

  it('отключает левую стрелку, если anchorDate <= minDate', () => {
    render(
      <Calendar
        {...defaultProps}
        initialAnchorDate={{ dateString: '2025-01-01' }}
        minDate="2025-01-01"
      />,
    );
    //@ts-expect-error
    expect(_Calendar.mock.calls[0][0].disableArrowLeft).toBe(true);
  });

  it('отключает правую стрелку, если anchorDate >= maxDate', () => {
    render(
      <Calendar
        {...defaultProps}
        initialAnchorDate={{ dateString: '2025-12-15' }}
        maxDate="2025-12-31"
      />,
    );
    //@ts-expect-error
    expect(_Calendar.mock.calls[0][0].disableArrowRight).toBe(true);
  });

  it('On Press срабатывает при нажатии на день', () => {
    render(
      <Calendar
        {...defaultProps}
        initialAnchorDate={{ dateString: '2025-12-15' }}
        maxDate="2025-12-31"
      />,
    );
    //@ts-expect-error
    const args = _Calendar.mock.calls[0][0];

    const fakeDay = { date: { dateString: '2025-01-11' } };

    act(() => args.onDayPress(fakeDay.date));

    expect(defaultProps.setSelectedDate).toHaveBeenCalledWith(fakeDay.date);
  });
});
