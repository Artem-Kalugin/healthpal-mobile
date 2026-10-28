import { render } from '@testing-library/react-native';

import { CodeInputCell } from './index';

jest.useFakeTimers();

describe('CodeInputCell', () => {
  it('отображает значение', () => {
    const { getByText } = render(
      <CodeInputCell
        isError={false}
        isFocused={false}
        symbol="5"
        testId="cellText"
        onLayout={jest.fn()}
      />,
    );
    expect(getByText('5')).toBeTruthy();
  });
});
