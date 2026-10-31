import { act, renderHook } from '@testing-library/react-native';

import { changeLanguage } from '../index';
import { useFormatters } from './useFormatters';

describe('useFormatters', () => {
  it('updates the formatters when the language changes', async () => {
    await changeLanguage('en');

    const { result } = renderHook(() => useFormatters());
    const before = result.current.formatDate(new Date(2024, 2, 5));

    await act(async () => {
      await changeLanguage('ru');
    });

    expect(result.current.formatDate(new Date(2024, 2, 5))).not.toBe(before);
  });
});
