import React, { useEffect, useState } from 'react';
import {
  AppState,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import { PermissionStatus, RESULTS } from 'react-native-permissions';

import { CompositeScreenProps } from '@react-navigation/native';
import { nativeApplicationVersion, nativeBuildVersion } from 'expo-application';

import { HeaderWithThreeSections } from '#components/infrastructure';

import { Button, Divider, Icon, TextBase, TextLarge, TextSmall } from '#ui-kit';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';
import { ModalsRoutes, SelectModalParams } from '#navigation/Modals/types';
import { AppRoutes, RootScreenProps } from '#navigation/types';

import { LocationPermission, PermissionManager } from '#services/Permissions';

import { headerShadow, hitSlop, SAFE_ZONE_BOTTOM } from '#config';
import { colors } from '#config/colors';

import { useTranslation } from '#i18n';
import type { Region } from '#i18n/types';

import { useDispatch, useSelector } from '#store';
import { AppActions } from '#store/slices/app';

import { LanguageOptions, LocationStatusLabels, RegionOptions } from './config';

// the check must stay silent: the screen only reads the status, it never asks
const SILENT_CHECK_CONFIG = { blockedAlert: {} };

export const Settings: React.FC<
  CompositeScreenProps<
    MainScreenProps<MainRoutes.Settings>,
    RootScreenProps<AppRoutes>
  >
> = props => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const savedRegion = useSelector(state => state.app.region);
  // applied right on select: it switches the UI language, so the screen shows the result at once
  const language = useSelector(state => state.app.language) ?? 'auto';

  const [region, setRegion] = useState<Region | 'auto'>(savedRegion ?? 'auto');
  const [locationStatus, setLocationStatus] = useState<PermissionStatus>();

  const refreshLocationStatus = async () => {
    const result = await PermissionManager.check(
      LocationPermission,
      SILENT_CHECK_CONFIG,
    );

    setLocationStatus(result.originalStatus);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- TODO: fix
    refreshLocationStatus();

    // the status changes in the system settings while the app is in the background
    const subscription = AppState.addEventListener('change', state => {
      state === 'active' && refreshLocationStatus();
    });

    return () => subscription.remove();
  }, []);

  const onSelectRegion = () => {
    props.navigation.navigate(AppRoutes.StackModals, {
      screen: ModalsRoutes.Select,
      params: {
        title: t('settings.region'),
        data: RegionOptions,
        keyExtractor: item => item,
        checkedExtractor: (item, currentItem) => item === currentItem,
        renderItem: item => (
          <TextBase weight="400">{t(`region.${item}`)}</TextBase>
        ),
        onSelectionEnd: item => setRegion(item ?? 'auto'),
        defaultValue: region,
      } as SelectModalParams<(typeof RegionOptions)[number]>,
    });
  };

  const onSelectLanguage = () => {
    props.navigation.navigate(AppRoutes.StackModals, {
      screen: ModalsRoutes.Select,
      params: {
        title: t('settings.language'),
        data: LanguageOptions,
        keyExtractor: item => item,
        checkedExtractor: (item, currentItem) => item === currentItem,
        renderItem: item => (
          <TextBase weight="400">{t(`language.${item}`)}</TextBase>
        ),
        onSelectionEnd: item =>
          dispatch(
            AppActions.setLanguage(!item || item === 'auto' ? undefined : item),
          ),
        defaultValue: language,
      } as SelectModalParams<(typeof LanguageOptions)[number]>,
    });
  };

  const onLocationPress = async () => {
    // `denied` still can be asked; anything else is changed in the system settings
    if (locationStatus === RESULTS.DENIED) {
      await PermissionManager.request(LocationPermission);
      await refreshLocationStatus();

      return;
    }

    await PermissionManager.openSettings();
  };

  const onConfirm = () => {
    dispatch(AppActions.setRegion(region === 'auto' ? undefined : region));
    props.navigation.goBack();
  };

  const version = [nativeApplicationVersion, nativeBuildVersion]
    .filter(Boolean)
    .join(' ');

  return (
    <View style={styles.container}>
      <HeaderWithThreeSections
        containerStyle={[styles.headerContainer, headerShadow]}
        title={t('settings.title')}
        titleTextAlign="center"
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <TextLarge
            color={colors.grayscale['500']}
            weight="600"
          >
            {t('settings.general')}
          </TextLarge>
          <TouchableOpacity
            hitSlop={hitSlop}
            style={styles.row}
            onPress={onSelectRegion}
          >
            <View style={styles.rowLabel}>
              <Icon
                color={colors.grayscale[500]}
                name="globalLinear"
                size={24}
              />
              <TextBase weight="400">{t('settings.region')}</TextBase>
            </View>
            <View style={styles.rowValue}>
              <TextBase
                color={colors.grayscale['500']}
                weight="400"
              >
                {t(`region.${region}`)}
              </TextBase>
              <Icon name="chevronRight" />
            </View>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            hitSlop={hitSlop}
            style={styles.row}
            onPress={onSelectLanguage}
          >
            <View style={styles.rowLabel}>
              <Icon
                color={colors.grayscale[500]}
                name="language"
                size={24}
              />
              <TextBase weight="400">{t('settings.language')}</TextBase>
            </View>
            <View style={styles.rowValue}>
              <TextBase
                color={colors.grayscale['500']}
                weight="400"
              >
                {t(`language.${language}`)}
              </TextBase>
              <Icon name="chevronRight" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TextLarge
            color={colors.grayscale['500']}
            weight="600"
          >
            {t('settings.permissions')}
          </TextLarge>
          <TouchableOpacity
            hitSlop={hitSlop}
            style={styles.row}
            onPress={onLocationPress}
          >
            <View style={styles.rowLabel}>
              <Icon
                color={colors.grayscale[500]}
                name="mapWithPin"
                size={24}
              />
              <TextBase weight="400">{t('settings.location.label')}</TextBase>
            </View>
            <View style={styles.rowValue}>
              {locationStatus && (
                <TextBase
                  color={colors.grayscale['500']}
                  weight="400"
                >
                  {t(LocationStatusLabels[locationStatus])}
                </TextBase>
              )}
              <Icon name="chevronRight" />
            </View>
          </TouchableOpacity>
        </View>

        <TextSmall
          color={colors.grayscale['400']}
          style={styles.version}
          weight="400"
        >
          {t('settings.version')} {version}
        </TextSmall>
      </ScrollView>

      <View style={styles.footer}>
        <Button onPress={onConfirm}>{t('settings.confirm')}</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 24,
    borderBottomColor: colors.grayscale['200'],
    borderBottomWidth: 1,
  },
  content: {
    padding: 24,
    gap: 32,
  },
  section: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  version: {
    textAlign: 'center',
  },
  footer: {
    paddingTop: 12,
    paddingBottom: SAFE_ZONE_BOTTOM,
    paddingHorizontal: 24,
  },
});
