import { MMKV } from 'react-native-mmkv';

export function createMockMMKV(): MMKV {
  const storage = new Map<string, string | boolean | number | ArrayBuffer>();
  const listeners = new Set<(key: string) => void>();

  const notifyListeners = (key: string) => {
    listeners.forEach(listener => {
      listener(key);
    });
  };

  return {
    clearAll: () => {
      const keysBefore = storage.keys();
      storage.clear();
      // Notify all listeners for all keys that were cleared
      for (const key of keysBefore) {
        notifyListeners(key);
      }
    },
    remove: key => {
      const deleted = storage.delete(key);
      if (deleted) {
        notifyListeners(key);
      }
      return deleted;
    },
    set: (key, value) => {
      if (key === '') throw new Error('Cannot set a value for an empty key!');
      storage.set(key, value);
      notifyListeners(key);
    },
    getString: key => {
      const result = storage.get(key);
      return typeof result === 'string' ? result : undefined;
    },
    getNumber: key => {
      const result = storage.get(key);
      return typeof result === 'number' ? result : undefined;
    },
    getBoolean: key => {
      const result = storage.get(key);
      return typeof result === 'boolean' ? result : undefined;
    },
    getBuffer: key => {
      const result = storage.get(key);
      return result instanceof ArrayBuffer ? result : undefined;
    },
    getAllKeys: () => Array.from(storage.keys()),
    contains: key => storage.has(key),
    recrypt: () => {},
    get size(): number {
      return storage.size;
    },
    isReadOnly: false,
    trim: () => {},
    name: 'MMKV',
    dispose: () => {},
    equals: () => {
      return false;
    },
    addOnValueChangedListener: listener => {
      listeners.add(listener);
      return {
        remove: () => {
          listeners.delete(listener);
        },
      };
    },
  };
}
