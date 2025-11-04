import { act, renderHook, waitFor } from '@testing-library/react-native';

import useDebouncedState from './useDebouncedState';

describe('useDebouncedState', () => {
  it('должен синхронно обновлять value и async debouncedValue', async () => {
    const { result } = renderHook(() => useDebouncedState('initial', 100));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(result.current[2]).toBe('initial');

    await waitFor(
      () => {
        expect(result.current[2]).toBe('updated');
      },
      { timeout: 200 },
    );
  });

  it('должен использовать последнее значение при быстрых изменениях', async () => {
    const { result } = renderHook(() => useDebouncedState(0, 100));

    act(() => {
      result.current[1](1);
      result.current[1](2);
      result.current[1](3);
    });

    await waitFor(() => {
      expect(result.current[2]).toBe(3);
    });
  });
});
