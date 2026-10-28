import * as React from 'react';
import { StyleSheet } from 'react-native';

import { KeyboardStickyView } from 'react-native-keyboard-controller';

import { useToaster } from 'react-hot-toast/headless';

import { ToastItem } from './components/ToastItem';

const TOASTS_OFFSET = 100;

const offset = {
  closed: 0,
  opened: TOASTS_OFFSET,
};

export const ToastProvider = () => {
  const { toasts, handlers } = useToaster();
  return (
    <KeyboardStickyView
      offset={offset}
      pointerEvents="none"
      style={styles.provider}
    >
      {toasts.map(t => (
        <ToastItem
          key={t.id}
          offset={handlers.calculateOffset(t, {
            reverseOrder: false,
          })}
          t={t}
          updateHeight={(height: number) => handlers.updateHeight(t.id, height)}
        />
      ))}
    </KeyboardStickyView>
  );
};

const styles = StyleSheet.create({
  provider: {
    position: 'absolute',
    right: 0,
    bottom: TOASTS_OFFSET,
    left: 0,
  },
});
