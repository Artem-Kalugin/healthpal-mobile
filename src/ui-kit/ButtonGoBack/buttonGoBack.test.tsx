import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';

import { Icon } from '#ui-kit/Icon';

import { ButtonGoBackTestIds } from './config';
import ButtonGoBack from './index';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('ButtonGoBack', () => {
  const goBackMock = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({ goBack: goBackMock });
    jest.clearAllMocks();
  });

  describe('Render', () => {
    it('рендерится с иконкой', () => {
      const { getByTestId } = render(<ButtonGoBack />);
      const root = getByTestId(ButtonGoBackTestIds.root);
      expect(root).toBeTruthy();

      const icon = root.findByType(Icon);
      expect(icon).toBeTruthy();
    });
  });

  describe('Callbacks', () => {
    it('вызывает onPress, если передан', () => {
      const onPressMock = jest.fn();
      const { getByTestId } = render(<ButtonGoBack onPress={onPressMock} />);

      fireEvent.press(getByTestId(ButtonGoBackTestIds.root));
      expect(onPressMock).toHaveBeenCalledTimes(1);
      expect(goBackMock).not.toHaveBeenCalled();
    });

    it('вызывает navigation.goBack, если onPress не передан', () => {
      const { getByTestId } = render(<ButtonGoBack />);

      fireEvent.press(getByTestId(ButtonGoBackTestIds.root));
      expect(goBackMock).toHaveBeenCalledTimes(1);
    });
  });
});
