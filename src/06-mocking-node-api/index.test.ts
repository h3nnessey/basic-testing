import path from 'node:path';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  const MOCKED_CALLBACK = jest.fn();
  const TIMEOUT = 1000;

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
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
    jest.restoreAllMocks();
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

describe('readFileAsynchronously', () => {
  const PATH_TO_FILE = './text.txt';
  const FILE_CONTENT =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, eveniet.\n';

  beforeEach(() => {
    jest
      .spyOn(path, 'join')
      .mockImplementation((...args: string[]) => args.join('/'));

    jest.spyOn(fsp, 'readFile').mockResolvedValue(FILE_CONTENT);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    await readFileAsynchronously(PATH_TO_FILE);

    expect(joinSpy.mock.calls.at(0)).toContain(PATH_TO_FILE);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    await expect(readFileAsynchronously(PATH_TO_FILE)).resolves.toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);

    await expect(readFileAsynchronously(PATH_TO_FILE)).resolves.toBe(
      FILE_CONTENT,
    );
  });
});
