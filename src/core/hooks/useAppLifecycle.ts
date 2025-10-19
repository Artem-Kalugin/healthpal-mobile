import { useEffect, useState } from 'react';

import BootSplash from 'react-native-bootsplash';
import Keychain from 'react-native-keychain';

import { useDispatch } from '#store';
import { RuntimeActions } from '#store/slices/runtime';

import { usePrefetchApp } from './usePrefetchApp';

const useAppLifecycle = () => {
  const [inited, setInited] = useState(false);
  const dispatch = useDispatch();
  const { prefetchApp } = usePrefetchApp();

  const onAppStart = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        const { username: accessToken, password: refreshToken } = credentials;

        dispatch(RuntimeActions.setToken({ accessToken, refreshToken }));
      }

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
