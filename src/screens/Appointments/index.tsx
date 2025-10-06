import React, { useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { DoctorCard } from '#components/entities/Doctor/Card';
import { HeaderTabs } from '#components/HeaderTabs';
import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import ListExtender from '#components/ListExtender';

import { TabRoutes, TabScreenProps } from '#navigation/Main/Tab/types';

import { colors, shadow } from '#config';

export const Appointments: React.FC<
  TabScreenProps<TabRoutes.Appointments>
> = props => {
  const [foldableContainerHeight, setFoldableContainerHeight] = useState(0);
  const foldProgress = useSharedValue(1);
  const previousScrollPositionRef = useRef(0);

  const listPaddingToPreventOverlaying = foldableContainerHeight;

  const handler = useAnimatedScrollHandler({
    onScroll: event => {
      const nextProgressValueByOffset = +(
        event.contentOffset.y < foldableContainerHeight
      );

      const nextProgressValueByVelocity =
        event.contentOffset.y - previousScrollPositionRef.current < 0 ? 1 : 0;

      foldProgress.value = withTiming(
        nextProgressValueByVelocity || nextProgressValueByOffset,
      );

      previousScrollPositionRef.current = event.contentOffset.y;
    },
  });

  const rFoldable = useAnimatedStyle(() => ({
    transform: [
      { translateY: (foldProgress.value - 1) * foldableContainerHeight },
    ],
  }));

  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={styles.headerContainer}
        leftElement={null}
        title="Мои записи"
        titleTextAlign="center"
      />

      <HeaderTabs
        data={['Будущие', 'Прошедшие', 'Отменены']}
        style={[styles.tabsContainer, shadow]}
      />

      <Animated.FlatList
        data={[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]}
        keyboardShouldPersistTaps="never"
        ListFooterComponent={<ListExtender height={36} />}
        renderItem={() => (
          <View style={styles.cardWrapper}>
            <DoctorCard />
          </View>
        )}
        style={styles.container}
        onScroll={handler}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    zIndex: 2,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
  tabsContainer: {
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale['200'],
  },
  cardWrapper: {
    paddingTop: 10,
    paddingHorizontal: 24,
  },
});
