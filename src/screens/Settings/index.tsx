import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { HeaderWithThreeSections } from '#components/infrastructure';

import { Button, Checkbox, TextBase, TextLarge } from '#ui-kit';

import { MainRoutes, MainScreenProps } from '#navigation/Main/types';

import { headerShadow, SAFE_ZONE_BOTTOM } from '#config';
import { colors } from '#config/colors';

import { useTranslation } from '#i18n';

import { useDispatch, useSelector } from '#store';
import { AppActions } from '#store/slices/app';

import { LanguageOptions, RegionOptions } from './config';

export const Settings: React.FC<
  MainScreenProps<MainRoutes.Settings>
> = props => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const savedRegion = useSelector(state => state.app.region);
  const savedLanguage = useSelector(state => state.app.language);

  const [region, setRegion] = useState(savedRegion);
  const [language, setLanguage] = useState(savedLanguage);

  const onConfirm = () => {
    dispatch(AppActions.setRegion(region));
    dispatch(AppActions.setLanguage(language));
    props.navigation.goBack();
  };

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
            {t('settings.region')}
          </TextLarge>
          {RegionOptions.map(item => (
            <Checkbox
              key={item ?? 'auto'}
              active={item === region}
              onPress={() => setRegion(item)}
            >
              <TextBase weight="400">{t(`region.${item ?? 'auto'}`)}</TextBase>
            </Checkbox>
          ))}
        </View>

        <View style={styles.section}>
          <TextLarge
            color={colors.grayscale['500']}
            weight="600"
          >
            {t('settings.language')}
          </TextLarge>
          {LanguageOptions.map(item => (
            <Checkbox
              key={item ?? 'auto'}
              active={item === language}
              onPress={() => setLanguage(item)}
            >
              <TextBase weight="400">
                {t(`language.${item ?? 'auto'}`)}
              </TextBase>
            </Checkbox>
          ))}
        </View>
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
  footer: {
    paddingTop: 12,
    paddingBottom: SAFE_ZONE_BOTTOM,
    paddingHorizontal: 24,
  },
});
