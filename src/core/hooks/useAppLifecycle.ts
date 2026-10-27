import { useEffect, useState } from 'react';

import BootSplash from 'react-native-bootsplash';

import { TokenService } from '#services/Token';

import { useAppData } from './useAppData';

const useAppLifecycle = () => {
  const [inited, setInited] = useState(false);
  const { prefetchApp } = useAppData();

  const onAppStart = async () => {
    try {
      await TokenService.load();

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

export default useAppLifecycle;
