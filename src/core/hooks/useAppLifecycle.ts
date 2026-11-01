import { useEffect, useState } from 'react';

import BootSplash from 'react-native-bootsplash';
import { YamapInstance } from 'react-native-yamap-plus';

import dayjs from 'dayjs';
import Constants from 'expo-constants';
import { useLocales } from 'expo-localization';

import { TokenService } from '#services/Token';

import { changeLanguage, resolveLanguage } from '#i18n';
import type { Language } from '#i18n/types';

import { useDispatch, useSelector } from '#store';
import { RuntimeActions } from '#store/slices/runtime';

import { useAppData } from './useAppData';

// iOS applies the MapKit locale only before the first map render: a language change takes effect after restart
const MapLocales: Record<Language, string> = {
  en: 'en_US',
  ru: 'ru_RU',
};

export const useAppLifecycle = () => {
  const [inited, setInited] = useState(false);
  const { prefetchApp } = useAppData();
  const savedLanguage = useSelector(state => state.app.language);
  const locales = useLocales();
  const dispatch = useDispatch();

  const applyLanguage = async () => {
    const language = resolveLanguage(
      savedLanguage,
      locales.map(locale => locale.languageCode),
    );

    await changeLanguage(language);
    dayjs.locale(
      {
        en: 'en-gb',
        ru: 'ru',
      }[language],
    );

    return language;
  };

  useEffect(() => {
    applyLanguage();
  }, [savedLanguage, locales]);

  // the locale must be set before MapKit is initialized, otherwise the map keeps the device one
  const initMap = async (language: Language) => {
    try {
      await YamapInstance.setLocale(MapLocales[language]);
      dispatch(RuntimeActions.setMapLanguage(language));
    } catch {
      // the map keeps the device locale; must not block the app start
    }

    try {
      await YamapInstance.init(
        Constants.expoConfig?.extra?.apiKeys.yandexMapKit,
      );
    } catch {
      // must not block the app start
    }
  };

  const onAppStart = async () => {
    try {
      await TokenService.load();
      const language = await applyLanguage();

      await initMap(language);

      BootSplash.hide({ fade: true });
      await prefetchApp();
    } catch {
    } finally {
      setInited(true);
    }
  };

  useEffect(() => {
    onAppStart();
  }, []);

  return { isReadyToRender: inited };
};
