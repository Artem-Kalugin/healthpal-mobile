import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useLocales } from 'expo-localization';

import { Icon, TextBase, TextSmall } from '#ui-kit';

import { ModalsRoutes, SelectModalParams } from '#navigation/Modals/types';
import { AppRoutes } from '#navigation/types';

import { colors } from '#config/colors';

import { resolveRegion, useTranslation } from '#i18n';

import { useDispatch, useSelector } from '#store';
import { AppActions } from '#store/slices/app';

import { RegionOptions } from './config';

export const RegionSelector: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const locales = useLocales();

  const savedRegion = useSelector(state => state.app.region);
  const region = resolveRegion(
    savedRegion,
    locales.map(locale => locale.languageCode),
  );

  const onPress = () => {
    navigation.navigate(AppRoutes.StackModals, {
      screen: ModalsRoutes.Select,
      params: {
        title: t('home.city.select'),
        data: RegionOptions,
        keyExtractor: item => item,
        checkedExtractor: (item, currentItem) => item === currentItem,
        renderItem: item => (
          <TextBase weight="400">{t(`region.${item}`)}</TextBase>
        ),
        onSelectionEnd: item =>
          dispatch(
            AppActions.setRegion(!item || item === 'auto' ? undefined : item),
          ),
        defaultValue: savedRegion ?? 'auto',
      } as SelectModalParams<(typeof RegionOptions)[number]>,
    });
  };

  return (
    <View style={styles.container}>
      <TextSmall color={colors.grayscale['500']}>
        {t('home.city.label')}
      </TextSmall>
      <TouchableOpacity
        style={styles.selector}
        onPress={onPress}
      >
        <Icon name="mapActive" />
        <TextSmall weight="600">{t(`region.${region}`)}</TextSmall>
        <Icon name="chevronDown" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
