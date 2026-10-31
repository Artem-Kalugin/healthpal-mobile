import { renderHook } from '@testing-library/react-native';
import { toast } from 'react-hot-toast/headless';
import { z } from 'zod';

import { BEError } from '#api/types';

import { Haptics } from '#services/Haptics';

import { changeLanguage, decodeLabel } from '#i18n';

import { useAppForm } from './useAppForm';
import { useErrorHandler } from './useErrorHandler';

const schema = z.object({ phone: z.string(), password: z.string() });

jest.mock('react-hot-toast/headless');
jest.mock('#services/Haptics');
jest.mock('#services/Logger');

describe('useErrorHandler', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await changeLanguage('en');
  });

  it('должен ничего не делать если ошибки нет', () => {
    const meta = { error: undefined };

    renderHook(() => useErrorHandler(meta));

    expect(Haptics.impactError).not.toHaveBeenCalled();
  });

  it('должен вызвать haptics при наличии ошибки', () => {
    const meta = {
      error: {
        data: { statusCode: 500, code: 'INTERNAL_ERROR' },
      },
    };

    renderHook(() => useErrorHandler(meta));

    expect(Haptics.impactError).toHaveBeenCalledTimes(1);
  });

  it('должен установить ошибки валидации в форму как закодированные метки', () => {
    const { result: formResult } = renderHook(() => useAppForm(schema));

    const setErrorSpy = jest.spyOn(formResult.current.form, 'setError');

    const meta = {
      error: {
        data: {
          code: 'VALIDATION_FAILED',
          validation: {
            phone: [{ code: 'PHONE_FORMAT' }],
            password: [
              { code: 'PASSWORD_TOO_SHORT', params: { limit: 8 } },
              { code: 'PASSWORD_WEAK' },
            ],
          },
        },
      },
    };

    renderHook(() => useErrorHandler(meta, formResult.current.form));

    expect(setErrorSpy).toHaveBeenCalledTimes(2);

    const [, phoneError] = setErrorSpy.mock.calls[0];
    expect(decodeLabel(phoneError.message!)).toEqual({
      key: 'serverValidation.PHONE_FORMAT',
      options: { count: undefined },
    });

    const [, passwordError] = setErrorSpy.mock.calls[1];
    expect(passwordError.type).toBe('server');
    expect(decodeLabel(passwordError.message!)).toEqual({
      key: 'serverValidation.PASSWORD_TOO_SHORT',
      options: { limit: 8, count: 8 },
    });
    expect(Object.keys(passwordError.types!)).toEqual([
      'PASSWORD_TOO_SHORT',
      'PASSWORD_WEAK',
    ]);
  });

  it('должен показать toast с текстом по коду ошибки', () => {
    const meta = {
      error: { data: { statusCode: 401, code: 'INVALID_CREDENTIALS' } },
    };

    renderHook(() => useErrorHandler(meta));

    expect(toast.error).toHaveBeenCalledWith('Wrong phone number or password');
  });

  it('должен показать общий toast для ошибки валидации без формы', () => {
    const meta = {
      error: {
        data: {
          statusCode: 400,
          code: 'VALIDATION_FAILED',
          validation: { code: [{ code: 'OTP_FORMAT', params: { length: 4 } }] },
        },
      },
    };

    renderHook(() => useErrorHandler(meta));

    expect(toast.error).toHaveBeenCalledWith(
      'Some of the entered data is invalid',
    );
  });

  it('должен показать универсальный текст для неизвестного кода', () => {
    const meta = { error: { data: { statusCode: 418, code: 'FUTURE_CODE' } } };

    renderHook(() => useErrorHandler(meta));

    expect(toast.error).toHaveBeenCalledWith(
      'Something went wrong. Please try again',
    );
  });

  it('должен показать универсальный текст если у ответа нет кода', () => {
    const meta = { error: { data: '<html>Bad gateway</html>' } };

    renderHook(() => useErrorHandler(meta));

    expect(toast.error).toHaveBeenCalledWith(
      'Something went wrong. Please try again',
    );
  });

  it('не должен показывать toast для INVALID_REQUEST_CONTEXT', () => {
    const meta = {
      error: { data: { statusCode: 400, code: 'INVALID_REQUEST_CONTEXT' } },
    };

    renderHook(() => useErrorHandler(meta));

    expect(Haptics.impactError).toHaveBeenCalledTimes(1);
    expect(toast.error).not.toHaveBeenCalled();
  });

  it('не должен показывать toast если ошибки валидации ушли в форму', () => {
    const { result: formResult } = renderHook(() => useAppForm(schema));

    const meta = {
      error: {
        data: {
          code: 'VALIDATION_FAILED',
          validation: { phone: [{ code: 'PHONE_FORMAT' }] },
        },
      },
    };

    renderHook(() => useErrorHandler(meta, formResult.current.form));

    expect(toast.error).not.toHaveBeenCalled();
  });

  it('должен реагировать на изменение ошибки', () => {
    const meta: { error?: BEError } = {};
    const { rerender } = renderHook(() => useErrorHandler(meta));

    expect(Haptics.impactError).not.toHaveBeenCalled();

    meta.error = { data: { statusCode: 404, code: 'DOCTOR_NOT_FOUND' } };
    rerender(undefined);

    expect(Haptics.impactError).toHaveBeenCalledTimes(1);
    expect(toast.error).toHaveBeenCalledWith('Doctor not found');
  });

  it('должен ничего не делать если errorData отсутствует', () => {
    const meta = {
      error: {
        data: null,
      },
    };

    renderHook(() => useErrorHandler(meta));

    expect(toast.error).not.toHaveBeenCalled();
  });
});
