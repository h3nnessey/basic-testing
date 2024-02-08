// import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import { doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  const MOCKED_CALLBACK = jest.fn();
  const TIMEOUT = 1000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(MOCKED_CALLBACK, TIMEOUT);

    jest.runAllTimers();

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(MOCKED_CALLBACK, TIMEOUT);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(MOCKED_CALLBACK, TIMEOUT);

    expect(MOCKED_CALLBACK).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(MOCKED_CALLBACK).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(MOCKED_CALLBACK, TIMEOUT);
  });
});

// describe('doStuffByInterval', () => {
//   beforeAll(() => {
//     jest.useFakeTimers();
//   });

//   afterAll(() => {
//     jest.useRealTimers();
//   });

//   test('should set interval with provided callback and timeout', () => {
//     // Write your test here
//   });

//   test('should call callback multiple times after multiple intervals', () => {
//     // Write your test here
//   });
// });

// describe('readFileAsynchronously', () => {
//   test('should call join with pathToFile', async () => {
//     // Write your test here
//   });

//   test('should return null if file does not exist', async () => {
//     // Write your test here
//   });

//   test('should return file content if file exists', async () => {
//     // Write your test here
//   });
// });
