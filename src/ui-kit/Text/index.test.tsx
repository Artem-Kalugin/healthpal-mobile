import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { Text } from './index';

describe('Text', () => {
  describe('Render', () => {
    it('рендерит переданный текст', () => {
      const { getByText } = render(<Text>Привет</Text>);
      expect(getByText('Привет')).toBeTruthy();
    });

    it('рендерит nested text в children', () => {
      const { getByText } = render(
        <Text>
          Outer <Text>Inner</Text>
        </Text>,
      );

      expect(getByText('Inner')).toBeTruthy();
      expect(getByText(/Outer/)).toBeTruthy();
    });
  });

  describe('Callbacks', () => {
    it('вызывает onPress при клике', () => {
      const onPressMock = jest.fn();
      const { getByText } = render(<Text onPress={onPressMock}>Click me</Text>);

      fireEvent.press(getByText('Click me'));
      expect(onPressMock).toHaveBeenCalledTimes(1);
    });
  });
});
