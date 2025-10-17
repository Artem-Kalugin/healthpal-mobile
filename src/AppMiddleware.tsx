import React, { useEffect, useState } from 'react';

import * as SystemUI from 'expo-system-ui';

import { FakeSplashScreenOverlay } from '#components/FakeSplashScreenOverlay';

import RootStack from '#navigation';

import useAppLifecycle from '#hooks/useAppLifecycle';

const AppMiddleware = ({ navigationReady }: { navigationReady: boolean }) => {
  const [showSplashScreenAnimation, setShowSplashScreeAnimation] =
    useState(true);
  const { isReadyToRender } = useAppLifecycle();

  useEffect(() => {
    if (isReadyToRender) {
      SystemUI.setBackgroundColorAsync('white');
    }
  }, [isReadyToRender]);

  useEffect(() => {
    if (isReadyToRender && navigationReady) {
      //avoid flickering on app start if immideately ready
      setTimeout(() => {
        setShowSplashScreeAnimation(false);
      }, 500);
    }
  }, [isReadyToRender, navigationReady]);

  return (
    <>
      {showSplashScreenAnimation && (
        <FakeSplashScreenOverlay isLoading={true} />
      )}
      {isReadyToRender && <RootStack />}
    </>
  );
};

export default AppMiddleware;
