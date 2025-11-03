import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { CalendarHeaderTestIds, CalendarMonthNames } from './config';
import { CalendarHeader } from './Header';

describe('CalendarHeader', () => {
  const month = new Date('2025-11-01');

  const defaultProps = {
    month,
    onPressArrowLeft: jest.fn(),
    onPressArrowRight: jest.fn(),
    displayLoadingIndicator: false,
    disableArrowLeft: false,
    disableArrowRight: false,
    testIdsConfig: CalendarHeaderTestIds,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Render', () => {
    it('отображает месяц и год', () => {
      const { getByText } = render(<CalendarHeader {...defaultProps} />);

      const monthName = CalendarMonthNames[month.getMonth()];
      const year = month.getFullYear();

      expect(getByText(`${monthName} ${year}`)).toBeOnTheScreen();
    });

    it('отображает все дни недели', () => {
      const { getByText } = render(<CalendarHeader {...defaultProps} />);
      const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

      weekDays.forEach(day => {
        expect(getByText(day)).toBeOnTheScreen();
      });
    });
  });

  describe('Loader', () => {
    it('отображает Loader, когда displayLoadingIndicator=true', () => {
      const { getByTestId } = render(
        <CalendarHeader
          {...defaultProps}
          displayLoadingIndicator
        />,
      );

      expect(getByTestId(CalendarHeaderTestIds.loader)).toBeOnTheScreen();
    });

    it('не отображает Loader по умолчанию', () => {
      const { queryByTestId } = render(<CalendarHeader {...defaultProps} />);

      expect(queryByTestId(CalendarHeaderTestIds.loader)).toBeNull();
    });
  });

  describe('Arrow buttons', () => {
    it('вызывает onPressArrow%Side% при нажатии', () => {
      const { getByTestId } = render(<CalendarHeader {...defaultProps} />);

      fireEvent.press(getByTestId(CalendarHeaderTestIds.arrowLeft));
      expect(defaultProps.onPressArrowLeft).toHaveBeenCalledTimes(1);

      fireEvent.press(getByTestId(CalendarHeaderTestIds.arrowRight));
      expect(defaultProps.onPressArrowRight).toHaveBeenCalledTimes(1);
    });

    it('блокирует нажатие на левую стрелку, когда disableArrowLeft=true', () => {
      const { getByTestId } = render(
        <CalendarHeader
          {...defaultProps}
          disableArrowLeft
        />,
      );

      fireEvent.press(getByTestId(CalendarHeaderTestIds.arrowLeft));
      expect(defaultProps.onPressArrowLeft).not.toHaveBeenCalled();
    });

    it('блокирует нажатие на правую стрелку, когда disableArrowRight=true', () => {
      const { getByTestId } = render(
        <CalendarHeader
          {...defaultProps}
          disableArrowRight
        />,
      );

      fireEvent.press(getByTestId(CalendarHeaderTestIds.arrowRight));
      expect(defaultProps.onPressArrowRight).not.toHaveBeenCalled();
    });
  });
});
