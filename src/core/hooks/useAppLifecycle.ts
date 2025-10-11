import { useEffect, useState } from 'react';

import { delay } from '#utils';

import { usePrefetchApp } from './usePrefetchApp';

const useAppLifecycle = () => {
  const [inited, setInited] = useState(false);
  const prefetchApp = usePrefetchApp();

  const onAppStart = async () => {
    await delay(250);
    await prefetchApp();

    setInited(true);
  };

  const onAppEnd = () => {};

  useEffect(() => {
    onAppStart();

    return onAppEnd;
  }, []);

  return { isReadyToRender: inited };
};

export default useAppLifecycle;
