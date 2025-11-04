import { useEffect, useState } from 'react';

import BootSplash from 'react-native-bootsplash';

import { TokenService } from '#services/Token';

import { usePrefetchApp } from './usePrefetchApp';

const useAppLifecycle = () => {
  const [inited, setInited] = useState(false);
  const { prefetchApp } = usePrefetchApp();

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
