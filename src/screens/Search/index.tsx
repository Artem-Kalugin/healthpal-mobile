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
import HeaderWithThreeSections from '#components/HeaderWithThreeSections';
import ListExtender from '#components/ListExtender';

import { Icon, TextBase, TextInput, TextSmall } from '#ui-kit';
import { Tag } from '#ui-kit/Tag';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { colors, headerShadow, shadow } from '#config';

export const Search: React.FC<MainScreenProps<MainRoutes.Search>> = props => {
  const categoriesScrollRef = useRef<FlatList>(null);
  const [foldableContainerHeight, setFoldableContainerHeight] = useState(0);
  const foldProgress = useSharedValue(1);
  const previousScrollPositionRef = useRef(0);

  const [activeCategory, setActiveCategory] = useState('all');

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
    <>
      <View>
        <HeaderWithThreeSections
          containerStyle={styles.headerContainer}
          title="Все специалисты"
          titleTextAlign="center"
        />

        <View>
          <Animated.View
            style={[styles.foldableContainer, rFoldable, headerShadow]}
            onLayout={el =>
              setFoldableContainerHeight(el.nativeEvent.layout.height)
            }
          >
            <View style={styles.searchBarContainer}>
              <TextInput
                autoFocus
                containerStyle={styles.searchBar}
                IconLeft={<Icon name="search" />}
                placeholder="Поиск врача…"
                size="small"
              />
            </View>
            <FlatList
              ref={categoriesScrollRef}
              horizontal
              contentContainerStyle={styles.tagsContainer}
              data={[
                'All',
                'Cardiologists',
                'Dentists',
                'Pulmonology',
                'Another category',
              ]}
              renderItem={({ item: el, index }) => (
                <Tag
                  key={el}
                  active={el === activeCategory}
                  value={el}
                  onPress={() => {
                    setActiveCategory(el);
                    categoriesScrollRef.current?.scrollToIndex({
                      index,
                      viewPosition: 0.5,
                    });
                  }}
                />
              )}
              showsHorizontalScrollIndicator={false}
              style={styles.tagsList}
            />

            <View style={styles.sectionHeader}>
              <TextBase weight="700">532 founds</TextBase>
              <TouchableOpacity
                onPress={() => props.navigation.navigate(MainRoutes.Search)}
              >
                <TextSmall
                  color={colors.grayscale['500']}
                  weight="500"
                >
                  Все
                </TextSmall>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
      <Animated.FlatList
        contentContainerStyle={{
          paddingTop: listPaddingToPreventOverlaying,
        }}
        data={[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]}
        keyboardShouldPersistTaps="never"
        ListFooterComponent={<ListExtender height={36} />}
        renderItem={() => (
          <View style={styles.cardWrapper}>
            <DoctorCard
              onPress={() =>
                props.navigation.navigate(MainRoutes.DoctorDetails)
              }
            />
          </View>
        )}
        style={styles.container}
        onScroll={handler}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  foldableContainer: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.grayscale['200'],
  },
  headerContainer: {
    zIndex: 2,
    paddingHorizontal: 24,
    backgroundColor: colors.white,
  },
  searchBarContainer: {
    paddingHorizontal: 24,
  },
  searchBar: {
    height: 40,
    marginBottom: 16,
    borderWidth: 0,
    backgroundColor: colors.grayscale['100'],
  },
  tagsContainer: {
    paddingHorizontal: 24,
    gap: 8,
  },
  tagsList: {
    marginBottom: 26,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  cardWrapper: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
});
