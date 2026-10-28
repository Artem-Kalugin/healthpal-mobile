import React, { useEffect, useRef, useState } from 'react';
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

import {
  HeaderWithThreeSections,
  TapKeyboardDismissArea,
} from '#components/infrastructure';

import { Icon, TextBase, TextInput, TextSmall } from '#ui-kit';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';
import { ModalsRoutes, SelectModalParams } from '#navigation/Modals/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { useSearchDoctorsInfiniteQuery } from '#api/Doctor';

import { headerShadow } from '#config';
import { colors } from '#config/colors';

import { useDebouncedState } from '#hooks/useDebouncedState';
import { useErrorHandler } from '#hooks/useErrorHandler';

import { reactSync } from '#utils';

import {
  BEDoctorCategoryResponseDto,
  BEDoctorResponseDto,
} from '#generated/__entities';

import { CategoriesList } from './components/CategoriesList';
import { DoctorsList } from './components/DoctorsList';
import { FOLDABLE_HEADER_HEIGHT, SortOptions, SortOptionsDTO } from './config';

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
  const doctorsListRef = useRef<FlatList<BEDoctorResponseDto>>(null);
  const foldProgress = useSharedValue(1);
  const previousScrollPosition = useSharedValue(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const resetListPosition = async () => {
    await reactSync();
    doctorsListRef.current?.scrollToOffset({
      offset: 0,
      animated: false,
    });
  };

  const handler = useAnimatedScrollHandler({
    onScroll: event => {
      const nextProgressValueByOffset = +(
        event.contentOffset.y < FOLDABLE_HEADER_HEIGHT
      );

      const nextProgressValueByVelocity =
        event.contentOffset.y - previousScrollPosition.value < 0 ? 1 : 0;

      foldProgress.value = withTiming(
        nextProgressValueByVelocity || nextProgressValueByOffset,
      );

      previousScrollPosition.value = event.contentOffset.y;
    },
  });

  const rFoldable = useAnimatedStyle(() => ({
    transform: [
      { translateY: (foldProgress.value - 1) * FOLDABLE_HEADER_HEIGHT },
    ],
  }));

  const onSelectCategory = (item: BEDoctorCategoryResponseDto) => {
    !searchQuery.isFetching && setActiveCategory(item);
  };

  useErrorHandler(searchQuery);

  const listData =
    (searchQuery.data?.pages
      .map(el => el.data)
      .flat() as unknown as BEDoctorResponseDto[]) || [];

  const onDoctorPress = (item: BEDoctorResponseDto) =>
    props.navigation.navigate(MainRoutes.DoctorDetails, {
      defaultItem: item,
      id: item.id,
    });

  const onEndReached = () =>
    !searchQuery.isFetching &&
    searchQuery.hasNextPage &&
    searchQuery.fetchNextPage();

  const onRefresh = async () => {
    setIsRefreshing(true);
    await searchQuery.refetch();
    setIsRefreshing(false);
  };

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

    if (isQueryChangingSource.current) {
      resetListPosition();
      isQueryChangingSource.current = false;
    }
  }, [searchQuery.fulfilledTimeStamp]);

  useEffect(() => {
    isRendered.current = true;
  }, []);

  return (
    <View style={styles.flex}>
      <TapKeyboardDismissArea />
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
          <CategoriesList
            activeCategory={activeCategory}
            data={[fakeAllCategory, ...props.route.params.availableCategories]}
            isLoading={searchQuery.isLoading || searchQuery.isFetching}
            onSelect={onSelectCategory}
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
      <DoctorsList
        ref={doctorsListRef}
        data={listData}
        hasNextPage={searchQuery.hasNextPage}
        headerHeight={FOLDABLE_HEADER_HEIGHT}
        isChangingSource={isQueryChangingSource.current}
        isFetching={searchQuery.isFetching}
        isLoading={searchQuery.isLoading}
        isRefreshing={isRefreshing}
        onDoctorPress={onDoctorPress}
        onEndReached={onEndReached}
        onRefresh={onRefresh}
        onScroll={handler}
      />
    </View>
  );
};

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
  sectionHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 4,
  },
});
