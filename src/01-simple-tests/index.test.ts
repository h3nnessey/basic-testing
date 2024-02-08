import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = { a: 5, b: 5, action: Action.Add };

    expect(simpleCalculator(rawInput)).toBe(10);
  });

  test('should subtract two numbers', () => {
    const rawInput = { a: 5, b: 5, action: Action.Subtract };

    expect(simpleCalculator(rawInput)).toBe(0);
  });

  test('should multiply two numbers', () => {
    const rawInput = { a: 5, b: 5, action: Action.Multiply };

    expect(simpleCalculator(rawInput)).toBe(25);
  });

  test('should divide two numbers', () => {
    const rawInput = { a: 5, b: 5, action: Action.Divide };

    expect(simpleCalculator(rawInput)).toBe(1);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = { a: 5, b: 5, action: Action.Exponentiate };

    expect(simpleCalculator(rawInput)).toBe(3125);
  });

  test('should return null for invalid action', () => {
    const rawInput = { a: 5, b: 5, action: '*****' };

    expect(simpleCalculator(rawInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const rawInput = { a: null, b: '5', action: Action.Subtract };

    expect(simpleCalculator(rawInput)).toBeNull();
  });
});
