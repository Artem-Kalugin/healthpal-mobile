import React, { useEffect } from 'react';

import { FakeSplashScreenOverlay } from '#components/FakeSplashScreenOverlay';

import RootStack from '#navigation';

import useAppLifecycle from '#hooks/useAppLifecycle';

const AppMiddleware = () => {
  const { isReadyToRender } = useAppLifecycle();

  useEffect(() => {}, [isReadyToRender]);

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
