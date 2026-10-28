import { render } from '@testing-library/react-native';

import { useSelector } from '#store';

import { ServerImage } from '.';

jest.mock('#store', () => ({
  useSelector: jest.fn(),
}));

jest.mock('expo-image', () => {
  const { createElement } = jest.requireActual('react');

  return {
    Image: jest.fn(({ source, ...props }) =>
      createElement('mock-image', { ...props, source }),
    ),
  };
});

describe('ServerImage component', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV, EXPO_PUBLIC_API_URL: 'test' };
  });

  afterEach(() => {
    process.env = OLD_ENV;
    jest.clearAllMocks();
  });

  describe('Render', () => {
    it('пробрасывает uri и headers для api source', () => {
      (useSelector as unknown as jest.Mock).mockReturnValue('token123');
      const source = { image: '/path', thumbhash: 'hash' };

      const { getByTestId } = render(
        <ServerImage
          source={source}
          testID="img"
        />,
      );
      const img = getByTestId('img');

      expect(img.props.source.uri).toContain(
        `${process.env.EXPO_PUBLIC_API_URL}/path`,
      );
      expect(img.props.source.headers.Authorization).toBe('Bearer token123');
    });

    it('пробрасывает обычный require', () => {
      const source = 1;
      const { getByTestId } = render(
        <ServerImage
          source={source}
          testID="img"
        />,
      );
      const img = getByTestId('img');

      expect(img.props.source).toBe(source);
    });
  });
});
