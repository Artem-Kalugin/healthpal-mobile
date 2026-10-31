import { act, renderHook } from '@testing-library/react-native';
import { z } from 'zod';

import { decodeLabel } from '#i18n';

import { useAppForm } from './useAppForm';

jest.mock('#services/Haptics');

const schema = z.object({
  phone: z.string().min(1, 'signIn.validation.phone.required'),
  password: z
    .string()
    .min(8, 'signIn.validation.password.minLength')
    .regex(/\d/, 'signIn.validation.password.charset'),
});

describe('useAppForm', () => {
  it('отдаёт ошибки схемы как закодированные метки', async () => {
    const { result } = renderHook(() => {
      const app = useAppForm(schema, { phone: '', password: 'abc' });

      // formState is a subscription proxy: errors are tracked only when read during render
      return { ...app, errors: app.form.formState.errors };
    });

    await act(async () => {
      await result.current.form.trigger();
    });

    const { phone, password } = result.current.errors;

    expect(decodeLabel(phone!.message!).key).toBe(
      'signIn.validation.phone.required',
    );
    expect(
      Object.values(password!.types!).map(
        label => decodeLabel(label as string).key,
      ),
    ).toEqual([
      'signIn.validation.password.minLength',
      'signIn.validation.password.charset',
    ]);
  });
});
