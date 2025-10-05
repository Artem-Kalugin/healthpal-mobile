import React, { useRef, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';

import { Icon, TextInput } from '#ui-kit';
import { Tag } from '#ui-kit/Tag';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { colors } from '#config';

export const Search: React.FC<MainScreenProps<MainRoutes.Search>> = props => {
  const categoriesScrollRef = useRef<FlatList>(null);

  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <>
          <HeaderWithThreeSections
            containerStyle={styles.searchBarContainer}
            title="Все специалисты"
            titleTextAlign="center"
          />

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
          />
        </>
      }
      renderItem={() => <View />}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
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
});
