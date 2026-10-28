import { fireEvent, render } from '@testing-library/react-native';

import { CodeInputTestIds } from './config';
import { CodeInput } from './index';

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
