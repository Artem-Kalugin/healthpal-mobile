import React, { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Tag } from '#ui-kit/Tag';

import { MapDoctorCategoryToLabel } from '#config/locale';

import { reactSync } from '#utils';

import { BEDoctorCategoryResponseDto } from '#generated/__entities';

interface ICategoriesList {
  data: BEDoctorCategoryResponseDto[];
  activeCategory: BEDoctorCategoryResponseDto;
  isLoading: boolean;
  onSelect: (item: BEDoctorCategoryResponseDto) => void;
}

export const CategoriesList: React.FC<ICategoriesList> = ({
  data,
  activeCategory,
  isLoading,
  onSelect,
}) => {
  const listRef = useRef<FlatList<BEDoctorCategoryResponseDto>>(null);

  const scrollToCategory = async (item: BEDoctorCategoryResponseDto) => {
    await reactSync();

    listRef.current?.scrollToItem({
      item,
      viewPosition: 0.5,
      animated: true,
    });
  };

  const onPress = (item: BEDoctorCategoryResponseDto) => {
    onSelect(item);
    scrollToCategory(item);
  };

  useEffect(() => {
    scrollToCategory(activeCategory);
  }, []);

  return (
    <FlatList
      ref={listRef}
      horizontal
      contentContainerStyle={styles.content}
      data={data}
      renderItem={({ item }) => (
        <View style={styles.tagWrapper}>
          <Tag
            key={item.id}
            active={item.type === activeCategory?.type}
            isLoading={activeCategory === item && isLoading}
            value={item.type ? MapDoctorCategoryToLabel[item.type] : 'Все'}
            onPress={() => onPress(item)}
          />
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
      keyExtractor={item => item.id}
    />
  );
};

const LIST_PADDING_HORIZONTAL = 20;
const styles = StyleSheet.create({
  tagWrapper: {
    //for some reason flash list dont have gap so we need to implement padding hack with wrapper + container style, TODO: back to gap when fixed
    paddingHorizontal: 4,
  },
  list: {
    marginBottom: 26,
  },
  content: {
    paddingHorizontal: LIST_PADDING_HORIZONTAL,
  },
});
