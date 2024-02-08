import { simpleCalculator, Action } from './index';

const testCases = [
  {
    a: 5,
    b: 5,
    action: Action.Add,
    expected: 10,
    name: 'should add two numbers',
  },
  {
    a: 5,
    b: 5,
    action: Action.Subtract,
    expected: 0,
    name: 'should subtract two numbers',
  },
  {
    a: 5,
    b: 5,
    action: Action.Multiply,
    expected: 25,
    name: 'should multiply two numbers',
  },
  {
    a: 5,
    b: 5,
    action: Action.Divide,
    expected: 1,
    name: 'should divide two numbers',
  },
  {
    a: 5,
    b: 5,
    action: Action.Exponentiate,
    expected: 3125,
    name: 'should exponentiate two numbers',
  },
  {
    a: 5,
    b: 5,
    action: '*****',
    expected: null,
    name: 'should return null for invalid action',
  },
  {
    a: null,
    b: '5',
    action: Action.Subtract,
    expected: null,
    name: 'should return null for invalid action',
  },
];

describe('simpleCalculator', () => {
  test.each(testCases)('$name', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
