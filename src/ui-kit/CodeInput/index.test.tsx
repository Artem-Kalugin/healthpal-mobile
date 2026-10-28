import { fireEvent, render } from '@testing-library/react-native';

import { CodeInputTestIds } from './config';
import { CodeInput, CodeInputCell } from './index';

jest.useFakeTimers();

describe('CodeInput', () => {
  it('setValue вызывается и возвращает только цифры', () => {
    const setValue = jest.fn();
    const { getByTestId } = render(
      <CodeInput
        value=""
        setValue={setValue}
      />,
    );

    fireEvent.changeText(getByTestId(CodeInputTestIds.root), 'a1b2c3');
    expect(setValue).toHaveBeenCalledWith('123');
  });

  it('очищается при фокусе', () => {
    const setValue = jest.fn();
    const { getByTestId } = render(
      <CodeInput
        value="123"
        setValue={setValue}
      />,
    );

    fireEvent(getByTestId(CodeInputTestIds.root), 'focus');
    expect(setValue).toHaveBeenCalledWith('');
  });
});

describe('CodeInputCell', () => {
  it('отображает значение', () => {
    const { getByText } = render(
      <CodeInputCell
        getCellOnLayoutHandler={() => jest.fn()}
        index={0}
        isError={false}
        isFocused={false}
        symbol="5"
        testIdsConfig={CodeInputTestIds}
      />,
    );
    expect(getByText('5')).toBeTruthy();
  });
});
