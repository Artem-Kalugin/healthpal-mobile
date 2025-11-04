import { renderHook } from '@testing-library/react-native';
import { toast } from 'react-hot-toast/headless';

import { LoginDto } from '#api/Auth/dto/LoginDto';

import Haptics from '#services/Haptics';

import useAppForm from './useAppForm';
import useBEErrorHandler from './useErrorHandler';

jest.mock('react-hot-toast/headless');
jest.mock('#services/Haptics');
jest.mock('#services/Logger');

describe('useBEErrorHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('должен ничего не делать если ошибки нет', () => {
    const meta = { error: null };

    renderHook(() => useBEErrorHandler(meta));

    expect(Haptics.impactError).not.toHaveBeenCalled();
  });

  it('должен вызвать haptics при наличии ошибки', () => {
    const meta = {
      error: {
        data: { message: 'Ошибка сервера' },
      },
    };

    renderHook(() => useBEErrorHandler(meta));

    expect(Haptics.impactError).toHaveBeenCalledTimes(1);
  });

  it('должен установить ошибки валидации в форму', () => {
    const { result: formResult } = renderHook(() => useAppForm(LoginDto));

    const setErrorSpy = jest.spyOn(formResult.current.form, 'setError');

    const meta = {
      error: {
        data: {
          validation: {
            phone: ['Неверный телефон'],
            password: ['Пароль слишком короткий'],
          },
        },
      },
    };

    renderHook(() => useBEErrorHandler(meta, formResult.current.form));

    expect(setErrorSpy).toHaveBeenCalledWith('phone', {
      message: 'Неверный телефон',
    });
    expect(setErrorSpy).toHaveBeenCalledWith('password', {
      message: 'Пароль слишком короткий',
    });
    expect(setErrorSpy).toHaveBeenCalledTimes(2);
  });

  it('должен показать toast с сообщением об ошибке', () => {
    const meta = {
      error: {
        data: {
          message: 'Что-то пошло не так',
        },
      },
    };

    renderHook(() => useBEErrorHandler(meta));

    expect(toast.error).toHaveBeenCalledWith('Что-то пошло не так');
  });

  it('не должен показывать toast если есть ошибки валидации при отсутствии message', () => {
    const { result: formResult } = renderHook(() => useAppForm(LoginDto));

    const meta = {
      error: {
        data: {
          validation: {
            phone: ['Неверный email'],
          },
        },
      },
    };

    renderHook(() => useBEErrorHandler(meta, formResult.current.form));

    expect(toast.error).not.toHaveBeenCalled();
  });

  it('должен реагировать на изменение ошибки', () => {
    const meta = { error: null };
    //@ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { rerender } = renderHook(({ meta }) => useBEErrorHandler(meta), {
      initialProps: { meta },
    });

    expect(Haptics.impactError).not.toHaveBeenCalled();

    //@ts-expect-error
    meta.error = { data: { message: 'Новая ошибка' } };
    rerender({ meta });

    expect(Haptics.impactError).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('Новая ошибка');
  });

  it('должен ничего не делать если errorData отсутствует', () => {
    const meta = {
      error: {
        data: null,
      },
    };

    renderHook(() => useBEErrorHandler(meta));

    expect(toast.error).not.toHaveBeenCalled();
  });
});
