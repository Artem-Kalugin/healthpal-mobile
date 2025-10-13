import { useCallback, useState } from 'react';

import { debounce } from 'lodash';

const useDebouncedState = <T>(
  param: T,
  debounceTimer = 250,
): [T, SetState<T>, SetState<T>] => {
  const [debouncedValue, setDebouncedValue] = useState(param);

  const debouncedSet = useCallback(
    debounce(setDebouncedValue, debounceTimer),
    [],
  );

  return [debouncedValue, debouncedSet, setDebouncedValue];
};

export default useDebouncedState;
