import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { CompositeScreenProps } from '@react-navigation/native';
import { Image } from 'expo-image';
import { toast } from 'react-hot-toast/headless';

import HeaderWithThreeSections from '#components/HeaderWithThreeSections';

import {
  Divider,
  Icon,
  IconNames,
  TextBase,
  TextLarge,
  TextSmall,
} from '#ui-kit';

import { FavoritesRoutes } from '#navigation/Main/Favorites/types';
import { TabRoutes, TabScreenProps } from '#navigation/Main/Tab/types';
import { MainRoutes, MainScreenProps } from '#navigation/Main/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import {
  BORDER_RADIUS_ROUNDED,
  colors,
  hitSlop,
  Images,
  SAFE_ZONE_BOTTOM,
} from '#config';

export const Profile: React.FC<
  CompositeScreenProps<
    TabScreenProps<TabRoutes.Profile>,
    CompositeScreenProps<
      MainScreenProps<MainRoutes>,
      RootScreenProps<AppRoutes>
    >
  >
> = props => {
  const [avatar] = useState<null | string>('');

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
      onPress: () => {},
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
        <View style={styles.avatarWrapper}>
          <Image
            contentFit="contain"
            source={avatar || Images.profileCircle}
            style={styles.avatarImage}
          />
        </View>

        <View style={styles.userInfo}>
          <TextBase
            color={colors.grayscale['800']}
            weight="700"
          >
            Daniel Martinez
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
    paddingBottom: SAFE_ZONE_BOTTOM,
  },

  avatarWrapper: {
    flex: 1,
    maxHeight: 202,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    padding: 16,
  },
  avatarImage: {
    ...StyleSheet.absoluteFillObject,
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
  settingsItemChevron: {
    marginLeft: 'auto',
  },
});
