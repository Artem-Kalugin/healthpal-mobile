/* eslint-disable max-lines */
import React, { useCallback, useEffect, useRef, useState } from 'react';
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

import { CompositeScreenProps } from '@react-navigation/native';
import { FlashListRef } from '@shopify/flash-list';

import { DoctorCard } from '#components/domain/Doctor/Card';
import { EmptyListWarning } from '#components/infrastructure/EmptyListWarning';
import HeaderWithThreeSections from '#components/infrastructure/HeaderWithThreeSections';
import { PaginatableListFooter } from '#components/infrastructure/PaginatableListFooter';
import TapKeyboardDissmissArea from '#components/infrastructure/TapKeyboardDismissArea';

import { Icon, Loader, TextBase, TextInput, TextSmall } from '#ui-kit';
import { Tag } from '#ui-kit/Tag';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';
import { ModalsRoutes, SelectModalParams } from '#navigation/Modals/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { useSearchDoctorsInfiniteQuery } from '#api/Doctor';

import { colors, headerShadow } from '#config';
import { MapDoctorCategoryToLabel } from '#config/locale';

import useDebouncedState from '#hooks/useDebouncedState';
import useBEErrorHandler from '#hooks/useErrorHandler';

import {
  BEDoctorCategoryResponseDto,
  BEDoctorResponseDto,
} from '#generated/__entities';

import { reactSync } from '../../core/utils';
import { FOLDABLE_HEADER_HEIGHT, SortOptions, SortOptionsDTO } from './config';

const AnimatedFlashList = Animated.createAnimatedComponent(
  FlatList<BEDoctorResponseDto>,
);
const fakeAllCategory = {
  id: undefined,
  type: undefined,
  icon: undefined,
} as unknown as BEDoctorCategoryResponseDto;
export const Search: React.FC<
  CompositeScreenProps<
    MainScreenProps<MainRoutes.Search>,
    RootScreenProps<AppRoutes>
  >
> = props => {
  const isRendered = useRef(false);
  const isQueryChangingSource = useRef(false);
  const [sort, setSort] = useState(SortOptions.rating);
  const [searchFor, setSearchFor, debouncedSearchFor] = useDebouncedState('');

  const [activeCategory, setActiveCategory] = useState(
    props.route.params.categoryId
      ? props.route.params.availableCategories.find(
          el => el.id === props.route.params.categoryId,
        )!
      : fakeAllCategory,
  );
  const searchQuery = useSearchDoctorsInfiniteQuery({
    params: {
      searchFor: debouncedSearchFor.length > 2 ? debouncedSearchFor : undefined,
      medicalCenterId: props.route?.params?.medicalCenterId,
      categoryId: activeCategory?.id,
      ...SortOptionsDTO[sort],
    },
  });
  const categoriesScrollRef =
    useRef<FlatList<BEDoctorCategoryResponseDto>>(null);
  const doctorsListRef = useRef<FlashListRef<BEDoctorResponseDto[]>>(null);
  const foldProgress = useSharedValue(1);
  const previousScrollPositionRef = useRef(0);
  const isCategoriesInitalyScrolled = useRef(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const resetListPosition = async () => {
    await reactSync();
    doctorsListRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  };

  const scrollNavbarToCategory = async (
    item: BEDoctorCategoryResponseDto,
    initial = false,
  ) => {
    await reactSync();

    if (initial) {
      if (isCategoriesInitalyScrolled.current) {
        return;
      } else {
        isCategoriesInitalyScrolled.current = true;
      }
    }

    categoriesScrollRef.current?.scrollToItem({
      item,
      viewPosition: 0.5,
      animated: !initial,
    });
  };

  const handler = useAnimatedScrollHandler({
    onScroll: event => {
      const nextProgressValueByOffset = +(
        event.contentOffset.y < FOLDABLE_HEADER_HEIGHT
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
      { translateY: (foldProgress.value - 1) * FOLDABLE_HEADER_HEIGHT },
    ],
  }));

  useBEErrorHandler(searchQuery);

  const listData =
    (searchQuery.data?.pages
      .map(el => el.data)
      .flat() as unknown as BEDoctorResponseDto[]) || [];

  const renderDoctorCard = useCallback(
    ({ item }: { item: BEDoctorResponseDto }) => (
      <View style={styles.cardWrapper}>
        <DoctorCard
          item={item}
          onPress={() =>
            props.navigation.navigate(MainRoutes.DoctorDetails, {
              defaultItem: item,
              id: item.id,
            })
          }
        />
      </View>
    ),
    [],
  );

  useEffect(() => {
    if (!isRendered.current) {
      return;
    }

    isQueryChangingSource.current = true;
  }, [activeCategory, debouncedSearchFor, sort]);

  useEffect(() => {
    if (!isRendered.current) {
      return;
    }

    if (searchQuery.fulfilledTimeStamp) {
      setIsRefreshing(false);
    }

    if (isQueryChangingSource.current) {
      resetListPosition();
      isQueryChangingSource.current = false;
    }
  }, [searchQuery.fulfilledTimeStamp]);

  useEffect(() => {
    isRendered.current = true;
    scrollNavbarToCategory(activeCategory);
  }, []);

  return (
    <View style={styles.flex}>
      <TapKeyboardDissmissArea />
      <HeaderWithThreeSections
        containerStyle={styles.headerContainer}
        subtitle={props.route.params.title}
        title="Все специалисты"
        titleTextAlign="center"
      />
      <View>
        <Animated.View
          style={[styles.foldableContainer, rFoldable, headerShadow]}
        >
          <View style={styles.searchBarContainer}>
            <TextInput
              autoFocus={props.route.params?.autoFocus}
              IconLeft={<Icon name="search" />}
              inputWrapperStyle={styles.searchBar}
              placeholder="Поиск врача…"
              size="small"
              value={searchFor}
              onChange={setSearchFor}
              onErase={() => {
                Keyboard.dismiss();
                setSearchFor('');
              }}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <FlatList
            ref={categoriesScrollRef}
            horizontal
            contentContainerStyle={styles.tagsListContent}
            data={[fakeAllCategory, ...props.route.params.availableCategories]}
            renderItem={({ item }) => (
              <View style={styles.tagWrapper}>
                <Tag
                  key={item.id}
                  active={item.type === activeCategory?.type}
                  isLoading={
                    activeCategory === item &&
                    (searchQuery.isLoading || searchQuery.isFetching)
                  }
                  value={
                    item.type ? MapDoctorCategoryToLabel[item.type] : 'Все'
                  }
                  onPress={() => {
                    !searchQuery.isFetching && setActiveCategory(item);
                    scrollNavbarToCategory(item);
                  }}
                />
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            style={styles.tagsList}
            keyExtractor={item => item.id}
          />

          <View style={styles.sectionHeader}>
            {!!searchQuery.data?.pages.at(-1)?.count && (
              <TextBase weight="700">
                {searchQuery.data?.pages.at(-1)?.count} найдено
              </TextBase>
            )}
            <TouchableOpacity
              style={styles.sortButton}
              onPress={() =>
                props.navigation.navigate(AppRoutes.StackModals, {
                  screen: ModalsRoutes.Select,
                  params: {
                    title: 'Выберите порядок сортировки',
                    data: Object.values(SortOptions),
                    keyExtractor: item => item,
                    checkedExtractor: (item, currentItem) =>
                      item === currentItem,
                    renderItem: item => (
                      <TextBase weight="400">{item}</TextBase>
                    ),
                    defaultValue: sort,
                    onSelectionEnd: item => {
                      Keyboard.dismiss();
                      item && setSort(item);
                    },
                  } as SelectModalParams<SortOptions>,
                })
              }
            >
              <Icon
                name="sort"
                size={16}
              />
              <TextSmall
                color={colors.grayscale['500']}
                textAlign="right"
                weight="500"
              >
                {sort}
              </TextSmall>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
      <AnimatedFlashList
        //@ts-expect-error
        ref={doctorsListRef}
        automaticallyAdjustContentInsets={true}
        contentContainerStyle={styles.cardsListContent}
        contentInsetAdjustmentBehavior="always"
        data={listData}
        initialNumToRender={5}
        keyboardShouldPersistTaps="never"
        ListEmptyComponent={
          searchQuery.isLoading ? (
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
            enabled={!!listData.length && !isRefreshing}
            message="Кажется, мы отобразили всех врачей"
            showLoader={
              searchQuery.isFetching && !isQueryChangingSource.current
            }
            showMessage={!searchQuery.hasNextPage}
          />
        }
        ListHeaderComponent={
          <View
            style={{
              paddingTop: FOLDABLE_HEADER_HEIGHT + 8,
            }}
          />
        }
        progressViewOffset={FOLDABLE_HEADER_HEIGHT + 8}
        refreshing={isRefreshing}
        renderItem={renderDoctorCard}
        style={styles.cardsList}
        keyExtractor={item => item.id}
        onEndReached={() =>
          !searchQuery.isFetching &&
          searchQuery.hasNextPage &&
          searchQuery.fetchNextPage()
        }
        onEndReachedThreshold={1}
        onRefresh={() => {
          setIsRefreshing(true);
          searchQuery.refetch();
        }}
        onScroll={handler}
        onScrollBeginDrag={() => Keyboard.dismiss()}
      />
    </View>
  );
};

const TAGS_LIST_PADDING_HORIZONTAL = 20;
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: colors.white,
  },
  foldableContainer: {
    height: FOLDABLE_HEADER_HEIGHT,
    position: 'absolute',
    zIndex: 1,
    backgroundColor: colors.white,
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
  tagWrapper: {
    //for some reason flash list dont have gap so we need to implement padding hack with wrapper + container style, TODO: back to gap when fixed
    paddingHorizontal: 4,
  },
  tagsList: {
    marginBottom: 26,
  },
  tagsListContent: {
    paddingHorizontal: TAGS_LIST_PADDING_HORIZONTAL,
  },
  sectionHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  cardsList: {
    flex: 1,
  },
  cardsListContent: {
    flexGrow: 1,
  },
  cardWrapper: {
    paddingTop: 8,
    paddingHorizontal: 24,
  },

  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 4,
  },
});
