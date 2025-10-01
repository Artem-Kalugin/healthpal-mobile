import React from 'react';

import RootStack from '#navigation';

import useAppLifecycle from '#hooks/useAppLifecycle';

const AppMiddleware = () => {
  useAppLifecycle();

  return <RootStack />;
};

export default AppMiddleware;
