import { useIsFocused, useNavigation } from '@react-navigation/native';
import { act, renderHook } from '@testing-library/react-native';

import useModal from './useModalState';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
  useIsFocused: jest.fn(),
}));

describe('useModal', () => {
  let mockNavigation: {
    goBack: jest.Mock;
    canGoBack: jest.Mock;
    navigate: jest.Mock;
  };

  beforeEach(() => {
    mockNavigation = {
      goBack: jest.fn(),
      canGoBack: jest.fn().mockReturnValue(true),
      navigate: jest.fn(),
    };

    (useNavigation as jest.Mock).mockReturnValue(mockNavigation);
    (useIsFocused as jest.Mock).mockReturnValue(true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('должно инициализироваться открытым (true)', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.visible).toBe(true);
    });

    it('должно инициализироваться с переданным значением (false) + !isFocused', () => {
      (useIsFocused as jest.Mock).mockReturnValue(false);
      const { result } = renderHook(() => useModal(false));

      expect(result.current.visible).toBe(false);
    });
  });

  describe('open()', () => {
    it('должно открываться', () => {
      const { result } = renderHook(() => useModal(false));

      act(() => {
        result.current.open();
      });

      expect(result.current.visible).toBe(true);
    });
  });

  describe('close()', () => {
    it('должно закрываться', () => {
      const { result } = renderHook(() => useModal(true));

      act(() => {
        result.current.close();
      });

      expect(result.current.visible).toBe(false);
    });

    it('должно вызывать goBack() когда canGoBack', () => {
      mockNavigation.canGoBack.mockReturnValue(true);
      const { result } = renderHook(() => useModal(true));

      act(() => {
        result.current.close();
      });

      expect(mockNavigation.canGoBack).toHaveBeenCalled();
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });

    it('не должно вызывать goBack() когда !canGoBack', () => {
      mockNavigation.canGoBack.mockReturnValue(false);
      const { result } = renderHook(() => useModal(true));

      act(() => {
        result.current.close();
      });

      expect(mockNavigation.canGoBack).toHaveBeenCalled();
      expect(mockNavigation.goBack).not.toHaveBeenCalled();
    });
  });

  describe('closeWithoutGoBack()', () => {
    it('должно закрывать', () => {
      const { result } = renderHook(() => useModal(true));

      act(() => {
        result.current.closeWithoutGoBack();
      });

      expect(result.current.visible).toBe(false);
    });

    it('не должно вызывать goBack() даже если canGoBack', () => {
      mockNavigation.canGoBack.mockReturnValue(true);
      const { result } = renderHook(() => useModal(true));

      act(() => {
        result.current.closeWithoutGoBack();
      });

      expect(mockNavigation.goBack).not.toHaveBeenCalled();
    });
  });

  describe('setVisible()', () => {
    it('должен вести себя как setState', () => {
      const { result } = renderHook(() => useModal(false));

      act(() => {
        result.current.setVisible(true);
      });

      expect(result.current.visible).toBe(true);
      expect(mockNavigation.goBack).not.toHaveBeenCalled();

      act(() => {
        result.current.setVisible(false);
      });

      expect(result.current.visible).toBe(false);
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });

  describe('isFocused', () => {
    it('должен синхронизировать состояние', () => {
      const { result, rerender } = renderHook(() => useModal(true));

      expect(result.current.visible).toBe(true);

      (useIsFocused as jest.Mock).mockReturnValue(false);
      //@ts-expect-error
      rerender();

      expect(result.current.visible).toBe(false);
      (useIsFocused as jest.Mock).mockReturnValue(true);
      //@ts-expect-error
      rerender();

      expect(result.current.visible).toBe(true);
    });
  });

  describe('Должен поддерживать чейнинг', () => {
    it('ModalA -> ModalB -> назад к ModalA', () => {
      (useIsFocused as jest.Mock).mockReturnValue(true);
      const { result, rerender } = renderHook(() => useModal(true));

      expect(result.current.visible).toBe(true);

      act(() => {
        result.current.closeWithoutGoBack();
      });
      expect(mockNavigation.goBack).not.toHaveBeenCalled();

      (useIsFocused as jest.Mock).mockReturnValue(false);
      //@ts-expect-error
      rerender();
      expect(result.current.visible).toBe(false);

      (useIsFocused as jest.Mock).mockReturnValue(true);
      //@ts-expect-error
      rerender();
      expect(result.current.visible).toBe(true);
    });
  });

  describe('Edge cases', () => {
    it('должен корректно обрабатывать быстрые изменения', () => {
      const { result } = renderHook(() => useModal(false));

      act(() => {
        result.current.open();
        result.current.close();
        result.current.open();
      });

      expect(result.current.visible).toBe(true);
    });
  });
});
