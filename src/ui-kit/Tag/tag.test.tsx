import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';

import { TagTestIds } from './config';
import { Tag } from './index';

describe('Tag', () => {
  it('отображает переданный текст', () => {
    const text = 'Test Text123';
    const { queryByText } = render(<Tag value={text} />);

    expect(queryByText(text)).toBeOnTheScreen();
  });

  it('отображает Loader когда isLoading', () => {
    const { getByTestId } = render(<Tag isLoading />);

    expect(getByTestId(TagTestIds.loader)).toBeOnTheScreen();
  });

  it('не отображает Loader by default', () => {
    const { queryByTestId } = render(<Tag />);

    expect(queryByTestId(TagTestIds.loader)).toBeNull();
  });

  it('вызывает onPress по нажатию', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(<Tag onPress={onPressMock} />);

    fireEvent.press(getByTestId(TagTestIds.root));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('становится disabled, если onPress не передан', () => {
    const { getByTestId } = render(<Tag />);
    const touchable = getByTestId(TagTestIds.root);

    expect(touchable.props.accessibilityState.disabled).toBe(true);
  });
});
