import { doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  const MOCKED_CALLBACK = jest.fn();
  const TIMEOUT = 1000;

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    doStuffByTimeout(MOCKED_CALLBACK, TIMEOUT);

    jest.advanceTimersByTime(TIMEOUT);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenCalledWith(MOCKED_CALLBACK, TIMEOUT);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(MOCKED_CALLBACK, TIMEOUT);

    expect(MOCKED_CALLBACK).not.toHaveBeenCalled();

    jest.advanceTimersByTime(TIMEOUT);

    expect(MOCKED_CALLBACK).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  const MOCKED_CALLBACK = jest.fn();
  const INTERVAL = 1000;
  const CALLS_COUNT = 10;

  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.resetAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    doStuffByInterval(MOCKED_CALLBACK, INTERVAL);

    jest.advanceTimersByTime(INTERVAL);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(MOCKED_CALLBACK, INTERVAL);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(MOCKED_CALLBACK, INTERVAL);

    expect(MOCKED_CALLBACK).not.toHaveBeenCalled();

    jest.advanceTimersByTime(INTERVAL * CALLS_COUNT);

    expect(MOCKED_CALLBACK).toBeCalledTimes(CALLS_COUNT);
  });
});

// describe('readFileAsynchronously', () => {
//   test('should call join with pathToFile', async () => {});

//   test('should return null if file does not exist', async () => {});

//   test('should return file content if file exists', async () => {});
// });
