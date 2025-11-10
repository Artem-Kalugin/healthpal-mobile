import { useEffect, useState } from 'react';

import { useIsFocused, useNavigation } from '@react-navigation/native';

import { delay } from '../utils';

const useModal = (initial = true, shouldWaitForModalAnimation = true) => {
  const [state, setState] = useState(initial);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const _setState = async (value: boolean) => {
    setState(value);

    if (!value) {
      shouldWaitForModalAnimation && (await delay(250));
      navigation.canGoBack() && navigation.goBack();
    }
  };

  useEffect(() => {
    setState(isFocused);
  }, [isFocused]);

  return {
    closeWithoutGoBack: () => setState(false),
    close: () => _setState(false),
    open: () => _setState(true),
    visible: state,
    setVisible: _setState,
  };
};

export type ModalController = ReturnType<typeof useModal>;

export default useModal;
