import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { CompositeScreenProps } from '@react-navigation/native';
import { toast } from 'react-hot-toast/headless';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';

import {
  Divider,
  Icon,
  IconNames,
  Image,
  TextBase,
  TextLarge,
  TextSmall,
} from '#ui-kit';

import { FavoritesRoutes } from '#navigation/Main/Favorites/types';
import { TabRoutes, TabScreenProps } from '#navigation/Main/Tab/types';
import { MainRoutes, MainScreenProps } from '#navigation/Main/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { Query } from '#api';
import { useGetCurrentUserQuery } from '#api/User';

import {
  BORDER_RADIUS_ROUNDED,
  colors,
  hitSlop,
  Images,
  SAFE_ZONE_BOTTOM,
} from '#config';

import { useDispatch } from '#store';
import { RuntimeActions } from '#store/slices/runtime';

export const Profile: React.FC<
  CompositeScreenProps<
    TabScreenProps<TabRoutes.Profile>,
    CompositeScreenProps<
      MainScreenProps<MainRoutes>,
      RootScreenProps<AppRoutes>
    >
  >
> = props => {
  const dispatch = useDispatch();

  const userQuery = useGetCurrentUserQuery(null);

  const settingsItems: {
    label: string;
    icon: IconNames;
    onPress: () => void;
  }[] = [
    {
      label: 'Редактировать профиль',
      icon: 'userEdit',
      onPress: () => props.navigation.navigate(AppRoutes.ProfileEditing),
    },
    {
      label: 'Избранное',
      icon: 'heart',
      onPress: () =>
        props.navigation.navigate(MainRoutes.Favorites, {
          screen: FavoritesRoutes.FavoriteDosctors,
        }),
    },
    {
      label: 'Уведомления',
      icon: 'notificationOutlined',
      onPress: () => props.navigation.navigate(MainRoutes.Notifications),
    },
    {
      label: 'Настройки',
      icon: 'settings',
      onPress: () =>
        toast(
          'Упс, кажется этого экрана не было в дизайне, а я не придумал что в нем могло бы быть',
        ),
    },
    {
      label: 'Помощь и поддержка',
      icon: 'messageQuestion',
      onPress: () =>
        toast(
          'Упс, кажется этого экрана не было в дизайне, но давайте сделаем вид что я открыл чат поддержки или ЧаВо',
        ),
    },
    {
      label: 'Условия использования',
      icon: 'sequritySafe',
      onPress: () =>
        toast(
          'Упс, кажется этого экрана не было в дизайне, но давайте сделаем вид что я открыл WebView с ссылкой на privacy или отобразил HTML content с помощью react-native-html-renderer',
        ),
    },
    {
      label: 'Выйти',
      icon: 'logOut',
      onPress: () => {
        dispatch(RuntimeActions.setToken(undefined));
        dispatch(Query.util.resetApiState());
      },
    },
  ];
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <HeaderWithThreeSections
        containerStyle={styles.headerContainer}
        leftElement={null}
        paddingHorizontal={0}
        title="Ваш профиль"
        titleTextAlign="center"
      />

      <View style={styles.body}>
        <View style={styles.avatarCenterer}>
          <Image
            contentFit="contain"
            source={userQuery.data?.avatar || Images.profileCircle}
            style={styles.avatar}
          />
        </View>

        <View style={styles.userInfo}>
          <TextBase
            color={colors.grayscale['800']}
            weight="700"
          >
            {userQuery.data?.name} {userQuery.data?.surname}
          </TextBase>
          <TextSmall
            color={colors.grayscale['500']}
            weight="400"
          >
            +123 856479683
          </TextSmall>
        </View>
        <FlatList
          contentContainerStyle={styles.settingsMenuContent}
          data={settingsItems}
          ItemSeparatorComponent={Divider}
          renderItem={({ item }) => (
            <TouchableOpacity
              hitSlop={hitSlop}
              style={styles.settingsItem}
              onPress={item.onPress}
            >
              <Icon
                name={item.icon}
                size={24}
              />
              <TextLarge
                color={colors.grayscale['500']}
                weight="400"
              >
                {item.label}
              </TextLarge>
              <Icon
                name="chevronRight"
                style={styles.settingsItemChevron}
              />
            </TouchableOpacity>
          )}
          scrollEnabled={false}
          style={styles.list}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    marginBottom: 16,
  },
  body: {
    flex: 1,
    width: '100%',
    paddingBottom: SAFE_ZONE_BOTTOM,
  },
  avatarCenterer: {
    alignItems: 'center',
  },
  avatar: {
    flex: 1,
    maxHeight: 202,
    minHeight: 150,
    aspectRatio: 1,
    marginBottom: 16,
    borderRadius: BORDER_RADIUS_ROUNDED,
  },
  userInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  settingsMenuContent: {
    gap: 12,
  },
  settingsItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  list: {
    flex: 1,
  },
  settingsItemChevron: {
    marginLeft: 'auto',
  },
});
