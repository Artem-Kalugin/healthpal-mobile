import {
  changeAnchorDate,
  dateToYYYYMM,
  getDayState,
  toDateString,
} from './utils';

describe('getDayState', () => {
  const activeDates = ['2024-03-15', '2024-03-16'];

  it('возвращает disabled если дата не в activeDates', () => {
    expect(getDayState('2024-03-14', activeDates)).toBe('disabled');
  });

  it('возвращает selected если дата === selectedDate', () => {
    expect(getDayState('2024-03-15', activeDates, '2024-03-15')).toBe(
      'selected',
    );
  });

  it('возвращает outlined если дата === outlinedDate', () => {
    expect(
      getDayState('2024-03-16', activeDates, undefined, '2024-03-16'),
    ).toBe('outlined');
  });

  it('возвращает inactive для обычной даты', () => {
    expect(getDayState('2024-03-15', activeDates)).toBe('inactive');
  });

  it('приоритет: selected > outlined', () => {
    expect(
      getDayState('2024-03-15', activeDates, '2024-03-15', '2024-03-15'),
    ).toBe('selected');
  });
});

describe('Calendar utils', () => {
  describe('toDateString', () => {
    it('форматирует ISO дату в YYYY-MM-DD', () => {
      expect(toDateString('2024-03-15T10:30:00Z')).toBe('2024-03-15');
    });

    it('сбрасывает день когда resetDay=true', () => {
      expect(toDateString('2024-03-15T10:30:00Z', true)).toBe('2024-03-01');
    });
  });

  describe('dateToYYYYMM', () => {
    it('форматирует дату в YYYY-MM', () => {
      expect(dateToYYYYMM('2024-03-15')).toBe('2024-03');
    });
  });

  describe('changeAnchorDate', () => {
    it('увеличивает месяц на 1', () => {
      const result = changeAnchorDate({ dateString: '2024-03-01' }, +1);

      expect(result.dateString).toBe('2024-04-01');
      expect(result.month).toBe(4);
      expect(result.year).toBe(2024);
    });

    it('уменьшает месяц на 1', () => {
      const result = changeAnchorDate({ dateString: '2024-03-01' }, -1);

      expect(result.dateString).toBe('2024-02-01');
    });

    it('переходит на следующий год при month=12', () => {
      const result = changeAnchorDate({ dateString: '2024-12-01' }, +1);

      expect(result.dateString).toBe('2025-01-01');
      expect(result.year).toBe(2025);
      expect(result.month).toBe(1);
    });

    it('переходит на предыдущий год при month=1', () => {
      const result = changeAnchorDate({ dateString: '2024-01-01' }, -1);

      expect(result.dateString).toBe('2023-12-01');
      expect(result.year).toBe(2023);
      expect(result.month).toBe(12);
    });

    it('корректно обрабатывает несколько месяцев подряд', () => {
      let date = { dateString: '2024-11-01' };
      date = changeAnchorDate(date, +1);
      date = changeAnchorDate(date, +1);

      expect(date.dateString).toBe('2025-01-01');
    });
  });
});
