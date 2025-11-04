import React from 'react';
import { View } from 'react-native';

import { cleanup, render, waitFor } from '@testing-library/react-native';

import { Text } from '#ui-kit/Text';

import Swiper, { ISwiperRef } from './index';

describe('Swiper', () => {
  const mockData = [
    { id: '1', text: 'Slide 1' },
    { id: '2', text: 'Slide 2' },
    { id: '3', text: 'Slide 3' },
  ];

  afterEach(() => {
    cleanup();
    jest.clearAllTimers();
  });

  it('отображает все слайды', () => {
    const { getAllByTestId } = render(
      <Swiper
        data={mockData}
        renderItem={({ item }) => (
          <View testID={`slide-${item.id}`}>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />,
    );

    expect(getAllByTestId(/slide-container/)).toHaveLength(3);
  });

  it('Отображает одиночный слайд', () => {
    const { queryByTestId } = render(
      <Swiper
        data={[mockData[0]]}
        renderItem={({ item }) => <View testID="single-slide" />}
        keyExtractor={item => item.id}
      />,
    );

    expect(queryByTestId('single-slide')).toBeTruthy();
  });

  it('отображает PaginationDots', () => {
    const { getAllByTestId } = render(
      <Swiper
        data={mockData}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
      />,
    );

    expect(getAllByTestId(/pagination-dot-/)).toHaveLength(3);
  });

  it('ref.swipe вызывает onSlideChange', async () => {
    const onSlideChange = jest.fn();
    const swiperRef = React.createRef<ISwiperRef>();

    render(
      <Swiper
        data={mockData}
        renderItem={({ item }) => (
          <View>
            <Text>{item.text}</Text>
          </View>
        )}
        swiperRef={swiperRef}
        keyExtractor={item => item.id}
        onSlideChange={onSlideChange}
      />,
    );

    swiperRef.current?.swipe(1);

    await waitFor(
      () => {
        expect(onSlideChange).toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
  });
});
