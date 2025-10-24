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

      setInited(true);
    } catch {}
  };

  const onAppEnd = () => {};

  useEffect(() => {
    onAppStart();

    return onAppEnd;
  }, []);

  return { isReadyToRender: inited };
};

export default useAppLifecycle;
