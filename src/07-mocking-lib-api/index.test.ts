import axios from 'axios';
import lodash from 'lodash';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';
  const RELATIVE_PATH = 'posts/1';
  const RESPONSE = {
    data: {
      userId: 1,
      id: 1,
      title: 'lorem ipsum',
      body: 'lorem ipsum',
    },
  };

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.spyOn(axios, 'create').mockReturnThis();
    jest.spyOn(axios, 'get').mockResolvedValue(RESPONSE);
    jest.spyOn(lodash, 'throttle').mockImplementation((fn) => fn());
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const createSpy = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi(RELATIVE_PATH);

    jest.runAllTimers();

    expect(createSpy).toHaveBeenCalledWith({ baseURL: BASE_URL });
  });

  test('should perform request to correct provided url', async () => {
    const getSpy = jest.spyOn(axios, 'get');

    await throttledGetDataFromApi(RELATIVE_PATH);

    jest.runAllTimers();
    expect(getSpy).toHaveBeenCalledWith(RELATIVE_PATH);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(RELATIVE_PATH);

    jest.runAllTimers();

    expect(response).toStrictEqual(RESPONSE.data);
  });
});
