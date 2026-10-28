import React, { useCallback } from 'react';
import { FlatList, Keyboard, StyleSheet, View } from 'react-native';

import Animated from 'react-native-reanimated';

import { DoctorCard } from '#components/domain/doctor/Card';
import {
  EmptyListWarning,
  PaginatableListFooter,
} from '#components/infrastructure';

import { Loader } from '#ui-kit';

import { BEDoctorResponseDto } from '#generated/__entities';

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<BEDoctorResponseDto>,
);

interface IDoctorsList {
  ref: React.Ref<FlatList<BEDoctorResponseDto>>;
  data: BEDoctorResponseDto[];
  headerHeight: number;
  isLoading: boolean;
  isFetching: boolean;
  hasNextPage: boolean;
  isRefreshing: boolean;
  isChangingSource: boolean;
  onDoctorPress: (item: BEDoctorResponseDto) => void;
  onEndReached: () => void;
  onRefresh: () => void;
  onScroll: React.ComponentProps<typeof AnimatedFlatList>['onScroll'];
}

export const DoctorsList: React.FC<IDoctorsList> = ({
  ref,
  data,
  headerHeight,
  isLoading,
  isFetching,
  hasNextPage,
  isRefreshing,
  isChangingSource,
  onDoctorPress,
  onEndReached,
  onRefresh,
  onScroll,
}) => {
  const renderDoctorCard = useCallback(
    ({ item }: { item: BEDoctorResponseDto }) => (
      <View style={styles.cardWrapper}>
        <DoctorCard
          item={item}
          onPress={() => onDoctorPress(item)}
        />
      </View>
    ),
    [],
  );

  return (
    <AnimatedFlatList
      ref={ref}
      automaticallyAdjustContentInsets={true}
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="always"
      data={data}
      initialNumToRender={5}
      keyboardShouldPersistTaps="never"
      ListEmptyComponent={
        isLoading ? (
          <Loader size="large" />
        ) : (
          <EmptyListWarning
            subtitle="Попробуйте изменить параметры поиска"
            title="Ничего не нашли"
          />
        )
      }
      ListFooterComponent={
        <PaginatableListFooter
          enabled={!!data.length && !isRefreshing}
          message="Кажется, мы отобразили всех врачей"
          showLoader={isFetching && !isChangingSource}
          showMessage={!hasNextPage}
        />
      }
      ListHeaderComponent={
        <View
          style={{
            paddingTop: headerHeight + 8,
          }}
        />
      }
      progressViewOffset={headerHeight + 8}
      refreshing={isRefreshing}
      renderItem={renderDoctorCard}
      style={styles.list}
      keyExtractor={item => item.id}
      onEndReached={onEndReached}
      onEndReachedThreshold={1}
      onRefresh={onRefresh}
      onScroll={onScroll}
      onScrollBeginDrag={() => Keyboard.dismiss()}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
  },
  cardWrapper: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },
});
