import { getLevel } from "../app.js";
import fetchData from "../http";

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should return the current character level', () => {
  fetchData.mockReturnValue(JSON.parse('{"status":"ok","level":2}'));

  const response = getLevel(1);
  expect(response).toEqual('Ваш текущий уровень: 2');
  expect(fetchData).toHaveBeenCalledWith('https://server/user/1');
});

test('should return message about a error', () => {
  fetchData.mockReturnValue(JSON.parse('{"status":"error"}'));

  const response = getLevel(1);
  expect(response).toEqual('Информация об уровне временно недоступна');
  expect(fetchData).toHaveBeenCalledWith('https://server/user/1');
})