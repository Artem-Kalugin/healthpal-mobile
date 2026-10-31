import {
  createFormatters,
  decodeLabel,
  encodeLabel,
  resolveLanguage,
  toLanguage,
} from './utils';

describe('toLanguage', () => {
  it('keeps a supported language', () => {
    expect(toLanguage('ru')).toBe('ru');
  });

  it('falls back to the default for unsupported or empty codes', () => {
    expect(toLanguage('de')).toBe('en');
    expect(toLanguage(undefined)).toBe('en');
    expect(toLanguage(null)).toBe('en');
  });
});

describe('resolveLanguage', () => {
  it('prefers the saved language over the device one', () => {
    expect(resolveLanguage('en', ['ru'])).toBe('en');
  });

  it('follows the first supported device language when nothing is saved', () => {
    expect(resolveLanguage(undefined, ['de', 'ru', 'en'])).toBe('ru');
  });

  it('falls back to the default when no device language is supported', () => {
    expect(resolveLanguage(undefined, ['de', null])).toBe('en');
    expect(resolveLanguage(undefined, [])).toBe('en');
  });
});

describe('encodeLabel / decodeLabel', () => {
  it('round-trips a key without params', () => {
    expect(decodeLabel(encodeLabel('signIn.title'))).toEqual({
      key: 'signIn.title',
      options: { count: undefined },
    });
  });

  it('takes the plural count from limit, then from length', () => {
    expect(
      decodeLabel(encodeLabel('serverValidation.TEXT_TOO_SHORT', { limit: 2 }))
        .options,
    ).toEqual({ limit: 2, count: 2 });
    expect(
      decodeLabel(encodeLabel('serverValidation.OTP_FORMAT', { length: 6 }))
        .options,
    ).toEqual({ length: 6, count: 6 });
  });

  it('falls back to the unknown validation text on malformed input', () => {
    const unknown = { key: 'serverValidation.UNKNOWN', options: {} };

    expect(decodeLabel('not json')).toEqual(unknown);
    expect(decodeLabel('{"params":{"limit":1}}')).toEqual(unknown);
    expect(decodeLabel('null')).toEqual(unknown);
  });
});

describe('createFormatters', () => {
  it('formats a distance in meters below a kilometer and in kilometers above', () => {
    const { formatDistance } = createFormatters('en');

    expect(formatDistance(450)).toContain('450');
    expect(formatDistance(450)).not.toContain('km');
    expect(formatDistance(1500)).toContain('1.5');
    expect(formatDistance(1500)).toContain('km');
  });
});
