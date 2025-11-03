import React from 'react';
import { View } from 'react-native';

import { fireEvent, render } from '@testing-library/react-native';

import { CheckboxTestIds } from './config';
import { Checkbox } from './index';

describe('Checkbox', () => {
  it('отображает чекбокс как активный при active=true', () => {
    const { getByTestId } = render(<Checkbox active />);

    expect(getByTestId(CheckboxTestIds.checkMark)).toBeOnTheScreen();
  });

  it('отображает children', () => {
    const childTestId = 'test-id-123';
    const { getByTestId } = render(
      <Checkbox active={false}>
        <View testID={childTestId}></View>
      </Checkbox>,
    );

    expect(getByTestId(childTestId)).toBeOnTheScreen();
  });

  it('не отображает чекбокс как активный при active=false', () => {
    const { queryByTestId } = render(<Checkbox active={false} />);

    expect(queryByTestId(CheckboxTestIds.checkMark)).toBeNull();
  });

  it('вызывает onPress по нажатию', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Checkbox
        active={false}
        onPress={onPressMock}
      />,
    );

    fireEvent.press(getByTestId(CheckboxTestIds.root));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('становится disabled, если onPress не передан', () => {
    const { getByTestId } = render(<Checkbox active={false} />);
    const touchable = getByTestId(CheckboxTestIds.root);

    expect(touchable.props.accessibilityState.disabled).toBe(true);
  });
});
