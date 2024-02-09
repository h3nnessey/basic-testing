import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(['a', 'b', 'c'])).toStrictEqual({
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    // building a linked list even on the base of these few elements is time-consuming and extremely awkward
    const elements = ['d', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'];

    expect(generateLinkedList(elements)).toMatchSnapshot();
  });
});
