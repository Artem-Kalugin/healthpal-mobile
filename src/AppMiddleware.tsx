import React, { useEffect, useState } from 'react';

import { FakeSplashScreenOverlay } from '#components/FakeSplashScreenOverlay';

import RootStack from '#navigation';

import useAppLifecycle from '#hooks/useAppLifecycle';

import { delay } from '#utils';

const AppMiddleware = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  useAppLifecycle();

  const mockLoad = async () => {
    setIsLoading(true);
    await delay(2000);
    setIsLoading(false);
    setShowSplash(false);
  };

  useEffect(() => {
    mockLoad();
  }, []);

  return (
    <>
      {showSplash && <FakeSplashScreenOverlay isLoading={isLoading} />}
      <RootStack />
    </>
  );
};

export default AppMiddleware;
