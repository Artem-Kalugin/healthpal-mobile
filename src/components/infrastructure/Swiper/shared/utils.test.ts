// utils.test.ts
import { reduceAnimationValue, toAbsCeil } from './utils';

describe('reduceAnimationValue', () => {
  it('корректно сокращает позитивные значения', () => {
    expect(reduceAnimationValue(150, 100)).toBe(50);
  });

  it('корректно сокращает отрицательные значения', () => {
    expect(reduceAnimationValue(-50, 100)).toBe(50);
  });

  it('корректно сокращает пороговое значение', () => {
    expect(reduceAnimationValue(100, 100)).toBe(0);
  });
});

describe('toAbsCeil', () => {
  it('floor отрицательного значения', () => {
    expect(toAbsCeil(-2.3)).toBe(-3);
  });

  it('ceil положительное и отрицательное значение более -0.5', () => {
    expect(toAbsCeil(2.3)).toBe(3);
    expect(toAbsCeil(-0.5)).toBe(-0);
  });
});
