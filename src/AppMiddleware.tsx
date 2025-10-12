import React, { useEffect } from 'react';

import * as SystemUI from 'expo-system-ui';

import { FakeSplashScreenOverlay } from '#components/FakeSplashScreenOverlay';

import RootStack from '#navigation';

import useAppLifecycle from '#hooks/useAppLifecycle';

const AppMiddleware = () => {
  const { isReadyToRender } = useAppLifecycle();

  useEffect(() => {
    if (isReadyToRender) {
      SystemUI.setBackgroundColorAsync('white');
    }
  }, [isReadyToRender]);
  return (
    <>
      {!isReadyToRender && (
        <FakeSplashScreenOverlay isLoading={isReadyToRender} />
      )}
      {isReadyToRender && <RootStack />}
    </>
  );
};

export default AppMiddleware;
