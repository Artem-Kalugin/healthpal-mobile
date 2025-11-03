import React from 'react';
import { View } from 'react-native';

import { fireEvent, render } from '@testing-library/react-native';

import { ButtonTestIds } from './config';
import { Button } from './index';

describe('Button', () => {
  it('отображает переданный текст', () => {
    const text = 'Test Text123';
    const { queryByText } = render(<Button>{text}</Button>);

    expect(queryByText(text)).toBeOnTheScreen();
  });

  it('отображает children React-элемент', () => {
    const { getByTestId } = render(
      <Button>
        <View testID="child-element" />
      </Button>,
    );

    expect(getByTestId('child-element')).toBeOnTheScreen();
  });

  it('отображет Loader когда isLoading', () => {
    const { getByTestId } = render(<Button isLoading />);

    expect(getByTestId(ButtonTestIds.loader)).toBeOnTheScreen();
  });

  it('не отображает текст когда isLoading', () => {
    const text = 'Test Text';
    const { queryByText } = render(<Button isLoading>{text}</Button>);

    expect(queryByText(text)).toBeNull();
  });
  it('не отображет Loader by default', () => {
    const { queryByTestId } = render(<Button />);

    expect(queryByTestId(ButtonTestIds.loader)).toBeNull();
  });

  it('вызывает onPress по нажатию', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<Button onPress={onPressMock} />);

    fireEvent.press(getByTestId(ButtonTestIds.root));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onPress когда disabled', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button
        disabled
        onPress={onPressMock}
      />,
    );

    fireEvent.press(getByTestId(ButtonTestIds.root));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('не вызывает onPress  когда isLoading', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button
        isLoading
        onPress={onPressMock}
      />,
    );

    fireEvent.press(getByTestId(ButtonTestIds.root));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('не вызывает onPress когда одновременно disabled и isLoading', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Button
        disabled
        isLoading
        onPress={onPressMock}
      />,
    );

    fireEvent.press(getByTestId(ButtonTestIds.root));
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
