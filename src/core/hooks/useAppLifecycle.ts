import { useEffect, useState } from 'react';

import BootSplash from 'react-native-bootsplash';

import dayjs from 'dayjs';
import { useLocales } from 'expo-localization';

import { TokenService } from '#services/Token';

import { changeLanguage, resolveLanguage } from '#i18n';

import { useSelector } from '#store';

import { useAppData } from './useAppData';

export const useAppLifecycle = () => {
  const [inited, setInited] = useState(false);
  const { prefetchApp } = useAppData();
  const savedLanguage = useSelector(state => state.app.language);
  const locales = useLocales();

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
  };

  useEffect(() => {
    applyLanguage();
  }, [savedLanguage, locales]);

  const onAppStart = async () => {
    try {
      await TokenService.load();
      await applyLanguage();

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
