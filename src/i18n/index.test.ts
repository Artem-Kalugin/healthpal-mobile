import { changeLanguage, getLanguage } from './index';

describe('i18n', () => {
  it('exposes the active language after a change', async () => {
    await changeLanguage('en');

    expect(getLanguage()).toBe('en');

    await changeLanguage('ru');

    expect(getLanguage()).toBe('ru');
  });
});
