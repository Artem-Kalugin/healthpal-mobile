import { useEffect } from 'react';

import { delay } from '#utils';

const useAppLifecycle = () => {
  const onAppStart = async () => {
    await delay(250);
  };

  const onAppEnd = () => {};

  useEffect(() => {
    onAppStart();

    return onAppEnd;
  }, []);
};

export default useAppLifecycle;
