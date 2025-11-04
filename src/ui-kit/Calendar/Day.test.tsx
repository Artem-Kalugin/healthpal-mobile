// __tests__/Calendar/Day.test.tsx
import { fireEvent, render } from '@testing-library/react-native';

import { CalendarDay } from './Day';

describe('CalendarDay', () => {
  const mockDate = {
    dateString: '2024-03-15',
    day: 15,
    month: 3,
    year: 2024,
    timestamp: 1710460800000,
  };

  describe('Render', () => {
    it('отображает номер дня', () => {
      const { getByText } = render(
        <CalendarDay
          date={mockDate}
          state="inactive"
        />,
      );

      expect(getByText('15')).toBeOnTheScreen();
    });
  });

  describe('Callbacks', () => {
    it('вызывает onPress для активного дня', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <CalendarDay
          date={mockDate}
          state="inactive"
          onPress={onPress}
        />,
      );

      fireEvent.press(getByText('15'));

      expect(onPress).toHaveBeenCalledWith(mockDate);
    });

    it('не вызывает onPress для disabled дня', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <CalendarDay
          date={mockDate}
          state="disabled"
          onPress={onPress}
        />,
      );

      fireEvent.press(getByText('15'));

      expect(onPress).not.toHaveBeenCalled();
    });
  });
});
