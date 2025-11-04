import { render } from '@testing-library/react-native';

import { useSelector } from '#store';

import { Image } from '.';

jest.mock('#store', () => ({
  useSelector: jest.fn(),
}));

jest.mock('expo-image', () => ({
  Image: jest.fn(({ source, ...props }) => (
    //@ts-expect-error
    <mock-image
      {...props}
      source={source}
    />
  )),
}));

describe('Image component', () => {
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
        <Image
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
