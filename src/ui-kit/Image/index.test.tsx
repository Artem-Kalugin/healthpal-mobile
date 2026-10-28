import { render } from '@testing-library/react-native';

import { Image } from '.';

jest.mock('expo-image', () => {
  const { createElement } = jest.requireActual('react');

  return {
    Image: jest.fn(({ source, ...props }) =>
      createElement('mock-image', { ...props, source }),
    ),
  };
});

describe('Image component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Render', () => {
    it('пробрасывает обычный require', () => {
      const source = 1;
      const { getByTestId } = render(
        <Image
          source={source}
          testID="img"
        />,
      );
      const img = getByTestId('img');

      expect(img.props.source).toBe(source);
    });
  });
});
