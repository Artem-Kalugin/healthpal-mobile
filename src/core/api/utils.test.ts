import { __checkBEValidationError } from './utils';

describe('__checkBEValidationError', () => {
  test('false для null/undefined', () => {
    expect(__checkBEValidationError(null)).toBe(false);
  });

  test('false для примитивов', () => {
    expect(__checkBEValidationError('string')).toBe(false);
  });

  test('false для обьектов без поля data ', () => {
    expect(__checkBEValidationError({ foo: 'bar' })).toBe(false);
  });

  test('false для объектов с полем data без поля data.validation', () => {
    expect(__checkBEValidationError({ data: 123 })).toBe(false);
  });

  test('true для обьектов с полем data.validation', () => {
    expect(__checkBEValidationError({ data: { validation: {} } })).toBe(true);
    expect(
      __checkBEValidationError({ data: { validation: { field: 'error' } } }),
    ).toBe(true);
  });
});
